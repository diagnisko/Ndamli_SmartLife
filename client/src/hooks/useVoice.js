import { useState, useRef, useCallback } from "react";

// ── RECONNAISSANCE VOCALE ──
export function useVoice({ onResult, onError } = {}) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recRef = useRef(null);

  const supported = typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const start = useCallback((lang = "fr-FR") => {
    if (!supported) { onError?.("Utilise Chrome ou Edge pour la reconnaissance vocale."); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    recRef.current = rec;
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = true;

    rec.onstart = () => { setListening(true); setTranscript(""); };

    rec.onresult = (e) => {
      let interim = "", final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t; else interim += t;
      }
      setTranscript(final || interim);
      if (final) onResult?.(final.trim());
    };

    rec.onerror = (e) => {
      setListening(false);
      const msgs = {
        "not-allowed": "Microphone refusé. Autorise l'accès dans ton navigateur.",
        "no-speech": "Aucune voix détectée. Réessaie.",
        "network": "Erreur réseau.",
      };
      if (msgs[e.error]) onError?.(msgs[e.error]);
    };

    rec.onend = () => setListening(false);
    rec.start();
  }, [supported, onResult, onError]);

  const stop = useCallback(() => { recRef.current?.stop(); setListening(false); }, []);

  return { listening, transcript, supported, start, stop };
}

// ── SYNTHÈSE VOCALE ──
export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback((text, lang = "fr-FR") => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text
      .replace(/\*\*/g, "")
      .replace(/[•\-]/g, "")
      .replace(/\n+/g, ". ")
      .replace(/⚠️|💡|🔴|🟡|🟢|🏥|💊|📋/g, "")
      .trim();

    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = lang;
    utter.rate = 0.92;
    utter.pitch = 1.05;
    utter.volume = 1;

    // Choisir une voix féminine si disponible
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith(lang.split("-")[0]) && v.name.toLowerCase().includes("female"))
      || voices.find(v => v.lang.startsWith(lang.split("-")[0]));
    if (preferred) utter.voice = preferred;

    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utter);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  return { speaking, speak, stop };
}
