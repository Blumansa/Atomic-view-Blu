console.log("✅ script.js bien chargé !");

async function analyserScreenshot() {
  const fichier = document.getElementById("screenshot").files[0];
  const cotActive = document.getElementById("cotToggle").checked;
  const resultatDiv = document.getElementById("resultat");

  if (!fichier) {
    alert("Merci de sélectionner un screenshot !");
    return;
  }

  const formData = new FormData();
  formData.append("screenshot", fichier);

  resultatDiv.innerHTML = "⏳ Analyse en cours...";

  try {
    const response = await fetch(`/analyze?cot=${cotActive}`, {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Réponse non valide (pas du JSON).");
    }

    const data = await response.json();

    if (data.erreur) {
      resultatDiv.innerHTML = `❌ Erreur IA : ${data.erreur}`;
      return;
    }

    let resultat = `
      🧠 <strong>Analyse IA : Atomic Mansa v2.1</strong><br><br>
      📍 <strong>Paire détectée :</strong> ${data.paire}<br>
      ⏱ <strong>Timeframe :</strong> ${data.timeframe}<br>
      🧭 <strong>Signal visuel :</strong> ${data.signal}<br><br>

      📉 Structure : ${data.structure}<br>
      ⚡ CISD : ${data.cisd}<br>
      💧 Liquidité : ${data.liquidity}<br>
      🧱 OB : ${data.ob}<br>
      📊 Volume : ${data.volume}<br><br>

      📌 <strong>Recommandation :</strong><br>
      Type d'ordre : ${data.ordre}<br>
      Zone d’entrée : ${data.entry_zone}<br>
      SL : ${data.sl}<br>
      TP : ${data.tp}<br><br>

      Justification : ${data.justification}<br>
      🔒 Probabilité : ${data.probabilite}<br><br>
    `;

    if (data.blu_cot) {
      resultat += `📊 <strong>BLU COT™ :</strong> ${data.blu_cot.commentaire}<br>`;
    }

    resultatDiv.innerHTML = resultat;

  } catch (error) {
    console.error("Erreur d’analyse :", error);
    resultatDiv.innerHTML = `❌ Erreur : ${error.message}`;
  }
}
