import React, { useState } from "react";
import LapCard from "./LapCard";

function App() {
   const [time, setTime] = useState({ hr: 0, min: 0, sec: 0, ms: 0 });
   const [id, setId] = useState();
   const [lap, setlap] = useState([]);

   function runTimmer() {
      setTime((prev) => {
         let ms = prev.ms + 1;
         let sec = prev.sec;
         let min = prev.min;
         let hr = prev.hr;
         if (ms >= 100) {
            sec++;
            ms = 0;
         }
         if (sec >= 60) {
            min++;
            sec = 0;
         }
         if (min >= 60) {
            hr++;
            min = 0;
         }
         return { hr, min, sec, ms };
      });
   }

   const timmerFunction = () => {
      if (id) {
         window.clearInterval(id);
         setId(null);
         return;
      }
      const timerId = window.setInterval(runTimmer, 10);
      setId(timerId);
   };

   const resetHandler = () => {
      window.clearInterval(id);
      setTime({ hr: 0, min: 0, sec: 0, ms: 0 });
      setId(null);
      setlap([]);
   };

   return (
      <div className="w-screen min-h-screen bg-gradient-to-tr from-cyan-300 to-blue-800 via-violet-500 md:p-16 p-6 pt-10 text-white">
         <div className="bg-white/20 backdrop-blur-sm h-full w-full p-6 rounded-lg border-2 border-blue-600 shadow-xl shadow-black/10 mb-10 flex justify-center items-center text-5xl md:text-8xl lg:text-9xl">
            <span className="">{time.hr < 10 ? `0${time.hr}` : time.hr}:</span>
            <span className="">
               {time.min < 10 ? `0${time.min}` : time.min}:
            </span>
            <span className="">
               {time.sec < 10 ? `0${time.sec}` : time.sec}:
            </span>
            <span className="">{time.ms < 10 ? `0${time.ms}` : time.ms} </span>
         </div>
         <div className="bg-white/20 backdrop-blur-sm flex justify-center items-center gap-4 h-full w-full p-6 rounded-lg border-2 border-blue-600 shadow-xl shadow-black/10 mb-10">
            <button
               className={`w-28 h-12  rounded-md shadow-xl shadow-black/10 border-2 ${
                  id
                     ? "bg-yellow-500 border-yellow-600"
                     : "bg-lime-500 border-lime-600"
               }`}
               onClick={timmerFunction}
            >
               {id ? "Pause" : "Start"}
            </button>
            <button
               className="w-28 h-12  rounded-md shadow-xl shadow-black/10 border-2 bg-pink-500 border-pink-600 hover:bg-pink-400"
               onClick={() => setlap((prev) => [...prev, time])}
            >
               lap
            </button>
            <button
               onClick={resetHandler}
               disabled={id}
               className={`w-28 h-12  rounded-md shadow-xl shadow-black/10 border-2  ${
                  id
                     ? "cursor-not-allowed "
                     : "border-2 bg-fuchsia-500 border-fuchsia-600 "
               }`}
            >
               Reset
            </button>
         </div>
         {lap.length > 0 ? (
            <div className="bg-white/20 backdrop-blur-sm h-full w-full p-6 rounded-lg border-2 border-blue-600 shadow-xl shadow-black/10 mb-10 flex justify-center items-center flex-col">
               <h2 className="text-2xl underline mb-3 text-yellow-600">Laps</h2>
               <div>
                  {lap.map((item, i) => (
                     <LapCard key={i} time={item} index={i} />
                  ))}
               </div>
            </div>
         ) : (
            ""
         )}
      </div>
   );
}

export default App;
