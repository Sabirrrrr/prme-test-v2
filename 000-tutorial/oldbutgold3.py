from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.params import Body

from typing import Optional, List
from random import randrange
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session
from . import models,schemas,utils
from app.database import engine, get_db
# ***************************************************************************


models.Base.metadata.create_all(bind=engine)
# Database bağlantısı için yazdık.

# ***************************************************************************
'''
creating instance of fastapi
'''
app = FastAPI() 
# ***************************************************************************



# # ***************************************************************************
# '''
# database bağlantısı için yazdık
# burada python kodları ile database istek göndereceğiz
# orm kullanmış oluyoruz.
# post = db.query(models.Post).all() bu şekilde yazılıyor.
# bunu test için yapmıştık 05:38:27 den sonra yorum satırına alıyorum.
# '''
# @app.get("/sqlalchemy")
# def test_posts(db: Session = Depends(get_db)):
#     posts = db.query(models.Post).all()
#     print(posts)
#     return {"data" : posts}
# # ***************************************************************************



# ***************************************************************************
'''
yukarıda bir takım kütüphane tanımlamaları yaptık
psycopg2 ile yaptık
bu tanımlamalar ile database bağlantılarını yapacağız
aşağıdaki gibi bir sistem kullanacağız.
cursor_factory bu bi işe yarıyor; 04:02:50 de anlatıyor.
bir try except bloğu kullanarak database bağlantısını kontrol edip bağlanmaya çalışacağız.
uvicorn app.main2:app 
bu şekilde giriş yapmaya çalışınca "Database connection was succesfull!" yazısını göreceksin.
database e giriş yapamazsan fastapi ne işe yarar dolayısıyla sürekli çalışcak bir while loop koymamız gerek.
database e giriş yapana kadar while içerisinde kalacağız.
time da kullandık.
eğer bir yanlış şifre girilirse 2 saniyede bir doğru şifreyi girmeye çalışacaktır. 

aşağıdaki gibi herbilgiyi açıkca yaparsak buna hardcode demiş oluruz.
production sürecinde bu şekilde olmaz.
dolayısıyla bunu daha düzgün yapmamız gerekir.
daha dinamik şekilde yapacağız.
'''
while True:
    try:
        conn = psycopg2.connect(host='localhost' , database='fastapi', user='postgres', password='sabir123QW!&', cursor_factory=RealDictCursor)
        cursor = conn.cursor()
        print("Database connection was succesfull!")
        break
    except Exception as error:
        print("Connectiong to database failed")
        print("Error:", error)
        time.sleep(2)
# ***************************************************************************



# # ***************************************************************************
# '''
# Bir sınıf oluşturduk.
# Pydantic-docs.helpmanuel
# bir takım sınırlar belirleyeceğiz.
# işe yardı pip install typing dedim.
# user eğer bir şey seçmezse published için True gönderir.
# bunu daha sonradan schemas.py dosyası içerisine göndereceğiz ve main içerisinde çağıracağız.
# '''
# class Post(BaseModel):
#     title: str
#     content: str
#     published: bool = True
#     # rating: Optional[int] = None   
# # ***************************************************************************



# ***************************************************************************
'''
bir değişken tanımladık
postumuz bir title bir content ve bir kullanıcı yani id içerir
şimdi kayıt için bir yerimiz oldu database gibi düşün.
'''
my_posts = [{"title": "title of post 1", "content" : "content of post 1", "id" : 1},{"title":"favorite food", "content" : "pizza" , "id": 2}]

def find_post(id):
    for p in my_posts:
        if p["id"] == id:
            return p

def find_index_post(id):
    for i, p in enumerate(my_posts):
        if p['id'] == id:
            return i

# ***************************************************************************



# ***************************************************************************
'''
def root(): its a function. name itself it doesnt matter
@ its a decorator. act like an api we need decorator.
get request http methods. get post put delete etc. etc.
("/") path url.
("/login") http://127.0.0.1:8000/login
("/post/vote") http://127.0.0.1:8000/post/vote
ctrl + c to quit or stop it.
uvicorn main:app
uvicorn main:app --reload ----> değişiklik yapınca bu şekilde yapmamız gerek.
production zamanında buna ihtiyaç olmayacak.
Decorator ---> we need to use this decorator. 
Reference fastapi instance which is "app". 
"get" is a http method. 
("/") ---> it is a "url"
It is a regular function, name does not matter
Fastapi automatically converts this dict to json.
'''
@app.get("/")                                       
async def root():                                   
    return {"message": "Hello World"}               
