import { Box } from "@mui/material";
import AppLayout from "../../../components/layouts/AppLayout/AppLayout";
import Section from "../../../components/layouts/AppLayout/components/Section";
import Form from "./components/Form";

export default function CreateProject(props: { disableCustomTheme?: boolean }) {
  return (
    <AppLayout pageTitle="Create Project">
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Form />
      </Box>
    </AppLayout>
  );
}
