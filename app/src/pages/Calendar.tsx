import './css/default.css';
import './css/Calendar.css';

import React, { useEffect } from "react";
// import { showCalendar } from "./Calendar_lib";
import { draw } from "../library/calendar";

const Calendar: React.FC = () => {
  useEffect(() => {
    //show month calendar
    draw({
      target: '#monthcal',
      type: 'month',
      highlighttoday: true,
      prevnextbutton: 'show',
    });
    // show day calendar
    draw({
      target: '#daycal',
      type: 'day',
    });
    // show full events calendar
    draw({
      target: '#eventcalendar',
      type: 'full',
      prevnextbutton: 'show',
      highlighttoday: true,

    })
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



// <div className='eventcal'>
//   <div id='eventcalendar'></div>
// </div >

export default Calendar;