import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "code",
    headerName: "Code",
    width: 120,
  },
  {
    field: "projectName",
    headerName: "Project",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "usersCount",
    headerName: "Users",
    headerAlign: "center",
    align: "center",
    width: 120,
  },
  {
    field: "tasksCount",
    headerName: "Tasks",
    headerAlign: "center",
    align: "center",
    width: 120,
  },
];
