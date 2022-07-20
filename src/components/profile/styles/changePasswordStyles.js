import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "25vw",
    padding: "0 5% 5%",
  },
  title: {
    textAlign: "center",
  },
  button: {
    marginTop: "10%",
    width: "70%",
    alignSelf: "center"
  },
  close: {
    position: "absolute",
    margin: "1% 0 0 20%",
  },
}));
