// Base de connaissances médicale adaptée au contexte sénégalais
// Supporte Français, Wolof, Anglais

const KNOWLEDGE_BASE = [
  {
    id: "paludisme",
    keywords: ["feebar","fièvre","fever","chaud","température","paludisme","malaria","frisson","sueur","transpire","dama feebar","sama yaram tang"],
    disease: "Paludisme / Fièvre",
    severity: "Élevé",
    score: 80,
    advice: "Le paludisme est fréquent au Sénégal. Consultez un médecin rapidement pour un test de goutte épaisse. En attendant : repos, hydratation abondante, paracétamol pour la fièvre.",
    medications: ["Paracétamol 500mg (fièvre)", "Chloroquine ou Artémisinine (sur prescription)", "Sels de réhydratation orale"],
    urgency: "⚠️ Consultez un médecin dans les 24h",
    pharmacies_tip: "Disponible dans toutes les pharmacies de Dakar"
  },
  {
    id: "cephalee",
    keywords: ["bopp","tête","migraine","mal de tête","headache","douleur tête","sama bopp dafay metti","bopp bu doy"],
    disease: "Céphalée / Migraine",
    severity: "Léger",
    score: 40,
    advice: "Repos dans une pièce calme et sombre. Hydratation importante. Évitez les écrans. Si la douleur est intense ou accompagnée de fièvre, consultez un médecin.",
    medications: ["Paracétamol 500mg", "Ibuprofène 400mg (si pas d'ulcère)", "Aspirine 500mg"],
    urgency: "💡 Repos recommandé",
    pharmacies_tip: "Médicaments disponibles sans ordonnance"
  },
  {
    id: "gastro",
    keywords: ["ventre","estomac","douleur abdominale","nausée","vomissement","diarrhée","gastro","digestion","mal au ventre","biir","biir bu doy","vomi"],
    disease: "Trouble gastro-intestinal",
    severity: "Modéré",
    score: 60,
    advice: "Évitez les aliments solides pendant 24h. Buvez beaucoup d'eau et de bouillons. Les sels de réhydratation sont essentiels si diarrhée. Consultez si douleur intense ou sang dans les selles.",
    medications: ["Sels de réhydratation orale (SRO)", "Métronidazole 500mg (si infection)", "Oméprazole 20mg (si brûlures)", "Charbon activé"],
    urgency: "💡 Surveillance recommandée",
    pharmacies_tip: "SRO disponible dans toutes les pharmacies"
  },
  {
    id: "respiratoire",
    keywords: ["toux","rhume","gorge","nez","grippe","bronchite","respiration","essoufflement","mucus","enrhumé","toux sèche","toux grasse","sama gémb","xam-xam"],
    disease: "Infection respiratoire",
    severity: "Modéré",
    score: 50,
    advice: "Repos, boissons chaudes (thé au gingembre, citron). Inhalations de vapeur. Évitez le froid. Si fièvre > 38.5°C ou difficultés respiratoires, consultez immédiatement.",
    medications: ["Vitamine C 1000mg", "Paracétamol 500mg", "Sirop antitussif", "Spray nasal salin"],
    urgency: "💡 Repos et hydratation",
    pharmacies_tip: "Sirops disponibles sans ordonnance"
  },
  {
    id: "fatigue",
    keywords: ["fatigue","faiblesse","épuisement","dama","las","sans énergie","anémie","pâle","vertiges","sama yaram dafa séy","dafa woyof"],
    disease: "Fatigue / Anémie possible",
    severity: "Léger",
    score: 35,
    advice: "Repos suffisant (7-8h de sommeil). Alimentation riche en fer (viande rouge, légumineuses, épinards). Évitez le café et le thé qui bloquent l'absorption du fer. Consultez si persistant.",
    medications: ["Vitamine C 1000mg", "Complexe vitaminé B", "Fer (sur prescription si anémie confirmée)"],
    urgency: "💡 Repos et nutrition",
    pharmacies_tip: "Vitamines disponibles sans ordonnance"
  },
  {
    id: "infection_bacterienne",
    keywords: ["infection","blessure","plaie","pus","gonflé","rouge","chaud","abcès","antibiotique","sama ref","plaie infectée"],
    disease: "Infection bactérienne",
    severity: "Élevé",
    score: 75,
    advice: "Nettoyez la plaie avec de l'eau propre et du savon. Désinfectez avec de la Bétadine. Consultez un médecin pour évaluer si antibiotiques nécessaires. Ne pas percer un abcès seul.",
    medications: ["Amoxicilline 500mg (sur prescription)", "Bétadine solution", "Pansements stériles", "Ibuprofène (anti-inflammatoire)"],
    urgency: "⚠️ Consultez un médecin",
    pharmacies_tip: "Bétadine disponible sans ordonnance"
  },
  {
    id: "hypertension",
    keywords: ["tension","hypertension","pression","sang","cardiaque","coeur","palpitation","essoufflement","sama jant","tension artérielle"],
    disease: "Hypertension / Problème cardiaque possible",
    severity: "Élevé",
    score: 85,
    advice: "Réduisez le sel, le stress et l'alcool. Faites mesurer votre tension régulièrement. Consultez un médecin pour un suivi. Ne jamais arrêter un traitement sans avis médical.",
    medications: ["Traitement sur prescription uniquement", "Réduction du sel alimentaire"],
    urgency: "🚨 Consultez un médecin rapidement",
    pharmacies_tip: "Tensiomètres disponibles en pharmacie"
  },
  {
    id: "diabete",
    keywords: ["diabète","sucre","glycémie","soif excessive","uriner souvent","vision floue","cicatrisation","sama jant sukër"],
    disease: "Diabète possible",
    severity: "Élevé",
    score: 80,
    advice: "Réduisez les sucres rapides et les féculents. Faites une glycémie à jeun. Consultez un médecin pour un bilan complet. Le diabète non traité peut causer des complications graves.",
    medications: ["Traitement sur prescription uniquement", "Glucomètre pour surveillance"],
    urgency: "🚨 Bilan médical urgent",
    pharmacies_tip: "Glucomètres et bandelettes disponibles en pharmacie"
  },
  {
    id: "peau",
    keywords: ["peau","démangeaison","bouton","éruption","allergie","urticaire","eczéma","acné","gratter","sama yaram dafa yëkël"],
    disease: "Problème dermatologique",
    severity: "Léger",
    score: 40,
    advice: "Évitez de gratter. Gardez la zone propre et sèche. Évitez les produits irritants. Si éruption généralisée ou fièvre associée, consultez un médecin.",
    medications: ["Crème antihistaminique", "Lotion à la calamine", "Antihistaminique oral (Cétirizine)"],
    urgency: "💡 Surveillance recommandée",
    pharmacies_tip: "Crèmes disponibles sans ordonnance"
  },
  {
    id: "yeux",
    keywords: ["yeux","vision","rouge","larme","conjonctivite","brûle","yeux","sama bët","bët bu doy"],
    disease: "Conjonctivite / Irritation oculaire",
    severity: "Léger",
    score: 35,
    advice: "Lavez les yeux avec du sérum physiologique. Évitez de vous frotter les yeux. Ne partagez pas vos serviettes. Si douleur intense ou perte de vision, consultez immédiatement.",
    medications: ["Sérum physiologique", "Collyre antibiotique (sur prescription)", "Larmes artificielles"],
    urgency: "💡 Hygiène oculaire",
    pharmacies_tip: "Sérum physiologique disponible partout"
  },
  {
    id: "dos",
    keywords: ["dos","lombalgie","colonne","mal de dos","reins","sciatique","sama kanam","sama ginaw"],
    disease: "Lombalgie / Douleur dorsale",
    severity: "Léger",
    score: 45,
    advice: "Repos relatif (évitez l'alitement total). Appliquez de la chaleur locale. Évitez les mouvements brusques. Consultez si douleur irradie dans la jambe ou si perte de sensibilité.",
    medications: ["Ibuprofène 400mg", "Paracétamol 500mg", "Gel anti-inflammatoire local"],
    urgency: "💡 Repos et chaleur locale",
    pharmacies_tip: "Anti-inflammatoires disponibles sans ordonnance"
  },
  {
    id: "stress",
    keywords: ["stress","anxiété","angoisse","insomnie","dormir","nerveux","déprime","triste","sama xol","dafa sedd"],
    disease: "Stress / Anxiété",
    severity: "Léger",
    score: 30,
    advice: "Pratiquez la respiration profonde et la méditation. Réduisez la caféine. Maintenez un rythme de sommeil régulier. Parlez à un proche ou un professionnel si persistant.",
    medications: ["Tisanes relaxantes (valériane, camomille)", "Magnésium", "Mélatonine (pour le sommeil)"],
    urgency: "💡 Gestion du stress",
    pharmacies_tip: "Compléments naturels disponibles en pharmacie"
  }
];

