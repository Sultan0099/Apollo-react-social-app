import { FETCH_POST_CLIENT, SET_POST_CLIENT } from "./typeDefsClient";

export const resolvers = {
  Query: {
    fetchPosts: (_: any, __: any, { cache }: { cache: any }) => {
      return cache.readQuery({ query: FETCH_POST_CLIENT });
    }
  },
  Mutation: {
    setPosts: (_: any, __: any, { cache }: { cache: any }) => {}
  }
};
