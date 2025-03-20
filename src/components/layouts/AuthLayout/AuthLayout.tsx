import { CssBaseline } from "@mui/material";
import AppTheme from "../../theme/AppTheme";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const AuthContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

type AuthLayoutProps = {
  disableCustomTheme?: boolean;
  children: React.ReactNode;
};

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AuthContainer direction="column" justifyContent="space-between">
        {props.children}
      </AuthContainer>
    </AppTheme>
  );
}
