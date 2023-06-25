export const getFormattedDate = (utcDate: any) => {
    const date = new Date(utcDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    const arr = date.split(',');
    const ans = `${arr[0]}${arr[1]}`;
    return ans;
};

export const removeDuplicates = (inputArray: any) => {
    const uniqueArray = Array.from(
      new Set(inputArray.map((a: any) => a.flight_number))
    ).map((flight_number) => {
      return inputArray.find((a: any) => a.flight_number === flight_number);
    });
    return uniqueArray;
};

export const getLaunchesFilteredData = (inputData: any, launchesFilter: string) => {
    switch (launchesFilter) {
        case "allLaunches":
            return inputData;
        case "upcomingLaunches":
            return inputData?.filter((item: any) => (item.launch_success === null));
        case "successfulLaunches":
            return inputData?.filter((item: any) => (item.launch_success === true));
        case "failedLaunches":
            return inputData?.filter((item: any) => (item.launch_success === false));
    }
};

export const filterMonthsDataArray = (inputDataArray: any[], numberOfMonths: number) => {
    const inputNumberMonthsAgo = new Date();
    inputNumberMonthsAgo.setMonth(inputNumberMonthsAgo.getMonth() - numberOfMonths);
    const resultData = inputDataArray.filter(({launch_date_utc}: {launch_date_utc: any}) => (new Date(launch_date_utc)) > inputNumberMonthsAgo);
    return resultData;
};

export const getMonthsFilteredData = (inputData: any, monthsFilter: string) => {
    switch (monthsFilter) {
        case "allTime":
            return inputData;
        case "lastSixMonths":
            return filterMonthsDataArray(inputData, 6)
        case "lastOneYear":
            return filterMonthsDataArray(inputData, 12);
        case "lastFiveYears":
            return filterMonthsDataArray(inputData, 60);
        case "lastTenYears":
            return filterMonthsDataArray(inputData, 120);
    }
};

export const getFilteredData = (inputData: any, launchesFilter: string, monthsFilter: string) => {
    const launchesFilteredData = getLaunchesFilteredData(inputData, launchesFilter);
    const monthsFilteredData = getMonthsFilteredData(launchesFilteredData, monthsFilter);
    return monthsFilteredData;
};