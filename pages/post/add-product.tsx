import AddPost from "@/components/post/add-post";
import PostSteps from "@/components/post/post-steps";

export default function PostPage() {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="py-8">
        <PostSteps />
      </div>
      <div className="py-8">
        <AddPost />
      </div>
    </div>
  );
}
