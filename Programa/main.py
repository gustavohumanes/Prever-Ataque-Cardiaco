from sklearn.linear_model import LogisticRegressionCV
import pandas as pd
import numpy as np

url = 'https://raw.githubusercontent.com/gustavohumanes/Prever-IBC-dos-municipios/refs/heads/main/DataSet/heart_failure_clinical_records_dataset.csv'

Data_Set_HeartFailure = pd.read_csv(url)



"""
Thoughts I had in development

#Como eu vou lidar com os dados binários e numéricos?
idade, anemia, creatina_fosfoquinase, diabetes, fracao_de_ejecao, pressao_alta, plaquetas, creatinina_serica, sodio_serico, sexo, tabagismo, tempo, eventode_obito

Eu quero um jeito de tratar esses dados binários e numéricos de alguma forma, será que o modelo faz isso?

O modelo LogisticRegressionCV consegue lidar com os dados binários e numéricos simultaneamente, mas será ainda melhor se eu consegui escalonar tudo isso com um StandardScale e MinMaxScaler.
"""