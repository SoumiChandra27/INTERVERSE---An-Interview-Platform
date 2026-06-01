# app/database/db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import (
    sessionmaker
)
from sqlalchemy.ext.declarative import (
    declarative_base
)
# SQLITE DATABASE URL
DATABASE_URL = "sqlite:///./intervrse.db"
# ENGINE
engine = create_engine(
    DATABASE_URL,
    connect_args={
        "check_same_thread": False
    }
)
# SESSION
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
# BASE
Base = declarative_base()