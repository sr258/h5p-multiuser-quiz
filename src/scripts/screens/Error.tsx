import { Text, Box, Heading } from "grommet";
import { IParams } from "../types";
import { useTranslation } from "use-h5p";

export const Error = ({
  params,
  errorMessage,
  title,
}: {
  params: IParams;
  errorMessage: string;
  title: string;
}) => {
  const { t } = useTranslation();

  return (
    <Box align="center">
      <Heading textAlign="center">{title}</Heading>
      <Box direction="column" align="center">
        <Text margin="small" textAlign="center">
          {t("connection-error")}
        </Text>
        <Text textAlign="center">{errorMessage}</Text>
      </Box>
    </Box>
  );
};
