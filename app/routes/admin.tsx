import { useEffect, useState } from "react";
import { Outlet, Link, useLoaderData } from "remix";
import { Post, getPosts } from "~/post"
import adminStyles from "~/styles/admin.css"

export const loader = () => {
  return getPosts();
};

export const links = () => {
  return [{ rel: 'stylesheet', href: adminStyles }]
}


export default function Admin() {
  const posts = useLoaderData<Post[]>();
  (posts)

  const [filteredPosts, setfilteredPosts] = useState(posts)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const filtered = posts.filter(el => el.title.indexOf(search) > -1)
    setfilteredPosts(filtered)
  }, [search])

  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <input title="Search" value={search} type="text" onChange={(e) => setSearch(e.target.value)} />
        <ul>
          {filteredPosts.map(post => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>
                {post.title}
              </Link>
              <div>
              <Link to={`/admin/edit/${post.slug}`}>
                edit
              </Link>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}