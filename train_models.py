import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
import pickle
from preprocess import preprocess_data

df = preprocess_data('../data/api_metricss.csv')

X_reg = df[['traffic_count', 'error_rate', 'uptime', 'cpu_usage', 'memory_usage', 'disk_io', 'concurrent_users']]
y_reg = df['response_time']

X_train_reg, X_test_reg, y_train_reg, y_test_reg = train_test_split(X_reg, y_reg, test_size=0.2, random_state=42)

reg_model = LinearRegression()
reg_model.fit(X_train_reg, y_train_reg)

with open('../models/regression_model.pkl', 'wb') as f:
    pickle.dump(reg_model, f)

X_clf = df[['response_time', 'traffic_count', 'uptime', 'cpu_usage', 'memory_usage', 'disk_io', 'concurrent_users']]
y_clf = (df['error_rate'] > 0).astype(int) 

X_train_clf, X_test_clf, y_train_clf, y_test_clf = train_test_split(X_clf, y_clf, test_size=0.2, random_state=42)

clf_model = LogisticRegression()
clf_model.fit(X_train_clf, y_train_clf)

with open('../models/classification_model.pkl', 'wb') as f:
    pickle.dump(clf_model, f)
