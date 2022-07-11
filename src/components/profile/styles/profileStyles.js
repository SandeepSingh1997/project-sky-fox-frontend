import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        button:{
            margin:"5% 2% 2%",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        }
    })
);
