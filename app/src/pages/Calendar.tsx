import './css/default.css';
import './css/Calendar.css';

import React, { useEffect, useState } from "react";
import { draw } from "../library/calendar";

const ipcRenderer = (window as any).ipcRenderer;

const Calendar: React.FC = () => {
  const [ selectedDate, setNewDate ] = useState({ date: 0, month: 0, year: 0 });

  useEffect(() => {
    ipcRenderer.send("default-date-active");

    const handleNewDateReply = (event: any, { date, month, year }:
      { date: number; month: number; year: number }) => {
      setNewDate({ date, month, year });
    };

    ipcRenderer.on('default-date-active-reply', handleNewDateReply);
    ipcRenderer.on('new-date-active-reply', handleNewDateReply);
  }, []);

  useEffect(() => {
    draw({
      target: '#monthcal',
      type: 'month',
      date: selectedDate.date,
      month: selectedDate.month,
      year: selectedDate.year,
      highlighttoday: true,
      prevnextbutton: 'show',
    });

    draw({
      target: '#daycal',
      type: 'day',
      date: selectedDate.date,
      month: selectedDate.month,
      year: selectedDate.year,
    });
  }, [ selectedDate ]);

  return (
    <div className="screen">
      <div className="box">
        <div className="month">
          <div id="monthcal"></div>
        </div>
        <div className="container">
          <div id="daycal"></div>
          <div id="events"></div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
