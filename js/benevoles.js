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
      role: 'Programmation artistique et organisation',
      photo: 'images/myriam.jpg',
      description: `<p>15 idées à la minute !!</p>
                        <p>Meneuse de troupe avec l’énergie des prémices du printemps, elle sème des cailloux comme le
                        petit Poucet.</p>`,
    },
    {
      id: 2,
      nom: 'Patrick',
      role: 'Organisation',
      photo: 'images/patrick.jpg',
      description: `<p>"Le président"</p>
                        <p>Véritable couteau suisse, il chausse ses bottes de sept lieux pour parcourir toutes les tâches des
                        plus petites aux plus grandes.. Il sait tout faire et même plus encore.</p>`,
    
    },
    {
      id: 3,
      nom: 'Brigitte',
      role: 'Organisation',
      photo: 'images/brigitte.jpg',
      description: `<p>"La Voix"</p>
                        <p>Elle passe avec talent des mots écrits aux mots brodés. Ses conseils avisés sauront vous conseiller
      à la librairie. Une voix reconnaissable entre toutes..</p>`,
    },
    {
      id: 4,
      nom: 'Carole',
      role: 'Cuisine',
      photo: 'images/carole.jpg',
      description: `<p>Elle a le bleu des gens heureux, enthousiaste et enjouée. Une demande particulière en cuisine,
      c’est à elle qu’il faut vous ’adresser !</p>`,
    },
    {
      id: 5,
      nom: 'Anny',
      role: 'Cuisine',
      photo: 'images/annie.jpg',
      description: `<p>Solide comme un chêne et souple comme le roseau. Elle sait faire le grand écart entre la création
      d’univers plastiques et les bons petits plats. Sa délicatesse ferait pâlir la princesse au petit pois !</p>`,
    },
    {
      id: 6,
      nom: 'Denyse',
      role: 'Réflexions',
      photo: 'images/denyse.jpg',
      description: `<p>Elle pourrait être un conte en hiver, bien installée devant la cheminée. Œil avisé et critiques
      aiguisées, c’est la maitresse des questions essentielles.</p>`,
    },
    {
      id: 7,
      nom: 'Didier',
      role: 'Organisation et cuisine',
      photo: 'images/didier.jpg',
      description: `<p>Dans ses yeux, le bleu d’un ciel de printemps, sûrement ceux du Petit prince. Il glisse avec habileté
      de l’organisation du festival à la cuisine, et nos papilles le remercient.</p>`,
    },
    {
      id: 8,
      nom: 'Hélène',
      role: 'Cuisine',
      photo: 'images/helene.jpg',
      description: `<p>Elle est rouge passion et intendante aux menus plaisirs. Cheffe des courses et de la cuisine avec
      brio. Indispensable Hélène !</p>`,
    },
    {
      id: 9,
      nom: 'Mauricette',
      role: 'Organisation de la buvette',
      photo: 'images/mauricette.jpg',
      description: `<p>Vive comme une fleur de prairie, elle s’aventure à la buvette comme dans excel , conjugue
      vaisselle et expertises scientifiques.</p>`,
    },
    {
      id: 10,
      nom: 'Bettina',
      role: 'Organisation',
      photo: 'images/x.jpg',
      description: `<p>Brodeuse et tricoteuse. Reine du chapeau dont nous sommes coiffés. Elle tire le fil des contes,
      trace lignes et chemins sur lesquels elle a bien dû croiser le petit chaperon rouge.</p>`,
    },
    {
      id: 11,
      nom: 'Marie',
      role: 'Organisation',
      photo: 'images/Marie.jpg',
      description: `<p>Maîtresse de cérémonie pour cette 3éme édition.</p> 
                      <p>Elle présente avec brio artistes et spectacles. Son sourire vous ravira à la billetterie.</p>`,
      
    },
    {
      id: 12,
      nom: 'Bénédicte',
      role: 'Organisation',
      photo: 'images/Bénédicte.jpg',
      description: `<p>Accompagnatrice des bonnes idées, elle harmonise avec talent le service ou la vaisselle.
      Cendrillon des temps modernes !</p>`,
      
    },

    {
      id: 13,
      nom: 'Béatrice',
      role: 'Intelligence collective "Canal historique"',
      photo: 'images/.jpg',
      description: `<p>Réflexions et actions se conjuguent pour animer les débats. Vous pourrez la trouver sur le stand
      librairie..</p>`,
      
    },

    {
      id: 14,
      nom: 'Sophie',
      role: 'Communication',
      photo: 'images/Sophie.png',
      description: `<p>Le pouls du festival et des doigts de fée sur le clavier pour créer affiche et brochure, site et bande
      annonce. Reine des pixels et des octets.</p>`,
      
    },
  ];
}
