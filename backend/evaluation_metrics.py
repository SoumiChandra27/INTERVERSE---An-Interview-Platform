from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)
import pandas as pd


# LOAD CSV


df = pd.read_csv(
    "evaluation_dataset.csv"
)


# LABELS


y_true = df["expected_label"]
y_pred = df["predicted_label"]


# METRICS


accuracy = accuracy_score(
    y_true,
    y_pred
)
precision = precision_score(
    y_true,
    y_pred
)
recall = recall_score(
    y_true,
    y_pred
)
f1 = f1_score(
    y_true,
    y_pred
)

# OUTPUT


print("\n")
print("MODEL EVALUATION RESULTS : \n")
print(
    f"Accuracy  : {accuracy:.2f}"
)
print(
    f"Precision : {precision:.2f}"
)
print(
    f"Recall    : {recall:.2f}"
)
print(
    f"F1 Score  : {f1:.2f}"
)
print("\nConfusion Matrix:\n")
print(
    confusion_matrix(
        y_true,
        y_pred
    )
)
print("\n")