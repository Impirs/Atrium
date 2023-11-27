import './css/default.css';
import './css/Calendar.css';

import React, { useEffect } from "react";
// import { showCalendar } from "./Calendar_lib";
import { draw } from "./calendar_lib";

const Calendar: React.FC = () => {
  useEffect(() => {
    //showCalendar({
    draw({
      target: '#monthcal',
      type: 'month',
      highlighttoday: true,
      prevnextbutton: 'show',
      activeState: true
    });
    // showCalendar({
    draw({
      target: '#daycal',
      type: 'day',
      activeState: true
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