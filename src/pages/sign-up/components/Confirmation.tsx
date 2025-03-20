import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { User } from "../../../entities";
import confirmSignUp from "../../../services/auth/confirm-signup";
import { Alert } from "@mui/material";

interface ConfirmationProps {
  open: boolean;
  signUpData: User.SignUp;
  handleClose: () => void;
}

export default function Confirmation({
  open,
  handleClose,
  signUpData,
}: ConfirmationProps) {
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const confirmationCode = form.get("confirmation_code");

    const response = await confirmSignUp({
      email: signUpData.email,
      code: confirmationCode as string,
    });

    console.log(response);

    if (response.success) {
      handleClose();
    } else {
      setError(response.message || "Failed to sign up.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit,
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <DialogTitle>Confirmation code</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter the confirmation code sent to{" "}
          <b>
            <u>{signUpData.email}</u>
          </b>
          .
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="confirmation_code"
          name="confirmation_code"
          label="Confirmation code"
          placeholder="Confirmation code"
          type="text"
          fullWidth
        />

        {error && (
          <Alert severity="error" sx={{ my: -1 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
