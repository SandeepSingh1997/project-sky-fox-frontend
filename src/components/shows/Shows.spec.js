import React, { useContext, useReducer } from "react";
import {fireEvent, render} from "@testing-library/react";
import Shows from "./Shows";
import {when} from "jest-when";
import {dateFromSearchString, nextDateLocation, previousDateLocation} from "./services/dateService";
import useShows from "./hooks/useShows";
import SeatSelectionDialog from "./SeatSelectionDialog";
import useShowsRevenue from "./hooks/useShowsRevenue";
import {mount, shallow} from "enzyme";
import ShowsRevenue from "./ShowsRevenue";
import { AppContext } from "../layout/Layout";


jest.mock("./services/dateService", () => ({
    dateFromSearchString: jest.fn(),
    nextDateLocation: jest.fn(),
    previousDateLocation: jest.fn()
}));

jest.mock("./hooks/useShows", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock("./hooks/useShowsRevenue", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock("./SeatSelectionDialog", () => {
    return () => <div>SeatSelection</div>;
});

jest.mock('../common/hooks/useFeatureTogglz', () => ({
    __esModule: true,
    default: jest.fn(() => {
        return {features: {SHOW_IMDB_RATING_FOR_MOVIE_FEATURE: true}};
    })
}));

describe("Basic rendering and functionality", () => {
    let testHistory;
    let testLocation;
    let testShowDate;
    const dispatch=jest.fn();
    const state={user:{"id": "1", "role": "Admin"}};

    beforeEach(() => {
        testHistory = {
            push: jest.fn()
        };

        testLocation = {
            search: "testSearch"
        };

        testShowDate = {
            format: jest.fn()
        };

        when(dateFromSearchString).calledWith("testSearch").mockReturnValue(testShowDate);
        when(nextDateLocation).calledWith(testLocation, testShowDate).mockReturnValue("Next Location");
        when(previousDateLocation).calledWith(testLocation, testShowDate).mockReturnValue("Previous Location");
        when(testShowDate.format).calledWith("Do MMM YYYY").mockReturnValue("Show Date");
        when(useShows).calledWith(testShowDate).mockReturnValue({
            showsLoading: false,
            shows: [
                {
                    id: 1,
                    cost: 150,
                    movie: {name: "Movie 1", posterURL: "https://aws.amazon.com/image.png", imdbRating: "8.0"},
                    slot: {startTime: "start time 1"}
                }, {
                    id: 2,
                    cost: 160,
                    movie: {name: "Movie 2", posterURL: "https://aws.amazon.com/image.png", imdbRating: "7.5"},
                    slot: {startTime: "start time 2"}
                }
            ]
        });
        when(useShowsRevenue).calledWith(testShowDate).mockReturnValue({
            showsRevenue: 549.99,
            showsRevenueLoading: false
        });
    });

    it("Should display the show info", () => {
        
        const shows = render(
        <AppContext.Provider value={{state,'':""}}>
        <Shows history={testHistory} location={testLocation}/>
        </AppContext.Provider>
        );

        shows.getByText("Shows (Show Date)");

        shows.getByText("Movie 1");
        shows.getByText("start time 1");
        shows.getByText("₹150");
        shows.getByText("IMDb Rating: 8.0")

        shows.getByText("Movie 2");
        shows.getByText("start time 2");
        shows.getByText("₹160");
        shows.getByText("IMDb Rating: 7.5")

        shows.getAllByAltText("movie-poster");
    });

    it("Should push to history if next or previous clicked", () => {
        
        const shows = render(
        <AppContext.Provider value={{state,'':""}}>
        <Shows history={testHistory} location={testLocation}/>
        </AppContext.Provider>
        );

        const previousDayButton = shows.getByText("Previous Day");
        const nextDayButton = shows.getByText("Next Day");

        fireEvent.click(previousDayButton);
        fireEvent.click(nextDayButton);

        expect(testHistory.push).toBeCalledTimes(2);
        expect(testHistory.push).toHaveBeenNthCalledWith(1, "Previous Location");
        expect(testHistory.push).toHaveBeenNthCalledWith(2, "Next Location");
    });

    it("Should display seat selection when a show is selected", () => {
        
        const dispatch=jest.fn();
        const {getByText,queryByText} = render(
        <AppContext.Provider value={{state,dispatch}}>
        <Shows history={testHistory} location={testLocation}/>
        </AppContext.Provider>
        );
        expect(queryByText("SeatSelectionDialog")).toBeNull();

        fireEvent.click(getByText("Movie 1"));

        expect(getByText("SeatSelection")).toBeTruthy();
    });

    it("Should display revenue when rendered", () => {
        
        const shows = mount(
        <AppContext.Provider value={{state,dispatch}}>
        <Shows history={testHistory} location={testLocation}/>
        </AppContext.Provider>
        );
        const showsRevenue = shows.find(ShowsRevenue);

        expect(showsRevenue.prop("showsRevenue")).toBe(549.99);
        expect(showsRevenue.prop("showsRevenueLoading")).toBe(false);
    });

    it("Should display movie poster when rendered", () => {
        
        const shows = mount(
        <AppContext.Provider value={{state,dispatch}}>
        <Shows history={testHistory} location={testLocation}/>
        </AppContext.Provider>
        );

        const moviePoster = shows.find('img');

        expect(moviePoster).toHaveLength(2);
    });
});
