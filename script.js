
function checkPassword() {
    const input = document.getElementById('pass-input').value;
    if (input === "sanixskg393290") {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}
document.getElementById('pass-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPassword(); });
