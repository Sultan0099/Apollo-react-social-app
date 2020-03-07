import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@apollo/react-hooks";

import Post from "./Post";
import { useFetchPosts } from "../utils/hooks";
import { SET_POST_CLIENT } from "../utils/typeDefsClient";

function InfiniteScrollComp() {
  const { data } = useQuery(SET_POST_CLIENT);

  const posts = data && [...data?.setPosts];
  const {
    error,
    formatDate,
    fetchNextPosts,
    hasMore,
    loading
  } = useFetchPosts();
  if (error) return <p> error </p>;

  if (!data) return <p> loading ... </p>;

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
            key={`${post.id}`}
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
