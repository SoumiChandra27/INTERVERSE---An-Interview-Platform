import pandas as pd
from app.database.db import SessionLocal
from app.database.models import Question
import ast
db = SessionLocal()
# LOAD CSV
df = pd.read_csv(
    "data/Interview1 dataset.csv",
    encoding="latin-1"
)
df.columns = [
    "id",
    "question",
    "answer",
    "category",
    "difficulty"
]
for _, row in df.iterrows():
    question = Question(
        question=str(row["question"]),
        answer=str(row["answer"]),
        category=str(row["category"]).lower(),
        difficulty=str(row["difficulty"]).lower()
    )
    db.add(question)
db.commit()
print("Questions imported successfully")