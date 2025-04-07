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

    if (
