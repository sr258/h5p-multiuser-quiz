import { Text, Box, Heading } from "grommet";
import { IParams } from "../types";

export const Error = ({
  params,
  errorMessage,
  title,
}: {
  params: IParams;
  errorMessage: string;
  title: string;
}) => {
  return (
    <Box align="center">
      <Heading textAlign="center">{title}</Heading>
      <Box direction="column" align="center">
        <Text margin="small">
          There was an error connecting to the shared state server:
        </Text>
        <Text>{errorMessage}</Text>
      </Box>
    </Box>
  );
};