# ***************************************************************************



# ***************************************************************************  
'''
SQL STATEMENTLARI BURAYA YAZACAĞIZ
fetchall fetchone ile alakalı bir ayrım yapıldı, çok fazla kullanacağımız için bu fetchall kullandık. 04:10:20 civarında anlatılıyor.
postman üzerinden get post yaptığın vakit database bağlantısının yapıldığını göreceksin.

post listesini elde etmek istiyoruz. response_model=schemas.Post yazdıktan sonra hata alırız
typingden listeyi çağırıp listeye çevirmeliyiz.
postman üzerinde çalıştığını göreceksin.
'''
@app.get("/posts",response_model=List[schemas.Post])
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    # cursor.execute("""SELECT * FROM posts""")
    # posts = cursor.fetchall()
    # return {"data" : posts} ---> bunu 05:40:31 deki açıklamaya göre sildik. sadece dict göndermiş olacak.
    return posts
# ***************************************************************************



# ***************************************************************************  
'''
SQL INSERT
%s ile yapıyoruz.
bir başka yapılma yöntemi var eğer o şekilde yaparsan SQL injectionlara karşı zayıf olmuş olur. 04:15:48 de anlatılıyor.
sırasıyla ilerlediğini unutma %s lerin
TÜM İŞLEMLERDEN SONRA COMMİT YAPMAN LAZIM PUSH ETMEK İÇİN PG ADMİNDE KAYIT KAPARKEN BASTIĞIN TUŞUN İŞLEVİNİ GERÇEKLEŞTİRİR. conn.commit() ile yapılır.
amazingg.
stage and finalize
'''
@app.post("/posts",status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_posts(post : schemas.PostCreate, db: Session = Depends(get_db)):
    # new_post = models.Post(title=post.title, content=post.content, published=post.published)
    # aşağıdaki yukardaki yorumun aynısını yapar.
    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    # cursor.execute("""INSERT INTO posts(title, content, published) VALUES (%s,%s,%s) RETURNING *""",(post.title, post.content,post.published))
    # new_post = cursor.fetchone()
    # conn.commit()
    # return {"data" : new_post} ---> bunu 05:40:31 deki açıklamaya göre sildik. sadece dict göndermiş olacak.
    return new_post
# ***************************************************************************



# ***************************************************************************
'''
(str(id),)) burada bir comma bıraktık ","
'''
@app.get("/posts/{id}",response_model=schemas.Post)
def get_post(id: int, response: Response, db: Session = Depends(get_db)):
    # cursor.execute(""" SELECT * from posts WHERE id = %s """, (str(id),))
    # post = cursor.fetchone()
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = f'post with id: {id} was not found')
    # return {"post_detail" : post} ---> bunu 05:40:31 deki açıklamaya göre sildik. sadece dict göndermiş olacak.
    return post
# ***************************************************************************



# ***************************************************************************
'''
deleting posts
'''
@app.delete("/posts/{id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db)):
    # cursor.execute(""" DELETE FROM posts WHERE id=%s RETURNING *""" , (str(id),))
    # deleted_post = cursor.fetchone()
    # conn.commit()

    post = db.query(models.Post).filter(models.Post.id == id)

    if post.first() == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'post with id: {id} does not exist')
    
    post.delete(synchronize_session=False) #Bu böyle bir configmiş
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
# ***************************************************************************



# ***************************************************************************
'''
updating
%s place holder
'''
@app.put("/posts/{id}",response_model=schemas.Post)
def update_post(id: int, updated_post: schemas.PostCreate, db: Session = Depends(get_db)):
    # cursor.execute("""UPDATE posts SET title=%s, content=%s, published=%s WHERE id=%s RETURNING *""",(post.title,post.content,post.published,str(id),))
    # updated_post = cursor.fetchone()
    # conn.commit()

    post_query = db.query(models.Post).filter(models.Post.id == id)
    post = post_query.first()

    if post == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'post with id: {id} does not exist')
    
    # post_query.update({'title' : 'hey this is my updated title', 'content': 'updated content'}, synchronize_session=False) # Hardcode
    post_query.update(updated_post.dict(), synchronize_session=False)
    db.commit()
    # return {'data' : post_query.first()} ---> bunu 05:40:31 deki açıklamaya göre sildik. sadece dict göndermiş olacak.
    return post_query.first()
# ***************************************************************************



