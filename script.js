
function checkPassword() {
    const field = document.getElementById('pass-field');
    if (field.value === "sanixskg393290") {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        document.body.classList.remove('is-locked');
        window.scrollTo(0, 0);
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
document.getElementById('pass-field').addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPassword(); });
window.onload = () => { document.getElementById('pass-field').value = ""; };
