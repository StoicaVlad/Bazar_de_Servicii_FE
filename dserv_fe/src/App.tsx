import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Services from "./pages/Services";
import MyServices from "./pages/MyServices";
import ProfileSetup from "./pages/Modals/ProfileSetup";
import axiosBaseURL from "./components/HttpCommon";
import MyAnnouncements from "./pages/MyAnnouncements";
import Announcements from "./pages/Announcements";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [accountData, setAccountData] = useState({
    userLogged: false,
    token: "",
    roles: [],
    username: "",
    userId: "",
  });

  const [headerInfo, setHeaderInfo] = useState({
    roles: [],
    username: "",
    profileId: "",
  });

  const redirect = () => {
    window.location.href = "/";
  };

  const [profileId, setProfileId] = useState("");

  const receiveAccountData = (data: any) => {
    setAccountData(data);
    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem("roles", JSON.stringify(data.roles));
    window.localStorage.setItem("username", JSON.stringify(data.username));
    window.localStorage.setItem("userId", JSON.stringify(data.userId));
    const headerData = {
      roles: data.roles,
      username: data.username,
      profileId: "",
    };
    setHeaderInfo(headerData);

    if (profileId === null) {
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=UTF-8",
        },
      };

      axiosBaseURL
        .get("/api/profile?userId=" + data.userId, config)
        .then((response) => {
          setProfileId(response.data.toString());
          window.localStorage.setItem(
            "profileId",
            JSON.stringify(response.data.toString())
          );
          redirect();
        })
        .catch((error) => console.log(error));
    }
  };

  const receiveProfileId = (data: any) => {
    setProfileId(data.toString());
    window.localStorage.setItem("profileId", JSON.stringify(data.toString()));
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const roles = JSON.parse(window.localStorage.getItem("roles")!);
    const username = JSON.parse(window.localStorage.getItem("username")!);
    const userId = JSON.parse(window.localStorage.getItem("userId")!);
    const profileId = JSON.parse(window.localStorage.getItem("profileId")!);
    setProfileId(profileId);
    if (profileId === null) {
      receiveProfileId;
    }
    if (token !== null) {
      setAccountData({
        userLogged: token.length ? true : false,
        token: token,
        roles: roles,
        username: username,
        userId: userId,
      });
      setHeaderInfo({
        roles: roles,
        username: username,
        profileId: profileId,
      });
    }
  }, []);

  return (
    <>
      {accountData.userLogged === true ? <Header {...headerInfo} /> : null}
      <main style={{ minHeight: "93vh" }}>
        {accountData.userLogged === true ? (
          <>
            {profileId === null || !profileId.length ? (
              <ProfileSetup
                {...accountData}
                handleProfileCallback={receiveProfileId}
              />
            ) : null}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home props={profileId}/>} />
                <Route path="/services" element={<Services />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route
                  path={"/profile/:profileId"}
                  element={
                    <ProfilePage
                      props={{ profileId: profileId, token: accountData.token }}
                    />
                  }
                />
                <Route
                  path={"/services/" + profileId}
                  element={
                    <MyServices
                      props={{ profileId: profileId, token: accountData.token }}
                    />
                  }
                />
                <Route
                  path={"/announcements/" + profileId}
                  element={
                    <MyAnnouncements
                      props={{ profileId: profileId, token: accountData.token }}
                    />
                  }
                />
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
