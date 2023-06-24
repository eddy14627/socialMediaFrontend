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
    // this is all posts
    setPosts: (state, action) => {
      console.log(action.payload);
      state.posts = action.payload.posts;
    },
    // this is specified user posts
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
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
