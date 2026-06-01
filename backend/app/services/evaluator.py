# IMPORTS

import csv
import os
from sklearn.metrics.pairwise import (
    cosine_similarity
)
from app.ai.model import (
    sbert_model,
    nli_model
)

# EVALUATE ANSWER

def evaluate_answer(
    expected_list,
    candidate
):
    

    # DEFAULT VALUES
    

    best_similarity = 0
    best_label = "NEUTRAL"
    best_expected = ""
    

    # CLEAN USER ANSWER
    

    candidate = str(candidate).strip()
    

    # CHECK ALL EXPECTED ANSWERS
    

    for expected in expected_list:


        # CLEAN EXPECTED


        expected = str(expected).strip()


        # SBERT EMBEDDINGS


        embeddings = sbert_model.encode([
            expected,
            candidate
        ])


        # COSINE SIMILARITY


        similarity = cosine_similarity(
            [embeddings[0]],
            [embeddings[1]]
        )[0][0]


        # LIMIT SCORE BETWEEN 0 AND 1


        similarity = max(
            0,
            min(float(similarity), 1)
        )


        # LENGTH PENALTY


        len_expected = len(
            expected.split()
        )
        len_candidate = len(
            candidate.split()
        )
        if max(
            len_expected,
            len_candidate
        ) > 0:
            len_ratio = min(
                len_expected,
                len_candidate
            ) / max(
                len_expected,
                len_candidate
            )
            similarity *= (
                0.8 + 0.2 * len_ratio
            )


        # AGAIN LIMIT BETWEEN 0 AND 1


        similarity = max(
            0,
            min(float(similarity), 1)
        )


        # NLI MODEL


        result = nli_model(
            f"{expected} </s></s> {candidate}"
        )
        label = result[0]["label"]


        # BEST MATCH

        if similarity > best_similarity:
            best_similarity = similarity
            best_label = label
            best_expected = expected
    
    # VERY SHORT ANSWER CHECK
    

    candidate_words = len(
        candidate.split()
    )
    if candidate_words <= 2:
        if best_similarity < 0.85:
            final = "Incorrect"
        else:
            final = "Partially Correct"
    

    # NORMAL EVALUATION
    

    else:
        if best_label == "CONTRADICTION":
            final = "Incorrect"
        elif (
            best_label == "ENTAILMENT"
            and best_similarity > 0.75
        ):
            final = "Correct"
        elif best_similarity >= 0.80:
            final = "Correct"
        elif best_similarity >= 0.55:
            final = "Partially Correct"
        else:
            final = "Incorrect"
    

    # GENERATE FEEDBACK
    

    if final == "Correct":
        feedback = (
            "Your answer is correct and conceptually accurate."
            "Very good performance but you need more improvement."
        )
    elif final == "Partially Correct":
        feedback = (
            "Your answer is partially correct but missing some important details. "
            "Good performance but needs more improvement in some areas."
        )
    else:
        feedback = (
            "Needs significant improvement. "
            "Try to explain the core idea more clearly."
        )
    

    # SCORE %
    

    score_percent = float(
        round(
            float(best_similarity) * 100,
            2
        )
    )
    

    # SCORE OUT OF 10
    

    score_out_of_10 = round(
        best_similarity * 10,
        1
    )
    

    # EXPECTED LABEL
    

    if best_similarity >= 0.75:
        expected_label = 1
    else:
        expected_label = 0
    

    # PREDICTED LABEL
    

    if final == "Correct":
        predicted_label = 1
    else:
        predicted_label = 0
    

    # CSV FILE
    

    csv_file = "evaluation_dataset.csv"
    file_exists = os.path.isfile(
        csv_file
    )
    

    # SAVE DATASET
    

    with open(
        csv_file,
        mode="a",
        newline="",
        encoding="utf-8"
    ) as file:
        writer = csv.writer(file)


        # HEADER


        if not file_exists:
            writer.writerow([
                "expected_answer",
                "user_answer",
                "similarity_score",
                "expected_label",
                "predicted_label"
            ])


        # DATA


        writer.writerow([
            best_expected,
            candidate,
            score_percent,
            expected_label,
            predicted_label
        ])
    

    # AI STYLE RESPONSE
    

    ai_response = f"""
Result : {final}
Evaluation Score : {score_out_of_10}/10
Feedback :
{feedback}
Expected Answer :
{best_expected}
"""
    

    # RETURN RESULT
    

    return {
        "result":
        final,
        "similarity":
        float(best_similarity),
        "score":
        score_percent,
        "score_out_of_10":
        score_out_of_10,
        "predicted_label":
        predicted_label,
        "nli":
        best_label,
        "matched_answer":
        best_expected,
        "feedback":
        feedback,
        "ai_response":
        ai_response
    }