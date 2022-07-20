import React , {useState} from 'react'
import {Dialog, DialogContent, Typography, Button} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert/Alert";
import styles from "./styles/customerDetailsDialogStyles"
import BookingConfirmationPdf from "./BookingConfirmationPdf";
import { PDFDownloadLink } from '@react-pdf/renderer';

const BookingConfirmation = ({onClose, selectedShow, bookingConfirmation, showConfirmation}) => {
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
          <Typography variant="body1" display="block" gutterBottom>
            Email: {bookingConfirmation.email}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom>
            Number of seats booked: {bookingConfirmation.noOfSeats}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom>
            Movie Name: {selectedShow.movie.name}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom>
            Amount Paid:  &#8377;{bookingConfirmation.amountPaid}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom>
            Show Date: {bookingConfirmation.showDate}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom>
            Show Time: {selectedShow.slot.startTime}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom>
            Payment Mode: Cash at Counter
          </Typography>
          <PDFDownloadLink className={classes.pdfLink} document={<BookingConfirmationPdf selectedShow={selectedShow} bookingConfirmation={bookingConfirmation} showPdf={showBookingInformationPdf}/>} fileName="MovieTicket">
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
