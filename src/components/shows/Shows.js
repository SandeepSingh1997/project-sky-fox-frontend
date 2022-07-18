import React, {useState} from "react";
import {
    Backdrop,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import styles from "./styles/showsStyles"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useShows from "./hooks/useShows";
import {HEADER_DATE_FORMAT, INR_SYMBOL} from "../../Constants"
import {dateFromSearchString, nextDateLocation, previousDateLocation} from "./services/dateService";
import ShowsRevenue from "./ShowsRevenue";
import useShowsRevenue from "./hooks/useShowsRevenue";
import SeatSelectionDialog from "./SeatSelectionDialog";
import { FeatureToggleProvider, FeatureToggle } from "react-feature-toggles";
import { featureNames } from "../../config/env-config";
import useFeatureTogglz from '../common/hooks/useFeatureTogglz';

export default ({location, history}) => {
    const classes = styles();

    const { features } = useFeatureTogglz();

    const showsDate = dateFromSearchString(location.search);

    const {shows, showsLoading} = useShows(showsDate);
    const {showsRevenue, updateShowsRevenue, showsRevenueLoading} = useShowsRevenue(showsDate);
    const [showSelectSeatDialog, setShowSelectSeatDialog] = useState(false);
    const emptyShow = {
        "id": "",
        "date": "",
        "cost": "",
        "movie": {
            "id": "",
            "name": "",
            "duration": "",
            "plot": "",
            "imdbRating": ""
        },
        "slot": {
            "id": "",
            "name": "",
            "startTime": "",
            "endTime": ""
        }
    };
    const [selectedShow, setSelectedShow] = useState(emptyShow);

    return (
        <>
            <FeatureToggleProvider featureToggleList={features}>
                <div className={classes.cardHeader}>
                    <Typography variant="h4" className={classes.showsHeader}>
                        Shows ({showsDate.format(HEADER_DATE_FORMAT)})
                    </Typography>
                    <ShowsRevenue showsRevenue={showsRevenue} showsRevenueLoading={showsRevenueLoading}/>
                </div>
                <List className={classes.listRoot}>
                    {
                        shows.map(show => (
                            <div key={show.id} className={classes.showContainer}>
                                <ListItem style={{cursor: 'pointer'}} onClick={() => {
                                    setSelectedShow(show);
                                    setShowSelectSeatDialog(true);
                                }}>
                                    <ListItemAvatar  classes={{root: classes.localMoviesIcon}}>
                                        <img className={classes.moviePoster} src={show.movie.posterURL} alt="movie-poster"></img>
                                    </ListItemAvatar>
                                    <ListItemText primary={show.movie.name} secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.slotTime}
                                                color="textPrimary"
                                            >
                                                {show.slot.startTime}
                                            </Typography>

                                            <FeatureToggle featureName={featureNames.SHOW_IMDB_RATING_FOR_MOVIE_FEATURE}>
                                                <Typography className={classes.imdbSelector}>
                                                    IMDb Rating: {show.movie.imdbRating}
                                                </Typography>
                                            </FeatureToggle>
                                        </>
                                    }/>
                                    <ListItemText primary={`${INR_SYMBOL}${show.cost}`} className={classes.price}
                                        primaryTypographyProps={{variant: 'h6', color: 'secondary'}}
                                    />
                                </ListItem>
                            </div>
                        ))
                    }
                </List>

                <SeatSelectionDialog selectedShow={selectedShow} updateShowsRevenue={updateShowsRevenue}
                    open={showSelectSeatDialog}
                    onClose={() => setShowSelectSeatDialog(false)}/>

                <div className={classes.buttons}>
                    <Button
                        onClick={() => {
                            history.push(previousDateLocation(location, showsDate));
                        }}
                        startIcon={<ArrowBackIcon/>}
                        color="primary"
                        className={classes.navigationButton}
                    >
                        Previous Day
                    </Button>
                    <Button
                        onClick={() => {
                            history.push(nextDateLocation(location, showsDate));
                        }}
                        endIcon={<ArrowForwardIcon/>}
                        color="primary"
                        className={classes.navigationButton}
                    >
                        Next Day
                    </Button>
                </div>
                <Backdrop className={classes.backdrop} open={showsLoading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </FeatureToggleProvider>
        </>
    );
};
