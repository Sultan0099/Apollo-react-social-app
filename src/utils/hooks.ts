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

  const { data, error, refetch, loading, fetchMore } = useQuery(
    FETCH_PAGINATED_POST,
    {
      variables: {
        page: queryVariables.page,
        postLength: queryVariables.postLength
      }
    }
  );

  useEffect(() => {
    if (data) {
      setPosts([...data?.paginatedPost.posts]);
    }
  }, [data?.paginatedPost?.posts]);

  async function fetchNextPosts() {
    await fetchMore({
      variables: {
        page: queryVariables.page + 1,
        postLength: queryVariables.postLength
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        console.log("prev", prev);
        console.log("fetchMore", fetchMoreResult);
        setPosts([
          ...prev.paginatedPost.posts,
          ...fetchMoreResult.paginatedPost.posts
        ]);
      }
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
