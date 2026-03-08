# Noor Educational Platform Backend
import os
import shutil
import uuid
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime
from dotenv import load_dotenv

import models
import schemas
import auth
from database import engine, get_db

# Load environment variables
load_dotenv()

# Create tables in Neon DB
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Maktab-e-Fatima-tuz-Zuhra API")

# Check if running on Vercel
IS_VERCEL = os.environ.get("VERCEL") == "1"

# Update static directory handle
UPLOAD_DIR = os.getenv("AUDIO_UPLOAD_DIR", "/tmp/uploads" if IS_VERCEL else "./uploads")
if not os.path.exists(UPLOAD_DIR):
    try:
        os.makedirs(UPLOAD_DIR)
    except OSError:
        pass

if not IS_VERCEL:
    # Mount static files for audio
    app.mount("/audio", StaticFiles(directory=UPLOAD_DIR), name="audio")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        secret_key = os.getenv("JWT_SECRET")
        algorithm = os.getenv("JWT_ALGORITHM", "HS256")
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = db.query(models.AdminUser).filter(models.AdminUser.email == token_data.email).first()
    if user is None:
        raise credentials_exception
    return user

# API ROUTES

@app.get("/api")
def api_root():
    return {"message": "Welcome to Maktab-e-Fatima-tuz-Zuhra API", "docs": "/docs"}

@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register_admin(user: schemas.AdminUserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.AdminUser).filter(models.AdminUser.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = auth.get_password_hash(user.password)
    db_admin = models.AdminUser(email=user.email, password_hash=hashed_password)
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return {"message": "Admin registered successfully"}

@app.post("/api/auth/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.AdminUser).filter(models.AdminUser.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/lessons", response_model=List[schemas.Lesson])
def get_lessons(subject: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Lesson)
    if subject:
        query = query.filter(models.Lesson.subject == subject)
    return query.order_by(models.Lesson.lesson_number).all()

@app.get("/api/lessons/{subject}", response_model=List[schemas.Lesson])
def get_lessons_by_subject(subject: str, db: Session = Depends(get_db)):
    return db.query(models.Lesson).filter(models.Lesson.subject == subject).order_by(models.Lesson.lesson_number).all()

@app.post("/api/lessons", response_model=schemas.Lesson)
def create_lesson(
    title_en: str = Form(...),
    title_dari: str = Form(...),
    subject: str = Form(...),
    grade_level: Optional[int] = Form(None),
    lesson_number: int = Form(...),
    language: str = Form("dari"),
    audio: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_user)
):
    # Save audio file
    file_id = str(uuid.uuid4())
    _, ext = os.path.splitext(audio.filename)
    filename = f"{file_id}{ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)
    
    # Use relative path for audio if possible, but for DB it's fine as absolute for now
    # However, if we serve from same port, relative is safer: /audio/filename
    audio_url = f"/audio/{filename}"
    
    db_lesson = models.Lesson(
        title_en=title_en,
        title_dari=title_dari,
        subject=subject,
        grade_level=grade_level,
        lesson_number=lesson_number,
        language=language,
        audio_url=audio_url
    )
    db.add(db_lesson)
    db.commit()
    db.refresh(db_lesson)
    return db_lesson

@app.delete("/api/lessons/{id}")
def delete_lesson(id: uuid.UUID, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_user)):
    db_lesson = db.query(models.Lesson).filter(models.Lesson.id == id).first()
    if not db_lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    # Try to delete file
    try:
        filename = db_lesson.audio_url.split("/")[-1]
        file_path = os.path.join(UPLOAD_DIR, filename)
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception as e:
        print(f"Error deleting file: {e}")

    db.delete(db_lesson)
    db.commit()
    return {"message": "Lesson deleted successfully"}

@app.post("/api/donations", response_model=schemas.Donation)
def create_donation(donation: schemas.DonationCreate, db: Session = Depends(get_db)):
    db_donation = models.Donation(**donation.dict())
    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)
    return db_donation

@app.get("/api/donations", response_model=List[schemas.Donation])
def get_donations(db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_user)):
    return db.query(models.Donation).order_by(models.Donation.created_at.desc()).all()

# SERVE FRONTEND BUILD (Only locally, not on Vercel)
FRONTEND_DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "frontend", "dist")

if not IS_VERCEL and os.path.exists(FRONTEND_DIST):
    # Mount assets folder
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST, "assets")), name="assets")
    
    # Catch-all route to serve index.html for React Router
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # If the path looks like a file (has an extension), try to serve it from dist
        file_path = os.path.join(FRONTEND_DIST, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        # Otherwise serve index.html for client-side routing
        return FileResponse(os.path.join(FRONTEND_DIST, "index.html"))
else:
    print(f"Warning: Frontend build directory not found at {FRONTEND_DIST}. Run 'npm run build' in frontend directory.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
