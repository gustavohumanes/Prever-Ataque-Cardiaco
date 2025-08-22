from sklearn.linear_model import LogisticRegressionCV
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

# Instancia os objetos do modelo e scaler
modelo = LogisticRegressionCV()
scaler = StandardScaler()

# URL do dataset
url = 'https://raw.githubusercontent.com/gustavohumanes/Prever-IBC-dos-municipios/refs/heads/main/DataSet/heart_failure_clinical_records_dataset.csv'

# Carrega o dataset
df = pd.read_csv(url)

# Define features (X) e target (y)
X = df.drop('DEATH_EVENT', axis=1)
y = df['DEATH_EVENT']

# Escalona os dados de treino e ajusta o scaler
X_scaled = scaler.fit_transform(X)

# Treina o modelo com dados escalonados
modelo.fit(X_scaled, y)

# Nomes das variáveis para input do usuário
nomes_colunas = [
    "idade",
    "anemia",
    "fosfoquinase_creatinina",
    "diabetes",
    "fracao_ejecao",
    "pressao_alta",
    "plaquetas",
    "creatinina_sanguinea",
    "sodio_sanguineo",
    "sexo",
    "fumante",
    "tempo_observacao"
]

# Coleta os valores do usuário e armazena numa lista
valores_usuario = []
for nome in nomes_colunas:
    while True:
        try:
            valor = float(input(f"Digite seu(a) {nome}: "))
            valores_usuario.append(valor)
            break
        except ValueError:
            print("Entrada inválida! Por favor, digite um número válido.")

# Transforma lista em array 2D para o scaler
dados_usuario = np.array([valores_usuario])

# Aplica a mesma escala usada no treino
dados_usuario_escalonados = scaler.transform(dados_usuario)

# Faz a predição com os dados escalonados
predicao = modelo.predict(dados_usuario_escalonados)

# Mostra o resultado para o usuário
if predicao[0] == 1:
    print("Resultado da previsão: O paciente tem alta chance de morte.")
else:
    print("Resultado da previsão: O paciente tem baixa chance de morte (está saudável).")