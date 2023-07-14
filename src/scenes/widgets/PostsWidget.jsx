import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";
import PostWidget from "./PostWidget";
import BASE_URL from "../../url.js";
import Loader from "./Loader";
import { Typography } from "@mui/material";

const PostsWidget = ({ userId, isProfile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    setIsLoading(true);
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setIsLoading(false);
  };

  const getUserPosts = async () => {
    setIsLoading(true);
    const response = await fetch(`${BASE_URL}/posts/userPost/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    dispatch(setPosts({ posts: data }));
    setIsLoading(false);
  };

  useEffect(() => {
    // req to fix this code so that we can ge personilized posts in user section
    setIsLoading(true);
    if (isProfile === "true") {
      getUserPosts();
    } else {
      getPosts();
    }
    setIsLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : Array.isArray(posts) && posts.length > 0 ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => {
            return (
              <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
              />
            );
          }
        )
      ) : (
        <Typography style={{ fontSize: "24px" }}>No Post Available</Typography>
      )}
    </>
  );
};

export default PostsWidget;
