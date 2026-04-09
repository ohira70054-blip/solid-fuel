
function checkPassword() {
    const input = document.getElementById('pass-input').value;
    if (input === "sanixskg393290") {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}
document.getElementById('pass-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPassword(); });

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.manual-section');
    const navLinks = document.querySelectorAll('.toc-link');
    const progressBar = document.getElementById('progress-bar');
    let scrollPos = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar) progressBar.style.width = (scrollPos / height) * 100 + "%";
    let current = "";
    sections.forEach(section => { if (pageYOffset >= section.offsetTop - 150) current = section.getAttribute('id'); });
    navLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href').includes(current)) link.classList.add('active'); });
});
