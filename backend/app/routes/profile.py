from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.database.models import User
from app.core.dependencies import verify_token
router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)

# DB


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET PROFILE


@router.get("/me")
def get_profile(
    user=Depends(verify_token),
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(
        User.id == user["id"]
    ).first()
    return {
        "name": db_user.name,
        "email": db_user.email,
        "phone": db_user.phone,
        "education": db_user.education,
        "address": db_user.address,
        "skills": db_user.skills,
        "college": db_user.college,
        "linkedin": db_user.linkedin,
        "github": db_user.github,
        "resume": db_user.resume,
        "profile_image": db_user.profile_image
    }


# UPDATE PROFILE


@router.put("/update")
def update_profile(
    data: dict,
    user=Depends(verify_token),
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(
        User.id == user["id"]
    ).first()
    

    # UPDATE FIELDS
    

    db_user.name = data.get("name")
    db_user.phone = data.get("phone")
    db_user.education = data.get("education")
    db_user.address = data.get("address")
    db_user.skills = data.get("skills")
    db_user.college = data.get("college")
    db_user.linkedin = data.get("linkedin")
    db_user.github = data.get("github")
    db_user.resume = data.get("resume")
    db_user.profile_image = data.get(
        "profile_image"
    )
    

    # SAVE
    

    db.commit()
    db.refresh(db_user)
    return {
        "message":
        "Profile updated successfully",
        "profile_image":
        db_user.profile_image
    }