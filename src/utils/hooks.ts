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
    data && setPosts([...posts, ...data.paginatedPost.posts]);
  }, [checkData]);

  async function fetchNextPosts() {
    await refetch({
      page: queryVariables.page + 1,
      postLength: queryVariables.postLength
    });
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
