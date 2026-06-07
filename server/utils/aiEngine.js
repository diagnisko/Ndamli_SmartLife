const { KNOWLEDGE_BASE, WOLOF_DICT, GREETINGS, THANKS, PHARMA_QUERIES, TRANSPORT_QUERIES, FOOD_QUERIES } = require("../data/knowledgeBase");

// Mémoire de conversation par session (en mémoire, simple)
const sessions = {};

function getSession(sessionId) {
  if (!sessions[sessionId]) {
    sessions[sessionId] = { history: [], lastDisease: null, askedFollowUp: false };
  }
  return sessions[sessionId];
}

// Normaliser le texte (accents, casse, ponctuation)
function normalize(text) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .trim();
}

// Traduire Wolof → Français
function translateWolof(text) {
  let translated = text;
  for (const [wolof, fr] of Object.entries(WOLOF_DICT)) {
    if (text.includes(wolof)) translated += " " + fr;
  }
  return translated;
}

// Scorer chaque maladie selon les mots-clés trouvés
function scoreDisease(text, disease) {
  const norm = normalize(text);
  let score = 0;
  let matched = [];
  for (const kw of disease.keywords) {
    if (norm.includes(normalize(kw))) {
      score += 1;
      matched.push(kw);
    }
  }
  return { score, matched };
}

// Analyser le message et retourner les maladies triées par score
function analyzeSymptoms(text) {
  const enriched = translateWolof(text);
  const results = KNOWLEDGE_BASE.map(d => {
    const { score, matched } = scoreDisease(enriched, d);
    return { ...d, matchScore: score, matched };
  }).filter(d => d.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
  return results;
}

// Formater une réponse médicale riche
function formatMedicalResponse(disease, isFollowUp = false) {
  const severityEmoji = { "Léger": "🟢", "Modéré": "🟡", "Élevé": "🔴", "Élevé": "🔴" };
  const emoji = severityEmoji[disease.severity] || "🟡";

  let response = `${emoji} **${disease.disease}**\n\n`;
  response += `📋 **Conseils :**\n${disease.advice}\n\n`;
  response += `💊 **Médicaments suggérés :**\n`;
  disease.medications.forEach(m => { response += `• ${m}\n`; });
  response += `\n${disease.urgency}\n`;
  response += `🏥 ${disease.pharmacies_tip}`;

  if (!isFollowUp) {
    response += `\n\n_Veux-tu que je te localise une pharmacie proche ? Tape "pharmacie proche"_`;
  }

  return response;
}

// Réponse principale du chatbot
function generateResponse(message, sessionId) {
  const session = getSession(sessionId);
  const norm = normalize(message);
  const enriched = translateWolof(norm);

  // Sauvegarder dans l'historique
  session.history.push({ role: "user", text: message });

  let response = "";

  // ── 1. SALUTATIONS ──
  if (GREETINGS.some(g => norm.includes(g))) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";
    response = `${greeting} ! 👋 Je suis l'Assistant Ndamli SmartLife.\n\nJe peux t'aider avec :\n• 🩺 Tes symptômes et maladies\n• 💊 Les médicaments disponibles\n• 🏥 Les pharmacies proches\n• 🚌 Le transport à Dakar\n• 🥗 L'alimentation saine\n\nComment puis-je t'aider aujourd'hui ?`;
    session.history.push({ role: "bot", text: response });
    return response;
  }

  // ── 2. REMERCIEMENTS ──
  if (THANKS.some(t => norm.includes(t))) {
    response = "De rien ! 😊 N'hésite pas si tu as d'autres questions. Prends soin de toi ! 🌿";
    session.history.push({ role: "bot", text: response });
    return response;
  }

  // ── 3. PHARMACIES ──
  if (PHARMA_QUERIES.some(q => norm.includes(q))) {
    response = `🏥 **Pharmacies proches de Dakar :**\n\n• Pharmacie du Point E — 0.8 km ✅ Ouverte\n• Pharmacie Yoff — 1.2 km ✅ Ouverte\n• Pharmacie Liberté — 1.5 km ❌ Fermée\n• Pharmacie Mermoz — 2.1 km ✅ Ouverte\n\n📍 Va dans l'onglet **Pharmacies** pour voir la carte complète avec les 283 pharmacies de Dakar.`;
    session.history.push({ role: "bot", text: response });
    return response;
  }

  // ── 4. TRANSPORT ──
  if (TRANSPORT_QUERIES.some(q => norm.includes(q))) {
    response = `🚌 **Transport à Dakar :**\n\n• **Car rapide** — Économique, couvre tout Dakar\n• **Dakar Dem Dikk (DDD)** — Bus climatisés, lignes principales\n• **Tata** — Minibus, quartiers périphériques\n• **Taxi** — Négocier le prix avant de monter\n• **Yango / InDriver** — Applications de taxi disponibles\n\n💡 Conseil : Évitez les heures de pointe (7h-9h et 17h-19h)`;
    session.history.push({ role: "bot", text: response });
    return response;
  }

  // ── 5. ALIMENTATION ──
  if (FOOD_QUERIES.some(q => norm.includes(q))) {
    response = `🥗 **Alimentation saine au Sénégal :**\n\n• **Thiéboudienne** — Riche en protéines et légumes\n• **Yassa poulet** — Citron + oignons = antioxydants\n• **Mafé** — Arachides riches en protéines\n• **Bissap** — Riche en vitamine C et antioxydants\n• **Bouye (pain de singe)** — Excellent pour l'immunité\n\n💡 Privilégie les légumes locaux : gombo, aubergine africaine, feuilles de manioc.`;
    session.history.push({ role: "bot", text: response });
    return response;
  }

  // ── 6. SUIVI DE CONVERSATION ──
  if (session.lastDisease && (norm.includes("oui") || norm.includes("yes") || norm.includes("waw") || norm.includes("plus"))) {
    const disease = KNOWLEDGE_BASE.find(d => d.id === session.lastDisease);
    if (disease) {
      response = `📌 **Plus d'infos sur ${disease.disease} :**\n\n`;
      response += `🔬 Score de risque : ${disease.score}/100\n`;
      response += `⚡ Sévérité : ${disease.severity}\n\n`;
      response += `💊 Médicaments détaillés :\n`;
      disease.medications.forEach((m, i) => { response += `${i + 1}. ${m}\n`; });
      response += `\n🏥 Consulte un médecin pour un diagnostic précis.`;
      session.history.push({ role: "bot", text: response });
      return response;
    }
  }

  // ── 7. ANALYSE MÉDICALE PRINCIPALE ──
  const matches = analyzeSymptoms(message);

  if (matches.length === 0) {
    // Réponse générique intelligente
    response = `Je n'ai pas bien compris tes symptômes. 🤔\n\nEssaie de décrire :\n• Où tu as mal (tête, ventre, dos...)\n• Depuis combien de temps\n• D'autres symptômes associés\n\nTu peux aussi écrire en **Wolof** ! Ex: "Dama feebar, sama bopp dafay metti"`;
    session.history.push({ role: "bot", text: response });
    return response;
  }

  // Maladie principale
  const primary = matches[0];
  session.lastDisease = primary.id;

  response = formatMedicalResponse(primary);

  // Si plusieurs maladies possibles
  if (matches.length > 1) {
    response += `\n\n🔍 **Autres possibilités :**\n`;
    matches.slice(1, 3).forEach(m => {
      response += `• ${m.disease} (${m.severity})\n`;
    });
  }

  session.history.push({ role: "bot", text: response });
  return response;
}

module.exports = { generateResponse };
