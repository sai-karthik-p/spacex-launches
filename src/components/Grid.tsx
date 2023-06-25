import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';
import './Grid.css';
import { getFormattedDate } from '../utils/utils';

const CustomNoRowsOverlay = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          mt: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        No results found for the specified filter
      </Box>
    );
};

const statusLabelStyle = {
    fontWeight: 'medium',
    borderRadius: 6,
    width: 'max-content',
    padding: '0 1.5rem',
};

const getStatusLabel = (launch_success: boolean | null) => {
  if (launch_success === null) {
    return (
      <Alert
        sx={statusLabelStyle}
        icon={false}
        severity="warning"
      >
        Upcoming
      </Alert>
    );
  } else if (launch_success) {
    return (
      <Alert
        sx={statusLabelStyle}
        icon={false}
        severity="success"
      >
        Success
      </Alert>
    );
  } else {
    return (
      <Alert
        sx={statusLabelStyle}
        icon={false}
        severity="error"
      >
        Failed
      </Alert>
    );
  }
};

const columns: GridColDef[] = [
  {
    field: 'flight_number',
    headerClassName: 'grid-headeer-class',
    flex: 1,
    headerName: 'No',
    minWidth: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'launch_date_utc',
    headerClassName: 'grid-headeer-class',
    flex: 1,
    headerName: 'Launched (UTC)',
    minWidth: 250,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => {
      return getFormattedDate(params.row.launch_date_utc);
    },
  },
  {
    field: 'launch_site',
    headerClassName: 'grid-headeer-class',
    flex: 1,
    headerName: 'Location',
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => {
      let result = [];
      if (params.row.launch_site) {
        if (params.row.launch_site.site_name) {
          result.push(params.row.launch_site.site_name);
        }
      } else {
        result = ['Unknown'];
      }
      return result.join(', ');
    },
  },
  {
    field: 'mission_name',
    headerClassName: 'grid-headeer-class',
    flex: 1,
    headerName: 'Mission',
    minWidth: 280,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'orbit',
    headerClassName: 'grid-headeer-class',
    flex: 1,
    headerName: 'Orbit',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => {
      if (params.row.rocket) {
        return params.row.rocket.second_stage.payloads[0].orbit;
      } else {
        return 'Unknown';
      }
    },
  },
  {
    field: 'launch_success',
    headerClassName: 'grid-headeer-class',
    flex: 1,
    headerName: 'Launch Success',
    minWidth: 160,
    headerAlign: 'center',
    align: 'center',
    renderCell: (cellValues) => {
      return getStatusLabel(cellValues.value);
    },
  },
  {
    field: 'rocket',
    headerClassName: 'grid-headeer-class',
    flex: 1,
    headerName: 'Rocket',
    minWidth: 160,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => {
      return params.row.rocket.rocket_name;
    },
  },
];

interface IGridProps {
    gridData: any;
    setSelectedRowData: any;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Grid({gridData, setSelectedRowData, setShowModal}: IGridProps) {

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        setSelectedRowData(params.row);
        setShowModal(true);
    };

    return (
        <Box
            sx={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom:'2rem'
            }}
        >
            <DataGrid
                autoHeight
                onRowClick={handleRowClick}
                sx={{
                boxShadow: 2,
                }}
                getRowId={(row) => row.flight_number}
                rows={gridData}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 12,
                    },
                },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
            />
        </Box>
      );
}