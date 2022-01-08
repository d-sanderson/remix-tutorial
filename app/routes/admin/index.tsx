import { Link } from "remix";

export default function AdminIndex() {
  return (
    <main>
        <Link to="new">Create a New Post</Link>
    </main>
  );
}