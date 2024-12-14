import React, { useEffect, useRef } from "react";


const Home = () => {
  const asideRef = useRef(null); // Aside를 참조하기 위한 ref

  // Hero에서 전달된 버튼 클릭 시 Aside로 스크롤 이동
  const scrollToAside = () => {
    asideRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-auto bg-gradient-to-b from-gray-100 to-gray-200">
      안녕?
    </div>
  );
};

export default Home;