// Dictionnaire Wolof → Français
const WOLOF_DICT = {
  "dama feebar": "j'ai de la fièvre",
  "sama bopp dafay metti": "j'ai mal à la tête",
  "sama yaram tang": "mon corps est chaud",
  "dama woyof": "je suis fatigué",
  "sama biir dafay metti": "j'ai mal au ventre",
  "dama sedd": "j'ai froid",
  "sama ref dafay metti": "j'ai une blessure douloureuse",
  "dama doy": "je suis épuisé",
  "sama gémb dafay metti": "j'ai mal à la gorge",
  "sama bët dafay metti": "j'ai mal aux yeux",
  "dama xam-xam": "je tousse",
  "sama jant": "ma tension / mon cœur",
};

// Réponses contextuelles
const GREETINGS = ["bonjour","bonsoir","salut","hello","hi","salam","asalamu","na nga def","nanga def","mbaa"];
const THANKS = ["merci","thank","xarit","jërejëf","yëgël ma","ok merci"];
const PHARMA_QUERIES = ["pharmacie","médicament","où trouver","acheter","prix","disponible","proche","near"];
const TRANSPORT_QUERIES = ["transport","bus","car rapide","taxi","dakar dem dikk","tata","ndiaga ndiaye"];
const FOOD_QUERIES = ["manger","nourriture","alimentation","recette","thiéboudienne","yassa","mafé","santé alimentaire"];

module.exports = { KNOWLEDGE_BASE, WOLOF_DICT, GREETINGS, THANKS, PHARMA_QUERIES, TRANSPORT_QUERIES, FOOD_QUERIES };
