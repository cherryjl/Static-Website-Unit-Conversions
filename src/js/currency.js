const API_BASE = "https://api.frankfurter.dev/v1";
const API_URL = `${API_BASE}/latest?from=USD`;
const CACHE_KEY = "currencyRates";
const CACHE_TIME_KEY = "currencyRatesTime";
const ONE_DAY = 24 * 60 * 60 * 1000;

function renderTableMessage(message) {
    const table = document.getElementById("currencyTable");
    if (!table) return;

    table.innerHTML = `<tr><td colspan="2">${message}</td></tr>`;
}

function readCachedRates() {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object" || !parsed.rates) {
            throw new Error("Cache missing rates field");
        }
        return parsed;
    } catch {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIME_KEY);
        return null;
    }
}

async function getRates() {
	const now = Date.now();
	const cachedTime = Number(localStorage.getItem(CACHE_TIME_KEY));
	const cachedData = readCachedRates();

	// Use cache if under 24 hours
	if (cachedTime && cachedData && now - cachedTime < ONE_DAY) {
		return cachedData;
	}

	try {
		// Fetch new data
		const res = await fetch(API_URL);
		if (!res.ok) {
			throw new Error(`Rates request failed: ${res.status}`);
		}
		const data = await res.json();

		if (!data || typeof data !== "object" || !data.rates) {
			throw new Error("Rates response missing rates field");
		}

		localStorage.setItem(CACHE_KEY, JSON.stringify(data));
		localStorage.setItem(CACHE_TIME_KEY, now);

		return data;
	} catch (error) {
		if (cachedData) {
			return cachedData;
		}
		throw error;
	}
}

function populateTable(rates) {
    const table = document.getElementById("currencyTable");
    if (!table) return;

    table.innerHTML = "";

    // Pick a few common currencies (keeps UI clean)
    const selected = ["EUR", "JPY", "GBP","AUD", "CAB", "CHF", "CNH", "HKD", "NZD", "SGD", "MXN"];

    selected.forEach(code => {
        const rate = rates[code];
        if (typeof rate !== "number") return;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>1 USD</td>
            <td>${rate.toFixed(2)} ${code}</td>
        `;

        table.appendChild(row);
    });
}

async function initCurrencyPage() {
    try {
        renderTableMessage("Loading latest exchange rates...");
        const data = await getRates();
        populateTable(data.rates);
    } catch (error) {
        console.error("Failed to load currency rates:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        renderTableMessage(`Could not load rates: ${message}`);
    }
}

initCurrencyPage();

async function convertCurrency() {
    const valueInEl = document.getElementById("valueIn");
    const unitFromEl = document.getElementById("unitFrom");
    const unitToEl = document.getElementById("unitTo");
    const resultEl = document.getElementById("result");

    if (!valueInEl || !unitFromEl || !unitToEl || !resultEl) return;

    const amount = parseFloat(valueInEl.value);
    const from = unitFromEl.value;
    const to = unitToEl.value;

    if (Number.isNaN(amount)) {
        resultEl.innerText = "Output:";
        return;
    }

    const query = new URLSearchParams({
        amount: String(amount),
        from,
        to,
    });
    const res = await fetch(`${API_BASE}/latest?${query.toString()}`);
    if (!res.ok) {
        throw new Error(`Conversion request failed: ${res.status}`);
    }

    const data = await res.json();
    const result = data.rates[to];

    resultEl.innerText = `Output: ${result.toFixed(2)}`;
}

const valueInEl = document.getElementById("valueIn");
const unitFromEl = document.getElementById("unitFrom");
const unitToEl = document.getElementById("unitTo");

if (valueInEl && unitFromEl && unitToEl) {
    valueInEl.addEventListener("input", convertCurrency);
    unitFromEl.addEventListener("change", convertCurrency);
    unitToEl.addEventListener("change", convertCurrency);
}
