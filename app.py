# Importações necessárias
from flask import Flask, request, jsonify, send_from_directory  # Flask e funções para manipular requisições e servir arquivos
import joblib   # Para carregar modelos e scalers salvos
import numpy as np  # Para manipulação de arrays numéricos
import os       # Para manipulação de caminhos de arquivos (não usado diretamente aqui)

# ===============================
# Instanciação da aplicação Flask
# ===============================
app = Flask(__name__)  # Cria o objeto da aplicação Flask

# ===============================
# Carregamento do modelo e scaler
# ===============================
modelo = joblib.load("Models/Modelo_de_prever_AtaqueCardiaco.pkl")  # Carrega o modelo treinado
scaler = joblib.load("Models/Scaler_AtaqueCardiaco.pkl")            # Carrega o scaler usado no treino

# ===============================
# Rota para servir o HTML (frontend)
# ===============================
@app.route("/")  # Define a URL raiz
def index():
    # Retorna o arquivo index.html da pasta "web"
    return send_from_directory("web", "index.html")

# ===============================
# Rota para servir arquivos estáticos (JS, CSS, imagens)
# ===============================
@app.route("/<path:filename>")  # Recebe qualquer caminho de arquivo
def base_static(filename):
    # Retorna o arquivo solicitado dentro da pasta "web"
    return send_from_directory("web", filename)

# ===============================
# Rota para receber respostas do usuário
# ===============================
@app.route("/salvar_respostas", methods=["POST"])  # Aceita apenas requisições POST
def salvar_respostas():
    dados = request.get_json()  # Recebe os dados enviados pelo frontend em JSON
    respostas = dados.get("respostas", [])  # Pega o array de respostas, ou vazio se não existir

    # ===============================
    # Preparação dos dados para o modelo
    # ===============================
    entrada = np.array(respostas, dtype=float).reshape(1, -1)  # Converte lista em array 2D (1 linha, várias colunas)
    entrada_scaled = scaler.transform(entrada)                # Aplica o scaler treinado para normalizar os dados

    # ===============================
    # Predição
    # ===============================
    resultado = modelo.predict(entrada_scaled)  # Retorna um array com a previsão (0 ou 1)

    # ===============================
    # Retorna o resultado para o frontend em JSON
    # ===============================
    return jsonify({
        "status": "sucesso",           # Status da requisição
        "resultado": int(resultado[0]) # Converte de numpy int para Python int (0 = sem risco, 1 = risco)
    })

# ===============================
# Executa o Flask em modo debug.
# ===============================
if __name__ == "__main__":
    app.run(debug=True)  # Roda o servidor localmente em http://127.0.0.1:5000
