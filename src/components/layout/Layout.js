import React, { useReducer } from 'react';
import {Box, Card, Container} from "@material-ui/core";
import Header from "../header/Header";
import styles from "./styles/layoutStyles";
import RootRouter from "../router/RootRouter";
import useAuth from "./hooks/useAuth";

export const AppContext = React.createContext("");

const initialState = {

    user: {
        "id": "", 
        "role": ""
    },

};

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_INPUT':
            return {
                user: action.data
            };


        default:
            return initialState;
    }
}

export default () => {
    const classes = styles();

    const [state, dispatch] = useReducer(reducer, initialState);

    const {isAuthenticated, handleLogin, handleLogout, handleSignup} = useAuth();

    return (
        <Box>
            <AppContext.Provider value={{ state, dispatch }}>
            <Header onLogout={handleLogout} isAuthenticated={isAuthenticated}/>
            <Container maxWidth={false} className={classes.container}>
                <Card>
                    <RootRouter isAuthenticated={isAuthenticated} onLogin={handleLogin} onSignup={handleSignup} onLogout={handleLogout} />
                </Card>
            </Container>
            </AppContext.Provider>
        </Box>
    )
};
