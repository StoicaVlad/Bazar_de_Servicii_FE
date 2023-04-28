import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Services from "./pages/Services";
import MyServices from "./pages/MyServices";
import ProfileSetup from "./pages/Modals/ProfileSetup";


function App() {
  const [accountData, setAccountData] = useState({
    userLogged: false,
    token: "",
    roles: [],
    username: "",
    userId: ""
  });

  const [headerInfo, setHeaderInfo] = useState({
    roles: [],
    username: "",
    profileId: ""
  });

  const receiveAccountData = (data: any) => {
    console.log(data);
    setAccountData(data);
    console.log(accountData);
    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem("roles", JSON.stringify(data.roles));
    window.localStorage.setItem("username", JSON.stringify(data.roles));
    window.localStorage.setItem("userId", JSON.stringify(data.userId))
    const headerData = { roles: data.roles, username: data.username, profileId: ''};
    setHeaderInfo(headerData);
  };

  const receiveProfileId = (data: any) => {
    console.log(data);
    setHeaderInfo({roles: headerInfo.roles, username: headerInfo.username, profileId: data.toString()});
    window.localStorage.setItem("profileId", JSON.stringify(data));
    console.log(headerInfo);
  }

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const roles = JSON.parse(window.localStorage.getItem("roles")!);
    const username = JSON.parse(window.localStorage.getItem("username")!);
    const userId = JSON.parse(window.localStorage.getItem("userId")!);
    console.log('token:' + token);
    if (token !== null) {
      setAccountData({
        userLogged: token.length ? true : false,
        token: token,
        roles: roles,
        username: username,
        userId: userId
      });
      setHeaderInfo({
        roles: roles,
        username: username,
        profileId: ''
      });
    }
  }, []);

  return (
    <>
      {accountData.userLogged === true ? <Header {...headerInfo} /> : null}
      <main style={{ minHeight: "93vh" }}>
        {accountData.userLogged === true ? (
          <>
          {!headerInfo.profileId.length ? <ProfileSetup {...accountData} handleProfileCallback={receiveProfileId}/> : null}
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path={"/services/" + headerInfo.profileId} element={<MyServices />} />
          </Routes>
          </BrowserRouter>
          </>
        ) : (
          <LandingPage handleAppCallback={receiveAccountData}></LandingPage>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
