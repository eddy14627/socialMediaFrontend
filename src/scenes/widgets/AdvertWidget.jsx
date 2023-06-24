import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import BASE_URL from "../../url.js";

export const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`https://res.cloudinary.com/ticktocktreasure/image/upload/v1687589247/Animated-Ads-Maker-Mango-Animation-Maker_wltdgw.png`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Go Social </Typography>
        <Typography color={medium}>GoSocial.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Introducing a revolutionary social media platform that will change the
        way you connect, share, and explore. Join our vibrant community of users
        from all walks of life and experience the power of true social
        engagement. With our user-friendly interface and innovative features,
        staying connected with friends, family, and the world has never been
        easier. Share your thoughts, photos, and videos effortlessly, and
        discover exciting content tailored to your interests. Connect with
        like-minded individuals, join groups, and participate in meaningful
        discussions. Unleash your creativity, build meaningful relationships,
        and stay up-to-date with the latest trends. Embrace the future of social
        media and join us today!
      </Typography>
    </WidgetWrapper>
  );
};
