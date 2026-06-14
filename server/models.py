from sqlalchemy import Column, Integer, String
from database import Base

from pydantic import BaseModel, EmailStr

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    password = Column(String)

class UserModel(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    password: str | None = None
    def __init__(self, name, email, password):
        super().__init__(name=name, email=email, password=password)