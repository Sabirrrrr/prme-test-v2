# Wind App Fonksiyonel Yapı Dokümantasyonu

Bu doküman, Wind uygulamasının frontend ve backend bileşenlerinin işlevsel yapısını detaylı olarak açıklar.

## 1. Backend (FastAPI) Yapısı

### 1.1 Core Katmanı (`/backend/app/core/`)

#### Security (`security.py`)
- Token yönetimi
  - JWT token oluşturma (`create_access_token`)
  - Token doğrulama (`verify_access_token`)
  - Şifre hashleme ve doğrulama (`hash_password`, `verify_password`)
- Kullanıcı kimlik doğrulama
  - Mevcut kullanıcıyı alma (`get_current_user`)
  - OAuth2 yapılandırması

#### Database (`database.py`)
- PostgreSQL veritabanı bağlantı yönetimi
- Session yönetimi
- Bağlantı havuzu yapılandırması

#### Config (`config.py`)
- Ortam değişkenleri yönetimi
- Veritabanı yapılandırması
- JWT güvenlik ayarları

### 1.2 API Katmanı (`/backend/app/api/endpoints/`)

#### Auth Endpoints (`auth.py`)
- Giriş işlemleri (`/api/auth/login`)
- Token oluşturma ve dağıtma
- Kimlik doğrulama kontrolleri

#### Users Endpoints (`users.py`)
- Kullanıcı oluşturma (`POST /api/users/`)
- Kullanıcı bilgisi alma (`GET /api/users/{id}`)
- Kullanıcı yönetimi işlemleri

#### Posts Endpoints (`posts.py`)
- Post oluşturma (`POST /api/posts/`)
- Post listeleme (`GET /api/posts/`)
- Post güncelleme (`PUT /api/posts/{id}`)
- Post silme (`DELETE /api/posts/{id}`)
- Post detayı görüntüleme (`GET /api/posts/{id}`)

#### Votes Endpoints (`votes.py`)
- Oy verme (`POST /api/votes/`)
- Oy silme
- Oy sayılarını yönetme

### 1.3 Models Katmanı (`/backend/app/models/domain/`)

#### User Model (`user.py`)
- Kullanıcı tablosu yapısı
  - ID
  - Email (unique)
  - Şifre (hashed)
  - Oluşturma tarihi

#### Post Model (`post.py`)
- Post tablosu yapısı
- Kullanıcı ilişkileri
- Oy ilişkileri

#### Vote Model (`vote.py`)
- Oy tablosu yapısı
- Post ve kullanıcı ilişkileri

### 1.4 Schemas Katmanı (`/backend/app/schemas/`)

#### User Schemas (`user.py`)
- `UserBase`: Temel kullanıcı şeması
- `UserCreate`: Kullanıcı oluşturma şeması
- `UserLogin`: Giriş şeması
- `UserOut`: Kullanıcı yanıt şeması
- `Token`: JWT token şeması
- `TokenData`: Token veri şeması

## 2. Frontend (Lit + TypeScript) Yapısı

### 2.1 Components (`/frontend/src/components/`)

#### Auth Components (`/auth/`)
- Login formu
- Kayıt formu
- Profil görüntüleme

#### Posts Components (`/posts/`)
- Post listesi
- Post kartı
- Post editörü
- Post detayları

#### Common Components (`/common/`)
- Navigasyon çubuğu
- Modal
- Toast bildirimleri
- Loading spinner

### 2.2 Services (`/frontend/src/services/`)

#### Login Service (`login.service.ts`)
```typescript
interface LoginCredentials {
    username: string;
    password: string;
}

class LoginService {
    login(credentials: LoginCredentials)
    logout()
    isAuthenticated()
    getToken()
}
```
- Giriş işlemleri yönetimi
- Token saklama ve yönetimi
- Oturum durumu kontrolü
- `/api/auth/login` endpoint entegrasyonu

#### Register Service (`register.service.ts`)
```typescript
interface RegisterCredentials {
    email: string;
    password: string;
}

class RegisterService {
    register(credentials: RegisterCredentials)
    validatePassword(password: string)
    validateEmail(email: string)
}
```
- Kullanıcı kaydı işlemleri
- Şifre validasyonu
  - Minimum 8 karakter
  - Büyük/küçük harf kontrolü
  - Sayı kontrolü
- Email formatı validasyonu
- `/api/users` endpoint entegrasyonu

### 2.3 Utilities (`/frontend/src/utils/`)
- API istek yönetimi
- Form validasyonları
- Tarih formatlama
- Hata yönetimi

### 2.4 State Management
- LocalStorage token yönetimi
- Kullanıcı oturum durumu
- Uygulama geneli state yönetimi
