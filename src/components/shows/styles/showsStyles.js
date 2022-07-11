import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        cardHeader: {
            display: "flex",
            justifyContent: "space-between"
        },
        showContainer: {
            "& :hover": {
                backgroundColor: "#f9f8fd",
            }
        },
        localMoviesIcon: {
            "& :hover": {
                backgroundColor: "#bdbdbd",
            }
        },
        moviePoster: {
            objectFit: "cover",
            width: "80px",
            height: "80px",
            marginRight: "10px"
        },
        showsHeader: {
            padding: "15px 0 0 15px",
            display: "flex",
            fontWeight: "bold",
            alignSelf: "center"
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        listRoot: {
            width: '100%',
            backgroundColor: theme.palette.background.paper
        },
        price: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        slotTime: {
            color: theme.palette.primary.main,
            fontWeight: "bold"
        },
        buttons: {
            display: "flex",
            justifyContent: 'space-between'
        },
        navigationButton: {
            margin: "20px"
        },
        paper: {
            width: '200',
            height: '500',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        imdbSelector: {
            color: "#b3b3b3"
        }
    })
);
