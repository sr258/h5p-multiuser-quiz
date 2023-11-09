import { Text, Box, Heading, Spinner } from "grommet";
import { IParams } from "../types";
import { useTranslation } from "use-h5p";

export const Initializing = ({
  params,
  title,
}: {
  params: IParams;
  title: string;
}) => {
  const { t } = useTranslation();

  return (
    <Box align="center">
      <Heading textAlign="center">{title}</Heading>
      <Box direction="row">
        <Spinner margin="small" />
        <Text margin="small">{t("connecting")}</Text>
      </Box>
    </Box>
  );
};