# ***************************************************************************
''' 
fastapi api serverdan url arar ilk bulduğu url i döndürür. 
dolayısıyla aynı urllerden en üstte olanını alır.
http://127.0.0.1:8000/login     
/login urlsine sahip olan ilk fonksiyonu getirir.
request get method url: "/login"
get methodunu arar ve bulur ardından "/login" olan ilk urlyi bulur.
'''
@app.get("/logindeneme")                                       
def getz():                                   
    return {"message": "alttaki login"}     

@app.get("/logindeneme")                                       
def gety():                               
    return {"message": "üstteki login"} 
# ***************************************************************************  



# ***************************************************************************  
'''
postman diye bir şey var web sitesinden yükledik.
http requestleri test etmek ve yapılandırmak için kullanırız.
bundan sonra bunu kullanacağız.
bundan başka applarda var ancak biz bunu kullanacağiz. 
'''
@app.get("/posts1")
def get_posts1():
    return {"data" : "this is your get request and you getting posts"}
# ***************************************************************************



# ***************************************************************************
'''
Hiçbir veri göndermedenki post request aşağıdaki gibidir. 
Bu niye çalışmadı operada buna bakcam sonra. 
Şimdilik oyalanmıyorum.
Postman üzerinde çalışıyor ancak direk çalışmıyor.
'''
@app.post("/createpost1")
def create_posts1():
    return {"message" : "this is your post request and you just getting posts"}
# ***************************************************************************



# ***************************************************************************
'''
Postman üzerinde body ve raw seçtik.
Sonra json seçildi.
Bir python dict gibi key value ile json dosyası oluşturduk.
Postman ile http://127.0.0.1:8000/createpost2 post edildiği zaman aşağıdaki yazıyı terminal üzerinden inceleyebildik.
{'title': 'top beaches in florida', 'content': 'check out these awesome beaches', 'rating': 'hello'}
we imported Body from fastapi.params
payload yerine istediğini yazabilirdin.
'''
@app.post("/createpost2")
def create_posts2(payload: dict = Body(...)):
    print(payload)
    return {"message" : "this is your post reques with some data and you just getting posts"}
# ***************************************************************************



# ***************************************************************************
'''
burada ise return etme şeklimizi değiştiriyoruz.
Postman ile http://127.0.0.1:8000/createpost3 post edildiği zaman aşağıdaki formattaki yazıyı terminal üzerinden inceleyebildik.
burada yine bir hata verdi bakacağız.
hatanın çözümü json dosyasındaki "," ile "virgül" ile alakalı
jsonda sondaki virgülü sileceksin.
'''
@app.post("/createpost3")
def create_posts3(payload: dict = Body(...)):
    print(payload)
    return {"new_posts" : f"title: {payload['title']} content: {payload['content']}"} 
# ***************************************************************************



# ***************************************************************************
'''
title str, content str, cetegory, bool, published gibi şeyleri belirleyeceğiz
title var mı?
peki str mi?
content var mı?
peki str mi?
bunun gibi bir şema belirlemiş olacağız.
pydantic modeli dicte çevircez,
print(new_post)
return {"data" : new_post}
işe yaramadı
model_dump() kullanılcak
{'title': 'top beaches in florida', 'content': 'check out these awesome beaches'}
gibi bir çıktı verdi.
şemayı uygulamış olduk

createpost5 kullanımı ilede sadece istediğimiz datayı göstermiş olduk.
"top beaches in florida"
çıktısını aldık.
eğer postman üzerinde title veya contenti silersek otomatik olarak hata verecektir.
title'a veya content'e ait bir veri gönderilmemiş demektir.

createpost6 ile published verisine erişiyoruz.
postman üzerinde true küçük harflerle yazılcak True yazılmayacak.
default olarak true dönecektir
çünkü classda bu şekilde tanımlandı.

createpost7 ile ratingi incelemiş oluyoruz.
default olarak "none" gönderir
sayı olarak sayı gönderir. örneğin postmande rating : 4 dedik
eğer str gönderirsek hata verecektir. örneğin postmande rating : "hello" dedik
dolayısıyla tam olarak istediğimiz dataları elde etmiş kontrol altına almış olduk.
'''
@app.post("/createpost4")
def create_posts4(new_post: schemas.Post):
    dict_output = new_post.model_dump()  
    print(dict_output)
    return {"data" : dict_output}

@app.post("/createpost5")
def create_posts5(new_post: schemas.Post):
    dict_output = new_post.title
    print(dict_output)
    return {"data" : dict_output}

