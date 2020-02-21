import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_PAGINATED_POST } from "../query";
import moment from "moment";

export function useFetchPosts() {
  const [queryVariables, setQueryVariables] = useState<{
    page: number;
    postLength: number;
  }>({
    page: 1,
    postLength: 10
  });

  const [posts, setPosts] = useState<any[]>([]);

  const { data, error, refetch, loading } = useQuery(FETCH_PAGINATED_POST, {
    variables: {
      page: queryVariables.page,
      postLength: queryVariables.postLength
    }
  });

  const checkData = data && data.paginatedPost.posts;
  useEffect(() => {
    if (data) {
      // filtering post so it does not have dublicate
      const filterePost = [...new Set([...posts, ...data.paginatedPost.posts])];
      // lastPost is changed post after like
      const lastPost = filterePost.slice(
        filterePost.length - 1,
        filterePost.length
      );
      // checking index of post whose id are equal and likes length are changed
      const indexOfPost = filterePost.findIndex(
        post =>
          post.id === lastPost[0].id &&
          post.likes.length !== lastPost[0].likes.length
      );
      // removing previous post and added new updated post
      if (indexOfPost != -1) filterePost.splice(indexOfPost, 1, lastPost[0]);

      setPosts([...new Set([...filterePost])]);
    }
  }, [data?.paginatedPost?.posts]);

  async function fetchNextPosts() {
    data.paginatedPost.hasMore &&
      (await refetch({
        page: queryVariables.page + 1,
        postLength: queryVariables.postLength
      }));
    setQueryVariables({
      page: queryVariables.page + 1,
      postLength: queryVariables.postLength
    });
  }

  function formatDate(date: string) {
    let currentDate = new Date(parseInt(date));
    return moment(currentDate).fromNow();
  }

  return {
    error,
    posts,
    formatDate,
    fetchNextPosts,
    loading,
    hasMore: data && data.paginatedPost.hasMore
  };
}
