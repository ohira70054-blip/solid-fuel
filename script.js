
function checkPassword() {
    const input = document.getElementById('pass-input').value;
    if (input === "sanixskg393290") {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        window.scrollTo(0, 0);
    } else {
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('pass-input').value = "";
    }
}
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        const offset = 20;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}
document.getElementById('pass-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPassword(); });
