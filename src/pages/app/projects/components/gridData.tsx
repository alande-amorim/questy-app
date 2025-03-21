import Chip from "@mui/material/Chip";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

function renderStatus(status: "Online" | "Offline") {
  const colors: { [index: string]: "success" | "default" } = {
    Online: "success",
    Offline: "default",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

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
    field: "users",
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
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    align: "center",
    width: 120,
    renderCell: (params) => renderStatus(params.value as any),
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    code: "HPO",
    projectName: "Homepage Overview",
    status: "Online",
    tasksCount: 83,
    users: 2,
  },
  {
    id: 2,
    code: "PDG",
    projectName: "Product Details - Gadgets",
    status: "Online",
    tasksCount: 56,
    users: 1,
  },
  {
    id: 3,
    code: "CPS",
    projectName: "Checkout Process - Step 1",
    status: "Offline",
    tasksCount: 34,
    users: 5,
  },
  {
    id: 4,
    code: "UPD",
    projectName: "User Profile Dashboard",
    status: "Online",
    tasksCount: 11,
    users: 9,
  },
  {
    id: 5,
    code: "ALTN",
    projectName: "Article Listing - Tech News",
    status: "Offline",
    tasksCount: 36,
    users: 1,
  },
  {
    id: 6,
    code: "FAQS",
    projectName: "FAQs - Customer Support",
    status: "Online",
    tasksCount: 10,
    users: 1,
  },
  {
    id: 7,
    code: "PCL",
    projectName: "Product Comparison - Laptops",
    status: "Offline",
    tasksCount: 78,
    users: 3,
  },
  {
    id: 8,
    code: "SCE",
    projectName: "Shopping Cart - Electronics",
    status: "Online",
    tasksCount: 85,
    users: 4,
  },
  {
    id: 9,
    code: "PCBT",
    projectName: "Payment Confirmation - Bank Transfer",
    status: "Offline",
    tasksCount: 45,
    users: 1,
  },
  {
    id: 10,
    code: "PRSS",
    projectName: "Product Reviews - Smartphones",
    status: "Online",
    tasksCount: 98,
    users: 2,
  },
  {
    id: 11,
    code: "SMS",
    projectName: "Subscription Management - Services",
    status: "Offline",
    tasksCount: 65,
    users: 2,
  },
];
