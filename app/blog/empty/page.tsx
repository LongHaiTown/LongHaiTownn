export default function EmptyBlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Không có bài viết</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Bài viết bạn tìm không tồn tại hoặc đã bị xoá.</p>
      <a
        href="/blog"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
      >
        ← Quay lại Blog
      </a>
    </div>
  )
}
