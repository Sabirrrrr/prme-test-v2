from pydantic import BaseModel,ConfigDict, ValidationError, EmailStr, conint
from datetime import datetime
from typing import Optional

'''
Bir sınıf oluşturduk.
Pydantic-docs.helpmanuel
bir takım sınırlar belirleyeceğiz.
işe yardı pip install typing dedim.
user eğer bir şey seçmezse published için True gönderir.
'''
class Post(BaseModel):
    title: str
    content: str
    published: bool = True
    # rating: Optional[int] = None   

# class CreatePost(BaseModel):
#     title: str
#     content: str
#     published: bool = True
#     # rating: Optional[int] = None 

# class UpdatePost(BaseModel):
#     title: str
#     content: str
#     published: bool = True
#     # rating: Optional[int] = None 


class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True
    # rating: Optional[int] = None   

class PostCreate(PostBase):
    pass

class UserOut(BaseModel):
    id: int
    email : EmailStr
    created_at: datetime
    class Config:
        from_attributes = True



# class PostUpdate(PostBase):
#     pass


'''
bu modeli kullanırken bir şema kullanarak requestleri yapıyoruz
ancak gelen responselarıda bir şema kullanarak yapabiliriz
üye girişlerini düşün

aşağıdaki yapılandırmayı yaptığın zaman postman üzerinde göreceksin ki 3 alanın hepside gelmiş olacaktır.
bu şekilde geri dönecek veriyi sınırlandırabiliriz
binlerce sütun olduğu zaman hepsini yazmak zor olacaktır dolayısıyla PostBase den inherit edersen postbasede tanımlı olan herşeyi alacaktır.
'''
# class Post(BaseModel):
class Post(PostBase):
    id: int
    created_at: datetime
    owner_id : int
    owner : UserOut
    # id de postmande geliyor ancak biz bunu döndürmemeyi düşündük.
    class Config:
        from_attributes = True
        #sqlalchemy ve pydantic ile alakalı bir config


class UserCreate(BaseModel):
    email: EmailStr # bunun için pip install email-validator yaptık.
    password: str



class UserLogin(BaseModel):
    email : EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None
    # 


class Vote(BaseModel):
    post_id: int
    dir: conint(le=1) #conint(le=1)  # ----> anything less than 1 allowed negatif number # dir burada direction demektir.

class PostOut(BaseModel):
    Post: Post
    votes: int

    class Config:
        orm_mode = True