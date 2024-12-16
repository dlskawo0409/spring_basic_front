import React from "react";
import { Routes, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  chatbotOpenState,
  loginPopupOpenState,
  userSignupPopupOpenState,
  agentSignupPopupOpenState,
  menuOpenState,
} from "./recoil/atoms";

import Header from "./components/header/header";
import Home from "./pages/home";
import ErrorPage from "./pages/errorPage";
import Mypage from "./pages/mypage";
import LoginPopup from "./components/login/loginPopup";
import UserSignupPopup from "./components/signup/UserSignupPopup";
import AgentSignupPopup from "./components/signup/AgentSignupPopup";
import DropdownMenu from "./components/header/dropdownMenu";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [chatbotOpen, setChatbotOpen] = useRecoilState(chatbotOpenState);
  const [loginPopupOpen, setLoginPopupOpen] = useRecoilState(loginPopupOpenState);
  const [userSignupPopupOpen, setUserSignupPopupOpen] = useRecoilState(userSignupPopupOpenState);
  const [agentSignupPopupOpen, setAgentSignupPopupOpen] = useRecoilState(agentSignupPopupOpenState);
  const [menuOpen, setMenuOpen] = useRecoilState(menuOpenState); // 메뉴 열림 상태

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPopup onClose={() => navigate("/")} />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {loginPopupOpen && (
        <LoginPopup
          onClose={() => setLoginPopupOpen(false)}
          onMouseUp={(e) => e.preventDefault()}
        />
      )}
      {userSignupPopupOpen && <UserSignupPopup onClose={() => setUserSignupPopupOpen(false)} />}
      {agentSignupPopupOpen && <AgentSignupPopup onClose={() => setAgentSignupPopupOpen(false)} />}
      {menuOpen && <DropdownMenu />}
    </>
  );
};

export default App;
