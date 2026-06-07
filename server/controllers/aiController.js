export const smartAI = async (req, res) => {
  const msg = req.body.message.toLowerCase();

  // 🟡 Détection Wolof simple
  const isWolof =
    msg.includes("dama") ||
    msg.includes("bopp") ||
    msg.includes("feebar");

  if (isWolof) {
    return res.json({
      reply:
        "🧠 Je comprends ton message en Wolof.\n" +
        "👉 Possible fatigue ou fièvre.\n" +
        "💊 Repos + eau + paracétamol si douleur.\n" +
        "📍 Veux-tu une pharmacie proche ?"
    });
  }

  // 🟡 Douleur tête
  if (msg.includes("tête") || msg.includes("head")) {
    return res.json({
      reply:
        "💊 Douleur tête détectée.\n" +
        "👉 Repos + hydratation + paracétamol."
    });
  }

  // 🟡 Default response
  res.json({
    reply: "Je peux t'aider pour la santé, les médicaments et les pharmacies."
  });
};