import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import UserImage from "components/UserImage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Comment = () => {
  const [seeMore, setSeeMore] = useState(false);
  const navigate = useNavigate();

  return (
    <Box>
      <Divider />
      <Box marginLeft="20px" display="flex" flexDirection="row">
        <Button
          onClick={() => {
            navigate(`/profile/${userId}`);
            // find why this is used and how to replace with some permanent solution
            navigate(0);
          }}
        >
          <UserImage image={commentPicture} size="30px" />
        </Button>
        <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
          {commentText.length < 200
            ? commentText
            : !seeMore
            ? `${commentText.slice(0, 80)}.....`
            : commentText}
          {/* {commentText.length > 200 ? ((!seeMore) ? (<Button onClick={() => {setSeeMore(!seeMore)}} >See More</Button>):(handleChangeComment)) : (handleChangeComment)} */}
        </Typography>
      </Box>
    </Box>
  );
};

export default Comment;
