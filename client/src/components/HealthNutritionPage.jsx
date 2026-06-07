import React, { useState } from "react";
import { Leaf, HeartPulse, Apple, Activity, Sparkles } from "lucide-react";

const mealIdeas = [
  { title: "Thieboudienne (Ceebu jën)", desc: "Riz au poisson, légumes locaux (chou, carotte, manioc) et sauce tamar, version allégée possible.", emoji: "🍛", img: "/images/recipes/thieboudienne.jpg", webp: "/images/recipes/thieboudienne.webp" },
  { title: "Yassa poulet", desc: "Poulet mariné au citron et oignon, servi avec du riz ou du fonio.", emoji: "🍗", img: "/images/recipes/yassa.jpg", webp: "/images/recipes/yassa.webp" },
  { title: "Mafé", desc: "Ragoût à la pâte d'arachide avec légumes et morceaux maigres de viande ou poisson.", emoji: "🥘", img: "/images/recipes/mafe.jpg", webp: "/images/recipes/mafe.webp" },
  { title: "Thiakry", desc: "Dessert à base de couscous de mil ou de couscous sucré, yaourt et miel.", emoji: "🍨", img: "/images/recipes/thiakry.jpg", webp: "/images/recipes/thiakry.webp" },
  { title: "Pastels", desc: "Beignets salés fourrés au poisson ou aux crevettes, parfaits en snack.", emoji: "🥟", img: "/images/recipes/pastels.jpg", webp: "/images/recipes/pastels.webp" },
  { title: "Soupe kandia (gombo)", desc: "Ragoût d'igname/gombo et poisson, riche en fibres et saveurs locales.", emoji: "🍲", img: "/images/recipes/kandia.jpg", webp: "/images/recipes/kandia.webp" },
];

const healthTips = [
  { icon: HeartPulse, title: "Bouge chaque jour", detail: "30 minutes de marche ou de sport doux pour renforcer ton cœur." },
  { icon: Leaf, title: "Mange local", detail: "Privilégie fruits, légumes et produits frais de saison." },
  { icon: Activity, title: "Hydrate-toi", detail: "Au moins 2 litres d'eau par jour, surtout en climat chaud." },
];

const nutritionTips = [
  "Préfère les céréales complètes au riz blanc lorsque c'est possible.",
  "Varie les protéines : poisson, poulet, lentilles, haricots et légumes secs.",
  "Limite les graisses saturées et remplace-les par de bonnes graisses.",
];

const weeklyPlan = [
  { day: "Lundi", menu: "Thieboudienne traditionnel (poisson, riz, légumes)" },
  { day: "Mardi", menu: "Yassa poulet, riz et salade fraîche" },
  { day: "Mercredi", menu: "Mafé aux légumes, fonio ou riz" },
  { day: "Jeudi", menu: "Pastels en entrée + salade de légumes" },
  { day: "Vendredi", menu: "Soupe Kandia (gombo) avec poisson et riz" },
  { day: "Samedi", menu: "Brochettes locales (viande/poisson) et accompagnement" },
  { day: "Dimanche", menu: "Thiakry ou Lakh pour un brunch léger" },
];

