import { Text, Box, Heading } from "grommet";
import { IParams } from "../types";

import { useTranslation } from "use-h5p";

export const Deleted = ({
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
        <Text margin="small" textAlign="center">
          {t("deleted-message")}
        </Text>
      </Box>
    </Box>
  );
};
