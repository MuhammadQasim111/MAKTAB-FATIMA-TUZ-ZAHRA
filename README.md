# Maktab-e-Fatima-tuz-Zuhra (Noor)

An audio-based learning platform for Afghan girls, designed for offline-first resilience.

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: Neon DB (PostgreSQL)
- **Storage**: Local `/uploads` folder served as static files

---

## Setup Instructions

### 1. Backend Setup
1. Open a terminal in the `backend` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create your `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Run the database migration script:
   ```bash
   python populate_db.py
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### 2. Frontend Setup
1. Open a terminal in the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## Admin Access
- To register the first admin user, send a POST request to `http://localhost:8000/api/auth/register` with:
  ```json
  {
    "email": "admin@noor.education",
    "password": "yourpassword"
  }
  ```
- Use the `/admin` route on the frontend to login and manage lessons.

## Audio Lessons
- Audio files are stored in the `backend/uploads` directory.
- The Admin Dashboard allows uploading MP3 files directly to this directory and links them in the database.
- Taught material in Dari/Farsi converted to English for basics can be uploaded under the 'English' subject category.

---

## Mission
"Light for Every Afghan Girl."
Dedicated to provide educational sanctuary where internet and traditional schools are barred.
