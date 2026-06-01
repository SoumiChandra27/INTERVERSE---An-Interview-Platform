# app/schemas/interview_schema.py
from pydantic import BaseModel


# START INTERVIEW


class StartInterviewRequest(BaseModel):
    user_id: int
    domain: str
    duration: int
    voice_enabled: bool = True


# ANSWER REQUEST


class AnswerRequest(BaseModel):
    session_id: int
    user_answer: str