import { Text, Box, Heading } from "grommet";
import { IParams } from "../types";

export const Deleted = ({ params }: { params: IParams }) => {
  return (
    <Box align="center">
      <Heading textAlign="center">{params.questions.metadata.title}</Heading>
      <Box direction="row">
        <Text margin="small">
          The content was deleted or updated. Please refresh this page to try
          reloading it.
        </Text>
      </Box>
    </Box>
  );
};
