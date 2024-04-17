import React, { useState } from "react";

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
         if (ms > 100) {
            sec++;
            ms = 0;
         }
         if (sec > 60) {
            min++;
            sec = 0;
         }
         if (min > 60) {
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
      <div className="w-screen min-h-screen bg-gradient-to-tr from-cyan-300 to-blue-800 via-violet-500">
         <div>
            <h1>{time.hr}</h1>
            <h1>{time.min}</h1>
            <h1>{time.sec}</h1>
            <h1>{time.ms}</h1>
         </div>
         <button onClick={timmerFunction}>{id ? "Pause" : "Start"}</button>
         <button onClick={() => setlap((prev) => [...prev, time])}>lap</button>
         <button onClick={resetHandler} disabled={id}>
            Reset
         </button>

         <div>
            {lap.map((item, i) => (
               <h1 key={i}>{item.sec}</h1>
            ))}
         </div>
      </div>
   );
}

export default App;
