import {useEffect, useState, useContext} from 'react';
import showsService from "../services/showsService";
import {QUERY_DATE_FORMAT} from "../../../Constants";
import { isValidDate } from '../services/dateService';
import { AppContext } from '../../../context/app-context';

const useShows = (showsDate) => {
    const [showsLoading, setShowsLoading] = useState(true);
    const [shows, setShows] = useState([]);

    const {state}=useContext(AppContext);
    const role=state.user.role;

    useEffect(() => {
        const formattedDate = showsDate.format(QUERY_DATE_FORMAT);
        
       if(role==='Admin' || isValidDate(formattedDate)){
         showsService.fetchAll(formattedDate).then(shows => {
            setShowsLoading(false);
            setShows(shows);
        });}
        else{
            setShowsLoading(false);
        }
        // eslint-disable-next-line
    }, []);

    return {
        shows: shows,
        showsLoading: showsLoading
    };
}

export default useShows;
