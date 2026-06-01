# IMPORTS
import pandas as pd
import random
import ast
import os


# BASE DIRECTORY


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)


# DATASET PATH


file_path = os.path.join(
    BASE_DIR,
    "data",
    "Interview1 dataset.csv"
)


# LOAD DATASET


try:
    df = pd.read_csv(
        file_path,
        encoding="latin-1"
    )
    print("=================================")
    print("DATASET LOADED SUCCESSFULLY")
    print("=================================")
except Exception as e:
    print("=================================")
    print("DATASET LOAD ERROR")
    print(e)
    print("=================================")
    df = pd.DataFrame()


# VALIDATE DATASET


if len(df.columns) >= 5:
    df = df.iloc[:, :5]
    df.columns = [
        "id",
        "question",
        "answer",
        "category",
        "difficulty"
    ]
else:
    print("INVALID DATASET FORMAT")


# CLEAN DATA


df["question"] = (
    df["question"]
    .fillna("")
    .astype(str)
    .str.strip()
)
df["answer"] = (
    df["answer"]
    .fillna("")
    .astype(str)
    .str.strip()
)
df["category"] = (
    df["category"]
    .fillna("")
    .astype(str)
    .str.strip()
    .str.lower()
)
df["difficulty"] = (
    df["difficulty"]
    .fillna("easy")
    .astype(str)
    .str.strip()
    .str.lower()
)


# REMOVE INVALID ROWS


df = df[
    df["question"] != ""
]
df = df[
    df["category"] != ""
]


# RESET INDEX


df = df.reset_index(
    drop=True
)


# DEBUG INFO


print("TOTAL QUESTIONS:", len(df))
print("AVAILABLE DOMAINS:")
print(
    sorted(
        df["category"]
        .unique()
        .tolist()
    )
)
print("=================================")


# GET ALL DOMAINS


def get_domains():
    try:
        domains = (
            df["category"]
            .dropna()
            .unique()
            .tolist()
        )
        return sorted(domains)
    except Exception as e:
        print("GET DOMAIN ERROR")
        print(e)
        return []


# PARSE ANSWERS


def parse_answers(answer_data):
    try:
        parsed = ast.literal_eval(
            str(answer_data)
        )
        if isinstance(parsed, list):
            return [
                str(a).strip()
                for a in parsed
            ]
        return [str(parsed)]
    except:
        return [
            str(answer_data)
        ]


# GET UNIQUE QUESTION

def get_unique_question(
    domain,
    difficulty,
    asked_questions
):
    print("FETCHING QUESTION")
    print("DOMAIN:", domain)
    print("DIFFICULTY:", difficulty)
    print("ASKED:", len(asked_questions))
    try:


        # CLEAN INPUTS


        domain = str(domain).strip().lower()
        difficulty = str(
            difficulty
        ).strip().lower()


        # FILTER DOMAIN


        filtered = df[
            df["category"]
            == domain
        ]
        print("DOMAIN MATCH:", len(filtered))


        # IF DOMAIN EMPTY


        if len(filtered) == 0:
            print("NO DOMAIN MATCH")
            return None


        # FILTER DIFFICULTY


        difficulty_filtered = filtered[
            filtered["difficulty"]
            == difficulty
        ]
        print(
            "DIFFICULTY MATCH:",
            len(difficulty_filtered)
        )


        # FALLBACK IF NO DIFFICULTY MATCH


        if len(difficulty_filtered) > 0:
            filtered = difficulty_filtered


        # REMOVE ASKED QUESTIONS


        filtered = filtered[
            ~filtered["question"]
            .isin(asked_questions)
        ]
        print(
            "AFTER REMOVE ASKED:",
            len(filtered)
        )


        # NO QUESTIONS LEFT


        if len(filtered) == 0:
            print("NO QUESTIONS AVAILABLE")
            return None


        # RANDOM QUESTION


        row = filtered.sample(
            n=1
        ).iloc[0]


        # PARSE ANSWERS


        answers = parse_answers(
            row["answer"]
        )


        # FINAL OBJECT

        question_data = {
            "id":
            int(row["id"]),
            "question":
            str(row["question"]),
            "answers":
            answers,
            "difficulty":
            str(row["difficulty"])
        }
        print("QUESTION SELECTED")
        print(question_data)
        print("=================================")
        return question_data
    except Exception as e:
        print("QUESTION FETCH ERROR")
        print(e)
        print("=================================")
        return None