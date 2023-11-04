import { Text, Box, Heading } from "grommet";
import { IParams } from "../types";

export const Deleted = ({
  params,
  title,
}: {
  params: IParams;
  title: string;
}) => {
  return (
    <Box align="center">
      <Heading textAlign="center">{title}</Heading>
      <Box direction="row">
        <Text margin="small" textAlign="center">
          The content was deleted or updated. Please refresh this page to try
          reloading it.
        </Text>
      </Box>
    </Box>
  );
};
