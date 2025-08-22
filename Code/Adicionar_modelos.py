from sklearn.linear_model import LogisticRegressionCV
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np
import pickle
import os

# Cria pasta 'Programa' se não existir
os.makedirs("Programa", exist_ok=True)

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

# Escalona os dados
X_scaled = scaler.fit_transform(X)

# Treina o modelo
modelo.fit(X_scaled, y)

# Salva o modelo treinado
with open("Programa/Modelo_de_prever_AtaqueCardiaco.pkl", "wb") as f_modelo:
    pickle.dump(modelo, f_modelo)

# Salva o scaler
with open("Programa/Scaler_AtaqueCardiaco.pkl", "wb") as f_scaler:
    pickle.dump(scaler, f_scaler)

print("✅ Modelo e scaler salvos com sucesso na pasta 'Programa'.")