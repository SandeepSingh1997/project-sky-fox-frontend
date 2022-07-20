import React from 'react';
import { Page, Text, View, Document} from '@react-pdf/renderer';
import styles from './styles/BookingConfirmationPdfStyles';

const BookingConfirmationPdf = ({ selectedShow, bookingConfirmation, showPdf}) => {
  const current = new Date();
  console.log(bookingConfirmation);
    return (
    <Document open={showPdf}>
        <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <div style={styles.bg}><Text style={styles.headerLogo}>SkyFox Cinema</Text></div>
          <Text style={styles.headerText}>Booking Date: {current.getDate()}/{current.getMonth()+1}/{current.getFullYear()}</Text>
            <div style={styles.textContent}>
            <Text style={styles.text}>Name: {bookingConfirmation.customerName}</Text>
            <Text style={styles.text}>Email: {bookingConfirmation.email}</Text>
            <Text style={styles.text}>Number Of Seats: {bookingConfirmation.noOfSeats}</Text>
            <Text style={styles.text}>Movie Name: {selectedShow.movie.name}</Text>
            <Text style={styles.text}>Ticket Price: {bookingConfirmation.amountPaid} INR</Text>
            <Text style={styles.text}>Show Date: {bookingConfirmation.showDate}</Text>
            <Text style={styles.text}>Show Timing: {selectedShow.slot.startTime}</Text>
            <Text style={styles.text}>Payment Mode: Cash at Counter</Text>
            </div>
        </View>

        </Page>
    </Document>
    )

};

export default BookingConfirmationPdf;
