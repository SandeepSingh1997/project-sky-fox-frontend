import React from "react";
import { render } from "@testing-library/react";
import MoviePosterDialog from "./MoviePosterDialog";

describe("Basic rendering and functionlity", () => {

    const openDialog = true;
    const onClose = jest.fn();

    const selectedMovie = {
        name: "Movie 1",
        posterURL: "https://aws.amazon.com/image.png"
    }

    it("Should display movie name on render", () => {
        const { queryByText } = render(<MoviePosterDialog selectedMovie={selectedMovie} open={openDialog} onClose={onClose} />);

        expect(queryByText("Movie 1")).toBeTruthy();
    });

    it('Should display movie poster on render', () => {
        const { getByAltText } = render(<MoviePosterDialog selectedMovie={selectedMovie} open={openDialog} onClose={onClose} />)

        expect(getByAltText("movie-poster")).toBeTruthy();
    });
});
