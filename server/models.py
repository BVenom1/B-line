from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime

from pydantic import BaseModel, EmailStr

# users

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    password = Column(String)

class UserModel(BaseModel):
    id: int | None = None
    name: str | None = None
    email: EmailStr | None = None
    password: str | None = None
    def __init__(self, id, name, email, password):
        super().__init__(id=id, name=name, email=email, password=password)

# messages

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True)
    user_id = Column(String, index=True)
    username = Column(String, index=True)
    msg = Column(String, index=True)
    timestamp = Column(DateTime, index=True)

class MessageModel(BaseModel):
    id: int | None = None
    user_id: int | None = None
    username: str | None = None
    msg: str | None = None
    timestamp: datetime | None = None
    def __init__(self, id, user_id, username, msg, timestamp):
        super().__init__(id=id, user_id=user_id, username=username, msg=msg, timestamp=timestamp)
