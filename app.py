from flask import Flask, request, jsonify, send_from_directory
import joblib
import numpy as np
import os

app = Flask(__name__)

# Carregar modelo e scaler
modelo = joblib.load("Models/Modelo_de_prever_AtaqueCardiaco.pkl")
scaler = joblib.load("Models/Scaler_AtaqueCardiaco.pkl")

# Rota para servir o HTML (frontend)
@app.route("/")
def index():
    return send_from_directory("web", "index.html")

# Rota para servir arquivos estáticos (JS, CSS, imagens)
@app.route("/<path:filename>")
def base_static(filename):
    return send_from_directory("web", filename)

# Rota para receber respostas do usuário
@app.route("/salvar_respostas", methods=["POST"])
def salvar_respostas():
    dados = request.get_json()  # Recebe JSON do JS
    respostas = dados.get("respostas", [])

    # Converte para numpy array (precisa estar no mesmo formato do treino)
    entrada = np.array(respostas, dtype=float).reshape(1, -1)

    # Aplica o scaler
    entrada_scaled = scaler.transform(entrada)

    # Faz a previsão
    resultado = modelo.predict(entrada_scaled)

    return jsonify({
        "status": "sucesso",
        "resultado": int(resultado[0])  # ex: 0 = não, 1 = sim
    })

if __name__ == "__main__":
    app.run(debug=True)
