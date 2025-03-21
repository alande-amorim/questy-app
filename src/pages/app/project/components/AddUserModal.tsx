import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
} from "@mui/material";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
}

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (user: User) => void;
}

export default function AddUserModal({
  open,
  onClose,
  onAdd,
}: AddUserModalProps) {
  const [userData, setUserData] = useState<Partial<User>>({
    name: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.email) {
      onAdd({
        id: Math.random().toString(36).substr(2, 9), // temporary ID generation
        name: userData.name,
        email: userData.email,
        initials: getInitials(userData.name),
      });
      setUserData({ name: "", email: "" });
      onClose();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Team Member</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ width: 64, height: 64 }}>
                {userData.name ? getInitials(userData.name) : "?"}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <TextField
                  label="Name"
                  required
                  fullWidth
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  type="email"
                  required
                  fullWidth
                  value={userData.email}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Member
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