const recipes = [
  {
    title: "Recette : Thieboudienne",
    desc: "Cuire le poisson mariné, préparer la sauce tomate aux légumes, servir avec riz parfumé.",
    emoji: "🐟",
    img: "/images/recipes/thieboudienne.jpg",
    webp: "/images/recipes/thieboudienne.webp",
    portions: 4,
    calories: 650,
    ingredients: ["500g de poisson", "300g de riz", "1 oignon", "2 tomates", "Légumes (carottes, manioc, chou)"],
    steps: ["Mariner et griller le poisson.", "Préparer la sauce tomate et ajouter légumes.", "Cuire le riz séparément.", "Mélanger et servir chaud."],
    regions: ["Dakar", "Saint-Louis", "Ziguinchor"],
  },
  {
    title: "Recette : Yassa poulet",
    desc: "Mariner poulet dans citron+oignon, cuire doucement jusqu'à tendreté et servir avec riz.",
    emoji: "🍋",
    img: "/images/recipes/yassa.jpg",
    webp: "/images/recipes/yassa.webp",
    portions: 4,
    calories: 540,
    ingredients: ["1kg de poulet", "4 oignons", "Citron", "Huile d'olive", "Sel/poivre"],
    steps: ["Mariner le poulet plusieurs heures.", "Saisir puis mijoter avec les oignons.", "Servir sur riz chaud."],
    regions: ["Dakar", "Thiès"],
  },
  {
    title: "Recette : Mafé",
    desc: "Faire revenir légumes, ajouter pâte d'arachide diluée, mijoter avec viande maigre ou poisson.",
    emoji: "🥜",
    img: "/images/recipes/mafe.jpg",
    webp: "/images/recipes/mafe.webp",
    portions: 4,
    calories: 600,
    ingredients: ["400g de viande/poulet", "200g de pâte d'arachide", "Patates douces", "Carottes", "Tomates"],
    steps: ["Faire revenir la viande.", "Ajouter légumes et pâte d'arachide diluée.", "Laisser mijoter jusqu'à tendreté."],
    regions: ["Kédougou", "Tambacounda"],
  },
  {
    title: "Recette : Thiakry",
    desc: "Mélanger semoule de mil ou couscous sucré avec yaourt, sucre et fruits secs.",
    emoji: "🥣",
    img: "/images/recipes/thiakry.jpg",
    webp: "/images/recipes/thiakry.webp",
    portions: 4,
    calories: 320,
    ingredients: ["200g de couscous de mil", "400g de yaourt", "Sucre", "Fruits secs"],
    steps: ["Cuire et refroidir le mil.", "Mélanger avec yaourt et sucre.", "Ajouter fruits secs et servir frais."],
    regions: ["Dakar", "Saint-Louis"],
  },
  {
    title: "Recette : Pastels",
    desc: "Préparer pâte fine, garnir de poisson épicé, frire jusqu'à doré et servir chaud.",
    emoji: "🫓",
    img: "/images/recipes/pastels.jpg",
    webp: "/images/recipes/pastels.webp",
    portions: 6,
    calories: 250,
    ingredients: ["Pâte fine", "200g de poisson/crevettes", "Epices"],
    steps: ["Préparer la farce épicée.", "Former les pastels et frire."],
    regions: ["Dakar", "Ziguinchor"],
  },
];

