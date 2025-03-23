//App.tsx
import { useQuery } from "@tanstack/react-query";
import { getCars } from "../api/carapi";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";

function Carlist() {
  const { data, error, isSuccess } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  if (!isSuccess) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error when fetching cars...</span>;
  }

  //그리드 컬럼 메타 데이터 정의
  const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Brand', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'color', headerName: 'Color', width: 200 },
    { field: 'registrationNumber', headerName: 'Reg.nr.', width: 150 },
    { field: 'modelYear', headerName: 'Model Year', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'delete',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button onClick={() => {
          alert(`Delete ${params.row._links.self.href}`);
        }}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <DataGrid rows={data} columns={columns} getRowId={(row) => row._links.self.href} />
  );
}

export default Carlist;