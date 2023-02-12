import AddPost from "@/components/post/add-post";
import PostSteps from "@/components/post/post-steps";

export default function AddProductPage() {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="py-8">
        <PostSteps
          status={{
            addProduct: "current",
            productOverview: "upcoming",
            submitProduct: "upcoming",
          }}
        />
      </div>
      <div className="py-8">
        <AddPost />
      </div>
    </div>
  );
}
