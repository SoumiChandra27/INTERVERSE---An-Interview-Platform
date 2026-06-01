from fastapi import (
    APIRouter,
    HTTPException,
    Depends
)
from sqlalchemy.orm import Session
from jose import jwt
from passlib.hash import pbkdf2_sha256
from datetime import (
    datetime,
    timedelta
)
from app.services.email_service import (
    send_reset_email
)


# DATABASE


from app.database.db import (
    SessionLocal
)
from app.database.models import (
    User
)


# SCHEMAS


from app.schemas.auth_schema import (
    SignupRequest,
    LoginRequest
)
from app.schemas.forgot_password_schema import (
    ForgotPasswordRequest,
    ResetPasswordRequest
)


# SECURITY


from app.core.security import (
    SECRET_KEY,
    hash_password,
    verify_password,
    create_access_token
)


# ROUTER


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# DATABASE SESSION


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# SIGNUP


@router.post("/signup")
def signup(
    req: SignupRequest,
    db: Session = Depends(get_db)
):
    

    # CHECK EXISTING EMAIL
    

    existing_user = db.query(User).filter(
        User.email == req.email
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )
    

    # HASH PASSWORD
    

    hashed_password = hash_password(
        req.password
    )
    

    # CREATE USER
    

    user = User(
        name=req.name,
        email=req.email,
        password=hashed_password
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    

    # CREATE TOKEN
    

    token = create_access_token({
        "id": user.id,
        "email": user.email
    })
    

    # RESPONSE
    

    return {
        "message":
        "Signup successful",
        "token":
        token,
        "user": {
            "id":
            user.id,
            "name":
            user.name,
            "email":
            user.email
        }
    }


# LOGIN


@router.post("/login")
def login(
    req: LoginRequest,
    db: Session = Depends(get_db)
):
    

    # FIND USER
    

    user = db.query(User).filter(
        User.email == req.email
    ).first()
    

    # INVALID EMAIL
    

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )
    

    # VERIFY PASSWORD
    

    valid = verify_password(
        req.password,
        user.password
    )
    

    # INVALID PASSWORD
    

    if not valid:
        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )
    

    # CREATE TOKEN
    

    token = create_access_token({
        "id": user.id,
        "email": user.email
    })
    

    # RESPONSE
    

    return {
        "message":
        "Login successful",
        "token":
        token,
        "user": {
            "id":
            user.id,
            "name":
            user.name,
            "email":
            user.email
        }
    }


# FORGOT PASSWORD


@router.post("/forgot-password")
def forgot_password(
    req: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    print("FORGOT PASSWORD CALLED")
    print(req.email)
    

    # FIND USER
    

    user = db.query(User).filter(
        User.email == req.email
    ).first()
    print(user)
    

    # EMAIL NOT FOUND
    

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Email not found"
        )
    
    # TOKEN EXPIRY
    

    expire = datetime.utcnow() + timedelta(
        minutes=15
    )
    

    # CREATE RESET TOKEN
    

    reset_token = jwt.encode(
        {
            "email": user.email,
            "exp": expire
        },
        SECRET_KEY,
        algorithm="HS256"
    )
    

    # RESPONSE
    

    reset_link = (
        f"http://localhost:5173/reset-password/{reset_token}"
    )
    send_reset_email(
        user.email,
        reset_link
    )
    return {
        "message":
        "Password reset link sent to your email"
    }


# RESET PASSWORD


@router.post("/reset-password/{token}")
def reset_password(
    token: str,
    req: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    

    # VERIFY TOKEN
    

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired token"
        )
    

    # GET EMAIL
    

    email = payload.get("email")
    

    # FIND USER
    

    user = db.query(User).filter(
        User.email == email
    ).first()
    

    # USER NOT FOUND
    

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    

    # HASH NEW PASSWORD
    

    user.password = pbkdf2_sha256.hash(
        req.password
    )
    

    # SAVE
    

    db.commit()
    

    # RESPONSE
    

    return {
        "message":
        "Password updated successfully"
    }