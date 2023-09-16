export interface Post {
    userId: number;
    id:     number;
    title:  string;
    body:   string;
}

export interface Comment {
    postId: number;
    id:     number;
    name:   string;
    email:  string;
    body:   string;
}

export interface User {
    id:       number;
    name:     string;
    username: string;
    email:    string;
    // address:  Address;
    // phone:    string;
    // website:  string;
    // company:  Company;
}

export interface UserWithImageInfo extends User {
  image: string;
}

export interface CombinedData {
  user: UserWithImageInfo;
  post: Post;
  comments: Comment[];
}