
function checkPassword() {
    const field = document.getElementById('pass-field');
    if (field.value === "sanixskg393290") {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        document.body.classList.remove('is-locked');
        window.scrollTo(0, 0);
        loadCSV();
    } else {
        document.getElementById('error-msg').style.display = 'block';
        field.value = "";
        field.focus();
    }
}
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}
async function loadCSV() {
    try {
        const response = await fetch('data.csv');
        if (!response.ok) return;
        const data = await response.text();
        const rows = data.split('\n').filter(row => row.trim() !== '');
        let html = '<table><thead><tr>';
        const headers = rows[0].split(',');
        headers.forEach(h => html += `<th>${h}</th>`);
        html += '</tr></thead><tbody>';
        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i].split(',');
            html += '<tr>';
            cols.forEach(c => html += `<td>${c}</td>`);
            html += '</tr>';
        }
        html += '</tbody></table>';
        document.getElementById('csv-table').innerHTML = html;
    } catch (e) { console.error(e); }
}
document.getElementById('pass-field').addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPassword(); });
window.onload = () => { document.getElementById('pass-field').value = ""; };
