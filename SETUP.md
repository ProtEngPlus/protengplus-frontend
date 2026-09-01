# Setup

Setup ทั้งระบบครั้งแรกดูที่ [Guidebook](https://github.com/ProtEngPlus/manual-guides-2023/blob/main/README.md) ไฟล์นี้มีแค่รายละเอียดเฉพาะของ `protengplus-frontend`

## รันบนเครื่อง

ขั้นตอนหลัก (`cp .env.example .env.local` → `npm install` → `npm run dev`) อยู่ใน Guidebook §4.5
`npm install` ลง git hook (husky) ให้เองด้วย ต้องมี `proteng-bff` รันอยู่ถึงจะ login / เรียก API ได้

## Format & lint

Prettier format, ESLint lint, lint-staged autofix ทั้งคู่ตอน commit รันมือทั้ง repo:

```sh
npm run format      # prettier --write
npm run lint:fix    # eslint --fix
```

`npm run format:check` + `npm run lint` (ไม่ autofix) รันตอน `git push` และใน CI
(`.github/workflows/test-build.yaml`) ด้วย type error จับแยกด้วย `npm run build` (ตอน `git push` เหมือนกัน)

## API docs

app นี้คุยกับ proteng-bff อย่างเดียว (`VITE_BACKEND_BASE_URL`) API docs อยู่ที่ Swagger ของ bff:
`http://localhost:8080/swagger/index.html` (ดู `proteng-bff/SETUP.md`)
