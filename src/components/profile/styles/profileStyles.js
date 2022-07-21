import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
({
    button: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    para: {
        fontSize: "16px",
        fontWeight: "400"
    },
    heading: {
        fontWeight: "bold"
    }
})
);
