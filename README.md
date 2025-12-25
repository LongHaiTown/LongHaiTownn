# LongHaiTown — Tổng quan dự án

## Mô tả ngắn
Dự án này là một trang web cá nhân/portfolio/blog được xây dựng bằng Next.js (App Router) + TypeScript, dùng MDX cho nội dung bài viết, Tailwind CSS cho styling và một tập hợp component UI tái sử dụng.

## Kỹ thuật chính
- Framework: `Next.js` (phiên bản trong `package.json`)
- Ngôn ngữ: `TypeScript`
- UI: `Tailwind CSS` (cấu hình ở `tailwind.config.js`)
- MDX: hỗ trợ file `.mdx` cho bài viết (cấu hình ở `next.config.mjs`)
- Component library: Radix UI + một số thư viện UI (ví dụ `framer-motion`, `lucide-react`, `embla-carousel-react`)
- Data: một số dữ liệu tĩnh nằm trong thư mục `backend` (ví dụ `projects.json`, `skills.json`) và được đọc bằng hàm `readJson` ở `lib/backend.ts`.
- Analytics: `@vercel/analytics`

Phiên bản chính được sử dụng được liệt kê trong `package.json` (Next, React, v.v.).

## Cấu trúc thư mục chính
- `app/` — mã nguồn Next.js (App Router), gồm layout và trang chính.
- `components/` — các component UI tuỳ chỉnh (header, theme provider, skills, v.v.).
- `ui/` — thư viện các component UI nhỏ dùng lại (button, dialog, toast, v.v.).
- `content/posts/` — bài viết MDX/Markdown (chứa nội dung blog).
- `backend/` — JSON dữ liệu tĩnh (projects, skills, experience, hero, ...).
- `lib/` — helper/utility (ví dụ `lib/backend.ts`, `lib/posts.ts`).
- `public/` — tài nguyên tĩnh (hình ảnh, icons, media).

## Tính năng chính
- Hỗ trợ viết bài bằng MDX, có thể chèn React component trong nội dung.
- Theme (dark/light) thông qua `ThemeProvider` và Tailwind.
- Trang portfolio hiển thị dữ liệu từ file JSON tĩnh trong `backend/`.
- Các component UI reusable trong `components/` và `ui/`.

## Hướng dẫn cài đặt & chạy
Yêu cầu: Node.js (phiên bản >= 18 khuyến nghị), pnpm/npm/yarn.

Sử dụng `pnpm` (khuyến nghị nếu bạn có `pnpm-lock.yaml`):
```bash
pnpm install
pnpm dev
```

Hoặc dùng `npm`:
```bash
npm install
npm run dev
```

Lệnh hữu ích:
- `npm run dev` / `pnpm dev` — chạy môi trường phát triển
- `npm run build` — build production
- `npm start` — chạy production (sau build)
- `npm run lint` — kiểm tra eslint

## Thêm nội dung (bài viết)
- Bài viết nằm trong `content/posts/` dưới dạng `.mdx` hoặc `.md`.
- Để tạo bài mới, thêm file `.mdx` vào `content/posts/` và follow cấu trúc frontmatter (tiêu đề, ngày, slug, tags nếu cần).

## Dữ liệu tĩnh & Backend local
- Các dữ liệu như `projects.json`, `skills.json`, `experience.json` nằm trong `backend/`.
- Dùng `lib/readJson` hoặc `lib/backend.ts::readJson()` để đọc những file này theo đường dẫn tương đối từ thư mục `backend`.

