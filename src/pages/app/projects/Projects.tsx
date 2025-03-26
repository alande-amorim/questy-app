import { Box, Button } from "@mui/material";
import AppLayout from "../../../components/layouts/AppLayout/AppLayout";
import DataGrid from "./components/DataGrid";
import Section from "../../../components/layouts/AppLayout/components/Section";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router";

export default function Projects(props: { disableCustomTheme?: boolean }) {
  return (
    <AppLayout pageTitle="Projects">
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Section
          title="Projects"
          action={
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              component={Link}
              to="/project/create"
            >
              Create
            </Button>
          }
        >
          <DataGrid />
        </Section>
      </Box>
    </AppLayout>
  );
}
