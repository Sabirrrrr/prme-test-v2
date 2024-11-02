# Buraya tüm modellerimizi koyacağız.
# Sql kodlarını yazmıyoruz.
# Python kodları yazacağız.
# Bir kere database oluşturursan daha sonradan tablonun özelliklerini değiştirmek zor olacaktır. Tabloyu silip tekrar oluşturduk.
# Bu örnekte  published = Column(Boolean,server_default='TRUE',nullable=False)    bunu değiştirdik.


from .database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer,primary_key=True,nullable=False)
    title = Column(String,nullable=False)
    content = Column(String,nullable=False)   
    published = Column(Boolean,server_default='TRUE',nullable=False)   
    created_at = Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey("users.id",ondelete="CASCADE"), nullable=False)

    owner = relationship("User")
    # buradaki User class User daki User
    #schemasdada update edilmesi gereken şeyler var.


# Kullanıcı girişlerini yapabilmek ve yönetebilmek için bir süreç tanımlayacağız.

class User(Base):
    __tablename__ = "users"
    id = Column(Integer,primary_key=True,nullable=False)
    email = Column(String, nullable=False, unique=True) # unique iki kere aynı e-mail olmasın diye
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('now()'))
    phone_number = Column(String, nullable=False)


class Vote(Base):
    __tablename__ = "votes"
    user_id = Column(Integer,ForeignKey("users.id", ondelete="CASCADE"),primary_key=True)
    post_id = Column(Integer,ForeignKey("posts.id", ondelete="CASCADE"),primary_key=True)
