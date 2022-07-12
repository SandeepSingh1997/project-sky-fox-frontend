import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
({
    dialogRoot: {
        minHeight: "30vh",
        maxHeight: "80vh"
    },
    poster: {
        padding: "30px",
        height: "640px",
        width: "475px",
        objectFit: "cover",
    },
    posterTitle: {
        fontWeight: "bold",
        margin: "auto",
        paddingLeft: "10px"
    },
    posterHeader: {
        display: "flex",
        alignItems: "center",
        marginTop: "20px"
    },
    closeIcon: {
        cursor: "pointer",
        marginRight: "10px"
    }
}));