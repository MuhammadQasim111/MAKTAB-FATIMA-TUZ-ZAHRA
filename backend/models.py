import uuid
from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title_en = Column(Text, nullable=False)
    title_dari = Column(Text, nullable=False)
    subject = Column(Text, nullable=False)
    grade_level = Column(Integer)
    lesson_number = Column(Integer, nullable=False)
    audio_url = Column(Text, nullable=False)
    duration_seconds = Column(Integer)
    language = Column(Text, default="dari")
    created_at = Column(TIMESTAMP, server_default=func.now())

class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(Text, unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)

class Donation(Base):
    __tablename__ = "donations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    donor_name = Column(Text)
    donor_email = Column(Text)
    amount_usd = Column(Integer)
    message = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
