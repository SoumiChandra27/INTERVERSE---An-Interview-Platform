

# IMPORTS


import json
from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from sqlalchemy.orm import Session
from app.core.dependencies import (
    verify_token
)
from app.database.db import SessionLocal
from app.database.models import (
    InterviewSession,
    Response
)
from app.schemas.interview_schema import (
    StartInterviewRequest,
    AnswerRequest
)
from app.services.question_service import (
    get_unique_question
)
from app.services.evaluator import (
    evaluate_answer
)
from app.services.adaptive_engine import (
    update_difficulty
)


# ROUTER


router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)


# DATABASE SESSION


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# START INTERVIEW


@router.post("/start")
def start_interview(
    req: StartInterviewRequest,
    user=Depends(verify_token),
    db: Session = Depends(get_db)
):
    print("=================================")
    print("START INTERVIEW CALLED")
    print("DOMAIN:", req.domain)
    print("=================================")
    

    # CREATE SESSION
    

    session = InterviewSession(
    user_id=user["id"],
    domain=req.domain,
    duration=req.duration,
    current_difficulty="easy"
)
    db.add(session)
    db.commit()
    db.refresh(session)
    return {
        "message":
        "Interview started",
        "session_id":
        session.id,
        "difficulty":
        "easy"
    }


# GET QUESTION


@router.get("/question/{session_id}")
def get_question(
    session_id: int,
    user=Depends(verify_token),
    db: Session = Depends(get_db)
):
    

    # FIND SESSION
    

    session = db.query(
        InterviewSession
    ).filter(
        InterviewSession.id == session_id
    ).first()
    

    # SESSION NOT FOUND
    

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Session not found"
        )
    

    # SECURITY CHECK
    

    if session.user_id != user["id"]:
        raise HTTPException(
            status_code=403,
            detail="Unauthorized access"
        )
    print("=================================")
    print("GET QUESTION CALLED")
    print("SESSION:", session_id)
    print("DOMAIN:", session.domain)
    print("DIFFICULTY:", session.current_difficulty)
    print("=================================")
    

    # INTERVIEW FINISHED
    

    if session.interview_finished:
        raise HTTPException(
            status_code=400,
            detail="Interview already finished"
        )
    

    # PREVIOUS RESPONSES
    

    previous = db.query(Response).filter(
        Response.session_id == session_id
    ).all()
    

    # MAX QUESTIONS
    

    MAX_QUESTIONS = 10
    if len(previous) >= MAX_QUESTIONS:
        session.interview_finished = True
        db.commit()
        raise HTTPException(
            status_code=400,
            detail="Interview completed"
        )
    

    # PREVIOUS QUESTIONS
    

    asked_questions = [
        r.question
        for r in previous
    ]
    

    # FETCH QUESTION
    

    question = get_unique_question(
        session.domain,
        session.current_difficulty,
        asked_questions
    )
    

    # NO QUESTIONS FOUND
    

    if not question:
        session.interview_finished = True
        db.commit()
        raise HTTPException(
            status_code=404,
            detail=(
                f"No questions found for "
                f"domain '{session.domain}' "
                f"and difficulty "
                f"'{session.current_difficulty}'"
            )
        )
    print("QUESTION FOUND:")
    print(question)
    

    # STORE ACTIVE QUESTION
    

    session.current_question = (
        question["question"]
    )
    session.current_question_id = (
        question["id"]
    )
    session.expected_answers = json.dumps(
        question["answers"]
    )
    db.commit()
    

    # RETURN QUESTION
    

    return {
        "id":
        question["id"],
        "question":
        question["question"],
        "difficulty":
        question["difficulty"],
        "question_number":
        len(previous) + 1
    }


# SUBMIT ANSWER


