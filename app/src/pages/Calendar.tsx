import './css/default.css';
import './css/Calendar.css';
import './css/Events.css';

import React, { useEffect, useState } from "react";
import { draw } from "../library/calendar";
import { reveal } from "../library/events";

const ipcRenderer = (window as any).ipcRenderer;

const Calendar: React.FC = () => {
  const today = new Date();
  const [ selectedDate, setNewDate ] = useState({
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  });
  const [ eventsNumber, setEventsNumber ] = useState(0);
  const [ eventsByDate, setEventsByDate ] = useState([]);

  useEffect(() => {
    const handleNewDateReply = (event: any, { date, month, year }:
      { date: number; month: number; year: number }) => {
      setNewDate({ date, month, year });
    };

    ipcRenderer.on('new-active-date-reply', handleNewDateReply);

    return () => {
      ipcRenderer.off('new-active-date-reply', handleNewDateReply);
    };
  }, []);

  useEffect(() => {
    ipcRenderer.send("get-events-by-date", {
      date: selectedDate.date,
      month: selectedDate.month,
      year: selectedDate.year,
    });

    const replyHandler = (event: any, events: any) => {
      setEventsNumber(events.length);
      setEventsByDate(events);
    };

    ipcRenderer.once("get-events-by-date-reply", replyHandler);

    return () => {
      ipcRenderer.off("get-events-by-date-reply", replyHandler);
    };
  }, [ selectedDate ]);

  useEffect(() => {

    draw({
      target: "#monthcal",
      type: "month",
      date: selectedDate.date,
      month: selectedDate.month,
      year: selectedDate.year,
      highlighttoday: true,
      prevnextbutton: "show",
    });

    draw({
      target: "#daycal",
      type: "day",
      date: selectedDate.date,
      month: selectedDate.month,
      year: selectedDate.year,
    });
  }, [ selectedDate ]);

  useEffect(() => {
    reveal({
      target: "#events",
      type: "list",
      date: selectedDate.date,
      month: selectedDate.month,
      year: selectedDate.year,
      events: eventsByDate,
      count: eventsNumber,
    });
  }, [ selectedDate, eventsNumber, eventsByDate ]);

  return (
    <div className="c-screen">
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
