import { useState, useEffect } from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";

import { FETCH_PAGINATED_POST } from "../query";
import moment from "moment";

import { SET_POST_CLIENT } from "./typeDefsClient";

export function useFetchPosts() {
  const [queryVariables, setQueryVariables] = useState<{
    page: number;
    postLength: number;
  }>({
    page: 1,
    postLength: 10
  });

  const [posts, setPosts] = useState<any[]>([]);
  const { data, error, loading, fetchMore } = useQuery(FETCH_PAGINATED_POST, {
    variables: {
      page: queryVariables.page,
      postLength: queryVariables.postLength
    },
    fetchPolicy: "cache-and-network"
  });

  const { client } = useQuery(SET_POST_CLIENT);

  useEffect(() => {
    if (data) {
      console.log("useQuery data ", data);
      const combinePosts: any[] = [
        ...new Set([...posts, ...data?.paginatedPost.posts])
      ];

      //  reomve dublication

      let filteredPost: any[] = [];
      if (combinePosts.length > 0) {
        for (let i = 0; i < combinePosts.length; i++) {
          if (combinePosts[i]?.id !== combinePosts[i + 1]?.id) {
            filteredPost.push(combinePosts[i]);
          }
        }

        // SET POSTS TO POSTS
        setPosts(filteredPost);

        //  WIRTING DRIRECT DATA TO APOLLO CLIENT
        client.writeQuery({
          query: SET_POST_CLIENT,
          data: { setPosts: filteredPost }
        });
      }
    }
  }, [data?.paginatedPost?.posts]);

  async function fetchNextPosts() {
    try {
      await fetchMore({
        variables: {
          page: queryVariables.page + 1,
          postLength: queryVariables.postLength
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          // if (!fetchMoreResult) return prev;
          console.log("prev", prev);
          console.log("fetchMore", fetchMoreResult);
          const newObject = {
            paginatedPost: {
              posts: [
                ...prev.paginatedPost.posts,
                ...fetchMoreResult.paginatedPost.posts
              ],
              hasMore: fetchMoreResult.paginatedPost.hasMore,
              __typename: fetchMoreResult.paginatedPost.__typename
            }
          };
          setQueryVariables({
            page: queryVariables.page + 1,
            postLength: 10
          });

          return newObject;
        }
      });
    } catch (err) {
      console.log(err);
    }
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
