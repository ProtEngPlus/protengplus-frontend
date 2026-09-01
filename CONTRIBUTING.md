# Contributing

กติกา commit message / branch / PR ของทุก repo ProtEngPlus เขียนรวมไว้ที่
[manual-guides-2023/CONTRIBUTING.md](https://github.com/ProtEngPlus/manual-guides-2023/blob/main/CONTRIBUTING.md)
repo นี้ตั้ง hook ให้เองตอน `npm install` (husky + lint-staged) ไม่ต้องลง `pre-commit`

## Pre-commit hooks

- **pre-commit**: `eslint --fix` กับไฟล์ `.js` / `.jsx` / `.ts` / `.tsx` ที่ staged
- **pre-push**: `npm run build` (จับ type error ก่อน push)
- **commit-msg**: `commitlint` ปฏิเสธ commit ที่ผิดฟอร์แมต Conventional Commits

รัน lint มือทั้ง repo: `npm run lint:fix`
