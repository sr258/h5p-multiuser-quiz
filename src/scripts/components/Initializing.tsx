import { Text, Box, Heading, Spinner } from "grommet";
import { IParams } from "../types";

export const Initializing = ({
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
        <Spinner margin="small" />
        <Text margin="small">Connecting to server...</Text>
      </Box>
    </Box>
  );
};
