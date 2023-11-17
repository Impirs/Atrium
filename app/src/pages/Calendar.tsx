import './css/default.css';
import './css/Calendar.css';

import React, { useEffect } from "react";
import { drawCalendar } from "./dycal"; 

const Calendar: React.FC = () => {
  useEffect(() => {
    drawCalendar({
      target: '#dyncalendar',
      type: 'month',
      highlighttoday: true,
      prevnextbutton: 'show'
    });
  }, []);

  return ( 
    <div className="screen">
      <div className="box">
        <div className="container">
          <div id="dyncalendar"></div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;