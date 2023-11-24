import './css/default.css';
import './css/Calendar.css';

import React, { useEffect } from "react";
import { drawCalendar } from "./dyncal";
// import { drawCalendar } from "./duncal";

const Calendar: React.FC = () => {
  useEffect(() => {
    // drawCalendar({
    //   target: '#maincal',
    //   starts: 0,
    // });
    drawCalendar({
      target: '#monthcal',
      type: 'month',
      highlighttoday: true,
      prevnextbutton: 'show'
    });
    drawCalendar({
      target: '#daycal',
      type: 'day',
    });
  }, []);

  return (
    <div className="screen">
      <div className="box">
        <div className="month">
          <div id="monthcal"></div>
        </div>
        <div className="container">
          <div id="daycal"></div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;