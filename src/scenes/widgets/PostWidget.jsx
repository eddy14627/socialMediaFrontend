import { useTheme } from "@emotion/react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friends from "components/Friends";
import UserImage from "components/UserImage.jsx";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPost } from "state";
import BASE_URL from "../../url.js";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const { activeUserPicture, id } = useSelector((state) => state.currUser);
  const [seeMoreDescription, setSeeMoreDescription] = useState(false); // State for toggling description
  const [inputComment, setInputComment] = useState("");
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const navigate = useNavigate();

  const handleChangeComment = (e) => {
    setInputComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    console.log("Submit Comment");
    const SendComment = {
      userId: id,
      postId: postId,
      commentText: inputComment,
      commentPicture: activeUserPicture,
    };
    console.log(SendComment);
    const data = await fetch(`${BASE_URL}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SendComment),
    });
    const response = await data.json();
    console.log(response);
    dispatch(setPost({ post: response }));
    setInputComment("");
  };

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPosts = await response.json();
    console.log(updatedPosts);
    dispatch(setPost({ post: updatedPosts }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friends
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      {/* Description with Show More/Show Less */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description.length > 100 ? ( // Limit description to first 100 characters
          seeMoreDescription ? (
            <>
              {description}{" "}
              <Button
                onClick={() => setSeeMoreDescription(false)}
                sx={{
                  color: primary,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Show Less
              </Button>
            </>
          ) : (
            <>
              {description.slice(0, 100)}...{" "}
              <Button
                onClick={() => setSeeMoreDescription(true)}
                sx={{
                  color: primary,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Show More
              </Button>
            </>
          )
        ) : (
          description // If description is shorter than the limit, show it fully
        )}
      </Typography>

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* LIKE */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          {/* COMMENT */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {/* Comments Section */}
      {isComments && (
        <Box mt="0.5rem">
          <Box marginBottom="10px" display="flex" flexDirection="row">
            <Button
              onClick={() => {
                navigate(`/profile/${id}`);
                navigate(0); // Temporary solution; replace with a better approach if needed
              }}
            >
              <UserImage image={activeUserPicture} size="50px" />
            </Button>
            <Box
              marginBottom="10px"
              marginLeft="15px"
              display="flex"
              flexDirection="row"
            >
              <Input
                value={inputComment}
                onChange={handleChangeComment}
                placeholder="comment"
              />
              <Button onClick={handleSubmitComment}>comment</Button>
            </Box>
          </Box>

          {comments.map(({ commentText, userId, commentPicture }, index) => (
            <Box key={index}>
              <Divider />
              <Box marginLeft="20px" display="flex" flexDirection="row">
                <Button
                  onClick={() => {
                    navigate(`/profile/${userId}`);
                    navigate(0); // Temporary solution; replace with a better approach if needed
                  }}
                >
                  <UserImage image={commentPicture} size="30px" />
                </Button>
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {commentText}
                </Typography>
              </Box>
            </Box>
          ))}

          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
