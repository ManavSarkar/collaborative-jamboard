import React from "react";
import Avatar from "react-avatar";

function Members() {
  return (
    <div className="my-5 mx-6">
      <div className="item flex  bg-gray-50 py-3 rounded-r">
        <Avatar name="Sabarna Bhowmik" size={50} round="14px" className="mx-3" />
        <span className="w-full text-black flex items-center mx-3 font-semibold">
          {"Sabarna Bhowmik" ?? ""}
        </span>
      </div>
      <div className="item flex  bg-gray-50 py-3 rounded-r">
        <Avatar name="Manav Sarkar" size={50} round="14px" className="mx-3" />
        <span className="w-full text-black flex items-center mx-3 font-semibold">
          {"Manav Sarkar" ?? ""}
        </span>
      </div>
      <div className="item flex  bg-gray-50 py-3 rounded-r">
        <Avatar name="Tanmay Muhattoo" size={50} round="14px" className="mx-3" />
        <span className="w-full text-black flex items-center mx-3 font-semibold">
          {"Tanmay Muhattoo " ?? ""}
        </span>
      </div>
      
    </div>
  );
}

export default Members;
