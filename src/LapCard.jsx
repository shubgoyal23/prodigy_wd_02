import React from "react";

function LapCard({ time, index }) {
   return (
      <div className="w-full h-fullm flex justify-start items-center text-xl mb-2">
         <span className="w-16 text-gray-300">#{index < 9? `0${index + 1}`: index + 1 }</span>
         <span className="">{time.hr < 10 ? `0${time.hr}` : time.hr}:</span>
         <span className="">{time.min < 10 ? `0${time.min}` : time.min}:</span>
         <span className="">{time.sec < 10 ? `0${time.sec}` : time.sec}:</span>
         <span className="">{time.ms < 10 ? `0${time.ms}` : time.ms} </span>
      </div>
   );
}

export default LapCard;
