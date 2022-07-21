import {useEffect, useState, useContext} from "react";
import {QUERY_DATE_FORMAT} from "../../../Constants";
import showsService from "../services/showsService";
import { AppContext } from "../../../context/app-context";

const useShowsRevenue = (showsDate) => {
    const [showsRevenueLoading, setShowsRevenueLoading] = useState(true);
    const [showsRevenue, setShowsRevenue] = useState(0);

    const {state}=useContext(AppContext);
    const role=state.user.role;

    useEffect(() => {
        if(role === 'Admin')
        updateShowsRevenue();
        // eslint-disable-next-line
    }, [role]);

    const updateShowsRevenue = () => {
        const formattedDate = showsDate.format(QUERY_DATE_FORMAT);

        showsService.getRevenue(formattedDate).then(showsRevenue => {
            setShowsRevenueLoading(false);
            setShowsRevenue(showsRevenue);
        });
    };

    return {
        showsRevenue: showsRevenue,
        updateShowsRevenue: updateShowsRevenue,
        showsRevenueLoading: showsRevenueLoading
    };
};

export default useShowsRevenue;
