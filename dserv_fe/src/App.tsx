import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Services from "./pages/Services";


function App() {
  const [accountData, setAccountData] = useState({
    userLogged: false,
    token: "",
    roles: [],
    username: ""
  });

  const [headerInfo, setHeaderInfo] = useState({
    roles: [],
    username: "",
  });

  const receiveAccountData = (data: any) => {
    console.log(data);
    setAccountData(data);
    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem("roles", JSON.stringify(data.roles));
    window.localStorage.setItem("username", JSON.stringify(data.roles));
    const headerData = { roles: data.roles, username: data.username};
    setHeaderInfo(headerData);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const roles = JSON.parse(window.localStorage.getItem("roles")!);
    const username = JSON.parse(window.localStorage.getItem("username")!);
    if (token !== null) {
      setAccountData({
        userLogged: token.length ? true : false,
        token: token,
        roles: roles,
        username: username
      });
      setHeaderInfo({
        roles: roles,
        username: username,
      });
    }
  }, []);

  return (
    <>
      {accountData.userLogged === true ? <Header {...headerInfo} /> : null}
      <main style={{ minHeight: "93vh" }}>
        {accountData.userLogged === true ? (
          <>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
          </Routes>
          </BrowserRouter>
          </>
        ) : (
          <LandingPage handleAppCallback={receiveAccountData}></LandingPage>
        )}
      </main>
      {/* {accountData.token} */}
      <Footer />
    </>
  );
}

export default App;
