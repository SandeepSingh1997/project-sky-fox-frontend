import React , {useState} from 'react'
import {Dialog, DialogContent, Typography, Button} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert/Alert";
import styles from "./styles/customerDetailsDialogStyles"
import BookingConfirmationPdf from "./BookingConfirmationPdf";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { INR_SYMBOL } from "../../Constants";

const BookingConfirmation = ({seats, onClose, selectedShow, bookingConfirmation, showConfirmation}) => {
  console.log(seats + " BookingConfirmation");
    const [showBookingInformationPdf, setShowBookingInformationPdf] = useState(false);

    const classes = styles();

    return (
      <Dialog open={showConfirmation} onClose={onClose}>
        <Alert severity="success">Seats booked successfully!</Alert>
        <Typography variant="h6" className={classes.dialogHeader}>
          Booking Confirmation
        </Typography>
        <DialogContent>
        <Typography variant="body1" display="block" gutterBottom>
            Customer Name: {bookingConfirmation.customerName}
          </Typography>
           { bookingConfirmation.email!= null ? <Typography variant="body1" display="block" gutterBottom>
            Email: {bookingConfirmation.email}
          </Typography> : "" } 
          <Typography variant="body1" display="block" gutterBottom>
            Number of seats booked: {seats}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom>
            Movie Name: {selectedShow.movie.name}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom>
            Amount Paid: {INR_SYMBOL}{(selectedShow.cost * seats).toFixed(2)}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom>
            Show Date: {selectedShow.date}
          </Typography> 
          <Typography variant="body1" display="block" gutterBottom>
            Show Time: {selectedShow.slot.startTime}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom>
            Payment Mode: Cash at Counter
          </Typography>
          <PDFDownloadLink className={classes.pdfLink} document={<BookingConfirmationPdf seats={seats} selectedShow={selectedShow} bookingConfirmation={bookingConfirmation} showPdf={showBookingInformationPdf}/>} fileName="MovieTicket">
              {({loading}) => (loading ? <Button> Loading Document...</Button> :
          <div className={classes.downloadButton}><Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShowBookingInformationPdf(true);
            }}
            
          >
            Download
          </Button></div> )}
          </PDFDownloadLink>
          

    </DialogContent>  
      </Dialog>
    );
}

export default BookingConfirmation;
