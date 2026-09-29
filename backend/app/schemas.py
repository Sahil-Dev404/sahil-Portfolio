from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full name")
    email: EmailStr = Field(..., description="Contact email address")
    message: str = Field(..., min_length=10, max_length=2000, description="Message content")


class ContactResponse(BaseModel):
    received: bool = True
