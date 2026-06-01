from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.database.models import (
    InterviewSession,
    Response
)
from app.core.dependencies import verify_token


# ROUTER


router = APIRouter(
    prefix="/history",
    tags=["History"]
)


# DATABASE


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# TEST ROUTE


@router.get("/")
def history():
    return {
        "message":
        "History route working"
    }


# GET SINGLE INTERVIEW DETAILS
# IMPORTANT:
# THIS MUST COME BEFORE /{user_id}


@router.get("/details/{session_id}")
def get_interview_details(
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
        return {
            "success": False,
            "message":
            "Interview not found"
        }
    
    # SECURITY CHECK
    

    if session.user_id != user["id"]:
        return {
            "success": False,
            "message":
            "Unauthorized"
        }
    

    # GET RESPONSES
    

    responses = db.query(
        Response
    ).filter(
        Response.session_id == session_id
    ).all()
    

    # FORMAT QUESTIONS
    

    result = []
    for r in responses:
        result.append({
            "question":
            r.question,
            "answer":
            r.answer if r.answer else "No Answer",
            "difficulty":
            r.difficulty,
            "score":
            round(float(r.score) * 10, 1),
            "feedback":
            "Excellent Answer"
            if r.score >= 0.8
            else
            "Partially Correct"
            if r.score >= 0.5
            else
            "Needs Improvement"
        })
    

    # RETURN
    

    return {
        "success": True,
        "id":
        session.id,
        "domain":
        session.domain,
        "duration":
        session.duration,
        "difficulty":
        session.current_difficulty,
        "total_score":
        round(float(session.total_score), 1),
        "date":
        session.created_at,
        "questions":
        result
    }


# GET USER HISTORY


@router.get("/{user_id}")
def get_history(
    user_id: int,
    user=Depends(verify_token),
    db: Session = Depends(get_db)
):
    

    # SECURITY
    

    if user["id"] != user_id:
        return {
            "success": False,
            "message":
            "Unauthorized"
        }
    

    # GET SESSIONS
    

    sessions = db.query(
        InterviewSession
    ).filter(
        InterviewSession.user_id == user_id
    ).all()
    

    # FORMAT HISTORY
    

    history = []
    for s in sessions:
        history.append({
            "id":
            s.id,
            "domain":
            s.domain,
            "score":
            round(float(s.total_score), 1),
            "difficulty":
            s.current_difficulty,
            "duration":
            s.duration,
            "date":
            s.created_at,
            "finished":
            s.interview_finished
        })
    

    # RETURN
    

    return {
        "success": True,
        "history":
        history
    }