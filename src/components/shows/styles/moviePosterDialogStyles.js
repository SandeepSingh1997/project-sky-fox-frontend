import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
({
    dialogRoot: {
        minHeight: "30vh",
        maxHeight: "90vh",
        padding: "20px"
    },
    poster: {
        height: "640px",
        width: "475px",
        objectFit: "cover",
    },
    posterTitle: {
        fontWeight: "bold",
        margin: "auto",
        textAlign: "center"

    },
    posterHeader: {
        width: "475px",
        display: "flex",
        alignItems: "center",
        marginBottom: "20px"
    },
    closeIcon: {
        cursor: "pointer",
    }
}));