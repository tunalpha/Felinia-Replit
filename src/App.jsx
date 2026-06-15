import React, { useMemo, useState } from "react";

/**
 * Félinia – Landing page multilingue IT/FR/EN
 * Include sezione "Chi siamo / À propos / About" con descrizione emozionante
 * PayPal integrato via PAYPAL_URL (sostituire l'ID reale)
 */

// Palette brand e PayPal
// Verde petrolio: #0C7463  | Oro tenue: #D6B36A  | Sabbia: #F5EFE7  | Nero soft: #1E1E1E
const WHATSAPP_LINK = "https://wa.me/393488450532?text=Ciao%20F%C3%A9linia!%20Scrivo%20per%20Enrico."; // bottone contatto fondatore

// Componente PayPal Dinamico
function PayPalDonateButton({ className = "" }) {
  const getPayPalConfig = () => {
    const userLang = navigator.language || navigator.userLanguage;
    
    if (userLang.startsWith("it")) {
      return {
        locale: "it_IT",
        img: "https://www.paypalobjects.com/it_IT/IT/i/btn/btn_donateCC_LG.gif",
        itemName: "Donazione"
      };
    } else if (userLang.startsWith("fr")) {
      return {
        locale: "fr_FR",
        img: "https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donateCC_LG.gif",
        itemName: "Don"
      };
    } else {
      return {
        locale: "en_US",
        img: "https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif",
        itemName: "Donation"
      };
    }
  };

  const config = getPayPalConfig();

  return (
    <form action="https://www.paypal.com/donate" method="post" target="_blank" className={className}>
      <input type="hidden" name="business" value="feliniasite@gmail.com" />
      <input type="hidden" name="currency_code" value="EUR" />
      <input type="hidden" name="item_name" value={config.itemName} />
      <input type="hidden" name="locale.x" value={config.locale} />
      <input 
        type="image" 
        src={config.img} 
        name="submit" 
        alt="Donate with PayPal"
        className="hover:opacity-80 transition-opacity duration-300"
      />
    </form>
  );
}

