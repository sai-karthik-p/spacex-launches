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
          sx={{
            fontWeight: 'medium',
            borderRadius: 6,
            width: 'max-content',
            padding: '0 1.5rem',
            scale: '0.7',
          }}
          icon={false}
          severity="warning"
        >
          Upcoming
        </Alert>
      );
    } else if (launch_success) {
      return (
        <Alert
          sx={{
            fontWeight: 'medium',
            borderRadius: 6,
            width: 'max-content',
            padding: '0 1.5rem',
            scale: '0.7',
          }}
          icon={false}
          severity="success"
        >
          Success
        </Alert>
      );
    } else {
      return (
        <Alert
          sx={{
            fontWeight: 'medium',
            borderRadius: 6,
            width: 'max-content',
            padding: '0 1.5rem',
            scale: '0.7',
          }}
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
                    {selectedRowData.mission_name} {getStatusLabel(selectedRowData.launch_success)}
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
                        <small>{selectedRowData.rocket.rocket_name}</small>
                        <div> {selectedRowData.links.presskit && <a href={selectedRowData.links.presskit} target="_blank" rel="noopener noreferrer"> <NasaIcon fontSize="small" style={{color:'grey'}}  /> </a>}  {selectedRowData.links.wikipedia && <a href={selectedRowData.links.wikipedia} target="_blank" rel="noopener noreferrer"> <WikipediaIcon style={{color:'grey', margin: '0 auto'}}  /> </a>}  {selectedRowData.links.video_link && <a href={selectedRowData.links.video_link} target="_blank" rel="noopener noreferrer"> <YouTubeIcon fontSize="small" style={{color:'grey'}}  /> </a>}  </div>
                        <span> {selectedRowData.details} </span> <a href={selectedRowData.links.wikipedia} target="_blank" rel="noopener noreferrer">Wikipedia</a>
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