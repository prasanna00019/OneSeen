import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white">
      <ReactLoading type={"cylon"} color={"#E67A55"} />
    </div>
  );
};

export default Loading;
