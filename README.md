# OX GROUP NestJS Backend Test Task

Assalomu alaykum! Bu loyiha OX GROUP uchun test topshiriq sifatida yozilgan NestJS backend.

## Bosqichma-bosqich ishga tushirish

### 1. Nimalar kerak?
- Node.js (18+)
- npm
- PostgreSQL (baza ochilgan bo‘lishi kerak)

### 2. Loyihani yuklab oling va sozlang
```bash
git clone <repository-url>
cd ox-task
npm install
```

### 3. .env faylini tayyorlang
`env.example` faylidan nusxa oling va o‘zingizga moslab to‘ldiring:
```bash
cp env.example .env
```
Yoki Windowsda:
```powershell
copy env.example .env
```

Masalan, .env faylida shunday yoziladi:
```
DATABASE_URL="postgresql://postgres:parol@localhost:5432/ox"
JWT_SECRET="maxfiy-jwt-kalit"
JWT_EXPIRES_IN="24h"
PORT=3000
OX_API_BASE_URL="https://{subdomain}.ox-sys.com"
```

PostgreSQL’da baza oching:
```sql
CREATE DATABASE ox;
```

### 4. Prisma migratsiya va client
```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Loyihani ishga tushiring
```bash
npm run start:dev
```

Swagger hujjat: http://localhost:3000/api

## Asosiy API’lar
- `POST /auth/login` — Email bilan login, OTP qaytaradi
- `POST /auth/verify` — OTP ni tekshiradi, JWT beradi
- `POST /company/register` — Kompaniya qo‘shish yoki mavjudiga ulanish
- `DELETE /company/:id` — Kompaniyani o‘chirish (admin)
- `GET /products?page=1&size=10` — Mahsulotlar ro‘yxati (manager)

## Muhim eslatmalar
- OTP javobda chiqadi, real loyihada email/SMS bo‘ladi
- JWT_SECRET ni xavfsizroq qilib o‘zgartiring
- OX API uchun haqiqiy token va subdomainga ozgartiring

## Loyiha tuzilmasi
```
src/
├── auth/
├── company/
├── products/
├── common/
├── prisma/
├── app.module.ts
└── main.ts
```

Savollar bo‘lsa, bemalol yozing!
