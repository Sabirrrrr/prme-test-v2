from fastapi import FastAPI, Response, status, HTTPException
from fastapi.params import Body
from pydantic import BaseModel,ConfigDict, ValidationError
from typing import Optional
from random import randrange
# ***************************************************************************



# ***************************************************************************
'''
creating instance of fastapi
'''
app = FastAPI() 
# ***************************************************************************



# ***************************************************************************
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
    rating: Optional[int] = None   
# ***************************************************************************



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
def create_posts4(new_post: Post):
    dict_output = new_post.model_dump()  
    print(dict_output)
    return {"data" : dict_output}

@app.post("/createpost5")
def create_posts5(new_post: Post):
    dict_output = new_post.title
    print(dict_output)
    return {"data" : dict_output}

@app.post("/createpost6")
def create_posts6(new_post: Post):
    dict_output = new_post.published
    print(dict_output)
    return {"data" : dict_output}

@app.post("/createpost7")
def create_posts7(new_post: Post):
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
def create_posts8(new_post: Post):
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
def create_posts2(post: Post):
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
def update_post(id: int, post: Post):
    index = find_index_post(id)
    if index == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'post with id: {id} does not exist')

    post_dict = post.dict()
    post_dict['id'] = id
    my_posts[index] = post_dict
    return {'data' : post_dict}
# ***************************************************************************
