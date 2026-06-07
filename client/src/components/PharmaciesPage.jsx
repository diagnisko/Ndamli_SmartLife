import { useEffect, useState, useRef } from "react";
import { MapPin, Phone, Search, List, Map, Navigation } from "lucide-react";
import API from "../services/api";
import "leaflet/dist/leaflet.css";

export default function PharmaciesPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("map"); // "map" | "list"
  const [selected, setSelected] = useState(null);
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [medsLoading, setMedsLoading] = useState(false);
  const [userPos, setUserPos] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  function load(q = "", pos = null) {
    setLoading(true);
    let url = "/pharmacies";
    const params = [];
    if (q) params.push(`search=${encodeURIComponent(q)}`);
    if (pos) params.push(`lat=${pos.lat}&lng=${pos.lng}`);
    if (params.length) url += "?" + params.join("&");
    API.get(url).then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  }

  function loadPharmacyMeds(pharmacyId) {
    if (!pharmacyId) return;
    setMedsLoading(true);
    setSelectedMeds([]);
    API.get(`/pharmacies/${pharmacyId}/medicaments`)
      .then(r => setSelectedMeds(r.data))
      .catch(() => setSelectedMeds([]))
      .finally(() => setMedsLoading(false));
  }

  function getWhatsAppLink(phone) {
    if (!phone) return null;
    const formatted = phone.replace(/[^+0-9]/g, "");
    return `https://wa.me/${encodeURIComponent(formatted)}`;
  }

  // Géolocalisation
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      pos => {
        const p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(p);
        load("", p);
      },
      () => load("", { lat: 14.7167, lng: -17.4677 }) // Dakar par défaut
    );
  }, []);

  // Init carte Leaflet (séparé de l'ajout des marqueurs)
  useEffect(() => {
    if (view !== "map" || !mapRef.current) return;

    console.log('[PharmaciesPage] view=map et mapRef présent');

    // Si la carte est déjà initialisée, forcer un redimensionnement
    if (mapInstanceRef.current) {
      console.log('[PharmaciesPage] map déjà initialisée, invalidateSize()');
      setTimeout(() => mapInstanceRef.current.invalidateSize && mapInstanceRef.current.invalidateSize(), 200);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        console.log('[PharmaciesPage] import leaflet...');
        const L = await import("leaflet");
        console.log('[PharmaciesPage] leaflet importé', !!L);

        // Fix icônes Leaflet
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        if (cancelled) return;

        const map = L.map(mapRef.current).setView([14.7167, -17.4677], 13);
        mapInstanceRef.current = map;
        console.log('[PharmaciesPage] carte créée', mapRef.current, mapInstanceRef.current);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors"
        }).addTo(map);
        console.log('[PharmaciesPage] tileLayer ajouté');

        // ajouter marqueur utilisateur initial si disponible
        const pos = userPos || { lat: 14.7167, lng: -17.4677 };
        const userIcon = L.divIcon({
          html: `<div style="background:#3b82f6;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 4px rgba(59,130,246,0.3)"></div>`,
          className: "",
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });
        L.marker([pos.lat, pos.lng], { icon: userIcon }).addTo(map).bindPopup("<b>📍 Vous êtes ici</b>");
        console.log('[PharmaciesPage] marqueur utilisateur ajouté');

      } catch (err) {
        // Afficher erreur dans la console pour débogage
        console.error("Erreur initialisation Leaflet:", err);
      }
    })();

    return () => { cancelled = true; };
  }, [view]);

  // Ajouter / mettre à jour les marqueurs lorsque `data` change et que la carte existe
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    console.log('[PharmaciesPage] mapInstance présent, ajout/maj marqueurs', data.length);
    let cancelled = false;

    (async () => {
      try {
        const L = await import("leaflet");
        console.log('[PharmaciesPage] import leaflet (markers)');

        // nettoyer anciens marqueurs
        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];

        const pharmIcon = L.divIcon({
          html: `<div style="background:#1a7a3c;width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"><div style="transform:rotate(45deg);display:flex;align-items:center;justify-content:center;height:100%;font-size:12px">➕</div></div>`,
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 28],
          popupAnchor: [0, -30]
        });

        data.forEach(ph => {
          if (cancelled) return;
          if (!ph.lat || !ph.lng) return;
          const marker = L.marker([ph.lat, ph.lng], { icon: pharmIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <div style="min-width:180px;font-family:Inter,sans-serif">
                <div style="font-weight:700;font-size:0.85rem;margin-bottom:4px;color:#1a1a2e">${ph.name}</div>
                ${ph.distance_km ? `<div style="font-size:0.75rem;color:#6b7280">📍 ${ph.distance_km} km</div>` : ""}
                ${ph.phone ? `<a href="tel:${ph.phone}" style="display:inline-flex;align-items:center;gap:4px;margin-top:6px;background:#1a7a3c;color:white;padding:4px 10px;border-radius:6px;font-size:0.75rem;text-decoration:none">📞 Appeler</a>` : ""}
              </div>
            `);
          markersRef.current.push(marker);
        });

        console.log('[PharmaciesPage] marqueurs ajoutés', markersRef.current.length);

        // Si au moins un marqueur, ajuster la vue
        if (markersRef.current.length) {
          const group = L.featureGroup(markersRef.current);
          mapInstanceRef.current.fitBounds(group.getBounds().pad(0.2));
          console.log('[PharmaciesPage] fitBounds appliqué');
        }
      } catch (err) {
        console.error("Erreur ajout marqueurs Leaflet:", err);
      }
    })();

    return () => { cancelled = true; };
  }, [data]);

  // Centrer sur pharmacie sélectionnée
  function focusPharmacy(ph) {
    setSelected(ph);
    loadPharmacyMeds(ph.id);
    if (mapInstanceRef.current && ph.lat && ph.lng) {
      mapInstanceRef.current.setView([ph.lat, ph.lng], 16);
    }
  }

  const filtered = data.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="section-box" style={{ marginBottom: 16 }}>
        <div className="section-header" style={{ marginBottom: 12 }}>
          <div className="section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MapPin size={18} color="var(--primary)" />
            Pharmacies de Dakar
            <span style={{ background: "var(--primary-light)", color: "var(--primary)", borderRadius: 9999, padding: "2px 10px", fontSize: "0.75rem", fontWeight: 700 }}>
              {data.length} trouvées
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setView("map")}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: "1.5px solid var(--border)", background: view === "map" ? "var(--primary)" : "var(--input-bg)", color: view === "map" ? "white" : "var(--text)", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem" }}
            >
              <Map size={14} /> Carte
            </button>
            <button
              onClick={() => setView("list")}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: "1.5px solid var(--border)", background: view === "list" ? "var(--primary)" : "var(--input-bg)", color: view === "list" ? "white" : "var(--text)", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem" }}
            >
              <List size={14} /> Liste
            </button>
          </div>
        </div>

        {/* Recherche */}
        <div style={{ position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
          <input
            className="input"
            style={{ paddingLeft: 36 }}
            placeholder="Rechercher une pharmacie..."
            value={search}
            onChange={e => { setSearch(e.target.value); load(e.target.value, userPos); }}
          />
        </div>
      </div>

      {/* Carte */}
      {view === "map" && (
        <div style={{ borderRadius: 14, overflow: "hidden", border: "1.5px solid var(--border)", height: 500, position: "relative" }}>
          {loading && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, fontSize: "0.875rem", color: "var(--text2)" }}>
              Chargement de la carte...
            </div>
          )}
          <div id="pharm-map" ref={mapRef} style={{ width: "100%", height: "100%" }} />

          {/* Légende */}
          <div style={{ position: "absolute", bottom: 16, left: 16, background: "white", borderRadius: 10, padding: "10px 14px", boxShadow: "0 2px 12px rgba(0,0,0,0.15)", zIndex: 999, fontSize: "0.78rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <div style={{ width: 12, height: 12, background: "#1a7a3c", borderRadius: "50%" }}></div>
              <span>Pharmacie</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, background: "#3b82f6", borderRadius: "50%" }}></div>
              <span>Votre position</span>
            </div>
          </div>
        </div>
      )}

      {/* Liste */}
      {view === "list" && (
        <div className="section-box">
          {loading && <div className="empty-state">Chargement...</div>}
          {!loading && filtered.length === 0 && <div className="empty-state">Aucune pharmacie trouvée.</div>}
          {filtered.map((ph, i) => (
            <div
              key={i}
              className="pharmacy-item"
              style={{ cursor: "pointer", background: selected?.name === ph.name ? "var(--primary-light)" : "transparent", borderRadius: 8, padding: "10px 8px", transition: "background 0.15s" }}
              onClick={() => { focusPharmacy(ph); setView("map"); }}
            >
              <div className="ph-icon"><MapPin size={15} color="var(--primary)" /></div>
              <div className="ph-info">
                <div className="ph-name">{ph.name}</div>
                <div className="ph-dist">
                  {ph.distance_km ? <span style={{ color: "var(--primary)", fontWeight: 600 }}>{ph.distance_km} km</span> : null}
                  {ph.location ? ` • ${ph.location}` : ""}
                </div>
                <div style={{ marginTop: 6, fontSize: "0.82rem", color: "var(--text3)" }}>
                  {ph.available_med_count > 0 ? `${ph.available_med_count} médicament${ph.available_med_count > 1 ? "s" : ""} disponibles` : "Aucun médicament disponible"}
                  {ph.total_stock > 0 ? ` • ${ph.total_stock} en stock` : ""}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {ph.phone && (
                  <a href={`tel:${ph.phone}`} className="ph-call" onClick={e => e.stopPropagation()}>
                    <Phone size={13} color="var(--primary)" />
                  </a>
                )}
                <Navigation size={14} color="var(--text3)" />
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="section-box" style={{ marginTop: 20 }}>
          <div className="section-header">
            <div className="section-title">🩺 Détails de {selected.name}</div>
            <span style={{ fontSize: "0.8rem", color: "var(--text2)" }}>
              {selected.location} {selected.phone ? `• ${selected.phone}` : ""}
            </span>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <span className="tag tag-green">{selected.available_med_count || 0} médicaments disponibles</span>
              <span className="tag tag-indigo">{selected.stocked_med_count || 0} médicaments en stock</span>
              <span className="tag tag-blue">{selected.total_stock || 0} unités en stock</span>
            </div>

            <div className="section-box">
              <div className="section-header">
                <div className="section-title">Contact & réservation</div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                {selected.phone && (
                  <a
                    href={`tel:${selected.phone}`}
                    className="button button-primary"
                    style={{ minWidth: 140, justifyContent: "center" }}
                  >
                    <Phone size={14} /> Appeler
                  </a>
                )}
                {selected.phone && (
                  <a
                    href={getWhatsAppLink(selected.phone)}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-secondary"
                    style={{ minWidth: 140, justifyContent: "center" }}
                  >
                    WhatsApp
                  </a>
                )}
                {!selected.phone && (
                  <span style={{ color: "var(--text2)", fontSize: "0.95rem" }}>Numéro non disponible</span>
                )}
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {medsLoading && <div className="empty-state">Chargement des médicaments...</div>}
                {!medsLoading && selectedMeds.length === 0 && <div className="empty-state">Aucun médicament trouvé pour cette pharmacie.</div>}
                {!medsLoading && selectedMeds.length > 0 && selectedMeds.map((med, index) => (
                  <div key={index} className="transaction-item" style={{ justifyContent: "space-between" }}>
                    <div>
                      <div className="tx-name">{med.name}</div>
                      <div className="tx-cat">{med.category || "Médicament"}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 700, color: "var(--primary)" }}>{Number(med.price || 0).toLocaleString("fr-FR")} FCFA</div>
                      <div className={`tag ${med.stock > 0 ? "tag-green" : "tag-red"}`} style={{ marginTop: 6 }}>
                        {med.stock > 0 ? `${med.stock} en stock` : "Stock épuisé"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
