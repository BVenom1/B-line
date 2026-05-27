import json

from fastapi import FastAPI
from pydantic import BaseModel

credentials = {}    # credentials for the PostgresQL database

with open("./credentials.json", 'r', encoding="utf-8") as f:
    credentials = json.load(f)  # import credentials from the file

app = FastAPI()

@app.get("/")
def get_root():
    return {"Hello": "World!"}