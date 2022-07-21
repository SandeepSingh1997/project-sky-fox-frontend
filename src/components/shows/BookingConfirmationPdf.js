import React from 'react';
import { Page, Text, View, Document} from '@react-pdf/renderer';
import styles from './styles/BookingConfirmationPdfStyles';

const BookingConfirmationPdf = ({ seats, selectedShow, bookingConfirmation, showPdf}) => {
  console.log(bookingConfirmation);
  const current = new Date();
    return (
    <Document open={showPdf}>
        <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <div style={styles.bg}><Text style={styles.headerLogo}>SkyFox Cinema</Text></div>
          <Text style={styles.headerText}>Booking Date: {current.getDate()}/{current.getMonth()+1}/{current.getFullYear()}</Text>
            <div style={styles.textContent}>

            <Text style={styles.text}>Name: {bookingConfirmation.customerName}</Text>
            {bookingConfirmation.email ?  <Text style={styles.text}>Email: {bookingConfirmation.email}</Text> : ""}
           
            <Text style={styles.text}>Number of Seats: {seats}</Text>
            <Text style={styles.text}>Movie Name: {selectedShow.movie.name}</Text>
            <Text style={styles.text}>Ticket Price: {selectedShow.cost} INR</Text>
            <Text style={styles.text}>Total Amount: {(selectedShow.cost * seats).toFixed(2)} INR</Text>
            <Text style={styles.text}>Show Date: {selectedShow.date}</Text>
            <Text style={styles.text}>Show Timing: {selectedShow.slot.startTime}</Text>
            <Text style={styles.text}>Payment Mode: Cash at Counter</Text>
            </div>
        </View>

        </Page>
    </Document>
    )

};

export default BookingConfirmationPdf;
