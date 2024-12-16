import { httpClient } from "./http";
import basicProfile from "../assets/imgs/basicProfile.jpg";

export const checkEmail = async (username) => {
  const data = await httpClient.post(`/members/check-email`, {
    username: username,
  });

  console.log(data);
  return data;
};

export const checkNickname = async (nickname) => {
  const data = await httpClient.post(`/members/check-nickname`, {
    nickname: nickname,
  });

  return data;
};

export const SubmitSignup = async (username, password, nickname, profile) => {
  const formData = new FormData();

  const member = {
    username: username,
    password: password,
    nickname: nickname,
    image : profile
  };

  formData.append("member", new Blob([JSON.stringify(member)], { type: "application/json" }));

  if (profile) {
    console.log("profile is existing");
    formData.append("image", profile);
  } else {
    console.log("profile is not existing");
    // 기본 프로필 이미지를 파일 객체로 변환
    const response = await fetch(basicProfile);
    const blob = await response.blob();
    const defaultImageFile = new File([blob], "basicProfile.jpg", { type: blob.type });
    formData.append("image", defaultImageFile);
  }
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
}
  const data = await httpClient.post(`/members`, formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return data;
};

export const SubmitLogin = async (username, password) => {
  try {
    const response = await httpClient.post(
      `/login`,
      { username: username, password: password },
      { withCredentials: true }
    );
    const accessToken = response.headers["access"];
    return accessToken;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw new Error("로그인 요청에 실패했습니다. 다시 시도해 주세요.");
  }
};

export const SubmitLogout = async () => {
  try {
    await httpClient.post(`/logout`, {}, { withCredentials: true });
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error("로그아웃 실패 :", error);
    throw error;
  }
};

export const SubmitLoginWithCookie = async () => {
  try {
    const response = await httpClient.post(`/oauth2`, { withCredentials: true });
    localStorage.setItem("oauth2", false);
    const accessToken = response.headers["access"];
    return accessToken;
  } catch (error) {
    // console.error("로그인 실패:", error);
    // throw new Error("로그인 요청에 실패했습니다. 다시 시도해 주세요.");
  }
};

export const getUserInfo = async (accessToken) => {
  try {
    const data = await httpClient.get(`/members`, {
      headers: {
        access: `${accessToken}`,
      },
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log("유저 정보를 불러오는 데 실패했습니다:", error);
    throw error;
  }
};

export const changePassword = async (password, accessToken) => {
  const formData = new FormData();

  const member = {
    password: password,
    nickname: "",
    gender: "",
    role: "",
  };

  formData.append("member", JSON.stringify(member));

  const data = await httpClient.put(`/members`, formData, {
    headers: {
      access: `${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const changeUserInfo = async (nickname, imgFile, accessToken) => {
  const formData = new FormData();

  const member = {
    password: "",
    nickname: nickname,
    role: "",
  };

  formData.append("member", JSON.stringify(member));

  if (imgFile) {
    formData.append("image", imgFile);
  }

  const data = await httpClient.put(`/members`, formData, {
    headers: {
      access: `${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// export const getImageFromBack = async (profile) => {
//   const data = await httpClient.get(`/images`)
// }
