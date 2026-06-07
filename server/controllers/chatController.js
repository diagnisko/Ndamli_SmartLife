const { generateResponse } = require("../utils/aiEngine");
const jwt = require("jsonwebtoken");

function getSessionId(req) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) return jwt.verify(token, process.env.JWT_SECRET || "secretkey").id.toString();
  } catch {}
  return req.ip || "anonymous";
}

exports.chatAI = (req, res) => {
  const message = req.body.message || "";
  if (!message.trim()) return res.status(400).json({ msg: "Message vide" });

  const sessionId = getSessionId(req);
  const reply = generateResponse(message, sessionId);

  res.json({ reply, timestamp: new Date().toISOString() });
};
