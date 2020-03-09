import React, { useEffect } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@apollo/react-hooks";

import Post from "./Post";
import { useFetchPosts } from "../utils/hooks";
import { SET_POST_CLIENT } from "../utils/typeDefsClient";
import { formatDate } from "../utils/helper";

function InfiniteScrollComp() {
  const { data } = useQuery(SET_POST_CLIENT);

  const posts = data && [...data?.setPosts];

  console.log(posts);

  const { error, fetchNextPosts, hasMore, loading } = useFetchPosts();
  if (error) return <p> error </p>;
  if (!data) return <p> loading ... </p>;
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNextPosts}
      hasMore={hasMore}
      loader={<p> loading ....</p>}
      endMessage={<p> End </p>}
    >
      {posts.map((post: any) => {
        return (
          <Post
            key={`${post.id}`}
            postId={post.id}
            userId={post.user.id}
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
