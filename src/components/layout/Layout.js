import React from "react";
import { Box, Card, Container } from "@material-ui/core";
import Header from "../header/Header";
import styles from "./styles/layoutStyles";
import RootRouter from "../router/RootRouter";
import useAuth from "./hooks/useAuth";
import AppState from "../../context/AppState";

export default () => {
  const classes = styles();

  const { isAuthenticated, handleLogin, handleLogout, handleSignup } = useAuth();

  return (
    <Box>
       <AppState isAuthenticated={isAuthenticated}>
      <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} />
      <Container maxWidth={false} className={classes.container}>
        <Card>
          <RootRouter
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onSignup={handleSignup}
            onLogout={handleLogout}
          />
        </Card>
      </Container>
      </AppState>
    </Box>
    
  );
};
