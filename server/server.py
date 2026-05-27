import json
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

credentials = {}    # credentials for the PostgresQL database

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "credentials.json"), 'r', encoding="utf-8") as f:
    credentials = json.load(f)  # import credentials from the file

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def get_root():
    return {"Hello": "World!"}