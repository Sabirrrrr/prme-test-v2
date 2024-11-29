# Backend Database Yapılandırması ve Geliştirme Süreci

## Mevcut Yapılandırma

### Database Konfigürasyonu
```python
# database.py
SQLALCHEMY_DATABASE_URL = f"postgresql://{settings.DATABASE_USERNAME}:{settings.DATABASE_PASSWORD}@{settings.DATABASE_HOSTNAME}:{settings.DATABASE_PORT}/{settings.DATABASE_NAME}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

### Otomatik Tablo Oluşturma
```python
# main.py
from app.database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)
```

### Veritabanı Ayarları
```python
# config.py
class Settings(BaseSettings):
    DATABASE_HOSTNAME: str = "localhost"
    DATABASE_PORT: str = "5432"
    DATABASE_PASSWORD: str = "sabir123QW!&"
    DATABASE_NAME: str = "fastapi"
    DATABASE_USERNAME: str = "postgres"
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
```

## Geliştirme Süreci

### Mevcut Durum
- SQLAlchemy ORM kullanılıyor
- PostgreSQL veritabanı bağlantısı mevcut
- Uygulama başlatıldığında tablolar otomatik oluşuyor
- Alembic migrations yapılandırması var ancak geliştirme sürecinde kullanılmayacak

### Geliştirme Stratejisi
1. **Database Reset Süreci**
   - PgAdmin üzerinden `fastapi` veritabanını sil
   - Yeni bir `fastapi` veritabanı oluş
   - Backend'i yeniden başlat
   - Tüm tablolar ve yapı otomatik oluşacak

2. **Avantajları**
   - Hızlı geliştirme ve test imkanı
   - Schema değişikliklerini hızlı uygulama
   - Migration yönetimi karmaşıklığından kaçınma
   - Temiz başlangıç noktası

3. **Önemli Noktalar**
   - Sadece geliştirme ortamında kullanılmalı
   - Production'da migration kullanılmalı
   - Test verilerini yeniden oluşturmak gerekebilir
   - Her restart'ta temiz bir database

### Yeni Model Değişiklikleri
- User modeline user_type ve status alanları eklendi
- Permission modeli ve ilişkileri eklendi
- Many-to-many user_permissions tablosu eklendi

### Restart Sonrası Kontrol Listesi
- [ ] Tüm tabloların oluştuğunu kontrol et
- [ ] Model ilişkilerini kontrol et
- [ ] Test kullanıcısı oluştur
- [ ] Permission sistemini test et

## Notlar
- Bu yaklaşım sadece geliştirme aşamasında kullanılmalı
- Production ortamında düzgün migration yönetimi gerekli
- Veritabanı şeması değiştiğinde tüm takımın bilgilendirilmesi önemli
- Test verilerinin yeniden oluşturulması için script'ler hazırlanabilir