const translations = {
  it: {
    langName: "Italiano",
    nav: { home: "Home", mission: "Missione", about: "Chi siamo", adopt: "Adotta", help: "Sostieni", contact: "Contatti" },
    hero: {
      kicker: "Adozioni internazionali di gatti",
      title: "Félinia",
      subtitle:
        "Un ponte tra Tunisia e Europa per proteggere, curare e trovare casa ai gatti più fragili.",
      ctaPrimary: "Adotta o affida",
      ctaSecondary: "Dona ora",
    },
    mission: {
      title: "La nostra missione",
      p1:
        "Félinia è un'organizzazione per adozioni internazionali di gatti con base in Tunisia e associazione in Italia.<br/><br/>Ci occupiamo di salvataggio, cure veterinarie, riabilitazione comportamentale e adozioni responsabili verso l'Europa.",
      p2:
        "Crediamo in benessere, trasparenza e sostenibilità: spazi biofilici, tracciabilità digitale dei casi, e percorsi educativi per creare convivenze felici e durature. 💚",
      stats: { saved: "Gatti salvati", adopted: "Adozioni riuscite", volunteers: "Volontari attivi" },
      esgTitle: "ESG & Innovazione",
      esgItems: [
        "Spazi biofilici e arricchimento ambientale",
        "Energia da fonti rinnovabili e gestione sostenibile",
        "Tracciabilità digitale pre/post affido",
        "Formazione per famiglie e scuole"
      ],
      careTitle: "Félinia Care",
      careText: "Tracciamo ogni salvataggio con schede cliniche digitali e follow‑up. Benessere prima di tutto.",
    },
    about: {
      title: "Chi siamo",
      p1: "Siamo persone unite da una missione semplice e profonda: salvare i gatti dalla strada e donare loro ciò che ogni creatura merita — una casa, un abbraccio e un futuro. ❤️",
      p2: "Ogni giorno percorriamo le vie della Tunisia per dare speranza a chi non ha voce.<br/><br/>Ogni sguardo impaurito che si trasforma in fiducia, ogni fusa nata dal silenzio del dolore, ci ricorda perché lo facciamo: perché l’amore salva davvero. 💕",
      p3: "Félinia è più di un'organizzazione: è un ponte di compassione tra popoli, lingue e cuori.<br/><br/>Quando l’empatia incontra l’azione, anche la vita più fragile può rifiorire. 🌸",
      cards: [
        { kicker: "Salvataggio", title: "Dalla strada alla sicurezza", desc: "Interventi sul territorio, cure e riabilitazione comportamentale." },
        { kicker: "Famiglia", title: "Da randagio a casa", desc: "Adozioni responsabili e accompagnamento post‑affido." },
        { kicker: "Trasparenza", title: "Fiducia costruita insieme", desc: "Tracciabilità casi, report donazioni, impatto condiviso." },
        { kicker: "Comunità", title: "Insieme per i gatti", desc: "Volontariato, famiglie foster e scuole in rete." },
      ],
    },
    adopt: {
      title: "Percorso di adozione",
      steps: [
        { t: "Candidatura", d: "Compila il questionario pre-affido per conoscerci meglio." },
        { t: "Colloquio", d: "Video‑call con il nostro team per valutare bisogni e compatibilità." },
        { t: "Match & Preparazione", d: "Scegliamo insieme il micio giusto e ti supportiamo con il kit di benvenuto." },
        { t: "Trasferimento", d: "Gestiamo logistica e documenti per un arrivo sereno e sicuro." },
        { t: "Post‑affido", d: "Follow‑up e consulenza gratuita di comportamento felino." },
      ],
      cta: "Scopri i gatti adottabili",
    },
    help: {
      title: "Come puoi aiutarci",
      cards: [
        { t: "Donazioni", d: "Sostieni cure veterinarie, cibo e trasporti.", btn: "Dona ora" },
        { t: "Volontariato", d: "In Tunisia o da remoto per adozioni e comunicazione.", btn: "Diventa volontario/a" },
        { t: "Stallo / Foster", d: "Accogli temporaneamente un gatto in attesa di adozione.", btn: "Offri uno stallo" },
      ],
    },
    contact: {
      title: "Contattaci",
      subtitle: "Parliamone – rispondiamo in IT/FR/EN.",
      phones: [
        { label: "Tunisia", display: "+216 56059142", href: "+21656059142" },
        { label: "Italia", display: "+39 348 8450532", href: "+393488450532" },
      ],
      form: { name: "Nome", email: "Email", message: "Messaggio", send: "Invia" },
      legal: "Iscrizione associazione in Italia · Centro operativo in Tunisia",
    },
    founder: {
      role: "Fondatore",
      quote: "L'amore non si compra, si salva — e ogni vita salvata rende il mondo un po' più gentile.",
      bio: "Fondatore di Félinia, coordina le adozioni internazionali e i progetti di sensibilizzazione tra Italia e Tunisia.",
      whatsappBtn: "Scrivi su WhatsApp",
    },
    footer: {
      legal: "© " + new Date().getFullYear() + " Félinia. Tutti i diritti riservati.",
      description: "Adozioni internazionali di gatti tra Tunisia e Europa, con responsabilità, benessere e trasparenza.",
      policy: "Privacy",
      cookies: "Cookie",
      imprint: "Note legali",
    },
    badge: "Multilingue IT/FR/EN",
    location: "Tunisia · Italia · Europa",
    paypalCta: "Dona ora",
    paypalNote: "Pagamento sicuro con PayPal. A breve: trasparenza spese e progetti.",
    supportBtn: "Sostienici",
    supportSubtitle: "Aiuta i gatti di Félinia",
    caffe: {
      title: "Offri solo 1 caffè?",
      subtitle: "Con solo 1€ al mese puoi fare la differenza",
      body: "Unisciti al nostro Teaming e aiutaci con una micro-donazione mensile.",
      together: "Insieme possiamo salvare più vite! ☕ ❤️",
      btn: "☕ Unisciti a Teaming →",
      caption: "1€ al mese · 1€ par mois · €1 per month",
    },
  },
  fr: {
    langName: "Français",
    nav: { home: "Accueil", mission: "Mission", about: "À propos", adopt: "Adopter", help: "Soutenir", contact: "Contacts" },
    hero: {
      kicker: "Adoptions internationales de chats",
      title: "Félinia",
      subtitle:
        "Un pont entre la Tunisie et l'Europe pour protéger, soigner et trouver un foyer aux chats vulnérables.",
      ctaPrimary: "Adopter ou accueillir",
      ctaSecondary: "Donner maintenant",
    },
    mission: {
      title: "Notre mission",
      p1:
        "Félinia est une organisation d'adoptions internationales de chats basée en Tunisie avec une association en Italie.<br/><br/>Nous assurons sauvetage, soins vétérinaires, réhabilitation comportementale et adoptions responsables vers l'Europe.",
      p2:
        "Nous croyons au bien‑être, à la transparence et à la durabilité : espaces biophiliques, traçabilité numérique des dossiers, et parcours éducatifs pour des cohabitations heureuses et durables. 💚",
      stats: { saved: "Chats sauvés", adopted: "Adoptions réussies", volunteers: "Bénévoles actifs" },
      esgTitle: "ESG & Innovation",
      esgItems: [
        "Espaces biophiliques et enrichissement environnemental",
        "Énergie renouvelable et gestion durable",
        "Traçabilité numérique pré/post adoption",
        "Formation pour familles et écoles"
      ],
      careTitle: "Félinia Care",
      careText: "Chaque sauvetage est tracé avec dossiers cliniques numériques et suivi. Le bien‑être avant tout.",
    },
    about: {
      title: "À propos",
      p1: "Nous sommes des personnes réunies par une mission simple et profonde : sauver les chats de la rue et leur offrir ce que toute créature mérite — une maison, une étreinte et un avenir. ❤️",
      p2: "Chaque jour, nous sillonnons les rues de Tunisie pour redonner espoir à celles et ceux qui n'ont pas de voix.<br/><br/>Chaque regard apeuré qui devient confiance, chaque ronron né du silence de la douleur, nous rappelle pourquoi nous agissons : parce que l'amour sauve vraiment. 💕",
      p3: "Félinia est plus qu'une organisation : c'est un pont de compassion entre peuples, langues et cœurs.<br/><br/>Quand l'empathie rencontre l'action, la vie la plus fragile refleurit. 🌸",
      cards: [
        { kicker: "Sauvetage", title: "De la rue à la sécurité", desc: "Interventions sur le terrain, soins et réhabilitation comportementale." },
        { kicker: "Famille", title: "De errant à chez-soi", desc: "Adoptions responsables et accompagnement post‑adoption." },
        { kicker: "Transparence", title: "Confiance construite ensemble", desc: "Traçabilité des cas, rapports de dons, impact partagé." },
        { kicker: "Communauté", title: "Ensemble pour les chats", desc: "Bénévolat, familles d'accueil et écoles en réseau." },
      ],
    },
    adopt: {
      title: "Parcours d'adoption",
      steps: [
        { t: "Candidature", d: "Remplissez le questionnaire pré‑accueil pour mieux vous connaître." },
        { t: "Entretien", d: "Visio avec notre équipe pour évaluer besoins et compatibilité." },
        { t: "Matching & Préparation", d: "Nous choisissons ensemble le bon chat et vous soutenons avec le kit d'accueil." },
        { t: "Transfert", d: "Nous gérons logistique et documents pour une arrivée sereine et sûre." },
        { t: "Suivi", d: "Post‑adoption avec conseils gratuits de comportement félin." },
      ],
      cta: "Découvrir les chats à adopter",
    },
    help: {
      title: "Comment nous aider",
      cards: [
        { t: "Dons", d: "Soutenez soins vétérinaires, nourriture et transports.", btn: "Faire un don" },
        { t: "Bénévolat", d: "En Tunisie ou à distance pour adoptions et communication.", btn: "Devenir bénévole" },
        { t: "Famille d'accueil", d: "Accueillez temporairement un chat en attente d'adoption.", btn: "Proposer un accueil" },
      ],
    },
    contact: {
      title: "Contactez‑nous",
      subtitle: "Échangeons – réponses en FR/IT/EN.",
      phones: [
        { label: "Tunisie", display: "+216 56059142", href: "+21656059142" },
        { label: "Italie", display: "+39 348 8450532", href: "+393488450532" },
      ],
      form: { name: "Nom", email: "Email", message: "Message", send: "Envoyer" },
      legal: "Association enregistrée en Italie · Centre opérant en Tunisie",
    },
    founder: {
      role: "Fondateur",
      quote: "L'amour ne s'achète pas, il se sauve — et chaque vie sauvée rend le monde un peu plus doux.",
      bio: "Fondateur de Félinia, il coordonne les adoptions internationales et les projets de sensibilisation entre l'Italie et la Tunisie.",
      whatsappBtn: "Écrire sur WhatsApp",
    },
    footer: {
      legal: "© " + new Date().getFullYear() + " Félinia. Tous droits réservés.",
      description: "Adoptions internationales de chats entre Tunisie et Europe, avec responsabilité, bien‑être et transparence.",
      policy: "Confidentialité",
      cookies: "Cookies",
      imprint: "Mentions légales",
    },
    badge: "Multilingue IT/FR/EN",
    location: "Tunisie · Italie · Europe",
    paypalCta: "Donner maintenant",
    paypalNote: "Paiement sécurisé avec PayPal. Bientôt : transparence des dépenses et projets.",
    supportBtn: "Nous soutenir",
    caffe: {
      title: "Offrir juste 1 café ?",
      subtitle: "Avec seulement 1€ par mois, vous faites la différence",
      body: "Rejoignez notre Teaming et aidez-nous avec un micro-don mensuel.",
      together: "Ensemble, nous pouvons sauver plus de vies ! ☕ ❤️",
      btn: "☕ Rejoindre Teaming →",
      caption: "1€ al mese · 1€ par mois · €1 per month",
    },
  },
  en: {
    langName: "English",
    nav: { home: "Home", mission: "Mission", about: "About", adopt: "Adopt", help: "Support", contact: "Contact" },
    hero: {
      kicker: "International cat adoptions",
      title: "Félinia",
      subtitle:
        "A bridge between Tunisia and Europe to protect, heal and rehome vulnerable cats.",
      ctaPrimary: "Adopt or foster",
      ctaSecondary: "Donate now",
    },
    mission: {
      title: "Our mission",
      p1:
        "Félinia is an international cat adoption organization operating in Tunisia with a registered association in Italy.<br/><br/>We handle rescue, veterinary care, behavioral rehab and responsible adoptions across Europe.",
      p2:
        "We believe in welfare, transparency and sustainability: biophilic spaces, digital case tracking, educational pathways for happy, lasting bonds. 💚",
      stats: { saved: "Cats rescued", adopted: "Successful adoptions", volunteers: "Active volunteers" },
      esgTitle: "ESG & Innovation",
      esgItems: [
        "Biophilic spaces and environmental enrichment",
        "Renewable energy and sustainable management",
        "Digital pre/post adoption tracking",
        "Education for families and schools"
      ],
      careTitle: "Félinia Care",
      careText: "We track every rescue with digital medical records and follow‑ups. Welfare first.",
    },
    about: {
      title: "About",
      p1: "We are people united by a simple, profound mission: to save street cats and give them what every creature deserves — a home, an embrace and a future. ❤️",
      p2: "Every day we walk the streets of Tunisia to bring hope to those without a voice.<br/><br/>Each frightened gaze turning into trust, every purr born from pain's silence, reminds us why we do this: because love truly saves. 💕",
      p3: "Félinia is more than an organization: it's a bridge of compassion across peoples, languages and hearts.<br/><br/>When empathy meets action, even the most fragile life can bloom again. 🌸",
      cards: [
        { kicker: "Rescue", title: "Street to Safe", desc: "Field interventions, care and behavioral rehabilitation." },
        { kicker: "Family", title: "From Stray to Stay", desc: "Responsible adoptions and post‑adoption support." },
        { kicker: "Transparency", title: "Trust by Design", desc: "Case tracking, donation reports, shared impact." },
        { kicker: "Community", title: "Together We Meow", desc: "Volunteers, foster families and schools networked." },
      ],
    },
    adopt: {
      title: "Adoption journey",
      steps: [
        { t: "Application", d: "Fill the pre‑adoption form so we can get to know you." },
        { t: "Interview", d: "Video call with our team to assess needs and compatibility." },
        { t: "Match & Preparation", d: "We choose the right cat together and provide a welcome kit." },
        { t: "Transfer", d: "We handle logistics and paperwork for a safe arrival." },
        { t: "Aftercare", d: "Post‑adoption follow‑up and free feline behavior advice." },
      ],
      cta: "See adoptable cats",
    },
    help: {
      title: "How you can help",
      cards: [
        { t: "Donations", d: "Support vet care, food and transport.", btn: "Donate now" },
        { t: "Volunteering", d: "In Tunisia or remotely for adoptions and comms.", btn: "Become a volunteer" },
        { t: "Foster care", d: "Host a cat temporarily while waiting for adoption.", btn: "Offer foster" },
      ],
    },
    contact: {
      title: "Get in touch",
      subtitle: "Let's talk – replies in EN/IT/FR.",
      phones: [
        { label: "Tunisia", display: "+216 56059142", href: "+21656059142" },
        { label: "Italy", display: "+39 348 8450532", href: "+393488450532" },
      ],
      form: { name: "Name", email: "Email", message: "Message", send: "Send" },
      legal: "Association registered in Italy · Center operating in Tunisia",
    },
    founder: {
      role: "Founder",
      quote: "Love can't be bought, it's saved — and every life saved makes the world a little kinder.",
      bio: "Founder of Félinia, he coordinates international adoptions and awareness projects between Italy and Tunisia.",
      whatsappBtn: "Message on WhatsApp",
    },
    footer: {
      legal: "© " + new Date().getFullYear() + " Félinia. All rights reserved.",
      description: "International cat adoptions between Tunisia and Europe, focused on responsibility, welfare and transparency.",
      policy: "Privacy",
      cookies: "Cookies",
      imprint: "Imprint",
    },
    badge: "Multilingual IT/FR/EN",
    location: "Tunisia · Italy · Europe",
    paypalCta: "Donate now",
    paypalNote: "Secure payment with PayPal. Coming soon: expense transparency and projects.",
    supportBtn: "Support us",
    caffe: {
      title: "Offer just 1 coffee?",
      subtitle: "With just €1 a month you can make a difference",
      body: "Join our Teaming and support us with a monthly micro-donation.",
      together: "Together we can save more lives! ☕ ❤️",
      btn: "☕ Join Teaming →",
      caption: "1€ al mese · 1€ par mois · €1 per month",
    },
  },
  
  // DEUTSCH (DE)
  de: {
    langName: "Deutsch",
    nav: { home: "Start", mission: "Mission", about: "Über uns", adopt: "Adoption", help: "Helfen", contact: "Kontakt" },
    hero: {
      kicker: "Internationale Katzenadoptionen",
      title: "Félinia",
      subtitle:
        "Eine Brücke zwischen Tunesien und Europa, um die verletzlichsten Katzen zu schützen, zu pflegen und ihnen ein Zuhause zu geben.",
      ctaPrimary: "Adoptieren oder pflegen",
      ctaSecondary: "Jetzt spenden",
    },
    mission: {
      title: "Unsere Mission",
      p1:
        "Félinia ist eine Organisation für internationale Katzenadoptionen mit Sitz in Tunesien und einem eingetragenen Verein in Italien.<br/><br/>Wir kümmern uns um Rettung, tierärztliche Versorgung, Verhaltensrehabilitation und verantwortungsvolle Adoptionen in ganz Europa.",
      p2:
        "Wir glauben an Wohlergehen, Transparenz und Nachhaltigkeit: biophile Räume, digitale Fallverfolgung und Bildungswege für glückliche, dauerhafte Bindungen. 💚",
      stats: { saved: "Gerettete Katzen", adopted: "Erfolgreiche Adoptionen", volunteers: "Aktive Freiwillige" },
      esgTitle: "ESG & Innovation",
      esgItems: [
        "Biophile Räume und Umweltbereicherung",
        "Erneuerbare Energie und nachhaltiges Management",
        "Digitale Vor-/Nachverfolgung der Adoption",
        "Bildung für Familien und Schulen"
      ],
      careTitle: "Félinia Care",
      careText: "Wir verfolgen jede Rettung mit digitalen Krankenakten und Follow-ups. Wohlergehen zuerst.",
    },
    about: {
      title: "Über uns",
      p1: "Wir sind Menschen, die durch eine einfache und tiefe Mission vereint sind: Straßenkatzen zu retten und ihnen zu geben, was jedes Lebewesen verdient — ein Zuhause, eine Umarmung und eine Zukunft. ❤️",
      p2: "Jeden Tag gehen wir durch die Straßen Tunesiens, um denen Hoffnung zu geben, die keine Stimme haben.<br/><br/>Jeder ängstliche Blick, der sich in Vertrauen verwandelt, jedes Schnurren, das aus der Stille des Schmerzes geboren wird, erinnert uns daran, warum wir dies tun: weil Liebe wirklich rettet. 💕",
      p3: "Félinia ist mehr als eine Organisation: Es ist eine Brücke des Mitgefühls zwischen Völkern, Sprachen und Herzen.<br/><br/>Wenn Empathie auf Handeln trifft, kann selbst das zerbrechlichste Leben wieder erblühen. 🌸",
      cards: [
        { kicker: "Rettung", title: "Von der Straße zur Sicherheit", desc: "Feldeinsätze, Pflege und Verhaltensrehabilitation." },
        { kicker: "Familie", title: "Vom Streuner zum Zuhause", desc: "Verantwortungsvolle Adoptionen und Nachbetreuung." },
        { kicker: "Transparenz", title: "Vertrauen durch Design", desc: "Fallverfolgung, Spendenberichte, gemeinsame Wirkung." },
        { kicker: "Gemeinschaft", title: "Zusammen für Katzen", desc: "Freiwillige, Pflegefamilien und Schulen vernetzt." },
      ],
    },
    adopt: {
      title: "Adoptionsprozess",
      steps: [
        { t: "Bewerbung", d: "Füllen Sie das Formular aus und lassen Sie uns wissen, was Sie suchen." },
        { t: "Gespräch", d: "Kurzes Gespräch, um uns besser kennenzulernen." },
        { t: "Match & Vorbereitung", d: "Wir helfen Ihnen, Ihre neue Katze auszuwählen und das Zuhause vorzubereiten." },
        { t: "Transfer", d: "Wir kümmern uns um Logistik und Papierkram für eine sichere Ankunft." },
        { t: "Nachsorge", d: "Nachsorge nach der Adoption und kostenlose Verhaltensberatung." },
      ],
      cta: "Adoptierbare Katzen ansehen",
    },
    help: {
      title: "Wie Sie helfen können",
      cards: [
        { t: "Spenden", d: "Unterstützen Sie Tierarztkosten, Futter und Transport.", btn: "Jetzt spenden" },
        { t: "Freiwilligenarbeit", d: "In Tunesien oder remote für Adoptionen und Kommunikation.", btn: "Freiwilliger werden" },
        { t: "Pflegestelle", d: "Nehmen Sie eine Katze vorübergehend auf, während sie auf Adoption wartet.", btn: "Pflegestelle anbieten" },
      ],
    },
    contact: {
      title: "Kontakt aufnehmen",
      subtitle: "Lassen Sie uns sprechen – Antworten auf DE/IT/FR/EN.",
      phones: [
        { label: "Tunesien", display: "+216 56059142", href: "+21656059142" },
        { label: "Italien", display: "+39 348 8450532", href: "+393488450532" },
      ],
      form: { name: "Name", email: "E-Mail", message: "Nachricht", send: "Senden" },
      legal: "Verein registriert in Italien · Zentrum in Tunesien",
    },
    founder: {
      role: "Gründer",
      quote: "Liebe kann man nicht kaufen, sie wird gerettet — und jedes gerettete Leben macht die Welt ein wenig freundlicher.",
      bio: "Gründer von Félinia, koordiniert internationale Adoptionen und Sensibilisierungsprojekte zwischen Italien und Tunesien.",
      whatsappBtn: "Auf WhatsApp schreiben",
    },
    footer: {
      legal: "© " + new Date().getFullYear() + " Félinia. Alle Rechte vorbehalten.",
      description: "Internationale Katzenadoptionen zwischen Tunesien und Europa, mit Fokus auf Verantwortung, Wohlergehen und Transparenz.",
      policy: "Datenschutz",
      cookies: "Cookies",
      imprint: "Impressum",
    },
    badge: "Mehrsprachig DE/IT/FR/EN/ES",
    location: "Tunesien · Italien · Europa",
    paypalCta: "Jetzt spenden",
    paypalNote: "Sichere Zahlung mit PayPal. Bald: Transparenz bei Ausgaben und Projekten.",
    supportBtn: "Unterstützen",
    caffe: {
      title: "Nur 1 Kaffee spendieren?",
      subtitle: "Mit nur 1€ im Monat können Sie den Unterschied machen",
      body: "Treten Sie unserem Teaming bei und unterstützen Sie uns mit einer monatlichen Mikro-Spende.",
      together: "Gemeinsam können wir mehr Leben retten! ☕ ❤️",
      btn: "☕ Teaming beitreten →",
      caption: "1€ al mese · 1€ par mois · €1 per month",
    },
  },
  
  // ESPAÑOL (ES)
  es: {
    langName: "Español",
    nav: { home: "Inicio", mission: "Misión", about: "Sobre nosotros", adopt: "Adopción", help: "Ayudar", contact: "Contacto" },
    hero: {
      kicker: "Adopciones internacionales de gatos",
      title: "Félinia",
      subtitle:
        "Un puente entre Túnez y Europa para proteger, cuidar y encontrar hogar a los gatos más frágiles.",
      ctaPrimary: "Adoptar o acoger",
      ctaSecondary: "Donar ahora",
    },
    mission: {
      title: "Nuestra misión",
      p1:
        "Félinia es una organización de adopciones internacionales de gatos con sede en Túnez y asociación registrada en Italia.<br/><br/>Nos encargamos de rescate, atención veterinaria, rehabilitación conductual y adopciones responsables hacia Europa.",
      p2:
        "Creemos en el bienestar, la transparencia y la sostenibilidad: espacios biofílicos, seguimiento digital de casos y programas educativos para crear convivencias felices y duraderas. 💚",
      stats: { saved: "Gatos rescatados", adopted: "Adopciones exitosas", volunteers: "Voluntarios activos" },
      esgTitle: "ESG e Innovación",
      esgItems: [
        "Espacios biofílicos y enriquecimiento ambiental",
        "Energía renovable y gestión sostenible",
        "Seguimiento digital pre/post adopción",
        "Educación para familias y escuelas"
      ],
      careTitle: "Félinia Care",
      careText: "Rastreamos cada rescate con registros médicos digitales y seguimientos. Bienestar primero.",
    },
    about: {
      title: "Sobre nosotros",
      p1: "Somos personas unidas por una misión simple y profunda: salvar gatos de la calle y darles lo que toda criatura merece — un hogar, un abrazo y un futuro. ❤️",
      p2: "Cada día caminamos por las calles de Túnez para dar esperanza a quienes no tienen voz.<br/><br/>Cada mirada asustada que se convierte en confianza, cada ronroneo nacido del silencio del dolor, nos recuerda por qué hacemos esto: porque el amor realmente salva. 💕",
      p3: "Félinia es más que una organización: es un puente de compasión entre pueblos, idiomas y corazones.<br/><br/>Cuando la empatía se encuentra con la acción, incluso la vida más frágil puede florecer de nuevo. 🌸",
      cards: [
        { kicker: "Rescate", title: "De la calle a la seguridad", desc: "Intervenciones en campo, atención y rehabilitación conductual." },
        { kicker: "Familia", title: "De callejero a hogar", desc: "Adopciones responsables y seguimiento post‑adopción." },
        { kicker: "Transparencia", title: "Confianza por diseño", desc: "Seguimiento de casos, informes de donaciones, impacto compartido." },
        { kicker: "Comunidad", title: "Juntos por los gatos", desc: "Voluntarios, familias de acogida y escuelas en red." },
      ],
    },
    adopt: {
      title: "Proceso de adopción",
      steps: [
        { t: "Solicitud", d: "Completa el formulario y cuéntanos qué buscas." },
        { t: "Entrevista", d: "Breve conversación para conocernos mejor." },
        { t: "Compatibilidad y preparación", d: "Te ayudamos a elegir tu nuevo gato y preparar el hogar." },
        { t: "Traslado", d: "Nos encargamos de la logística y el papeleo para una llegada segura." },
        { t: "Seguimiento", d: "Seguimiento post-adopción y asesoramiento conductual gratuito." },
      ],
      cta: "Ver gatos en adopción",
    },
    help: {
      title: "Cómo puedes ayudar",
      cards: [
        { t: "Donaciones", d: "Apoya atención veterinaria, comida y transporte.", btn: "Donar ahora" },
        { t: "Voluntariado", d: "En Túnez o de forma remota para adopciones y comunicación.", btn: "Ser voluntario" },
        { t: "Acogida temporal", d: "Acoge un gato temporalmente mientras espera adopción.", btn: "Ofrecer acogida" },
      ],
    },
    contact: {
      title: "Contáctanos",
      subtitle: "Hablemos – respuestas en ES/IT/FR/EN.",
      phones: [
        { label: "Túnez", display: "+216 56059142", href: "+21656059142" },
        { label: "Italia", display: "+39 348 8450532", href: "+393488450532" },
      ],
      form: { name: "Nombre", email: "Email", message: "Mensaje", send: "Enviar" },
      legal: "Asociación registrada en Italia · Centro operativo en Túnez",
    },
    founder: {
      role: "Fundador",
      quote: "El amor no se compra, se salva — y cada vida salvada hace el mundo un poco más amable.",
      bio: "Fundador de Félinia, coordina las adopciones internacionales y los proyectos de sensibilización entre Italia y Túnez.",
      whatsappBtn: "Escribir en WhatsApp",
    },
    footer: {
      legal: "© " + new Date().getFullYear() + " Félinia. Todos los derechos reservados.",
      description: "Adopciones internacionales de gatos entre Túnez y Europa, con enfoque en responsabilidad, bienestar y transparencia.",
      policy: "Privacidad",
      cookies: "Cookies",
      imprint: "Aviso legal",
    },
    badge: "Multilingüe ES/IT/FR/EN/DE",
    location: "Túnez · Italia · Europa",
    paypalCta: "Donar ahora",
    paypalNote: "Pago seguro con PayPal. Próximamente: transparencia de gastos y proyectos.",
    supportBtn: "Apóyanos",
    caffe: {
      title: "¿Ofrece solo 1 café?",
      subtitle: "Con solo 1€ al mes puedes marcar la diferencia",
      body: "Únete a nuestro Teaming y ayúdanos con una microdonación mensual.",
      together: "¡Juntos podemos salvar más vidas! ☕ ❤️",
      btn: "☕ Unirse a Teaming →",
      caption: "1€ al mese · 1€ par mois · €1 per month",
    },
  },
};

