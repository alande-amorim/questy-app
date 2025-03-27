import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { UserResponseDTO } from "../../services/questy/http-client";

interface UserSelectorProps {
  label: string;
  value: string | null;
  users: UserResponseDTO[];
  onChange: (value: string | null) => void;
}

export default function UserSelector({
  label,
  value,
  users,
  onChange,
}: UserSelectorProps) {
  const handleChange = (event: SelectChangeEvent<string | null>) => {
    onChange(event.target.value || null);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || ""}
        label={label}
        onChange={handleChange}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {users.map((user) => {
          return (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
