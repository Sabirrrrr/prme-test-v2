# FastAPI Backend

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş bir sosyal medya uygulamasının backend kısmıdır.

## Teknolojiler

- FastAPI: Modern, hızlı web framework
- SQLAlchemy: Python SQL toolkit ve ORM
- Pydantic: Veri doğrulama ve serialization
- JWT: JSON Web Token tabanlı kimlik doğrulama
- PostgreSQL: İlişkisel veritabanı sistemi
- Uvicorn: ASGI web sunucusu
- Alembic: Veritabanı migrasyon aracı

## Proje Yapısı

```
backend/
├── alembic/                 # Database migrations
├── app/
│   ├── api/
│   │   ├── endpoints/      # API route handlers
│   │   └── deps.py        # Dependencies
│   ├── core/              # Core functionality
│   │   ├── config.py      # Settings
│   │   ├── security.py    # Security utilities
│   │   └── database.py    # Database session
│   ├── models/
│   │   └── domain/        # SQLAlchemy models
│   ├── schemas/           # Pydantic models
│   └── services/          # Business logic
├── tests/                  # Test cases
└── main.py                # Application entry point
```

## Kurulum

1. Gerekli Python paketlerini yükleyin:
```bash
pip install -r requirements.txt
```

2. `.env` dosyasını oluşturun ve gerekli değişkenleri ayarlayın:
```env
DATABASE_HOSTNAME=localhost
DATABASE_PORT=5432
DATABASE_PASSWORD=your_password
DATABASE_NAME=fastapi
DATABASE_USERNAME=postgres
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXP_MIN=30
```

3. Veritabanı migrasyonlarını çalıştırın:
```bash
alembic upgrade head
```

4. Uygulamayı başlatın:
```bash
uvicorn main:app --reload
```

## API Endpoints

- **Auth**
  - POST `/api/auth/login`: Kullanıcı girişi
  - POST `/api/auth/register`: Yeni kullanıcı kaydı

- **Posts**
  - GET `/api/posts`: Tüm gönderileri listele
  - POST `/api/posts`: Yeni gönderi oluştur
  - GET `/api/posts/{id}`: Belirli bir gönderiyi getir
  - PUT `/api/posts/{id}`: Gönderiyi güncelle
  - DELETE `/api/posts/{id}`: Gönderiyi sil

- **Votes**
  - POST `/api/votes`: Gönderiye oy ver/kaldır

## Geliştirme

- API testleri için: `pytest`
- Kod formatı için: `black .`
- Lint için: `flake8`