export default function HealthNutritionPage() {
  const [lang, setLang] = useState("fr");
  const [openRecipe, setOpenRecipe] = useState(null);

  const t = (fr, wo) => (lang === "fr" ? fr : wo);

  return (
    <div>
      <div className="section-box">
        <div className="section-header">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div className="section-title"><Sparkles size={20} /> {t("Santé & Alimentation", "Jàmm ak Njàmbi")}</div>
            <div style={{ marginLeft: 12 }}>
              <button className="period-btn" onClick={() => setLang(lang === "fr" ? "wo" : "fr")}>{lang === "fr" ? "Wolof" : "Français"}</button>
            </div>
          </div>
          <span style={{ color: "var(--text2)", fontSize: "0.86rem" }}>Conseils simples pour bien manger et rester en forme au Sénégal.</span>
        </div>

        <div className="card-grid" style={{ gap: 16 }}>
          <div className="info-card" style={{ padding: 20 }}>
            <div className="card-label">🍽️ Idées de repas sains</div>
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              {mealIdeas.map((meal, index) => (
                <div key={index} style={{ padding: 14, borderRadius: 14, background: "var(--input-bg)", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    {meal.webp || meal.img ? (
                      <picture>
                        {meal.webp && <source srcSet={meal.webp} type="image/webp" />}
                        <img src={meal.img} alt={meal.title} style={{ width: 56, height: 44, objectFit: "cover", borderRadius: 8 }} loading="lazy" />
                      </picture>
                    ) : null}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 22 }}>{meal.emoji}</span>
                        <strong>{meal.title}</strong>
                      </div>
                      <div style={{ color: "var(--text3)", fontSize: "0.85rem", marginTop: 6 }}>{meal.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card" style={{ padding: 20 }}>
            <div className="card-label">💡 Conseils nutrition</div>
            <ul style={{ marginTop: 14, paddingLeft: 18, color: "var(--text3)", lineHeight: 1.7 }}>
              {nutritionTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="section-box" style={{ marginTop: 20 }}>
        <div className="section-header">
          <div className="section-title">🩺 Conseils santé</div>
          <span style={{ color: "var(--text2)", fontSize: "0.86rem" }}>Routines simples pour protéger ta santé au quotidien.</span>
        </div>
        <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
          {healthTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="transaction-item" style={{ alignItems: "center" }}>
                <div className="tx-icon" style={{ background: "#d1fae5" }}><Icon size={18} color="#15803d" /></div>
                <div className="tx-info">
                  <div className="tx-name">{tip.title}</div>
                  <div className="tx-cat" style={{ color: "var(--text3)" }}>{tip.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-box" style={{ marginTop: 20 }}>
        <div className="section-header">
          <div className="section-title">📌 À retenir</div>
          <span style={{ color: "var(--text2)", fontSize: "0.86rem" }}>Petits changements, grands résultats.</span>
        </div>
        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <div className="tag tag-green">Mange coloré : plus de légumes et fruits locaux.</div>
          <div className="tag tag-yellow">Mange moins salé et moins sucré.</div>
          <div className="tag tag-blue">Bouge au moins 30 min par jour.</div>
        </div>
      </div>

      <div className="section-box" style={{ marginTop: 20 }}>
        <div className="section-header">
          <div className="section-title">🗓️ Plan alimentaire hebdomadaire</div>
          <span style={{ color: "var(--text2)", fontSize: "0.86rem" }}>Un exemple de menus simples et équilibrés pour chaque jour.</span>
        </div>
        <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
          {weeklyPlan.map((item, index) => (
            <div key={index} style={{ padding: 14, borderRadius: 14, background: "var(--input-bg)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <strong>{item.day}</strong>
                <span style={{ color: "var(--primary)", fontSize: "0.9rem" }}>Menu santé</span>
              </div>
              <div style={{ color: "var(--text3)" }}>{item.menu}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-box" style={{ marginTop: 20 }}>
        <div className="section-header">
          <div className="section-title">🍲 {t("Recettes locales recommandées", "Ñeenti lekkool yu Senegaal")}</div>
          <span style={{ color: "var(--text2)", fontSize: "0.86rem" }}>{t("Des recettes simples, nourrissantes et inspirées du Sénégal.", "Ñaari recette yu wér, bu ñu mën a lekk ci Senegaal.")}</span>
        </div>
        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          {recipes.map((recipe, index) => (
            <div key={index} style={{ display: "flex", gap: 12, padding: 14, borderRadius: 14, background: "var(--input-bg)", border: "1px solid var(--border)" }}>
              {recipe.webp || recipe.img ? (
                <picture>
                  {recipe.webp && <source srcSet={recipe.webp} type="image/webp" />}
                  <img src={recipe.img} alt={recipe.title} style={{ width: 110, height: 80, objectFit: "cover", borderRadius: 8 }} loading="lazy" />
                </picture>
              ) : null}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{recipe.title}</div>
                  <div style={{ fontSize: 0.85 + "rem", color: "var(--text3)" }}>{recipe.portions} pers · {recipe.calories} kcal</div>
                </div>
                <div style={{ color: "var(--text3)", marginBottom: 8 }}>{recipe.desc}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="period-btn" onClick={() => setOpenRecipe(openRecipe === index ? null : index)}>{openRecipe === index ? t("Fermer", "Tëdd") : t("Voir recette", "Nekk ci recette")}</button>
                  <div style={{ alignSelf: "center", color: "var(--text2)" }}>{recipe.regions.join(", ")}</div>
                </div>
                {openRecipe === index && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>{t("Ingrédients", "Lëngëru")}</div>
                    <ul style={{ paddingLeft: 18, color: "var(--text3)", marginBottom: 10 }}>
                      {recipe.ingredients.map((ing, i) => (<li key={i}>{ing}</li>))}
                    </ul>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>{t("Étapes", "Njàngat")}</div>
                    <ol style={{ paddingLeft: 18, color: "var(--text3)" }}>
                      {recipe.steps.map((s, i) => (<li key={i} style={{ marginBottom: 6 }}>{s}</li>))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
