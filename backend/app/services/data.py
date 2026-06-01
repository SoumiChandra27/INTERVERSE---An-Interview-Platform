# app/services/data.py


# IMPORTS


import os
import ast
import re
import unicodedata
import pandas as pd


# DATASET PATH


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)
file_path = os.path.join(
    BASE_DIR,
    "data",
    "Interview1 dataset.csv"
)

# LOAD DATASET


df = pd.read_csv(
    file_path,
    encoding="latin-1"
)


# COLUMN NAMES


df.columns = [
    'id',
    'question',
    'answer',
    'category',
    'difficulty'
]


# CLEAN TEXT


def clean_text(text):
    text = str(text).lower().strip()
    # Unicode normalize
    text = unicodedata.normalize(
        "NFKD",
        text
    )
    # Remove special chars
    text = re.sub(
        r'[^a-z0-9\\s()+]',
        '',
        text
    )
    # Remove extra spaces
    text = re.sub(
        r'\\s+',
        ' ',
        text
    )
    return text.strip()


# NORMALIZED COLUMNS


df['category_clean'] = df['category'].apply(
    clean_text
)
df['difficulty_clean'] = df['difficulty'].apply(
    clean_text
)


# GET OPTIONS


def get_options():
    return (
        df['category'].unique(),
        df['difficulty'].unique()
    )