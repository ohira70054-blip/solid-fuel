
function checkPassword() {
    const field = document.getElementById('pass-field');
    if (field.value === "sanixskg393290") {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        document.body.classList.remove('is-locked');
        loadCSV();
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}
async function loadCSV() {
    try {
        const res = await fetch('data.csv');
        if (!res.ok) return;
        const text = await res.text();
        const rows = text.split('\n').filter(r => r.trim() !== '');
        let html = '<table><thead><tr>';
        rows[0].split(',').forEach(h => { html += '<th>' + h + '</th>'; });
        html += '</tr></thead><tbody>';
        for (let i = 1; i < rows.length; i++) {
            html += '<tr>';
            rows[i].split(',').forEach(c => { html += '<td>' + c + '</td>'; });
            html += '</tr>';
        }
        html += '</tbody></table>';
        document.getElementById('csv-table').innerHTML = html;
    } catch (e) { console.error(e); }
}
document.getElementById('pass-field').addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPassword(); });
window.onload = () => { document.getElementById('pass-field').value = ""; };
