import { DialogContentText, DialogTitle, IconButton } from '@mui/material';
import WikipediaIcon from '../assets/WikipediaIcon';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import YouTubeIcon from '@mui/icons-material/YouTube';
import React, {useEffect, useRef} from 'react';
import { getFormattedDate } from '../utils/utils';
import NasaIcon from '../assets/NasaIcon';
import "./DetailsModal.css";

const getStatusLabel = (launch_success: boolean | null) => {
    if (launch_success === null) {
      return (
        <Alert
          className="alert"
          icon={false}
          severity="warning"
        >
          Upcoming
        </Alert>
      );
    } else if (launch_success) {
      return (
        <Alert
          className="alert"
          icon={false}
          severity="success"
        >
          Success
        </Alert>
      );
    } else {
      return (
        <Alert
          className="alert"
          icon={false}
          severity="error"
        >
          Failed
        </Alert>
      );
    }
};

interface IDetailsModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedRowData: any;
}

export default function DetailsModal({showModal, setShowModal, selectedRowData}: IDetailsModalProps) {

    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (showModal) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [showModal]);

    function handleClose() {
        setShowModal(prev => !prev);
    }

    return (
        <>

            <Dialog
                open={showModal}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle
                id="scroll-dialog-title"
                sx={{ display: 'flex', alignItems: 'center'}}
                >
                    <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers={false}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'row'}}>
                            {selectedRowData.links.mission_patch_small && <img src={selectedRowData.links.mission_patch_small} alt="" width="100" height="100"/>}
                            <div style={{marginLeft: '2rem'}}>
                                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                                    <h4 style={{marginBlockStart: "0px", marginBlockEnd: "0px"}}>{selectedRowData.mission_name}</h4> 
                                    {getStatusLabel(selectedRowData.launch_success)}
                                </div>
                                <div> <small>{selectedRowData.rocket.rocket_name}</small> </div>
                                <div style={{marginTop: '10px'}}> {selectedRowData.links.presskit && <a className='iconLinks' href={selectedRowData.links.presskit} target="_blank" rel="noopener noreferrer"> <NasaIcon fontSize="small" style={{color:'grey'}}  /> </a>}  {selectedRowData.links.wikipedia && <a className='iconLinks' href={selectedRowData.links.wikipedia} target="_blank" rel="noopener noreferrer"> <WikipediaIcon style={{color:'grey', margin: '0 auto'}}  /> </a>}  {selectedRowData.links.video_link && <a className='iconLinks' href={selectedRowData.links.video_link} target="_blank" rel="noopener noreferrer"> <YouTubeIcon fontSize="small" style={{color:'grey'}}  /> </a>}  </div>
                            </div>
                        </div>
                        
                        <div style={{marginTop: '1.25rem'}}><span> {selectedRowData.details} </span> <a href={selectedRowData.links.wikipedia} target="_blank" rel="noopener noreferrer">Wikipedia</a></div>
                        <List sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {"Flight Number - "}
                                    </Typography>
                                        {selectedRowData.flight_number}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider />

                            <ListItem alignItems="flex-start">
                                <ListItemText
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {"Mission Name - "}
                                    </Typography>
                                        {selectedRowData.mission_name}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider />

                            <ListItem alignItems="flex-start">
                                <ListItemText
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {"Rocket Type - "}
                                    </Typography>
                                        {selectedRowData.rocket.rocket_type}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider />

                            <ListItem alignItems="flex-start">
                                <ListItemText
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {"Rocket Name - "}
                                    </Typography>
                                        {selectedRowData.rocket.rocket_name}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider />

                            <ListItem alignItems="flex-start">
                                <ListItemText
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {"Launch Date - "}
                                    </Typography>
                                        {getFormattedDate(selectedRowData.launch_date_utc)}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider />

                            <ListItem alignItems="flex-start">
                                <ListItemText
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {"Orbit - "}
                                    </Typography>
                                        {selectedRowData.rocket.second_stage.payloads[0].orbit}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider />

                            <ListItem alignItems="flex-start">
                                <ListItemText
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {"Launch Site - "}
                                    </Typography>
                                        {selectedRowData.launch_site.site_name}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>

                        </List>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

        </>
    );
}