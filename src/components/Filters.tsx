import * as React from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IFiltersProps {
    monthsFilter: string;
    setMonthsFilter: React.Dispatch<React.SetStateAction<string>>;
    launchesFilter: string; 
    setLaunchesFilter: React.Dispatch<React.SetStateAction<string>>;
    setSearchParams: any;
}

export default function Filters({monthsFilter, setMonthsFilter, launchesFilter, setLaunchesFilter, setSearchParams}: IFiltersProps) {

  const handleMonthsFilterChange = (event: SelectChangeEvent) => {
    setMonthsFilter(event.target.value);
    setSearchParams({monthsfilter: event.target.value, launchesfilter: launchesFilter});
  };

  const handleLaunchesFilterChange = (event: SelectChangeEvent) => {
    setLaunchesFilter(event.target.value);
    setSearchParams({monthsfilter: monthsFilter, launchesfilter: event.target.value});
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
            <MenuItem value={'allTime'}>All Time</MenuItem>
            <MenuItem value={'lastSixMonths'}>Last Six Months</MenuItem>
            <MenuItem value={'lastOneYear'}>Last One Year</MenuItem>
            <MenuItem value={'lastFiveYears'}>Last Five Years</MenuItem>
            <MenuItem value={'lastTenYears'}>Last Ten Years</MenuItem>
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
            <MenuItem value={'successfulLaunches'}>Successful Launches</MenuItem>
            <MenuItem value={'failedLaunches'}>Failed Launches</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
}