function CatLogo({ className = "w-10 h-10" }) {
  return (
    <img 
      src="/logo-felinia-optimized.jpg" 
      alt="Félinia logo" 
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

export default function FeliniaLanding() {
  const [lang, setLang] = useState("it");
  const t = useMemo(() => translations[lang], [lang]);
  const [formStatus, setFormStatus] = useState("idle");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE7] via-[#F5EFE7] to-[#e8dccf] text-[#1E1E1E]">
      {/* Nav */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-[#F5EFE7]/90 border-b border-black/10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CatLogo className="w-12 h-12 hover:scale-105 transition-transform duration-300" />
            <span className="font-serif text-2xl tracking-wide text-[#0C7463]">Félinia</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#mission" className="hover:text-[#0C7463] transition-colors duration-200">{t.nav.mission}</a>
            <a href="#about" className="hover:text-[#0C7463] transition-colors duration-200">{t.nav.about}</a>
            <a href="#adopt" className="hover:text-[#0C7463] transition-colors duration-200">{t.nav.adopt}</a>
            <a href="#help" className="hover:text-[#0C7463] transition-colors duration-200">{t.nav.help}</a>
            <a href="#contact" className="hover:text-[#0C7463] transition-colors duration-200">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                aria-label="switch language"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="rounded-xl border border-[#0C7463]/30 pl-3 pr-8 py-1.5 text-sm bg-white/70 hover:bg-white transition-colors cursor-pointer appearance-none"
              >
                <option value="it">🇮🇹 IT</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇬🇧 EN</option>
                <option value="de">🇩🇪 DE</option>
                <option value="es">🇪🇸 ES</option>
              </select>
              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[#0C7463]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C7463]/5 to-transparent pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center relative">
          <div className="animate-fadeIn">
            <p className="uppercase tracking-widest text-xs text-[#0C7463]/80 font-bold">{t.hero.kicker}</p>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl lg:text-7xl text-[#0C7463] leading-tight">{t.hero.title}</h1>
            <p className="mt-5 text-lg md:text-xl leading-relaxed max-w-prose text-[#1E1E1E]/80">{t.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <a href="#adopt" className="rounded-2xl bg-[#0C7463] text-white px-5 py-3 text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                {t.hero.ctaPrimary}
              </a>
              <a href="#caffe" className="rounded-2xl bg-[#D6B36A] text-white px-5 py-3 text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium">
                {t.supportBtn} ❤️😺
              </a>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-[#0C7463] font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
              {t.location}
            </div>
          </div>
          {/* Hero card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-black/5 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3">
              <CatLogo className="w-8 h-8" />
              <div className="font-semibold text-lg">{t.mission.careTitle}</div>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              {t.mission.careText}
            </p>
            <ul className="mt-4 grid grid-cols-3 gap-3 text-center">
              <li className="rounded-2xl bg-gradient-to-br from-white to-[#F5EFE7] p-3 border border-[#0C7463]/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-[#0C7463]">128</div>
                <div className="text-xs opacity-70 mt-1">{t.mission.stats.saved}</div>
              </li>
              <li className="rounded-2xl bg-gradient-to-br from-white to-[#F5EFE7] p-3 border border-[#0C7463]/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-[#0C7463]">94</div>
                <div className="text-xs opacity-70 mt-1">{t.mission.stats.adopted}</div>
              </li>
              <li className="rounded-2xl bg-gradient-to-br from-white to-[#F5EFE7] p-3 border border-[#0C7463]/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-[#0C7463]">37</div>
                <div className="text-xs opacity-70 mt-1">{t.mission.stats.volunteers}</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-12 bg-gradient-to-br from-white to-[#F5EFE7]/50">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-block">
            <img 
              src="/logo-felinia-optimized.jpg"
              alt="Logo Félinia"
              className="w-64 md:w-80 mx-auto hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="bg-white/70 backdrop-blur-sm border-y border-black/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0C7463] leading-tight">{t.mission.title}</h2>
            <p className="mt-4 leading-relaxed text-base md:text-lg" dangerouslySetInnerHTML={{ __html: t.mission.p1 }}></p>
            <p className="mt-3 leading-relaxed text-base md:text-lg">{t.mission.p2}</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-[#0C7463]/10 to-[#0C7463]/5 p-6 md:p-8 border border-[#0C7463]/20 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg text-[#0C7463] mb-4">{t.mission.esgTitle}</h3>
            <ul className="mt-3 space-y-3 text-sm">
              {t.mission.esgItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0C7463] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl bg-white/90 backdrop-blur-sm p-6 md:p-8 border border-black/5 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <CatLogo className="w-10 h-10" />
              <h2 className="font-serif text-3xl md:text-4xl text-[#0C7463]">{t.about.title}</h2>
            </div>
            <p className="text-lg leading-relaxed font-medium text-[#1E1E1E]/90" dangerouslySetInnerHTML={{ __html: t.about.p1 }}></p>
            <p className="mt-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.p2 }}></p>
            <p className="mt-3 leading-relaxed italic text-[#0C7463]/80" dangerouslySetInnerHTML={{ __html: t.about.p3 }}></p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {t.about.cards.map((card, i) => (
              <div key={i} className="rounded-2xl bg-white/90 backdrop-blur-sm p-5 border border-black/5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-xs uppercase tracking-wide text-[#0C7463]/80 font-bold mb-2">{card.kicker}</div>
                <div className="font-semibold text-lg mb-2">{card.title}</div>
                <p className="text-sm opacity-80">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder card */}
      <div className="mx-auto max-w-7xl px-4 pb-8">
        <div className="rounded-3xl border-2 border-[#D6B36A] bg-gradient-to-br from-[#F5EFE7] to-white p-6 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-center">
            <div>
              <img
                src="/enrico-founder.jpg"
                alt={lang === "fr" ? "Enrico, Fondateur" : lang === "en" ? "Enrico, Founder" : "Enrico, Fondatore"}
                className="w-full max-w-xs object-contain rounded-2xl border-2 border-[#D6B36A]/60 mx-auto shadow-lg"
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="font-serif text-3xl text-[#0C7463]">Enrico</h3>
                <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-[#0C7463]/20 to-[#0C7463]/10 text-[#0C7463] font-medium">
                  {t.founder.role}
                </span>
              </div>
              <blockquote className="mt-4 italic text-lg text-[#1E1E1E] border-l-4 border-[#D6B36A] pl-4">
                "{t.founder.quote}"
              </blockquote>
              <p className="mt-4 text-sm md:text-base opacity-90">
                {t.founder.bio}
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] text-white px-4 py-2.5 text-sm font-medium hover:bg-[#20bd5a] transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M19.11 17.36c-.26-.13-1.51-.74-1.74-.82-.23-.09-.4-.13-.57.13-.17.26-.66.82-.81.99-.15.17-.3.2-.56.07-.26-.13-1.08-.4-2.05-1.28-.76-.68-1.27-1.52-1.42-1.78-.15-.26-.02-.4.11-.53.12-.12.26-.3.4-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.48-.41-.42-.57-.43l-.49-.01c-.17 0-.45.07-.69.32-.23.26-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.13.17 1.81 2.77 4.38 3.89.61.26 1.09.42 1.47.54.62.2 1.19.17 1.64.1.5-.08 1.51-.62 1.73-1.22.21-.6.21-1.11.15-1.22-.06-.11-.24-.17-.5-.3z"/><path d="M26.88 5.1A13.93 13.93 0 0016 2C8.28 2 2 8.28 2 16c0 2.47.64 4.78 1.77 6.78L2 30l7.39-1.93A13.93 13.93 0 0016 30c7.72 0 14-6.28 14-14 0-3.74-1.47-7.18-4.12-9.9zM16 27.56c-2.45 0-4.72-.73-6.63-1.98l-.47-.3-4.38 1.14 1.17-4.26-.31-.52A11.51 11.51 0 014.44 16C4.44 9.53 9.53 4.44 16 4.44S27.56 9.53 27.56 16 22.47 27.56 16 27.56z"/></svg>
                  {t.founder.whatsappBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adopt */}
      <section id="adopt" className="">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0C7463]">{t.adopt.title}</h2>
          <ol className="mt-8 grid md:grid-cols-5 gap-4">
            {t.adopt.steps.map((s, i) => {
              // Candidatura (0) -> link a modulo contatto
              // Colloquio (1) -> link a WhatsApp
              const isClickable = i === 0 || i === 1;
              const linkHref = i === 0 ? "#contact" : i === 1 ? WHATSAPP_LINK : null;
              const linkTarget = i === 1 ? "_blank" : undefined;
              const linkRel = i === 1 ? "noopener noreferrer" : undefined;
              
              if (isClickable) {
                return (
                  <li key={i} className="rounded-2xl bg-white p-5 border border-black/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <a href={linkHref} target={linkTarget} rel={linkRel} className="block">
                      <div className="text-xs uppercase tracking-wide text-[#0C7463]/80">{String(i + 1).padStart(2, "0")}</div>
                      <div className="mt-1 font-semibold text-[#0C7463]">{s.t} →</div>
                      <p className="mt-2 text-sm opacity-80">{s.d}</p>
                    </a>
                  </li>
                );
              }
              
              return (
                <li key={i} className="rounded-2xl bg-white p-5 border border-black/5">
                  <div className="text-xs uppercase tracking-wide text-[#0C7463]/80">{String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-1 font-semibold">{s.t}</div>
                  <p className="mt-2 text-sm opacity-80">{s.d}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-8">
            <a href="#contact" className="rounded-2xl bg-[#0C7463] text-white px-5 py-3 inline-block hover:opacity-90">{t.adopt.cta}</a>
          </div>
        </div>
      </section>

      {/* Help */}
      <section id="help" className="bg-white/70 border-y border-black/5">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0C7463]">{t.help.title}</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {t.help.cards.map((c, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 border border-black/5 flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="font-semibold text-lg">{c.t}</div>
                <p className="mt-2 text-sm opacity-80 flex-1">{c.d}</p>
                {i === 0 ? (
                  <a href="#caffe" className="mt-4 rounded-xl bg-[#D6B36A] text-white px-4 py-2 text-sm text-center hover:opacity-90 transition-opacity duration-300 font-medium block">
                    {t.supportBtn} ❤️😺
                  </a>
                ) : (
                  <a 
                    href="#contact" 
                    className="mt-4 rounded-xl bg-[#0C7463] text-white px-4 py-2 text-sm text-center hover:bg-[#0a5a4d] transition-colors duration-300"
                  >
                    {c.btn}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden bg-[#D6B36A] py-3">
        <div className="ticker-track text-white text-sm font-medium whitespace-nowrap select-none">
          {[...Array(2)].map((_, r) => (
            <span key={r} className="flex items-center gap-0">
              {["Da randagio a casa 🐱", "Il tuo gesto salva una vita ❤️", "Félinia", "Tunisia · Italia · Europa 🌍", "Adozioni internazionali di gatti", "Ogni vita conta 🐾"].map((txt, i) => (
                <span key={i} className="mx-6">• {txt}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Caffè / Teaming */}
      <section id="caffe" className="bg-[#F5EFE7] py-16 md:py-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="text-5xl mb-4">☕</div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0C7463]">{t.caffe.title}</h2>
          <p className="mt-3 text-lg font-medium text-[#0C7463]">{t.caffe.subtitle}</p>
          <p className="mt-4 leading-relaxed opacity-80">{t.caffe.body}</p>
          <p className="mt-2 opacity-80">{t.caffe.together}</p>
          <a
            href="https://www.teaming.net/felinia"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-2xl bg-[#D6B36A] text-white px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {t.caffe.btn}
          </a>
          <p className="mt-4 text-xs opacity-60">{t.caffe.caption}</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="">
        <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0C7463]">{t.contact.title}</h2>
            <p className="mt-3">{t.contact.subtitle}</p>
            <div className="mt-6 rounded-2xl bg-white p-6 border border-black/5 text-sm">
              <div className="font-medium">Félinia</div>
              <div className="mt-1">{t.location}</div>
              <div className="mt-2">✉️ feliniasite@gmail.com</div>
              <div className="mt-2 flex flex-col gap-1">
                {t.contact.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={`tel:${phone.href}`}
                    className="hover:text-[#0C7463]"
                    aria-label={`${phone.display} ${phone.label}`}
                  >
                    ☎️ {phone.display} ({phone.label})
                  </a>
                ))}
              </div>
              <div className="mt-2 opacity-70">{t.contact.legal}</div>
            </div>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const name = formData.get('name');
              const email = formData.get('email');
              const message = formData.get('message');
              setFormStatus("sending");
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name, email, message }),
                });
                if (res.ok) {
                  setFormStatus("success");
                  e.target.reset();
                } else {
                  setFormStatus("error");
                }
              } catch {
                setFormStatus("error");
              }
            }}
            className="rounded-2xl bg-white p-6 border border-black/5"
          >
            {formStatus === "success" ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✅</div>
                <p className="font-semibold text-[#0C7463] text-lg">
                  {lang === "it" ? "Messaggio inviato!" : lang === "fr" ? "Message envoyé !" : lang === "de" ? "Nachricht gesendet!" : lang === "es" ? "¡Mensaje enviado!" : "Message sent!"}
                </p>
                <p className="mt-1 text-sm opacity-70">
                  {lang === "it" ? "Ti risponderemo al più presto." : lang === "fr" ? "Nous vous répondrons au plus vite." : lang === "de" ? "Wir antworten Ihnen so schnell wie möglich." : lang === "es" ? "Te responderemos lo antes posible." : "We'll get back to you soon."}
                </p>
                <button type="button" onClick={() => setFormStatus("idle")} className="mt-4 text-sm text-[#0C7463] underline">
                  {lang === "it" ? "Invia un altro messaggio" : lang === "fr" ? "Envoyer un autre message" : "Send another message"}
                </button>
              </div>
            ) : (
              <>
                <label className="block text-sm">
                  {t.contact.form.name}
                  <input name="name" className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#0C7463]/40" required />
                </label>
                <label className="block text-sm mt-4">
                  {t.contact.form.email}
                  <input name="email" type="email" className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#0C7463]/40" required />
                </label>
                <label className="block text-sm mt-4">
                  {t.contact.form.message}
                  <textarea name="message" rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#0C7463]/40" required />
                </label>
                {formStatus === "error" && (
                  <p className="mt-3 text-sm text-red-500">
                    {lang === "it" ? "Errore nell'invio. Riprova o scrivici via WhatsApp." : lang === "fr" ? "Erreur d'envoi. Réessayez ou écrivez-nous sur WhatsApp." : "Send error. Please retry or contact us on WhatsApp."}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="mt-5 rounded-xl bg-[#0C7463] text-white px-5 py-2.5 text-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                >
                  {formStatus === "sending"
                    ? (lang === "it" ? "Invio in corso…" : lang === "fr" ? "Envoi en cours…" : "Sending…")
                    : t.contact.form.send}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5">
        <div className="mx-auto max-w-7xl px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <CatLogo className="w-6 h-6" />
              <span className="font-medium">Félinia</span>
            </div>
            <p className="mt-2 opacity-70 max-w-sm">
              {t.footer.description}
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-medium">{t.nav.help}</div>
            <a href="#caffe" className="block hover:text-[#0C7463] transition-colors">{t.supportBtn}</a>
            <a href="#adopt" className="block hover:text-[#0C7463] transition-colors">{t.nav.adopt}</a>
            <a href="#contact" className="block hover:text-[#0C7463] transition-colors">{t.nav.contact}</a>
          </div>
          <div className="opacity-70">
            <div>{t.footer.legal}</div>
            <div className="mt-1 flex gap-3">
              <a href="#" className="hover:text-[#0C7463]">{t.footer.policy}</a>
              <a href="#" className="hover:text-[#0C7463]">{t.footer.cookies}</a>
              <a href="#" className="hover:text-[#0C7463]">{t.footer.imprint}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
