import { create } from "zustand";
import { persist } from "zustand/middleware";
export type Comment = {
  id: string;
  postId: string;
  text: string;
  date: Date;
};

export type Post = {
  id: string;
  author: string;
  comment: string;
  date: Date;
  image: string | null;
  comments?: Comment[]; // optional array of comments
};

type PostStore = {
  posts: Post[];
  selectedPost: Post | null;
  addPost: (post: Post) => void;
  setSelectedPost: (post: Post) => void;
  addComment: (postId: string, comment: Comment) => void;
};

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],
      selectedPost: null,
      addPost: (post: Post) => set({ posts: [...get().posts, post] }),
      setSelectedPost: (post: Post) => set({ selectedPost: post }),
      addComment: (postId: string, comment: Comment) =>
        set({
          posts: get().posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [...(post.comments || []), comment],
                }
              : post
          ),
        }),
    }),
    {
      name: "posts",
      storage: {
        getItem: (name) => {
          if (typeof window === "undefined") return null;
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          if (typeof window === "undefined") return;
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          if (typeof window === "undefined") return;
          localStorage.removeItem(name);
        },
      },
      onRehydrateStorage: () => (state) => {
        if (state?.posts) {
          state.posts = state.posts.map((post) => ({
            ...post,
            date: new Date(post.date),
            comments:
              post.comments?.map((c) => ({ ...c, date: new Date(c.date) })) ||
              [],
          }));
        }
      },
    }
  )
);
