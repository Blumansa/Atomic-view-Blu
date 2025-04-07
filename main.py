from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import io
import os

app = Flask(__name__)

@app.route("/")
def accueil():
    return "✅ Atomic View Mansa online."

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        image = request.files.get("screenshot")
        if not image:
            return jsonify({"erreur": "Aucun fichier reçu"}), 400

        image_bytes = image.read()
        img = Image.open(io.BytesIO(image_bytes))
        texte = pytesseract.image_to_string(img)

        print("OCR détecté :", texte)

        if "EURUSD" in texte:
            paire = "EURUSD"
        elif "GBPUSD" in texte:
            paire = "GBPUSD"
        elif "NAS100" in texte:
            paire = "NAS100"
        elif "
