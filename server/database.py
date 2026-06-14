from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

import json, os

credentials = {}
cred_file_loc = os.path.join(os.path.dirname(__file__), "credentials.json")
with open(cred_file_loc, "r", encoding="utf-8") as file:
    credentials = json.load(file)

engine = create_engine(credentials["url"])
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()