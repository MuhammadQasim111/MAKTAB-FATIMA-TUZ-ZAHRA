from database import engine, Base
import models

def create_tables():
    print("Creating tables in Neon DB...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")

if __name__ == "__main__":
    create_tables()
