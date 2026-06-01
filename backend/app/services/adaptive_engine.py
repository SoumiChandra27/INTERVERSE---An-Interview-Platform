
# UPDATE DIFFICULTY
def update_difficulty(
    current_level,
    recent_scores
):
    print("=================================")
    print("UPDATING DIFFICULTY")
    print("CURRENT LEVEL:", current_level)
    print("RECENT SCORES:", recent_scores)
    print("=================================")


    # DEFAULT LEVELS


    levels = [
        "easy",
        "medium",
        "hard"
    ]


    # INVALID CURRENT LEVEL


    if current_level not in levels:
        print("INVALID LEVEL")
        return "easy"


    # NO SCORES


    if len(recent_scores) == 0:
        print("NO SCORES FOUND")
        return current_level


    # CLEAN SCORES


    cleaned_scores = []
    for score in recent_scores:
        try:
            cleaned_scores.append(
                float(score)
            )
        except:
            pass


    # STILL EMPTY


    if len(cleaned_scores) == 0:
        print("INVALID SCORES")
        return current_level


    # CALCULATE AVERAGE


    avg = sum(cleaned_scores) / len(cleaned_scores)
    print("AVERAGE SCORE:", avg)


    # CURRENT INDEX


    current_index = levels.index(
        current_level
    )


    # MOVE TO HARDER LEVEL


    if avg >= 0.70:
        if current_index < len(levels) - 1:
            new_level = levels[
                current_index + 1
            ]
            print(
                "LEVEL INCREASED TO:",
                new_level
            )
            return new_level


    # MOVE TO EASIER LEVEL


    elif avg <= 0.40:
        if current_index > 0:
            new_level = levels[
                current_index - 1
            ]
            print(
                "LEVEL DECREASED TO:",
                new_level
            )
            return new_level


    # KEEP SAME LEVEL


    print(
        "LEVEL REMAINS:",
        current_level
    )
    print("=================================")
    return current_level