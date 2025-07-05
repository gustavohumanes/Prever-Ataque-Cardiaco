from sklearn.linear_model import LogisticRegressionCV
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

import pandas as pd
import numpy as np

LogisticRegression = LogisticRegressionCV()
ScalerStandard = StandardScaler()

url = 'https://raw.githubusercontent.com/gustavohumanes/Prever-IBC-dos-municipios/refs/heads/main/DataSet/heart_failure_clinical_records_dataset.csv'

Data_Set_HeartFailure = pd.read_csv(url)

X = Data_Set_HeartFailure.drop('DEATH_EVENT', axis=1)
y = Data_Set_HeartFailure['DEATH_EVENT']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

X_train_scaled = ScalerStandard.fit_transform(X_train)
y_train_scaled = ScalerStandard.fit_transform(y_train)

# Primeiros registros das features de teste
print("Primeiras linhas de X_test:")
print(X_test.head())

# Primeiros registros dos rótulos (target) de teste
print("\nPrimeiras linhas de y_test:")
print(y_test.head())

"""
Thoughts I had in development

#Como eu vou lidar com os dados binários e numéricos?
idade, anemia, creatina_fosfoquinase, diabetes, fracao_de_ejecao, pressao_alta, plaquetas, creatinina_serica, sodio_serico, sexo, tabagismo, tempo, eventode_obito

Eu quero um jeito de tratar esses dados binários e numéricos de alguma forma, será que o modelo faz isso?

O modelo LogisticRegressionCV consegue lidar com os dados binários e numéricos simultaneamente, mas será ainda melhor se eu consegui escalonar tudo isso com um StandardScale e MinMaxScaler.
"""