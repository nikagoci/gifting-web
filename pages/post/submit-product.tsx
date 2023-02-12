import PostOverview from "@/components/post/post-overview";
import PostSteps from "@/components/post/post-steps";

export default function ProductOverviewPage() {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="py-8">
        <PostSteps
          status={{
            addProduct: "complete",
            productOverview: "complete",
            submitProduct: "current",
          }}
        />
      </div>
      <div className="py-8">
        <PostOverview />
      </div>
    </div>
  );
}
