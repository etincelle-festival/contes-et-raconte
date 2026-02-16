// menu.js
class MenuComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar">
        <div class="container">
          <div class="nav-brand">
            <h1>Contes & Raconte</h1>
            <span class="edition">3ème édition - 2026</span>
          </div>
          <button class="menu-toggle" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul class="nav-menu">
            <li><a href="index.html">Accueil</a></li>
            <li><a href="programme.html">Programme</a></li>
            <li><a href="artistes.html">Les Artistes</a></li>
            <li><a href="infos-pratiques.html">Infos Pratiques</a></li>
            <li><a href="benevoles.html">Bénévoles</a></li>
            <li><a href="partenaires.html">Partenaires</a></li>
          </ul>
        </div>
      </nav>
    `;

    // Now add event listeners AFTER the HTML is inserted
    this.initializeMenu();
  }

  initializeMenu() {
    const menuToggle = this.querySelector('.menu-toggle');
    const navMenu = this.querySelector('.nav-menu');
    const navLinks = this.querySelectorAll('.nav-menu a');

    // Set active link based on current page
    const currentPage =
      window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });

    // Toggle menu mobile
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active')
          ? 'hidden'
          : '';
      });

      // Fermer le menu lors du clic sur un lien
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });

      // Fermer le menu lors du clic en dehors
      document.addEventListener('click', (e) => {
        if (
          !e.target.closest('.navbar') &&
          navMenu.classList.contains('active')
        ) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }
}
customElements.define('menu-component', MenuComponent);