@router.post("/answer")
def submit_answer(
    req: AnswerRequest,
    user=Depends(verify_token),
    db: Session = Depends(get_db)
):
    

    # FIND SESSION
    

    session = db.query(
        InterviewSession
    ).filter(
        InterviewSession.id == req.session_id
    ).first()
    

    # SESSION NOT FOUND
    

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Session not found"
        )
    

    # SECURITY CHECK
    

    if session.user_id != user["id"]:
        raise HTTPException(
            status_code=403,
            detail="Unauthorized access"
        )
    

    # INTERVIEW FINISHED
    

    if session.interview_finished:
        raise HTTPException(
            status_code=400,
            detail="Interview already finished"
        )
    

    # NO ACTIVE QUESTION
    

    if not session.expected_answers:
        raise HTTPException(
            status_code=400,
            detail="No active question"
        )
    

    # LOAD ANSWERS
    

    answers = json.loads(
        session.expected_answers
    )
    print("=================================")
    print("USER ANSWER:")
    print(req.user_answer)
    print("EXPECTED ANSWERS:")
    print(answers)
    print("=================================")
    

    # EVALUATE ANSWER
    

    evaluation = evaluate_answer(
        answers,
        req.user_answer
    )
    print("=================================")
    print("EVALUATION RESULT:")
    print(evaluation)
    print("=================================")
    

    # SAVE RESPONSE
    

    response = Response(
        session_id=req.session_id,
        question=session.current_question,
        answer=req.user_answer,
        score=evaluation['similarity'],
        difficulty=session.current_difficulty
    )
    db.add(response)
    

    # UPDATE TOTAL SCORE
    

    session.total_score += (
        evaluation['similarity']
    )
    

    # RECENT SCORES
    

    previous = db.query(Response).filter(
        Response.session_id == req.session_id
    ).all()
    recent_scores = [
        r.score
        for r in previous[-2:]
    ]
    recent_scores.append(
        evaluation['similarity']
    )
    

    # UPDATE DIFFICULTY
    

    new_level = update_difficulty(
        session.current_difficulty,
        recent_scores
    )
    session.current_difficulty = new_level
    

    # CLEAR ACTIVE QUESTION
    

    session.current_question = None
    session.current_question_id = None
    session.expected_answers = None
    db.commit()
    

    # RETURN RESPONSE
    

    return {
        "result":
        evaluation['result'],
        "similarity":
        evaluation['similarity'],
        "score":
        evaluation['score'],
        "nli":
        evaluation['nli'],
        "difficulty":
        new_level,
        "matched_answer":
        evaluation['matched_answer'],
        "feedback":
        evaluation['feedback'],
        "ai_response":
        evaluation['ai_response']
    }

# FINISH INTERVIEW


@router.post("/finish/{session_id}")
def finish_interview(
    session_id: int,
    user=Depends(verify_token),
    db: Session = Depends(get_db)
):
    

    # FIND SESSION
    

    session = db.query(
        InterviewSession
    ).filter(
        InterviewSession.id == session_id
    ).first()
    

    # SESSION NOT FOUND
    
    if not session:
        raise HTTPException(
            status_code=404,
            detail="Session not found"
        )
    

    # SECURITY CHECK
    

    if session.user_id != user["id"]:
        raise HTTPException(
            status_code=403,
            detail="Unauthorized access"
        )
    

    # GET RESPONSES
    

    responses = db.query(Response).filter(
        Response.session_id == session_id
    ).all()
    total_questions = len(responses)
    average_score = 0
    if total_questions > 0:
        average_score = (
            session.total_score
            / total_questions
        )
    

    # FEEDBACK
    

    if average_score >= 0.8:
        feedback = (
            "Your answer is almost correct. "
            "Very good performance but you need more improvement."
        )
    elif average_score >= 0.5:
        feedback = (
            "Your answer is partially correct but missing some important details. "
            "Good performance but needs more improvement in some areas."
        )
    else:
        feedback = (
            "Needs significant improvement. "
            "Try to explain the core idea more clearly. "
        )
    

    # MARK FINISHED
    

    session.interview_finished = True
    db.commit()
    print("INTERVIEW FINISHED")
    print("AVG SCORE:", average_score)
    print("FEEDBACK:", feedback)
    

    # RETURN RESULT
    

    return {
        "total_questions":
        total_questions,
        "average_score":
        round(average_score * 100, 2),
        "difficulty_reached":
        session.current_difficulty,
        "feedback":
        feedback
    }