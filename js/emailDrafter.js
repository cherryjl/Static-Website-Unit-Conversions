let emailBtn = document.getElementById('emailBtn');
let form = document.querySelector('#formSuggestion form');

function encode(str) {
    try {
        return encodeURIComponent(str);
    } catch (e) {
        return '';
    }
}

if (emailBtn && form) {
    emailBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let nameEl = form.querySelector('#name');
        let categoryEl = form.querySelector('#category');
        let unitEl = form.querySelector('#unit');
        let commentsEl = form.querySelector('#comments');

        let name = nameEl.value.trim();
        let category = categoryEl.options[categoryEl.selectedIndex].text;
        let unit = unitEl.value.trim();
        let comments = commentsEl.value.trim();
        let subject = 'Conversion Suggestion from ' + name;
        let body = 'Hello,%0D%0A%0AI would like to suggest a conversion:%0D%0A%0A';
        body += '- Category: ' + encode(category) + '%0D%0A';
        body += '- Unit: ' + encode(unit) + '%0D%0A';
        body += '- Comments: ' + encode(comments) + '%0D%0A%0A';
        body += 'Thanks,%0D%0A' + encode(name);

        let mailto = 'mailto:logan@the-cherrys.com' + '?subject=' + encode(subject) + '&body=' + body;

        window.location.href = mailto;
    });
}