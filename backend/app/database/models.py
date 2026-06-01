# app/database/models.py


# SQLALCHEMY IMPORTS

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    ForeignKey,
    DateTime
)
from sqlalchemy.orm import relationship
from datetime import datetime


# DATABASE BASE


from app.database.db import Base


# USER TABLE


class User(Base):
    __tablename__ = "users"
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    name = Column(
        String,
        nullable=False
    )
    email = Column(
        String,
        unique=True,
        nullable=False
    )
    password = Column(
        String,
        nullable=False
    )
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
    # Relationship
    sessions = relationship(
        "InterviewSession",
        back_populates="user"
    )
    phone = Column(String, nullable=True)
    education = Column(String, nullable=True)
    address = Column(String, nullable=True)
    skills = Column(String, nullable=True)
    college = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    github = Column(String, nullable=True)
    resume = Column(String, nullable=True)
    profile_image = Column(String, nullable=True)
# INTERVIEW SESSION TABLE
class InterviewSession(Base):
    __tablename__ = "interview_sessions"
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )
    domain = Column(String)
    duration = Column(Integer, default=1)
    current_difficulty = Column(String)
    # ACTIVE QUESTION TRACKING
    current_question = Column(String)
    current_question_id = Column(Integer)
    expected_answers = Column(String)
    # SCORE TRACKING
    total_score = Column(
        Float,
        default=0
    )
    interview_finished = Column(
        Boolean,
        default=False
    )
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
    # RELATIONSHIPS
    user = relationship(
        "User",
        back_populates="sessions"
    )
    responses = relationship(
        "Response",
        back_populates="session"
    )


# RESPONSE TABLE


class Response(Base):
    __tablename__ = "responses"
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    session_id = Column(
        Integer,
        ForeignKey("interview_sessions.id")
    )
    question = Column(String)
    answer = Column(String)
    score = Column(Float)
    difficulty = Column(String)
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
    # Relationship
    session = relationship(
        "InterviewSession",
        back_populates="responses"
    )
    

# QUESTION TABLE


class Question(Base):
    __tablename__ = "questions"
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    question = Column(
        String,
        nullable=False
    )
    answer = Column(
        String,
        nullable=False
    )
    category = Column(
        String,
        nullable=False
    )
    difficulty = Column(
        String,
        nullable=False
    )
    