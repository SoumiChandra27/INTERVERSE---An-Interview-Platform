# app/ai/model.py
from sentence_transformers import (
    SentenceTransformer
)
from transformers import pipeline
# SBERT MODEL
sbert_model = SentenceTransformer(
    'all-MiniLM-L6-v2'
)
# NLI MODEL
nli_model = pipeline(
    "text-classification",
    model="roberta-large-mnli"
)