@app.post("/createpost6")
def create_posts6(new_post: schemas.Post):
    dict_output = new_post.published
    print(dict_output)
    return {"data" : dict_output}

@app.post("/createpost7")
def create_posts7(new_post: schemas.Post):
    dict_output = new_post.rating
    print(dict_output)
    return {"data" : dict_output}
# ***************************************************************************



# ***************************************************************************
'''
dict() kullanımı.
bu aşağıdaki kullanımda şu çıktılar olacaktır.
title='top beaches in florida' content='check out these awesome beaches' published=True rating=4
{'title': 'top beaches in florida', 'content': 'check out these awesome beaches', 'published': True, 'rating': 4}
nice little handy thing
'''
@app.post("/createpost8")
def create_posts8(new_post: schemas.Post):
    print(new_post)
    print(new_post.dict())
    return {"data" : new_post}
# ***************************************************************************



# ***************************************************************************
'''
şimdiye kadar bir database kullanmadık
verileri bir yere kaydetmedik
şimdi kayıt işlemi ile alakalı bir takım şeyler yapacağız
bu arada url kullanırken "/posts" olarak yazmak daha mantıklı olur.
şimdi uygulamanın en başında bir takım değişkenler tanımlayacağız.
bunlar verileri kaydetmek için kullanılacak.
postman üzerinden gözlemleyebilirizki my_posts içeriği gelniş oldu.
'''
@app.get("/posts")
def get_posts():
    return {"data" : my_posts}
# ***************************************************************************



# ***************************************************************************
'''
bu arada url kullanırken "/posts" olarak yazmak daha mantıklı olur.
bir random numara elde etmek için kütüphane tanımladık
front endden bir cevap geldiği zaman biz onu database göndeririz
database giderken unique bir id ile gidecek
postman üzerinde gözlemleyecek olursan yeni bir id ile bir post oluşturuldu bir content bir title ve bir id ile oluşturduk
şimdi get ile kontrol edersen postman üzerinde yine veritabanımıza yeni post eklenmiş olacaktır.

şimdide burada görülmelidirki ne zaman bir create yaparsak 200 yerine 201 kodunu almamız gerekir. dolayısıyla burada bir işlem ile bunu düzelteceğiz.
bu sefer decorator içerisinde bunu yapmış olduk.
postman ve terminalde gözlemlenebilir.
'''
@app.post("/posts2",status_code=status.HTTP_201_CREATED)
def create_posts2(post: schemas.Post):
    post_dict = post.dict()
    post_dict['id'] = randrange(0,1000000)
    my_posts.append(post_dict)
    return {"data" : post_dict}
# ***************************************************************************



# ***************************************************************************
'''
{id} ---> path parameter
başarılı bir şekide id yi elde ettik
retrieving
'''
@app.get("/posts/{id}")
def get_posts(id):
    print(id)
    return {"post_detail" : f"here is post {id}"}
# ***************************************************************************



# ***************************************************************************
'''
bir posta ait veriyi komple çekmiş olduk.
yukarıda bir for döngüsüne sahip bir fonksiyon tanımladık
şimdilik işlemleri bu şekilde yapıyoruz
ileride işlemler değişecektir.
aşağıda bu fonksiyonu kullandık
path parameter her zaman str gönderir
mutlaka int e çevirmemiz gerekiyor.
bir validasyon sistemine ihtiyacımız var
def get_posts3(id: int):
    bunu bu şekilde halledebiliriz. otomatik olarak valide etmiş olduk. id sadece int olsun dedik.
post man üzerinde http://127.0.0.1:8000/posts3/asdasdasfq böyle belirsiz bir url verilirse aşağıdaki mesajı alırız.
"msg": "Input should be a valid integer, unable to parse string as an integer", mesajını alırız.

eğer olmayan bir id gönderirsek
http://127.0.0.1:8000/posts3/5
yukardaki gibi
null gibi bir şey alırız.
github örneğindeki gibi 404 hatası alırız.
dolayısıyla bunu uygulamak gerekir.
dolayısıyla we need to manuplating the response
öncelikle fastapiden response'ı kütüphanede import ediyoruz.
aynı zamanda status'u import ediyoruz.
sonrasında aşağıdaki @app.get("/posts5/{id}") fonksiyonunda response status code ile 404 gönderiyoruz.
postmande ve terminalde bu uyarının çıktığını gözlemleyebilirsin.
aynı zamanda return içerisinde was not found diyerek bir mesaj fırlattık

yada HTTPException'ı import edip
aşağıdaki raise ile kullanmak dahada uygun olur.
'''
@app.get("/posts3/{id}")
def get_posts3(id: int):
    # print(type(id)) burada str çıktısı aldık

    post = find_post(int(id))
    print(post)
    return {"post_detail" : post}

