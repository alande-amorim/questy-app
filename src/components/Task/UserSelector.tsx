import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { User } from "../../entities/user";

interface UserSelectorProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSelect: (user: User.Fields) => void;
  selectedUser?: User.Fields;
}

// Mock users - replace with actual data
const mockUsers: User.Fields[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
  },
];

export default function UserSelector({
  open,
  title,
  onClose,
  onSelect,
  selectedUser,
}: UserSelectorProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <List>
          {mockUsers.map((user) => (
            <ListItemButton
              key={user.id}
              selected={selectedUser?.id === user.id}
              onClick={() => onSelect(user)}
            >
              <ListItemAvatar>
                <Avatar>{user.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
