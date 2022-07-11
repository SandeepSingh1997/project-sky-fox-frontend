import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "20vw",
    padding: "0 10% 10%",
  },
  title: {
    textAlign: "center",
  },
  button: {
    marginTop: "10%",
  },
  close: {
    position: "absolute",
    margin: "0 0 0 15%",
  },
}));
