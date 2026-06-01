# FASTAPI IMPORTS

from fastapi import FastAPI
from fastapi.middleware.cors import (
    CORSMiddleware
)


# DATABASE
from app.database.db import (
    engine
)
from app.database.models import (
    Base
)


# ROUTES
from app.routes import history
from app.routes import auth
from app.routes import interview
from app.routes import history
from app.routes import domain
from app.database.models import *
from app.database.contact_model import ContactMessage


# CREATE TABLES
Base.metadata.create_all(bind=engine)


# FASTAPI APP
app = FastAPI(
    title="Intervrse AI Interview API"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ROOT ROUTE
@app.get("/")
def root():
    return {
        "message":
        "Intervrse Backend Running"
    }


# AUTH ROUTES
app.include_router(
    auth.router
)


# INTERVIEW ROUTES
app.include_router(
    interview.router
)


# HISTORY ROUTES
app.include_router(
    history.router
)


# DOMAIN ROUTES
app.include_router(
    domain.router
)
app.include_router(history.router)
from app.routes import profile
app.include_router(profile.router)
from app.routes.contact_routes import router as contact_router
app.include_router(contact_router)
