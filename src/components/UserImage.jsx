import { Box } from "@mui/system";
import React from "react";
import BASE_URL from "url";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${BASE_URL}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
