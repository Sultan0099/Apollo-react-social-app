export interface IPost {
  key: string;
  postId: string;
  username: string;
  body: string;
  comments: any[];
  likes: [];
  createdAt: string;
}
