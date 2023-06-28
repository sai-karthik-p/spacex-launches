import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './components/Header';
import Filters from './components/Filters';
import Loader from './assets/Loader';
import Grid from './components/Grid';
import DetailsModal from './components/DetailsModal';
import { removeDuplicates, getFilteredData } from './utils/utils';
import { useSearchParams } from 'react-router-dom';

export default function SpacexLaunches() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [monthsFilter, setMonthsFilter] = useState(searchParams.get("monthsfilter") || "allTime");
    const [launchesFilter, setLaunchesFilter] = useState(searchParams.get("launchesfilter") || "allLaunches");

    useEffect(() => {
        const getData = async () => {
            try {
            const response = await fetch(
                `https://api.spacexdata.com/v3/launches`
            );
            if (!response.ok) {
                throw new Error(
                `This is an HTTP error: The status is ${response.status}`
                );
            }
            const actualData = await response.json();
            const uniqueData = removeDuplicates(actualData);
            setData(uniqueData);
            setError(null);
            } catch(err: any) {
            setError(err.message);
            setData(null);
            } finally {
            setLoading(false);
            }  
        }
        getData()
    }, []);

    return (
        <>
            <Header />
            <Container>
                <Box sx={{ width: '100%' }}>
                    {loading && <Loader />}
                    {error && (
                        <div>{`There is a problem fetching the Launches data - ${error}`}</div>
                    )}
                    {data && (
                        <Filters monthsFilter={monthsFilter} setMonthsFilter={setMonthsFilter} launchesFilter={launchesFilter} setLaunchesFilter={setLaunchesFilter} setSearchParams={setSearchParams} />
                    )}
                    {data && (
                        <Grid gridData={getFilteredData(data, launchesFilter, monthsFilter)} setSelectedRowData={setSelectedRowData} setShowModal={setShowModal} />
                    )}
                    {showModal && (
                        <DetailsModal showModal={showModal} setShowModal={setShowModal} selectedRowData={selectedRowData} />
                    )}
                </Box>
            </Container>
        </>
    );
};