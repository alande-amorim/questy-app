import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  CardActions,
} from "@mui/material";

type DashboardCardProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  cardheading?: boolean;
  headtitle?: string;
  headsubtitle?: string;
  middlecontent?: React.ReactNode;
};

const Section = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
}: DashboardCardProps) => {
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
          {children}
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px" }}>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <Box>
                {title ? <Typography variant="h5">{title}</Typography> : ""}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}

      {footer && <CardActions sx={{ padding: "30px" }}>{footer}</CardActions>}
    </Card>
  );
};

export default Section;
