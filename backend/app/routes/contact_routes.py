

# IMPORTS


from fastapi import (
    APIRouter,
    Depends
)
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.database.contact_model import (
    ContactMessage
)
from app.schemas.contact_schema import (
    ContactRequest
)

# ROUTER

router = APIRouter(
    prefix="/contact",
    tags=["Contact"]
)

# DATABASE

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# SAVE CONTACT MESSAGE

@router.post("/")
def save_contact(
    req: ContactRequest,
    db: Session = Depends(get_db)
):
    print("CONTACT API CALLED")
    print(req)
    message = ContactMessage(
        name=req.name,
        email=req.email,
        message=req.message
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return {
        "message":
        "Contact message saved"
    }