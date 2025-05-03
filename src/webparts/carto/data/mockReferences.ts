import { Reference } from '../types';

const mockReferences: Reference[] = [
  {
    id: '1',
    titre: 'Restaurant Le Gourmet',
    image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descriptionCourte: 'Cuisine française raffinée au cœur de la ville',
    descriptionRich: `
      <h3>Le Gourmet</h3>
      <p>Un voyage culinaire à travers les saveurs de la France, préparé par notre chef étoilé Jean Dupont.</p>
      <p>Notre restaurant propose :</p>
      <ul>
        <li>Des ingrédients locaux et de saison</li>
        <li>Une carte des vins exceptionnelle</li>
        <li>Un cadre élégant et chaleureux</li>
      </ul>
      <p>Ouvert du mardi au samedi, de 19h à 23h. Réservation conseillée.</p>
    `,
    adresse: '15 rue de la Paix, 75002 Paris',
    region: 'Île-de-France',
    telephone: '+33 1 45 67 89 10',
    latitude: 48.8694,
    longitude: 2.3321,
    autresDetails: {
      typeEtablissement: 'Restaurant',
      cuisine: 'Française',
      prixMoyen: '75€',
      notations: [
        { source: 'Michelin', note: '2 étoiles' },
        { source: 'TripAdvisor', note: '4.8/5' }
      ],
      services: ['Terrasse', 'Climatisation', 'Parking', 'Accessible PMR']
    }
  },
  {
    id: '2',
    titre: 'Boulangerie Maison Fournier',
    image: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descriptionCourte: 'Artisan boulanger depuis 1925, spécialités de viennoiseries',
    descriptionRich: `
      <h3>Maison Fournier</h3>
      <p>Fondée en 1925, notre boulangerie perpétue le savoir-faire artisanal français.</p>
      <p>Nos spécialités :</p>
      <ul>
        <li>Pain au levain naturel</li>
        <li>Croissants pur beurre</li>
        <li>Pains spéciaux aux céréales anciennes</li>
      </ul>
      <p>Ouvert tous les jours sauf le lundi, de 7h à 20h.</p>
    `,
    adresse: '42 avenue des Ternes, 75017 Paris',
    region: 'Île-de-France',
    telephone: '+33 1 44 09 85 22',
    latitude: 48.8787,
    longitude: 2.2950,
    autresDetails: {
      typeEtablissement: 'Boulangerie',
      specialites: ['Pain de tradition', 'Viennoiseries', 'Pâtisseries'],
      recompenses: ['Meilleure baguette de Paris 2020'],
      services: ['Sur place', 'À emporter']
    }
  },
  {
    id: '3',
    titre: 'Salon de Coiffure Élégance',
    image: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descriptionCourte: 'Salon de coiffure haut de gamme pour hommes et femmes',
    descriptionRich: `
      <h3>Salon Élégance</h3>
      <p>Notre équipe de stylistes expérimentés vous propose des prestations personnalisées.</p>
      <p>Nos services :</p>
      <ul>
        <li>Coupes tendance</li>
        <li>Coloration végétale</li>
        <li>Soins du cuir chevelu</li>
        <li>Coiffures de mariage</li>
      </ul>
      <p>Ouvert du mardi au samedi, de 10h à 19h. Sur rendez-vous.</p>
    `,
    adresse: '8 boulevard Saint-Germain, 75006 Paris',
    region: 'Île-de-France',
    telephone: '+33 1 43 26 77 88',
    latitude: 48.8534,
    longitude: 2.3388,
    autresDetails: {
      typeEtablissement: 'Salon de coiffure',
      clientele: 'Mixte',
      gamme: 'Haut de gamme',
      marques: ['L\'Oréal Professionnel', 'Kérastase', 'Shu Uemura'],
      services: ['Café offert', 'WiFi gratuit']
    }
  },
  {
    id: '4',
    titre: 'Entreprise Tech Innovate',
    image: 'https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descriptionCourte: 'Start-up spécialisée en intelligence artificielle et Big Data',
    descriptionRich: `
      <h3>Tech Innovate</h3>
      <p>Fondée en 2015, notre entreprise développe des solutions d'IA pour les secteurs de la santé et de la finance.</p>
      <p>Nos domaines d'expertise :</p>
      <ul>
        <li>Analyse prédictive</li>
        <li>Traitement du langage naturel</li>
        <li>Systèmes de recommandation</li>
        <li>Vision par ordinateur</li>
      </ul>
      <p>Pour toute demande de partenariat ou recrutement, contactez-nous.</p>
    `,
    adresse: '22 rue de la Victoire, 75009 Paris',
    region: 'Île-de-France',
    telephone: '+33 1 88 00 75 60',
    latitude: 48.8738,
    longitude: 2.3417,
    autresDetails: {
      typeEtablissement: 'Entreprise',
      secteur: 'Technologie',
      taille: '50-100 employés',
      fondation: 2015,
      investisseurs: ['VC Tech Fund', 'Innovation Capital'],
      recrutement: true
    }
  },
  {
    id: '5',
    titre: 'Musée d\'Art Contemporain',
    image: 'https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descriptionCourte: 'Collections permanentes et expositions temporaires d\'art moderne',
    descriptionRich: `
      <h3>Musée d'Art Contemporain</h3>
      <p>Situé dans un bâtiment historique rénové, notre musée présente des œuvres d'artistes français et internationaux de 1960 à nos jours.</p>
      <p>À découvrir :</p>
      <ul>
        <li>3000m² d'espaces d'exposition</li>
        <li>Plus de 500 œuvres en collection permanente</li>
        <li>Expositions temporaires renouvelées tous les 3 mois</li>
        <li>Ateliers pédagogiques pour enfants et adultes</li>
      </ul>
      <p>Ouvert du mercredi au dimanche, de 11h à 19h. Nocturne le vendredi jusqu'à 22h.</p>
    `,
    adresse: '13 avenue du Président Wilson, 75116 Paris',
    region: 'Île-de-France',
    telephone: '+33 1 53 67 40 00',
    latitude: 48.8652,
    longitude: 2.2965,
    autresDetails: {
      typeEtablissement: 'Musée',
      theme: 'Art contemporain',
      tarif: '12€ (plein) / 8€ (réduit) / Gratuit -26 ans',
      services: ['Audioguides', 'Librairie', 'Café', 'Vestiaire'],
      accessibilite: 'Totale PMR'
    }
  },
  {
    id: '6',
    titre: 'Hôtel Le Magnifique',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descriptionCourte: 'Hôtel 5 étoiles avec spa et restaurant gastronomique',
    descriptionRich: `
      <h3>Hôtel Le Magnifique</h3>
      <p>Un établissement d'exception offrant un service personnalisé dans un cadre luxueux.</p>
      <p>Nos installations :</p>
      <ul>
        <li>150 chambres et suites de 30 à 200m²</li>
        <li>Spa de 800m² avec piscine intérieure</li>
        <li>Restaurant gastronomique "L'Étoile"</li>
        <li>Bar panoramique au 8ème étage</li>
        <li>Salle de fitness 24/7</li>
      </ul>
      <p>Réservation en ligne ou par téléphone.</p>
    `,
    adresse: '1 place de la Concorde, 75008 Paris',
    region: 'Île-de-France',
    telephone: '+33 1 47 42 90 00',
    latitude: 48.8656,
    longitude: 2.3212,
    autresDetails: {
      typeEtablissement: 'Hôtel',
      classement: '5 étoiles',
      chambres: 150,
      services: ['Room service 24/7', 'Conciergerie', 'Voiturier', 'WiFi gratuit'],
      equipements: ['Climatisation', 'Coffre-fort', 'Minibar'],
      langues: ['Français', 'Anglais', 'Espagnol', 'Japonais', 'Arabe']
    }
  },
  {
    id: '7',
    titre: 'Librairie Culturelle',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descriptionCourte: 'Librairie indépendante spécialisée en littérature et sciences humaines',
    descriptionRich: `
      <h3>Librairie Culturelle</h3>
      <p>Depuis 30 ans, notre librairie indépendante propose une sélection exigeante en littérature française et étrangère, sciences humaines et beaux-arts.</p>
      <p>Nos espaces :</p>
      <ul>
        <li>200m² sur deux niveaux</li>
        <li>Plus de 20 000 références</li>
        <li>Espace jeunesse</li>
        <li>Salon de lecture avec café</li>
      </ul>
      <p>Rencontres avec des auteurs chaque semaine. Programme disponible sur notre site.</p>
    `,
    adresse: '30 rue Saint-André des Arts, 75006 Paris',
    region: 'Île-de-France',
    telephone: '+33 1 43 25 50 10',
    latitude: 48.8533,
    longitude: 2.3429,
    autresDetails: {
      typeEtablissement: 'Librairie',
      specialites: ['Littérature', 'Sciences humaines', 'Beaux-arts', 'Jeunesse'],
      services: ['Commande de livres', 'Carte de fidélité', 'Événements culturels'],
      fondation: 1992,
      equipe: '5 libraires'
    }
  },
  {
    id: '8',
    titre: 'Yoga Studio Zen',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descriptionCourte: 'Centre de yoga proposant différentes pratiques et méditation',
    descriptionRich: `
      <h3>Yoga Studio Zen</h3>
      <p>Notre studio lumineux vous accueille pour des cours de yoga adaptés à tous les niveaux, du débutant à l'avancé.</p>
      <p>Nos cours :</p>
      <ul>
        <li>Hatha Yoga</li>
        <li>Vinyasa Flow</li>
        <li>Yin Yoga</li>
        <li>Méditation guidée</li>
        <li>Yoga prénatal</li>
      </ul>
      <p>Cours collectifs et particuliers. Abonnements mensuels ou cartes de 10 séances disponibles.</p>
    `,
    adresse: '5 rue de Charonne, 75011 Paris',
    region: 'Île-de-France',
    telephone: '+33 1 48 05 32 80',
    latitude: 48.8536,
    longitude: 2.3723,
    autresDetails: {
      typeEtablissement: 'Centre de yoga',
      surface: '120m²',
      capacite: '20 personnes par cours',
      professeurs: 5,
      equipement: 'Tapis et accessoires fournis',
      tarifs: {
        coursUnitaire: '20€',
        carte10Cours: '180€',
        abonnementMensuel: '120€'
      }
    }
  },
  {
    id: '9',
    titre: 'Galerie d\'Art Moderne',
    image: 'https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descriptionCourte: 'Galerie présentant des artistes contemporains émergents',
    descriptionRich: `
      <h3>Galerie d'Art Moderne</h3>
      <p>Notre galerie promeut les artistes contemporains émergents de la scène française et internationale.</p>
      <p>Notre programmation :</p>
      <ul>
        <li>6-8 expositions par an</li>
        <li>Focus sur la peinture et la photographie contemporaines</li>
        <li>Vernissages ouverts au public</li>
        <li>Rencontres avec les artistes</li>
      </ul>
      <p>Entrée libre du mardi au samedi, de 14h à 19h ou sur rendez-vous.</p>
    `,
    adresse: '16 rue Bonaparte, 75006 Paris',
    region: 'Île-de-France',
    telephone: '+33 1 43 54 71 95',
    latitude: 48.8566,
    longitude: 2.3340,
    autresDetails: {
      typeEtablissement: 'Galerie d\'art',
      creation: 2010,
      directeur: 'Marie Dumont',
      artistes: ['Philippe Cazal', 'Sophie Ristelhueber', 'Valérie Belin'],
      publications: true
    }
  },
  {
    id: '10',
    titre: 'Cabinet Médical Santé Plus',
    image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descriptionCourte: 'Centre médical pluridisciplinaire avec médecins généralistes et spécialistes',
    descriptionRich: `
      <h3>Cabinet Médical Santé Plus</h3>
      <p>Notre centre médical regroupe des professionnels de santé dans différentes spécialités pour une prise en charge globale.</p>
      <p>Nos praticiens :</p>
      <ul>
        <li>3 médecins généralistes</li>
        <li>1 pédiatre</li>
        <li>1 dermatologue</li>
        <li>2 kinésithérapeutes</li>
        <li>1 ostéopathe</li>
        <li>1 psychologue</li>
      </ul>
      <p>Prise de rendez-vous en ligne ou par téléphone. Tiers payant pratiqué.</p>
    `,
    adresse: '28 rue du Faubourg Saint-Antoine, 75012 Paris',
    region: 'Île-de-France',
    telephone: '+33 1 43 45 60 20',
    latitude: 48.8514,
    longitude: 2.3693,
    autresDetails: {
      typeEtablissement: 'Cabinet médical',
      horaires: 'Lundi au vendredi, 8h-20h / Samedi 9h-12h',
      urgences: false,
      accessibilite: 'PMR',
      conventionnement: 'Secteur 1 et 2',
      langues: ['Français', 'Anglais', 'Arabe']
    }
  }
];

export default mockReferences;