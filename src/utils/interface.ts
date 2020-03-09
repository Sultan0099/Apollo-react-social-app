export interface IPost {
  key: string;
  postId: string;
  username: string;
  body: string;
  comments: any[];
  likes: [];
  createdAt: string;
  userId: string;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  name: string;
}
