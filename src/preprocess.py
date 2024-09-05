import pandas as pd
from sklearn.preprocessing import StandardScaler

def preprocess_data(file_path):
    df = pd.read_csv(file_path)

    numeric_columns = df.select_dtypes(include=['number']).columns
    df[numeric_columns] = df[numeric_columns].fillna(df[numeric_columns].mean())

    scaler = StandardScaler()
    df[['response_time', 'traffic_count', 'cpu_usage', 'memory_usage', 'disk_io', 'concurrent_users']] = scaler.fit_transform(
        df[['response_time', 'traffic_count', 'cpu_usage', 'memory_usage', 'disk_io', 'concurrent_users']])

    return df
