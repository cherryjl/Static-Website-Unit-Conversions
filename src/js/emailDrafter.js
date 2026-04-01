// Script for suggestion form

// Selectors and variables.
let emailBtn = document.getElementById("emailBtn");
let form = document.querySelector("#formSuggestion form");

// Function to encode strings for URL.
function encode(str) {
  try {
    return encodeURIComponent(str);
  } catch (e) {
    return "";
  }
}

emailBtn.addEventListener("click", function (e) {
  // Prevent default form submission. Stops page reload.
  e.preventDefault();
  // Get form values.
  let nameEl = form.querySelector("#name");
  let categoryEl = form.querySelector("#category");
  let unitEl = form.querySelector("#unit");
  let commentsEl = form.querySelector("#comments");

  // Trims values. (removes spaces).
  let name = nameEl.value.trim();
  let category = categoryEl.options[categoryEl.selectedIndex].text;
  let unit = unitEl.value.trim();
  let comments = commentsEl.value.trim();

  // Encode values for URL.
  let subject = "Conversion Suggestion from " + name;
  let body = "Hello,%0D%0A%0AI would like to suggest a conversion:%0D%0A%0A";

  // Forms the emails body.
  body += "- Category: " + encode(category) + "%0D%0A";
  body += "- Unit: " + encode(unit) + "%0D%0A";
  body += "- Comments: " + encode(comments) + "%0D%0A%0A";
  body += "Thanks,%0D%0A" + encode(name);

  let mailto =
    "mailto:logan@the-cherrys.com" +
    "?subject=" +
    encode(subject) +
    "&body=" +
    body;

  // Opens user's email app.
  window.location.href = mailto;
});
