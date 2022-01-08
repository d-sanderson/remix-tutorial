import { Link, useLoaderData } from "remix";
import { getPosts } from "~/post";

type Post = {
    slug: string;
    title: string;
  };

export const loader = async () => {
    const posts: Post[] = await getPosts()
    return posts
};

export default function Posts() {
    const posts = useLoaderData<Post[]>();
    const postListItems = posts.map(post => <li key={post.slug}>
        <Link to={post.slug}>{post.title}
        </Link> </li>
    )
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {postListItems}
            </ul>
        </div>
    );
}