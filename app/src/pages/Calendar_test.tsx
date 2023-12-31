import './css/duncal.css';

import React, { useEffect } from "react";
// import { showCalendar } from "./Calendar_lib";
import { draw } from "../library/calendar";

const Calendar: React.FC = () => {
    useEffect(() => {
        //showCalendar({
        draw({});
    }, []);

    return (
        <div className="container">
            <div className="left">
                <div className="calendar">
                    <div className="month">
                        <i className="fas fa-angle-left prev"></i>
                        <div className="date">Novembar 2023</div>
                        <i className="fas fa-angle-right next"></i>
                    </div>
                    <div className="weekdays">
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                        <div>Sun</div>
                    </div>
                    <div className="days"></div>
                    <div className="goto-today">
                        <div className="goto">
                            <input type="text" placeholder="mm/yyyy" className="date-input" />
                            <button className="goto-btn">Go</button>
                        </div>
                        <button className="today-btn">Today</button>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="today-date">
                    <div className="event-day">wed</div>
                    <div className="event-date">27th Novembar 2023</div>
                </div>
                <div className="events"></div>
                <div className="add-event-wrapper">
                    <div className="add-event-header">
                        <div className="title">Add Event</div>
                        <i className="fas fa-times close"></i>
                    </div>
                    <div className="add-event-body">
                        <div className="add-event-input">
                            <input type="text" placeholder="Event Name" className="event-name" />
                        </div>
                        <div className="add-event-input">
                            <input
                                type="text"
                                placeholder="Event Time From"
                                className="event-time-from"
                            />
                        </div>
                        <div className="add-event-input">
                            <input
                                type="text"
                                placeholder="Event Time To"
                                className="event-time-to"
                            />
                        </div>
                    </div>
                    <div className="add-event-footer">
                        <button className="add-event-btn">Add Event</button>
                    </div>
                </div>
            </div>
            <button className="add-event">
                <i className="fas fa-plus"></i>
            </button>
        </div>
    );
};

export default Calendar;