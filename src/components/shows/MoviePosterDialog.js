import React from 'react'
import { Dialog, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styles from "./styles/moviePosterDialogStyles";
import PropTypes from "prop-types";

const MoviePosterDialog = ({ selectedMovie, open, onClose }) => {
    const classes = styles();

    return (
        <>
            <Dialog classes={{ paper: classes.dialogRoot }} open={open} onClose={() => { onClose() }} >
                <div>
                    <div className={classes.posterHeader}>
                        <Typography variant="h6" className={classes.posterTitle}>
                            {selectedMovie.name}
                        </Typography>
                        <Close className={classes.closeIcon} onClick={() => { onClose() }} />
                    </div>
                </div>
                <div>
                    <img className={classes.poster} src={selectedMovie.posterURL} alt="movie-poster" />
                </div>
            </Dialog>
        </>
    )
}

MoviePosterDialog.propTypes = {
    selectedMovie: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default MoviePosterDialog;
