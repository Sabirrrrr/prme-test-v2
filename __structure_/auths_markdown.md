# Votocon Sosyal Medya Platformu - Sistem Analizi

## Mevcut Yapı Analizi

### Backend (FastAPI) Yapısı
- Temel FastAPI altyapısı kurulu
- PostgreSQL veritabanı entegrasyonu mevcut
- Alembic ile migrations yönetimi
- Docker desteği
- Modüler yapı:
  - `/app/core`: Temel sistem bileşenleri
  - `/app/api`: API endpoints
  - `/app/models`: Veritabanı modelleri
  - `/app/schemas`: Pydantic modelleri
  - `/app/services`: İş mantığı servisleri

### Frontend (Lit + TypeScript) Yapısı
- Lit framework ile web bileşenleri
- TypeScript tabanlı geliştirme
- Modüler komponent yapısı
- Auth servisleri için temel altyapı

## Planlanan Auth Sistemi

### 1. Kullanıcı Yönetimi Entegrasyonu
- Mevcut user modeline eklenecek alanlar:
  ```python
  user_type: Enum('individual', 'corporate')
  status: Enum('active', 'inactive', 'suspended')
  permissions: List[Permission]
  ```

### 2. Yetkilendirme Katmanları
1. **Anonim Erişim**
   - Herkese açık endpoint'ler
   - Rate limiting kontrolü
   - Önizleme içerikleri

2. **Bireysel Üye Yetkileri**
   - Temel CRUD operasyonları
   - Sosyal etkileşimler
   - Profil yönetimi

3. **Kurumsal Üye Yetkileri**
   - Genişletilmiş API limitleri
   - Özel analitikler
   - Toplu işlem yetkileri

### 3. Backend Entegrasyonu
1. **Security Katmanı** (`/app/core/security.py`)
   - JWT token yönetimi (mevcut)
   - Permission checking middleware (eklenecek)
   - Rate limiting (eklenecek)

2. **Auth API** (`/app/api/endpoints/auth.py`)
   - Login/Register endpoints (mevcut)
   - Permission endpoints (eklenecek)
   - Token refresh (eklenecek)

3. **User Service** (`/app/services/user.py`)
   - Kullanıcı tipi kontrolü
   - Permission validasyonu
   - Profil yönetimi

### 4. Frontend Entegrasyonu
1. **Auth Service** (`/src/services/auth.ts`)
   - Token yönetimi
   - Permission checking
   - User type kontrolü

2. **Route Guards**
   - Permission based routing
   - User type kontrolü
   - Authenticated routes

## Geliştirme Adımları

1. **Backend Geliştirmeleri**
   - [ ] User model güncellemesi
   - [ ] Permission sistemi implementasyonu
   - [ ] Rate limiting entegrasyonu
   - [ ] Auth middleware geliştirmesi

2. **Frontend Geliştirmeleri**
   - [ ] Auth service genişletmesi
   - [ ] Permission based UI components
   - [ ] Route guard implementasyonu
   - [ ] User type based features

3. **Güvenlik İyileştirmeleri**
   
### Temel Güvenlik Katmanı
- [ ] HTTPS zorunluluğu implementasyonu
  - SSL/TLS yapılandırması
  - HSTS (HTTP Strict Transport Security)
  - Güvenli cookie yapılandırması

- [ ] Password Security
  - Bcrypt ile password hashing
  - Password complexity requirements
  - Brute force koruması
  - Password reset flow

- [ ] Injection Koruması
  - SQL injection prevention
  - NoSQL injection prevention
  - XSS (Cross-Site Scripting) koruması
  - CSRF (Cross-Site Request Forgery) koruması

### Rate Limiting ve DDoS Koruması
- [ ] API Rate Limiting
  ```python
  # FastAPI rate limiter yapılandırması
  {
    'window': 15 * 60,  # 15 dakika
    'max_requests': 100,  # request limiti
    'user_type_limits': {
      'anonymous': 50,
      'individual': 100,
      'corporate': 200
    }
  }
  ```
- [ ] IP-based rate limiting
- [ ] User-based rate limiting
- [ ] Endpoint-specific limits

### Monitoring ve Logging
- [ ] Security Audit Logging
  - Auth attempts
  - Permission changes
  - Critical operations
  - Failed requests

- [ ] Error Tracking
  - Structured error logging
  - Security incident reporting
  - Alert mechanisms

### API Güvenliği
- [ ] API Authentication
  - JWT token validation
  - Token rotation
  - Refresh token mekanizması

- [ ] Request Validation
  - Input sanitization
  - Schema validation
  - Content-Type kontrolü

### Session Yönetimi
- [ ] Secure Session Handling
  - Session timeout
  - Session invalidation
  - Concurrent session kontrolü

### Frontend Güvenlik
- [ ] Client-side Security
  - Sensitive data handling
  - Local storage encryption
  - XSS prevention
  - CORS yapılandırması

## Notlar
- Mevcut sistem FastAPI ve Lit tabanlı modern bir stack kullanıyor
- Auth sistemi için gerekli temel altyapı mevcut
- Kullanıcı tipleri ve permission sistemi için minimal değişiklikler gerekiyor
- Frontend-Backend entegrasyonu için auth flow'lar hazır
