import React, { useEffect } from "react";
import { SubmitLoginWithCookie } from "../api/auth";
import { useSetRecoilState } from "recoil";
import { accessTokenState, isKakaoLogin } from "../recoil/atoms";


const Home = () => {
  const setAccessToken = useSetRecoilState(accessTokenState);

  const GetHeader = async () => {
    const response = await SubmitLoginWithCookie();

    localStorage.setItem("accessToken", response);
    setAccessToken(response);
  };

  useEffect(() => {
    if (localStorage.getItem("oauth2") === "true") {
      GetHeader();
      console.log("i am here");
    }
  }, []);


  return (
    <div className="flex flex-col h-auto bg-gradient-to-b from-gray-100 to-gray-200">
      안녕?
    </div>
  );
};

export default Home;
