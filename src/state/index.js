import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  currUser: {
    activeUserPicture: null,
    id: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    // Set all posts and ensure they are sorted by `createdAt` in descending order
    setPosts: (state, action) => {
      console.log(action.payload);
      state.posts = action.payload.posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
    // Update a specific post and ensure the posts array remains sorted
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      // Sort the updated posts array by `createdAt` in descending order
      state.posts = updatedPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
    setActiveUser: (state, action) => {
      console.log(action.payload);
      state.currUser = action.payload;
    },
  },
});

export const {
  setActiveUser,
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
} = authSlice.actions;

export default authSlice.reducer;