@app.get("/posts5/{id}")
def get_posts5(id: int, response: Response):
    # print(type(id)) burada str çıktısı aldık

    post = find_post(int(id))
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = f'post with id: {id} was not found')
        # response.status_code = status.HTTP_404_NOT_FOUND
        # return {'message' : f'post with id: {id} was not found'}
    return {"post_detail" : post}
# ***************************************************************************



# ***************************************************************************
'''
a quick demonstration
aynı mantık ile bir "/posts/{id}" urlsinden sonra "/posts/latest" url si fastapi mantığına göre yukarıdan aşağı doğru aranacağı için 
ilk variablelar aynı olduğunu göreceksin ki bu durumda "posts" olmuş oluyor.
daha sonrasından gelen ikinci variablellardan ayrımı nasıl yapacağız "latest" "{id}"
öne gelmesi gereken kısmı öne getireceksin bu durumda 
@app.get("/posts/latest") önde
@app.get("/posts/{id}") aşağıda olmalıdır.
fastapi tasarımı yaparken buna dikkat et.
'''
@app.get("/posts2/latest")
def latest_post():
    post = my_posts[len(my_posts)-1]
    return {"lastest post=" : post}
# ***************************************************************************



# ***************************************************************************
'''
time to move on to deleting and updating posts
many different way to do this.
delete için bir http açıklaması yok 204 gönderiyoruz.
ancak buradaki bir takım başka problemler içinde http errorları ayarladık.
raise kısmını tam anlayamadım
02:10:33 üncü dakikanın öncesinde anlatılıyor bu durumlar sonra bakabilirsin.
'''
@app.delete("/posts8/{id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    # deleting post
    # find the index in the array that has required ID
    # my_posts.pop(index)
    index = find_index_post(id)

    if index == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'post with id: {id} does not exist')

    my_posts.pop(index)
    return Response(status_code=status.HTTP_204_NO_CONTENT) #something special terminalde hata görünüyormuş ancak bende görünmedi.
# ***************************************************************************



# ***************************************************************************
'''
put methodu kullanıcaz
sadece title'ı update etcez
content aynı kalcak bu sebeple postmande content'i olduğu gibi aldık

aşağıdaki kodun kısa bir özeti
bir put isteği belirli bir id ye göre verildi
biz bu isteği id ve post olarak kontrol ettik
post: Post ile tüm datayı front endden aldık ki bunu postman üzerinde raw jsonda görebilirsin.
index i bulduk find_index_post fonksiyonu yardımıyla
eğer geçersizse yani "none" ise bir mesaj fırlattık
eğer geçerliyse zaten aldığımız tüm postu bir sözlüğe çevirdik bu regular python dicttir.
sonra id ekledik
sonrasında     my_posts[index] = post_dict ile güncellemeyi yaptık
ve return ettik

postman üzerinde tekrardan inceleyebilirsin
get dediğin zaman title update edilmiş olcaktır
bu arada çalışmazsa --reload yapmalısın.
'''
@app.put("/posts10/{id}")
def update_post(id: int, post: schemas.Post):
    index = find_index_post(id)
    if index == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'post with id: {id} does not exist')

    post_dict = post.dict()
    post_dict['id'] = id
    my_posts[index] = post_dict
    return {'data' : post_dict}
# ***************************************************************************



# ***************************************************************************
'''
şimdi sırada kullanıcı işlemlerini yapmak var.
"/users" kısmına dilediğini yapabilirsin path operatör.


postmande geri dönen veri içerisinde password görüyoruz bunu iptal etmemiz lazım
schemas.py ı düzenleyeceğiz.

sadece id ve emnail geri dönmüş oldu.
şifreleri kriptolayacağız hash
'''
@app.post("/users",status_code=status.HTTP_201_CREATED,response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, response: Response, db: Session = Depends(get_db)):

    #has the password - user.password
    hashed_password = utils.hash(user.password)
    user.password = hashed_password

    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user 
# ***************************************************************************



# ***************************************************************************
'''
bu kullanıcıların id kontrolü belirli sepeblerle yapılıyor.
never wanna see password.
'''
@app.get('/users/{id}', response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise (HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id: {id} does not exist"))
    return user
# ***************************************************************************