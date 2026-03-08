from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

class LessonBase(BaseModel):
    title_en: str
    title_dari: str
    subject: str
    grade_level: Optional[int] = None
    lesson_number: int
    language: str = "dari"
    duration_seconds: Optional[int] = None

class LessonCreate(LessonBase):
    pass

class Lesson(LessonBase):
    id: uuid.UUID
    audio_url: str
    created_at: datetime

    class Config:
        from_attributes = True

class AdminUserBase(BaseModel):
    email: str

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUser(AdminUserBase):
    id: uuid.UUID

    class Config:
        from_attributes = True

class DonationBase(BaseModel):
    donor_name: Optional[str] = None
    donor_email: Optional[str] = None
    amount_usd: Optional[int] = None
    message: Optional[str] = None

class DonationCreate(DonationBase):
    pass

class Donation(DonationBase):
    id: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
