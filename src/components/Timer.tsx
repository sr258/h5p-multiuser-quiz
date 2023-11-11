import { Text, Box, Meter, Stack } from "grommet";

export const Timer = ({ left, max }: { left: number; max: number }) => {
  return (
    <Stack>
      <Box fill align="center" justify="center">
        <Meter
          type="circle"
          thickness="xsmall"
          size="40"
          values={[
            {
              value: max - left,
              label: left.toString(),
              color: left <= 3 ? "status-critical" : "status-ok",
            },
          ]}
          max={max}
        />
      </Box>
      <Box fill align="center" justify="center">
        <Text size="small">{left}s</Text>
      </Box>
    </Stack>
  );
};
