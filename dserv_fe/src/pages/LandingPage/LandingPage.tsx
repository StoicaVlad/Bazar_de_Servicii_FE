import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./LandingPage.css";
import SignUp from "../Modals/SignUp";
import Login from "../Modals/Login";

const LandingPage = (props: any) => {
  const [showSignup, setShowSignup] = useState(false);
  const handleOpenSignup = () => setShowSignup(true);
  const handleCloseSignup = () => {
    setShowSignup(false);
  };

  const [showLogin, setShowLogin] = useState(false);
  const handleOpenLogin = () => {
    setShowLogin(true);
  };
  const handleCloseLogin = (
    token: string,
    roles: [string],
    user_name: string,
    id: any
  ) => {
    if (token != null) {
      setShowLogin(false);
      const userData = {
        userLogged: true,
        token: token,
        roles: roles,
        username: user_name,
        userId: id,
      };
      props.handleAppCallback(userData);
    }
  };

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Services Market</h1>
              <p className="subtitle">Anything you need, just one click away</p>
            </div>
            <div className="button-container">
              <Button
                style={{marginRight: '10px'}}
                size="lg"
                className="landing-button"
                variant="info"
                onClick={handleOpenLogin}
              >
                Login
              </Button>
              <Button
                size="lg"
                className="landing-button"
                variant="outline-info"
                onClick={handleOpenSignup}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Row>
      </Container>
      {showSignup ? <SignUp handleClose={handleCloseSignup} /> : null}
      {showLogin ? <Login handleClose={handleCloseLogin} /> : null}
    </div>
  );
};

export default LandingPage;
