from pydantic import BaseModel
class ForgotPasswordRequest(BaseModel):
    email: str
class ResetPasswordRequest(BaseModel):
    password: str