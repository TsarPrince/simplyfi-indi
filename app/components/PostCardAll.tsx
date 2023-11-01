import PostCardInner from "./PostCardInner";

const PostCardAll = () => {
  return (
    <div className="overflow-hidden rounded-[2rem] ">
      <div className="bg-brown border p-6 rounded-[2rem] max-w-xl max-h-[calc(100vh-2rem)] overflow-y-scroll">
        <div className="flex justify-between">
          <p className="text-BodyLarge opacity-70">All Information Posts</p>
        </div>
        {[1, 2, 3].map((card, key) => (
          <PostCardInner key={key} />
        ))}
      </div>
    </div>
  );
};

export default PostCardAll;
