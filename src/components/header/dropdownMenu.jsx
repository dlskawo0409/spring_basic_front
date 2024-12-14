import React from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  loginPopupOpenState,
  accessTokenState,
  userState,
  menuOpenState,
} from "../../recoil/atoms";
import { Link, useLocation } from "react-router-dom";
import { SubmitLogout } from "../../api/auth";

const DropdownMenu = () => {
  const setLoginPopupOpen = useSetRecoilState(loginPopupOpenState); // 로그인 팝업 상태
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState); // 로그인 팝업 상태
  const setMenuOpen = useSetRecoilState(menuOpenState); // 메뉴 열림 상태
  const userInfo = useRecoilValue(userState);

  const location = useLocation(); // 현재 경로 확인
  const realPriceStyle = location.pathname.startsWith("/realprice_map") && "text-primary-1 ";
  const charterStyle =
    location.pathname.startsWith("/charters") &&
    !location.pathname.startsWith("/charters/college") &&
    "text-primary-1 ";
  const boardStyle = location.pathname.startsWith("/board") && "text-primary-1 ";
  const dormitoryStyle =
    (location.pathname.startsWith("/dormitory") ||
      location.pathname.startsWith("/charters/college")) &&
    "text-primary-1 ";

  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  const handleLogout = () => {
    SubmitLogout();
    setAccessToken(null);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="lg:flex absolute top-20 left-0 w-full bg-white shadow-md z-10">
      {accessToken && (
        
          <div className="p-2 cursor-pointer border-b hover:text-primary-1">
            <span className="text-primary hover:underline">{userInfo.nickname} 님</span>
            <span className="ml-1 mr-4 text-gray-700">반갑습니다</span>
          </div>
       
      )}
      <div className="flex flex-col lg:flex-row lg:mx-4" onClick={toggleMenu}>
      </div>
      {!accessToken ? (
        <div
          className="p-2 cursor-pointer border rounded-md hover:text-primary-1"
          onClick={openLoginPopup}
        >
          로그인 / 회원가입
        </div>
      ) : (
        <div
          className="p-2 cursor-pointer border rounded-md hover:text-primary-1"
          onClick={handleLogout}
        >
          로그아웃
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
