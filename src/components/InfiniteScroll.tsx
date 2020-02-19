import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import { useFetchPosts } from "../utils/hooks";

function InfiniteScrollComp() {
  const {
    error,
    posts,
    formatDate,
    fetchNextPosts,
    hasMore,
    loading
  } = useFetchPosts();
  console.log(posts);
  if (error) return <p> error </p>;

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNextPosts}
      hasMore={hasMore}
      endMessage={<p> End </p>}
      loader={<h4>Loading...</h4>}
    >
      {posts.map((post: any) => {
        return (
          <Post
            key={post.id}
            postId={post.id}
            username={post.username}
            body={post.body}
            comments={post.comments}
            likes={post.likes}
            createdAt={formatDate(post.createdAt)}
          />
        );
      })}
    </InfiniteScroll>
  );
}

export default InfiniteScrollComp;
