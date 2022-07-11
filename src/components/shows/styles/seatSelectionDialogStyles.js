import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        dialogRoot: {
            overflow: "hidden",
            minHeight: "30vh",
            maxHeight: "80vh"
        },
        container: {
            display: "flex",
            flexDirection: "column"
        },
        dialogHeader: {
            fontWeight: "bold",
            padding: "10px 0px 20px 10px"
        },
        dialogContent: {
            display: "flex",
            flexDirection: "row"
        },
        moviePicture: {
            display: "flex",
            justifyContent: "center",
            minWidth: "15%"
        },
        moviePoster: {
            objectFit: "cover",
            width: "100%",
            height: "120px",
            margin: "0px 20px"
        },
        dialogMain: {
            display: "flex",
            padding: "0px 20px 20px 0px",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: "80%",
            maxWidth: "80%"
        },
        movieMarquee: {
            fontWeight: "bold"
        },
        seatsAndAmount: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "33%"
        },
        seatsSelector: {
            maxWidth: "30%"
        },
        dialogBottom: {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "20px 0px 0px 0px"
        },
        dialogButton: {
            marginLeft: "15px"
        }, 
        imdbSelector: {
            color: "#808080",
            paddingTop: "10px"
        }
    })
);
