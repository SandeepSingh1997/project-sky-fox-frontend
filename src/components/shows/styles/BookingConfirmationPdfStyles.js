import {StyleSheet} from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    text: {
        margin: 12,
        fontSize: 14,
        fontFamily: "Times-Roman"
    },
    cinemaLogoIcon: {
      width:"20%"
  },
  headerLogo: {
    display: "flex",
    fontSize:"50px",
    color:"white",
    textAlign:"center"
  },
  toolbar: {
    display: 'flex',
    justifyContent: "space-between",
    padding: "0 4em"
  },
  image: {
    width: "50%"
  },
  bg: {
    backgroundColor:"#556cd6",
  },
  headerText: {
    textAlign: "right",
    textDecorationStyle: "none"
  },
  textContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
  
