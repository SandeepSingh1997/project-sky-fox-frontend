import { Button, Dialog, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useState, useContext } from "react";
import styles from "./styles/seatSelectionDialogStyles";
import CustomerDetailsDialog from "./CustomerDetailsDialog";
import { INR_SYMBOL } from "../../Constants";
import PropTypes from "prop-types";
import MoviePosterDialog from "./MoviePosterDialog";
import { FeatureToggleProvider, FeatureToggle } from "react-feature-toggles";
import { featureNames } from "../../config/env-config";
import useFeatureTogglz from "../common/hooks/useFeatureTogglz";
import { AppContext } from "../layout/Layout";

const SeatSelectionDialog = ({
  selectedShow,
  updateShowsRevenue,
  open,
  onClose,
}) => {
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showMoviePoster, setShowMoviePoster] = useState(false);
  const [seats, setSeats] = useState("1");
  const [selectedMovie, setSelectedMovie] = useState({});
  const classes = styles();
  const { features } = useFeatureTogglz();
  const { state } = useContext(AppContext);
  const role = state.userRole;

  const buttonelement =
    role === "Admin" ? (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setShowCustomerDetails(true);
          onClose();
        }}
        className={classes.dialogButton}
      >
        Next
      </Button>
    ) : (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setShowCustomerDetails(true);
          onClose();
        }}
        className={classes.dialogButton}
      >
        Book
      </Button>
    );

  const handleClose = () => {
    setSeats("1");
    onClose();
  };

  return (
    <>
      <FeatureToggleProvider featureToggleList={features}>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          classes={{
            paper: classes.dialogRoot,
          }}
        >
          <div className={classes.container}>
            <Typography variant="h6" className={classes.dialogHeader}>
              Select Seats
            </Typography>
            <div className={classes.dialogContent}>
              <div className={classes.moviePicture}>
                <img
                  className={classes.moviePoster}
                  src={selectedShow.movie.posterURL}
                  alt="movie-poster"
                  onClick={() => {
                    setSelectedMovie(selectedShow.movie);
                    setShowMoviePoster(true);
                  }}
                />
              </div>
              <div className={classes.dialogMain}>
                <Typography className={classes.movieMarquee} color="primary">
                  {selectedShow.movie.name}
                </Typography>
                <Typography variant="body2">
                  {selectedShow.movie.plot}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="primary"
                  className={classes.movieMarquee}
                >
                  {selectedShow.movie.duration}
                </Typography>
                <FeatureToggle
                  featureName={featureNames.SHOW_IMDB_RATING_FOR_MOVIE_FEATURE}
                >
                  <Typography className={classes.imdbSelector}>
                    IMDb rating: {selectedShow.movie.imdbRating}
                  </Typography>
                </FeatureToggle>
                <div className={classes.dialogBottom}>
                  <div className={classes.seatsAndAmount}>
                    <div className={classes.seatsSelector}>
                      <TextField
                        type="number"
                        label="Seats"
                        defaultValue="1"
                        inputProps={{ step: "1", min: "1", max: "15" }}
                        onChange={(e) => setSeats(e.target.value)}
                      />
                    </div>
                    <Typography variant="subtitle1" color="secondary">
                      {`${INR_SYMBOL}${(selectedShow.cost * seats).toFixed(2)}`}
                    </Typography>
                  </div>
                  {buttonelement}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
        <CustomerDetailsDialog
          seats={seats}
          selectedShow={selectedShow}
          updateShowsRevenue={updateShowsRevenue}
          open={showCustomerDetails}
          onClose={() => {
            handleClose();
            setShowCustomerDetails(false);
          }}
        />
        <MoviePosterDialog
          open={showMoviePoster}
          selectedMovie={selectedMovie}
          onClose={() => {
            setShowMoviePoster(false);
          }}
        />
      </FeatureToggleProvider>
    </>
  );
};

SeatSelectionDialog.propTypes = {
  selectedShow: PropTypes.object.isRequired,
  updateShowsRevenue: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SeatSelectionDialog;
