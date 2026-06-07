const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { KNOWLEDGE_BASE, WOLOF_DICT } = require("../data/knowledgeBase");

function getUserId(req) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    return jwt.verify(token, process.env.JWT_SECRET || "secretkey").id;
  } catch { return null; }
}

function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, " ").trim();
}

function translateWolof(text) {
  let t = text;
  for (const [w, fr] of Object.entries(WOLOF_DICT)) {
    if (t.includes(w)) t += " " + fr;
  }
  return t;
}

function analyzeSymptoms(text) {
  const enriched = translateWolof(normalize(text));
  return KNOWLEDGE_BASE.map(d => {
    let matchScore = 0;
    const matched = [];
    for (const kw of d.keywords) {
      if (enriched.includes(normalize(kw))) { matchScore++; matched.push(kw); }
    }
    return { ...d, matchScore, matched };
  })
  .filter(d => d.matchScore > 0)
  .sort((a, b) => b.matchScore - a.matchScore);
}

exports.diagnose = (req, res) => {
  const userId = getUserId(req);
  const { symptoms } = req.body;
  if (!symptoms?.trim()) return res.status(400).json({ msg: "Symptômes requis" });

  const matches = analyzeSymptoms(symptoms);

  let result;
  if (matches.length === 0) {
    result = {
      probable_disease: "Symptômes non identifiés",
      severity: "Inconnu",
      score: 20,
      advice: "Vos symptômes ne correspondent pas à notre base de données. Consultez un médecin pour un diagnostic précis.",
      medications: "À déterminer par un professionnel de santé",
      urgency: "🏥 Consultez un médecin",
      alternatives: [],
      matched_keywords: []
    };
  } else {
    const primary = matches[0];
    result = {
      probable_disease: primary.disease,
      severity: primary.severity,
      score: Math.min(95, primary.score * 10 + primary.matchScore * 5),
      advice: primary.advice,
      medications: primary.medications.join(", "),
      medications_list: primary.medications,
      urgency: primary.urgency,
      pharmacies_tip: primary.pharmacies_tip,
      matched_keywords: primary.matched,
      alternatives: matches.slice(1, 3).map(m => ({
        disease: m.disease,
        severity: m.severity,
        score: Math.min(90, m.score * 8)
      })),
      symptoms
    };
  }

  // Sauvegarder en DB
  if (userId) {
    db.query(
      "INSERT INTO symptom_reports (user_id, symptoms, score, probable_disease, severity, advice, medications) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, symptoms, result.score, result.probable_disease, result.severity, result.advice, result.medications],
      () => {}
    );
  }

  res.json(result);
};

exports.getHistory = (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ msg: "Non autorisé" });
  db.query(
    "SELECT * FROM symptom_reports WHERE user_id = ? ORDER BY created_at DESC LIMIT 15",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ msg: "Erreur serveur" });
      res.json(results);
    }
  );
};
