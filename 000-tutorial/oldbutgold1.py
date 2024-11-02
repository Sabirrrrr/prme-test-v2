from fastapi import FastAPI
from fastapi.params import Body
from pydantic import BaseModel,ConfigDict, ValidationError
from typing import Optional

app = FastAPI()

class Post(BaseModel):
    title: str
    content: str
    published: bool = True
    rating: Optional[int] = None   # işe yardı pip install typing dedim.



# def root(): its a function. name itself it doesnt matter
# @ its a decorator. act like an api we need decorator.
# get request http methods. get post put delete etc. etc.
# ("/") path url.
# ("/login") http://127.0.0.1:8000/login
# ("/post/vote") http://127.0.0.1:8000/post/vote
# ctrl + c to quit
# uvicorn main:app
# uvicorn main:app --reload

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/posts")
def get_posts():
    return {"data" : "this is your posts"}

# fastapi api serverdan url arar ilk bulduğu url i döndürür. dolayısıyla aynı urllerden en üstte olanını alır.
# http://127.0.0.1:8000/login     /login olan ilk fonksiyonu getirir.

# postman diye bir şey var web sitesinden yükledik.
# http requestleri test etmek ve yapılandırmak için kullanırız.
# bundan sonra bunu kullanacağız. 


@app.post("/createposts")
def create_posts(post: Post):
    # pydantic modeli dicte çevircezi dict() işe yaramadı, model_dump() kullanılcak
    dict_output = post.model_dump()  
    print(dict_output)
    # print(post.model_dump())
    return {"data" : dict_output}


# @app.post("/createposts")
# def create_posts(new_post: Post):
#     # body deki herşeyi al python dicte çevir.
#     # print(new_post)
#     print(new_post.rating)
#     return {"data" : "new post"}
    # return {"message" : "bikkuri sashima succesfully created posts!"}
    # {'title': 'rop beaches in florida', 'content': 'check out these awesome beaches'}
    # return {"new_posts" : f"title {payload['title']} content: {payload['content']}"} 

# title str, content str, cetegory, bool, published etc etc.
# pydantic a ready front end gibi birşey
# {
#     "title" : "top beaches in florida",
#     "content" : "check out these awesome beaches"
# }
# bizdeki body postmandeki yukarıdaki gibi burada title ve content var. biri eksilirse hata verir.
# veriyi valide ettik. 