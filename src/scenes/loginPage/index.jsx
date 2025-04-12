import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      backgroundColor={theme.palette.background.default}
    >
      {/* Header */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color={theme.palette.primary.main}
        >
          GoSocial
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        flexGrow={1} // Ensures this section takes up remaining space
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width={isNonMobileScreens ? "40%" : "90%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
          textAlign="center"
        >
          <Typography
            fontWeight="500"
            variant="h5"
            sx={{
              mb: "1.5rem",
              color: theme.palette.text.primary,
            }}
          >
            Welcome to <strong>GoSocial</strong>, the Social Media for
            Sociopaths!
          </Typography>
          <Form />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
