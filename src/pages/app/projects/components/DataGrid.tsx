import { useState, useEffect } from "react";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { columns } from "./gridData";
import { useProjects } from "../../../../hooks/queries/useProjects";
import { ProjectResponseDTO } from "../../../../services/questy";

interface ProjectCount {
  tasks: number;
  users: number;
}

const makeRows = (projects: ProjectResponseDTO[]) => {
  return projects.map((project) => ({
    id: project.id,
    code: project.code,
    projectName: project.name,
    tasksCount: (project._count as ProjectCount).tasks || 0,
    usersCount: (project._count as ProjectCount).users || 0,
  }));
};

export default function DataGrid() {
  const [rows, setRows] = useState<any[]>([]);
  const { data: projects } = useProjects();

  useEffect(() => {
    if (projects) {
      setRows(makeRows(projects));
    }
  }, [projects]);

  return (
    <MuiDataGrid
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
}
