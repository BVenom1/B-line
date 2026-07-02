from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, User, UserModel, Message, MessageModel

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

@app.post("/signup")
async def signup(user: UserModel, db: Session = Depends(get_db)) -> UserModel:
    db_user = User(name = user.name, email = user.email, password = user.password)
    check = db.query(User).filter(User.email == user.email).first()
    if check == None:
        check = db.query(User).filter(User.name == user.name).first()
        if check == None:
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return UserModel(db_user.id, db_user.name, db_user.email, None)
        else:
            raise HTTPException(400, detail="Username is taken")
    else:
        raise HTTPException(400, detail="Email is already registered. Try logging in")

@app.post("/login")
async def login(user: UserModel, db: Session = Depends(get_db)) -> UserModel:
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user == None:
        raise HTTPException(404, detail="User does not exist. Try signing up")
    elif user.password == db_user.password:
        return UserModel(db_user.id, db_user.name, db_user.email, None)
    else:
        raise HTTPException(401, detail="Incorrect password")

@app.post("/new_message")
async def new_message(m: MessageModel, db: Session = Depends(get_db)) -> MessageModel:
    db_message = Message(user_id = m.user_id, username = m.username, msg = m.msg, timestamp = m.timestamp)
    check = db.query(User).filter(User.id == m.user_id).first()
    if check == None:
        raise HTTPException(404, detail="Cannot post message: User does not exist")
    elif check.name != m.username:
        raise HTTPException(404, "Cannot post message: Username does not match")
    else:
        db.add(db_message)
        db.commit()
        db.refresh(db_message)
        return m

@app.get("/latest_messages")
async def get_latest_messages(db: Session = Depends(get_db)) -> list[MessageModel]:
    db_latest_msgs = db.query(Message).order_by(Message.timestamp.desc()).limit(10).all()
    return [MessageModel(m.id, m.user_id, m.username, m.msg, m.timestamp) for m in db_latest_msgs]
