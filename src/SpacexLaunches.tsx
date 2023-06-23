import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './components/Header';
import Filters from './components/Filters';
import Loader from './assets/Loader';
import Grid from './components/Grid';
import DetailsModal from './components/DetailsModal';

function removeDuplicates(inputArray: any) {
    const uniqueArray = Array.from(
      new Set(inputArray.map((a: any) => a.flight_number))
    ).map((flight_number) => {
      return inputArray.find((a: any) => a.flight_number === flight_number);
    });
    return uniqueArray;
}
  

function SpacexLaunches() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
            } catch(err) {
            setError(err.message);
            setData(null);
            } finally {
            setLoading(false);
            }  
        }
        getData()
    }, [])

    return (
        <>
            <Header />
            <Container>
                <Box sx={{ width: '100%' }}>

                    {loading && <Loader />}

                    {error && (
                        <div>{`There is a problem fetching the post data - ${error}`}</div>
                    )}

                    {data && <Filters />}


                    {data && <Grid gridData={data} setSelectedRowData={setSelectedRowData} setShowModal={setShowModal} />}

                    {showModal && <DetailsModal showModal={showModal} setShowModal={setShowModal} selectedRowData={selectedRowData} />}

                    
                </Box>
            </Container>
        </>
    );
}

export default SpacexLaunches;