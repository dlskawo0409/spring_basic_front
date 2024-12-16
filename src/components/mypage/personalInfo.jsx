import React, { useState, useEffect } from "react";
import { getUserInfo, changeUserInfo } from "../../api/auth";
import { ImageInput, NicknameInput } from "../../components/signup/inputs";

const PersonalInfo = () => {

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [profile, setImgFile] = useState("");

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(true);
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);

  const getUserInfos = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await getUserInfo(accessToken);
      setImgFile(response.data.profile);
      setEmail(response.data.username);
      setNickname(response.data.nickname);

    
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfos();
  }, []);

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");

    console.log(nickname);

    try {
      const response = await changeUserInfo(nickname, profile, accessToken);
      console.log(response);
      alert("변경되었습니다 :)");
    } catch (error) {
      alert("정보 수정에 실패했습니다.");
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-96 mb-6 lg:mb-0 lg:mr-6">
      <ImageInput imgFile={profile} setImgFile={setImgFile} isMypage={true} />
      <div className="mb-4">
        <div className="text-sm text-gray-700">이메일</div>
        <input
          type="text"
          value={email}
          placeholder="이메일"
          disabled
          className="border border-gray-1 w-full h-9 rounded-md px-3 pr-8 mt-2 mb-1 text-sm" // 오른쪽 패딩 추가
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">닉네임</label>
        <NicknameInput nickname={nickname} setNickname={setNickname} />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full mb-3 bg-primary-2 text-white text-sm p-2 rounded-md hover:bg-primary-3"
      >
        정보 수정하기
      </button>
      <button
        onClick={() => {
          setIsPasswordModalOpen(true);
          setIsLoginModalOpen(true);
        }}
        className="w-full border border-primary-2 text-gray-700 text-sm p-2 rounded-md hover:bg-primary-5"
      >
        비밀번호 변경하기
      </button>
      {/* {isPasswordChecked && (
        <PasswordChangeModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          password={password}
          setPassword={setPassword}
          setIsPasswordChecked={setIsPasswordChecked}
        />
      )}
      <LoginCheckModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        username={email}
        password={password}
        setPassword={setPassword}
        setIsPasswordChecked={setIsPasswordChecked}
      /> */}
    </div>
  );
};

export default PersonalInfo;
