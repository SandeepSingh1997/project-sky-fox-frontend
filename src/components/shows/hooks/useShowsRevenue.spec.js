import {renderHook} from "@testing-library/react-hooks";
import useShowsRevenue from "./useShowsRevenue";
import showsService from "../services/showsService";
import moment from "moment";
import {when} from "jest-when";
import React from 'react';
import { AppContext } from "../../../context/app-context";

jest.mock("../services/showsService", () => ({
    __esModule: true,
    default: {
        getRevenue: jest.fn()
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
        when(showsService.getRevenue).calledWith("2020-01-01").mockResolvedValue(549.99);
    });

    it("Should initialize the hook with zero shows revenue and loading", () => {
        const {result} = renderHook(() => useShowsRevenue(showDate), {wrapper});

        const {showsRevenue, showsRevenueLoading} = result.current;

        expect(showsRevenue).toEqual(0);
        expect(showsRevenueLoading).toBe(true);
    });

    it("Should get shows revenue and finish loading after mount", async () => {
        const {result, waitForNextUpdate} = renderHook(() => useShowsRevenue(showDate), {wrapper});

        await waitForNextUpdate();
        const {showsRevenue, showsRevenueLoading} = result.current;

        expect(showsRevenue).toEqual(549.99);
        expect(showsRevenueLoading).toBe(false);
    });
});
