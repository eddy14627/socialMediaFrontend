import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../widgets/Loader";
import Navbar from "scenes/navbar";
import { AdvertWidget } from "scenes/widgets/AdvertWidget";
import FriendListWidgets from "scenes/widgets/FriendListWidgets";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { setActiveUser } from "state";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [isLoading, setIsLoading] = useState(true);
  const { _id, picturePath } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true); // Start loading
    // Simulate data fetching or initialization
    setTimeout(() => {
      dispatch(setActiveUser({ activeUserPicture: picturePath, id: _id }));
      setIsLoading(false); // End loading
    }, 2000); // Simulated delay (e.g., API call)
  }, [dispatch, _id, picturePath]);

  if (isLoading) {
    return <Loader />; // Show spinner while loading
  }

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
          <PostsWidget userId={_id} isProfile="false" />
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
