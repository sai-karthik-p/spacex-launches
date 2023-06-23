import * as React from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Filters() {
  const [monthsFilter, setMonthsFilter] = React.useState('pastSixMonths');

  const [launchesFilter, setLaunchesFilter] = React.useState('allLaunches');

  const handleMonthsFilterChange = (event: SelectChangeEvent) => {
    setMonthsFilter(event.target.value);
  };

  const handleLaunchesFilterChange = (event: SelectChangeEvent) => {
    setLaunchesFilter(event.target.value);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '2rem 0'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <CalendarTodayOutlinedIcon fontSize="small" />
          <Select
            variant="standard"
            disableUnderline
            value={monthsFilter}
            onChange={handleMonthsFilterChange}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={'pastSixMonths'}>Past Six Months</MenuItem>
            <MenuItem value={'lastSixMonths'}>Last Six Months</MenuItem>
          </Select>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <FilterAltOutlinedIcon fontSize="medium" />
          <Select
            variant="standard"
            disableUnderline
            value={launchesFilter}
            onChange={handleLaunchesFilterChange}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={'allLaunches'}>All Launches</MenuItem>
            <MenuItem value={'upcomingLaunches'}>Upcoming Launches</MenuItem>
            <MenuItem value={'successfulLaunches'}>
              Successful Launches
            </MenuItem>
            <MenuItem value={'failedLaunches'}>Failed Launches</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
}