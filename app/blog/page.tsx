import { getAllPosts } from "../../lib/posts"
import BlogClient from "./BlogClient"

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogClient posts={posts} />
}
// Previous client implementation moved to BlogClient.tsx
