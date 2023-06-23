import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
      <CircularProgress />
    </Box>
  );
}