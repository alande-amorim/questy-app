import { Box, Button } from "@mui/material";
import ProjectLayout from "../../../../components/layouts/ProjectLayout/ProjectLayout";
import Section from "../../../../components/layouts/AppLayout/components/Section";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddUserModal from "../../project/components/AddUserModal";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export default function Members() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [, setMembers] = useState<User[]>([]);

  const handleAddUser = (user: User) => {
    setMembers((prev) => [...prev, user]);
  };

  return (
    <ProjectLayout pageTitle="Members">
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Section
          title="Team Members"
          action={
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => setIsAddUserModalOpen(true)}
            >
              Add Member
            </Button>
          }
        >
          {/* Add your team members list component here */}
        </Section>
      </Box>
      <AddUserModal
        open={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAdd={handleAddUser}
      />
    </ProjectLayout>
  );
}
