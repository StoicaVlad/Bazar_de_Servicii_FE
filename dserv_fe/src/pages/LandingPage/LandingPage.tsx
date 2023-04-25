import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./LandingPage.css";
import SignUp from "../Modals/SignUp";
import Login from "../Modals/Login";
import ProfileSetup from "../Modals/ProfileSetup";

const LandingPage = (props: any) => {

  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const handleOpenProfileSetup = () => setShowProfileSetup(true);
  const handleCloseProfileSetup = () => setShowProfileSetup(false);

  const [showSignup, setShowSignup] = useState(false);
  const handleOpenSignup = () => setShowSignup(true);
  const handleCloseSignup = (message: string) => {
    setShowSignup(false);
    if (message.length) {
      setShowProfileSetup(true);
    }
  };

  const [showLogin, setShowLogin] = useState(false);
  const handleOpenLogin = () => {
    setShowLogin(true);
  };
  const handleCloseLogin = (token: string, roles: [string], user_name: string) => {
    setShowLogin(false);
    const userData = {
      userLogged: true,
      token: token,
      roles: roles,
      username: user_name
    }
    props.handleAppCallback(userData);
  };

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Bun venit la Bazarul de Servicii</h1>
              <p className="subtitle">Orice serviciu, la un click distanta</p>
            </div>
            <div className="button-container">
              <Button
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
      {showProfileSetup ? <ProfileSetup /> : null}
    </div>
  );
};

export default LandingPage;