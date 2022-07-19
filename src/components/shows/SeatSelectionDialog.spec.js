import React from "react";
import { fireEvent, render } from "@testing-library/react";
import SeatSelectionDialog from "./SeatSelectionDialog";
import { AppContext } from "../layout/Layout";

jest.mock("./CustomerDetailsDialog", () => {
  return ({ open }) => (
    <div>Customer Details is {open ? "open" : "closed"}</div>
  );
});

jest.mock("../common/hooks/useFeatureTogglz", () => ({
  __esModule: true,
  default: jest.fn(() => {
    return { features: { SHOW_IMDB_RATING_FOR_MOVIE_FEATURE: true } };
  }),
}));

describe("Basic rendering and functionality", () => {
  const openDialog = true;
  const onClose = jest.fn();
  const updateShowRevenue = jest.fn();
  const dispatch = jest.fn();
  const state = { userRole: "Admin" };

  const selectedShow = {
    id: 1,
    cost: 150,
    movie: {
      name: "Movie 1",
      plot: "Suspense movie",
      duration: "1hr 30m",
      imdbRating: "8.0",
      posterURL: "https://aws.amazon.com/image.png",
    },
    slot: { startTime: "start time 1" },
  };

  it("Should display the show info", () => {
    const { queryByText, queryByDisplayValue } = render(
      <AppContext.Provider value={{ state, dispatch }}>
        <SeatSelectionDialog
          selectedShow={selectedShow}
          open={openDialog}
          onClose={onClose}
          updateShowsRevenue={updateShowRevenue}
        />
      </AppContext.Provider>
    );
    expect(queryByText(selectedShow.movie.name)).toBeTruthy();
    expect(queryByText(selectedShow.movie.plot)).toBeTruthy();
    expect(queryByText(selectedShow.movie.duration)).toBeTruthy();
    expect(
      queryByText("IMDb rating: " + selectedShow.movie.imdbRating)
    ).toBeTruthy();
    expect(queryByText("Seats")).toBeTruthy();
    expect(queryByDisplayValue("1")).toBeTruthy();
  });

  it("Should display total cost when number of seats is selected", () => {
    const { queryByText, getByDisplayValue } = render(
        <AppContext.Provider value={{ state, dispatch }}>
          <SeatSelectionDialog
            selectedShow={selectedShow}
            open={openDialog}
            onClose={onClose}
            updateShowsRevenue={updateShowRevenue}
          />
        </AppContext.Provider>
      );
    expect(queryByText("₹150.00")).toBeTruthy();
    fireEvent.change(getByDisplayValue("1"), { target: { value: "2" } });

    expect(queryByText("₹300.00")).toBeTruthy();
  });

  it("Should display customer details input on next", () => {
    const { getByText } = render(
        <AppContext.Provider value={{ state, dispatch }}>
          <SeatSelectionDialog
            selectedShow={selectedShow}
            open={openDialog}
            onClose={onClose}
            updateShowsRevenue={updateShowRevenue}
          />
        </AppContext.Provider>
      );

    expect(getByText("Customer Details is closed")).toBeTruthy();

    fireEvent.click(getByText("Next"));

    expect(getByText("Customer Details is open")).toBeTruthy();
  });

  it("Should display movie poster on render", () => {
    const { getByAltText } =  render(
        <AppContext.Provider value={{ state, dispatch }}>
          <SeatSelectionDialog
            selectedShow={selectedShow}
            open={openDialog}
            onClose={onClose}
            updateShowsRevenue={updateShowRevenue}
          />
        </AppContext.Provider>
      );

    expect(getByAltText("movie-poster")).toBeTruthy();
  });
});
