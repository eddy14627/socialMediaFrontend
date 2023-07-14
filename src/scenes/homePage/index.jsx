import { Box, useMediaQuery } from "@mui/material";
import Loader from "../widgets/Loader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { AdvertWidget } from "scenes/widgets/AdvertWidget";
import FriendListWidgets from "scenes/widgets/FriendListWidgets";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { setActiveUser } from "state";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [isLoading, setIsLoading] = useState(false);
  const { _id, picturePath } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(setActiveUser({ activeUserPicture: picturePath, id: _id }));
    setIsLoading(false);
  }, []);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          {isLoading ? (
            <Loader />
          ) : (
            <PostsWidget userId={_id} isProfile="false" />
          )}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidgets userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
