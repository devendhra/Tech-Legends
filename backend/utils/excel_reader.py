import pandas as pd

def extract_excel_text(file):
    df = pd.read_excel(file)
    feedbacks = []
    for col in df.columns:
        feedbacks.extend(df[col].dropna().astype(str).tolist())
    return feedbacks
