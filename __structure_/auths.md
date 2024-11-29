# Sosyal Medya Platformu Auth Yapılandırması

## 1. Kullanıcı Tipleri ve Yetkiler

### Kullanıcı Seviyeleri
- **Anonim Kullanıcı**
  - Herkese açık içerikleri görüntüleme
  - Temel arama fonksiyonları
  - Önizleme özellikleri

- **Bireysel Üye**
  - Kişisel profil oluşturma ve düzenleme
  - İçerik paylaşma ve etkileşim
  - Diğer kullanıcıları takip etme
  - Özel mesajlaşma

- **Kurumsal Üye**
  - Kurumsal profil yönetimi
  - Gelişmiş analitikler
  - Toplu içerik yönetimi
  - Özel rozet ve doğrulama işaretleri

- **Admin**
  - Tüm sistem yönetimi
  - Kullanıcı ve içerik moderasyonu
  - Sistem ayarları ve konfigürasyonu

## 2. Veritabanı Şeması

### Temel Tablolar
```sql
Users
  - id (PK)
  - username
  - email
  - password_hash
  - user_type (individual/corporate)
  - created_at
  - status

UserProfiles
  - user_id (FK)
  - full_name
  - bio
  - avatar_url
  - corporate_details (JSON, kurumsal üyeler için)

Permissions
  - id (PK)
  - name
  - description
  - scope

UserPermissions
  - user_id (FK)
  - permission_id (FK)
```

## 3. Auth Akışı

### JWT Tabanlı Kimlik Doğrulama
1. Login/Register endpoint'leri
2. Access token ve refresh token üretimi
3. Token rotasyonu ve güvenlik
4. Oturum yönetimi

### Yetkilendirme Kontrolleri
```typescript
// Örnek middleware yapısı
checkAuth(requiredPermissions: string[]) {
  return async (req, res, next) => {
    // Token kontrolü
    // Yetki kontrolü
    // Rate limiting
  }
}
```

## 4. Frontend Entegrasyonu

### Auth Service
```typescript
class AuthService {
  login()
  register()
  logout()
  refreshToken()
  checkPermission()
}
```

### Route Guards
```typescript
// Örnek route guard
@RouteGuard({
  permissions: ['read:content', 'write:content'],
  userTypes: ['individual', 'corporate']
})
```

## 5. Güvenlik Önlemleri

### Temel Güvenlik
- HTTPS zorunluluğu
- Password hashing (bcrypt)
- SQL injection koruması
- XSS ve CSRF koruması

### Rate Limiting
```typescript
// Örnek rate limit konfigürasyonu
{
  window: 15 * 60 * 1000, // 15 minutes
  max: 100 // requests
}
```

## 6. Önerilen Teknoloji Stack

### Backend
- Node.js + Express/FastAPI
- PostgreSQL/MongoDB
- Redis (caching, rate limiting)
- JWT için jsonwebtoken

### Frontend
- TypeScript
- State Management (Redux/Zustand)
- Axios/fetch için interceptor'lar
- Local storage/cookie yönetimi

## 7. Ölçeklenebilirlik

### Performans Optimizasyonu
- Caching stratejileri
- Lazy loading
- CDN kullanımı
- Database indexing

### Monitoring
- Error tracking
- Performance metrics
- Security auditing
- User analytics
