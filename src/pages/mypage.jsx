import React from "react";
import PersonalInfo from "../components/mypage/personalInfo";

const Mypage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center py-16 px-6 bg-gray-100 h-auto lg:h-auto">
      <div className="flex flex-col space-y-5">
        {/* 왼쪽 MyPage */}
        <PersonalInfo />
      </div>
    </div>
  );
};

export default Mypage;
