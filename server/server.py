from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Any
from database import SessionLocal, engine
from models import Base, User, UserModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Create tables in database
Base.metadata.create_all(bind=engine)

# Get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API calls

class ResponseModel(BaseModel):
    status: int = 200
    message: str = ""
    item: Any = None
    def __init__(self, status, message, item):
        super().__init__(status=status, message=message, item=item)

@app.post("/signup", response_model=ResponseModel)
async def signup(user: UserModel, db: Session = Depends(get_db)):
    db_user = User(name = user.name, email = user.email, password = user.password)
    check = db.query(User).filter(User.email == user.email).first()
    if check == None:
        check = db.query(User).filter(User.name == user.name).first()
        if check == None:
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return ResponseModel(201, "New user created", UserModel(db_user.name, db_user.email, None))
        else:
            return ResponseModel(400, "Username is taken", None)
    else:
        return ResponseModel(400, "Email is already registered. Try logging in", None)

@app.post("/login", response_model=ResponseModel)
async def login(user: UserModel, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user == None:
        return ResponseModel(404, "User does not exist. Try signing up", None)
    elif user.password == db_user.password:
        return ResponseModel(200, "User logged in", UserModel(db_user.name, db_user.email, None))
    else:
        return ResponseModel(401, "Incorrect password", None)