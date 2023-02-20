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
        src={`${BASE_URL}/assets/info4.jpeg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>MikaCosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas aut
        laudantium recusandae ea excepturi praesentium sit at, esse iure
        mollitia consequatur pariatur deserunt neque exercitationem, cum earum.
        Explicabo, corrupti ipsa! Unde, minima voluptate. Reiciendis repellat
        quis quas autem porro accusamus distinctio vitae quisquam, architecto
        ullam suscipit? Animi iste quasi, tenetur autem provident odio deleniti
        excepturi itaque doloribus, inventore ea modi! Officiis pariatur ipsam
        praesentium, recusandae minima commodi deserunt ipsum voluptatibus
        maiores itaque molestias, mollitia sint. Consequuntur, aut pariatur
        excepturi qui tempore nostrum nam eligendi odio! Quibusdam accusamus
        blanditiis officia eum?
      </Typography>
    </WidgetWrapper>
  );
};
