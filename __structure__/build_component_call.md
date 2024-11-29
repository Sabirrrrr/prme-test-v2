# Web Component Yapılandırma ve Kullanım Rehberi

## Karşılaşılan Temel Sorunlar

1. **Component Tanımlama Çakışması**
   ```typescript
   // Hata: "this constructor has already been used with this registry"
   customElements.define('shared-side-nav', SideNav);  // Çakışma!
   ```
   Bu hata, aynı componentin birden fazla kez tanımlanmaya çalışılmasından kaynaklanır.

2. **Import Yolu Sorunları**
   ```typescript
   // Yanlış
   import { SideNav } from "votocon-shared/src/components/nav/side-nav";
   
   // Doğru
   import { SideNav } from "@votocon/shared/components/nav/side-nav";
   ```

## Çözüm Stratejisi

### 1. Component Tanımlama Düzeni

Her component kendi dosyasında SADECE BİR KEZ tanımlanmalıdır:

```typescript
// footer.ts
@customElement('shared-footer')
export class Footer extends LitElement {
  // ...
}
```

### 2. Import ve Export Yapısı

1. Shared paketinde:
   ```typescript
   // index.ts (shared paket root'unda)
   export * from './components/nav/side-nav';
   export * from './components/nav/profile-menu';
   export * from './components/footer/footer';
   ```

2. Main uygulamasında:
   ```typescript
   // Tek bir noktadan import
   import { SideNav, ProfileMenu, Footer } from '@votocon/shared';
   ```

### 3. Vite Yapılandırması

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@votocon/shared': path.resolve(__dirname, '../votocon-shared/src')
    }
  },
  optimizeDeps: {
    include: ['@votocon/shared']
  }
});
```

### 4. Component Kullanım Sırası

1. Önce component tanımlanır (bir kez)
2. Sonra template içinde kullanılır
3. Component tag'leri tutarlı olmalıdır:
   ```typescript
   @customElement('shared-footer')  // Tanımlama
   <shared-footer></shared-footer>  // Kullanım - aynı isim
   ```

## Best Practices

1. **Naming Convention**
   - Component isimleri benzersiz prefix kullanmalı (örn: 'shared-', 'main-')
   - Tutarlı naming pattern takip edilmeli

2. **Import Yönetimi**
   - Barrel exports kullanılmalı (index.ts üzerinden)
   - Absolute import paths tercih edilmeli

3. **Component Tanımlama**
   - Her component kendi dosyasında tanımlanmalı
   - Global registry kontrolleri yapılmalı
   ```typescript
   if (!customElements.get('shared-footer')) {
     customElements.define('shared-footer', Footer);
   }
   ```

4. **Proje Yapısı**
   ```
   frontend/
   ├── packages/
   │   ├── votocon-shared/
   │   │   ├── src/
   │   │   │   ├── components/
   │   │   │   ├── index.ts       # Barrel exports
   │   │   │   └── styles/
   │   └── votocon-main/
   │       ├── src/
   │       │   ├── components/
   │       │   └── main.ts
   │       └── vite.config.ts
   ```

## Sorun Giderme Kontrol Listesi

1. [ ] Component isimleri benzersiz mi?
2. [ ] Import yolları doğru mu?
3. [ ] Vite alias tanımlamaları yapıldı mı?
4. [ ] Component tanımlamaları tek noktada mı?
5. [ ] Stil dosyaları doğru import edilmiş mi?
6. [ ] Component tag isimleri tanımlamalarla uyumlu mu?

Bu rehber, gelecekte benzer sorunlarla karşılaşmamak için referans olarak kullanılabilir.
