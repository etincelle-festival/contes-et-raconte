// =============================================
// Gestion de la page Bénévoles
// =============================================

document.addEventListener('DOMContentLoaded', function () {
  // Initialisation
  initBenevoles();
  initNavigation();
});

// Chargement des bénévoles
function initBenevoles() {
  const benevoles = getBenevoles();
  const grid = document.getElementById('benevolesGrid');
  if (!grid) return;

  grid.innerHTML = '';

  benevoles.forEach((benevole) => {
    const card = createBenevoleCard(benevole);
    grid.appendChild(card);
  });
}

// Création d'une carte bénévole
function createBenevoleCard(benevole) {
  const card = document.createElement('div');
  card.className = 'benevole-card';
  card.setAttribute('data-benevole-id', benevole.id);

  card.innerHTML = `
        <div class="benevole-photo">
            <img src="${benevole.photo}" 
                 alt="Photo de ${benevole.nom}" 
                 loading="lazy">
        </div>
        <div class="benevole-content">
            <h3 class="benevole-name">${benevole.nom}</h3>
            <p class="benevole-role">${benevole.role}</p>
            <div class="benevole-description">
                ${benevole.description}
            </div>
        </div>
    `;

  return card;
}

// Navigation mobile
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Fermer le menu au clic sur un lien
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
}

// Données des bénévoles
function getBenevoles() {
  return [
    {
      id: 1,
      nom: 'Myriam',
      role: 'Coordinateur/trice',
      photo: 'images/myriam.jpg',
      description: `<p>Votre texte de présentation pour le premier bénévole. Vous pouvez écrire plusieurs paragraphes pour décrire son parcours, sa motivation, son rôle dans le festival.</p>
                        <p>Deuxième paragraphe si nécessaire pour donner plus de détails sur son engagement et ses actions.</p>`,
    },
    {
      id: 2,
      nom: 'Patrick',
      role: 'Responsable Décoration',
      photo: 'images/patrick.jpg',
      description: `<p>Texte de présentation pour le deuxième bénévole...</p>`,
    },
    {
      id: 3,
      nom: 'Brigitte',
      role: 'Voix',
      photo: 'images/brigitte.jpg',
      description: `<p>Texte de présentation pour le troisième bénévole...</p>`,
    },
    {
      id: 4,
      nom: 'Carole',
      role: 'Cuisinière émerite',
      photo: 'images/carole.jpg',
      description: `<p>Texte de présentation pour le quatrième bénévole...</p>`,
    },
    {
      id: 5,
      nom: 'Annie',
      role: 'Communication',
      photo: 'images/annie.jpg',
      description: `<p>Texte de présentation pour le cinquième bénévole...</p>`,
    },
    {
      id: 6,
      nom: 'Denyse',
      role: 'Technique',
      photo: 'images/denyse.jpg',
      description: `<p>Texte de présentation pour le sixième bénévole...</p>`,
    },
    {
      id: 7,
      nom: 'Didier',
      role: 'Accueil',
      photo: 'images/didier.jpg',
      description: `<p>Texte de présentation pour le septième bénévole...</p>`,
    },
    {
      id: 8,
      nom: 'Hélène',
      role: 'Coordination Artistique',
      photo: 'images/helene.jpg',
      description: `<p>Texte de présentation pour le huitième bénévole...</p>`,
    },
    {
      id: 9,
      nom: 'Mauricette',
      role: 'Coordination Artistique',
      photo: 'images/mauricette.jpg',
      description: `<p>Texte de présentation pour le huitième bénévole...</p>`,
    },
    {
      id: 10,
      nom: 'X',
      role: 'Coordination Artistique',
      photo: 'images/x.jpg',
      description: `<p>Texte de présentation pour le huitième bénévole...</p>`,
    },
  ];
}
