import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Heading, Text, Box } from "grommet";
import { IMetadata } from "../types";
import { useTranslation } from "use-h5p";

export const PreparingStudent = ({ metadata }: { metadata: IMetadata }) => {
  const { t } = useTranslation();
  return (
    <Box fill="vertical" align="center">
      <Heading textAlign="center">{metadata.title}</Heading>
      <Box align="center">
        <Box margin="large">
          <FontAwesomeIcon size="3x" icon={faSpinner} spin />
        </Box>
        <Text textAlign="center">{t("preparing-student")}</Text>
      </Box>
    </Box>
  );
};
