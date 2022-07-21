import {renderHook} from "@testing-library/react-hooks";
import useShows from "./useShows";
import showsService from "../services/showsService";
import moment from "moment";
import {when} from "jest-when";
import {AppContext} from "../../../context/app-context";
import  React from 'react';

jest.mock("../services/showsService", () => ({
    __esModule: true,
    default: {
        fetchAll: jest.fn()
    }
}));

describe("Basic logic", () => {
    let showDate;
    const state={user:{"id": "1", "role": "Admin"}};
    const dispatch=jest.fn();
    const wrapper=({children})=>{
       return (<AppContext.Provider value={{state,dispatch}}>
            {children}
        </AppContext.Provider>);
    };

    beforeEach(() => {
        showDate = moment("2020-01-01", "YYYY-MM-DD");
        when(showsService.fetchAll).calledWith("2020-01-01").mockResolvedValue(["show 1", "show 2"]);
    });

    it("Should initialize the hook with empty shows and loading", () => {
        const {result} = renderHook(() => useShows(showDate),{wrapper});

        const {shows, showsLoading} = result.current;

        expect(shows).toEqual([]);
        expect(showsLoading).toBe(true);
    });

    it("Should get shows and finish loading after mount", async () => {
        const {result, waitForNextUpdate} = renderHook(() => useShows(showDate),{wrapper});

        await waitForNextUpdate();
        const {shows, showsLoading} = result.current;

        expect(shows).toEqual(["show 1", "show 2"]);
        expect(showsLoading).toBe(false);
    });
});
