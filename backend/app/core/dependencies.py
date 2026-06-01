from jose import (
    jwt,
    JWTError
)
from fastapi import (
    Header,
    HTTPException
)
from app.core.security import (
    SECRET_KEY,
    ALGORITHM
)
# VERIFY JWT TOKEN
def verify_token(
    authorization: str = Header(None)
):
    # TOKEN MISSING
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization token missing"
        )
    try:
        # CHECK FORMAT
        parts = authorization.split(" ")
        if len(parts) != 2:
            raise HTTPException(
                status_code=401,
                detail="Invalid authorization format"
            )
        scheme = parts[0]
        token = parts[1]
        # CHECK BEARER
        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication scheme"
            )
        # DECODE TOKEN
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        # CHECK USER DATA
        if "id" not in payload:
            raise HTTPException(
                status_code=401,
                detail="Invalid token payload"
            )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )
    except Exception as e:
        print("TOKEN VERIFY ERROR:")
        print(e)
        raise HTTPException(
            status_code=401,
            detail="Authentication failed"
        )