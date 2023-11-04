import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Heading, Text, Box } from "grommet";
import { IMetadata } from "../types";

export const PreparingStudent = ({ metadata }: { metadata: IMetadata }) => {
  return (
    <Box fill="vertical" align="center">
      <Heading textAlign="center">{metadata.title}</Heading>
      <Box align="center">
        <Box margin="large">
          <FontAwesomeIcon size="3x" icon={faSpinner} spin />
        </Box>
        <Text textAlign="center">
          Please wait for your teacher to start the quiz...
        </Text>
      </Box>
    </Box>
  );
};
