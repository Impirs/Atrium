import React from "react"

/*
interface MonthName {
    full: string[];
    mmm: string[];
}

interface DayName {
    full: string[];
    d: string[];
    dd: string[];
    ddd: string[];
}

interface CalendarData {
    year: number;
    month: number;
    date: number;
    today: {
        dayIndex: number;
        dayName: string;
        dayFullName: string;
        monthIndex: number;
        monthName: string;
        monthNameFull: string;
        date: number;
        year: string;
    };
    firstDayIndex: number;
    firstDayName: string;
    firstDayFullName: string;
    monthIndex: number;
    monthName: string;
    monthNameFull: string;
    totaldays: number;
    targetedDayIndex: number;
    targetedDayName: string;
    targetedDayFullName: string;
}

interface CalendarOption {
    target: string;
    type?: "day" | "month";
    month?: number;
    year?: number;
    date?: number;
    monthformat?: "mmm" | "full";
    dayformat?: "ddd" | "full";
    highlighttoday?: boolean;
    highlighttargetdate?: boolean;
    prevnextbutton?: "show" | "hide";
}

interface Dyncal {
    draw(option: CalendarOption): void;
}

(function (global) {
    "use strict";
    const
        dyncal: Dyncal = {},
        document = global.document,
        START_YEAR = 1900,
        END_YEAR = 9999,
        monthName: MonthName = {
            full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            mmm: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        dayName: DayName = {
            full: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            d: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            dd: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            ddd: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        };

    function createMonthTable(data: CalendarData, option: CalendarOption): HTMLTableElement {
        let
            table: HTMLTableElement, 
            tr: HTMLTableRowElement, 
            td: HTMLTableCellElement,
            r: number, 
            c: number, 
            count: number;
        table = document.createElement("table");
        tr = document.createElement("tr");
        for (c = 0; c <= 6; c++) {
            td = document.createElement("td");
            td.innerHTML = "MTWTFSS"[c];
            tr.appendChild(td);
        }
        table.appendChild(tr);
        tr = document.createElement("tr");
        for (c = 0; c <= 6; c++) {
            if (c === data.firstDayIndex) {
                break;
            }
            td = document.createElement("td");
            tr.appendChild(td);
        }
        count = 1;
        while (c <= 6) {
            td = document.createElement("td");
            td.innerHTML = count.toString();
            if (data.today.date === count && data.today.monthIndex === data.monthIndex && option.highlighttoday === true) {
                td.setAttribute("class", "dyncal-today-date");
            }
            if (option.date === count && option.month === data.monthIndex && option.highlighttargetdate === true) {
                td.setAttribute("class", "dyncal-target-date");
            }
            tr.appendChild(td);
            count++;
            c++;
        }
        table.appendChild(tr);
        for (r = 3; r <= 7; r++) {
            tr = document.createElement("tr");
            for (c = 0; c <= 6; c++) {
                if (count > data.totaldays) {
                    table.appendChild(tr);
                    return table;
                }
                td = document.createElement('td');
                td.innerHTML = count.toString();
                if (data.today.date === count && data.today.monthIndex === data.monthIndex && option.highlighttoday === true) {
                    td.setAttribute("class", "dyncal-today-date");
                }
                if (option.date === count && option.month === data.monthIndex && option.highlighttargetdate === true) {
                    td.setAttribute("class", "dyncal-target-date");
                }
                count++;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return table;
    }

    function drawCalendarMonthTable(data: CalendarData, option: CalendarOption): HTMLDivElement {
        let
            table: HTMLTableElement,
            div: HTMLDivElement, container: HTMLDivElement, elem: HTMLSpanElement;
        table = createMonthTable(data, option);
        container = document.createElement("div");
        container.setAttribute("class", "dyncal-month-container");
        div = document.createElement("div");
        div.setAttribute("class", "dyncal-header");
        div.setAttribute("data-option", JSON.stringify(option));
        if (option.prevnextbutton === "show") {
            elem = document.createElement("span");
            elem.setAttribute("class", "dyncal-prev-next-btn prev-btn");
            elem.setAttribute("data-date", option.date.toString());
            elem.setAttribute("data-month", option.month.toString());
            elem.setAttribute("data-year", option.year.toString());
            elem.setAttribute("data-btn", "prev");
            elem.innerHTML = "&lt;";
            div.appendChild(elem);
        }
        elem = document.createElement("span");
        elem.setAttribute("class", "dyncal-span-month-year");
        if (option.monthformat === "mmm") {
            elem.innerHTML = data.monthName + " " + data.year.toString();
        } else if (option.monthformat === "full") {
            elem.innerHTML = data.monthNameFull + " " + data.year.toString();
        }
        div.appendChild(elem);
        if (option.prevnextbutton === "show") {
            elem = document.createElement("span");
            elem.setAttribute("class", "dyncal-prev-next-btn next-btn");
            elem.setAttribute("data-date", option.date.toString());
            elem.setAttribute("data-month", option.month.toString());
            elem.setAttribute("data-year", option.year.toString());
            elem.setAttribute("data-btn", "next");
            elem.innerHTML = "&gt;";
            div.appendChild(elem);
        }
        container.appendChild(div);
        div = document.createElement("div");
        div.setAttribute("class", "dyncal-body");
        div.appendChild(table);
        container.appendChild(div);
        return container;
    }

    function drawCalendarDay(data: CalendarData, option: CalendarOption): HTMLDivElement {
        let
            div: HTMLDivElement, container: HTMLDivElement, elem: HTMLSpanElement;
        container = document.createElement("div");
        container.setAttribute("class", "dyncal-day-container");
        div = document.createElement("div");
        div.setAttribute("class", "dyncal-header");
        elem = document.createElement("span");
        elem.setAttribute("class", "dyncal-span-day");
        if (option.dayformat === "ddd") {
            elem.innerHTML = dayName.ddd[data.targetedDayIndex];
        } else if (option.dayformat === "full") {
            elem.innerHTML = dayName.full[data.targetedDayIndex];
        }
        div.appendChild(elem);
        container.appendChild(div);
        div = document.createElement("div");
        div.setAttribute("class", "dyncal-body");
        elem = document.createElement("span");
        elem.setAttribute("class", "dyncal-span-date");
        elem.innerHTML = data.date.toString();
        div.appendChild(elem);
        container.appendChild(div);
        div = document.createElement("div");
        div.setAttribute("class", "dyncal-footer");
        elem = document.createElement("span");
        elem.setAttribute("class", "dyncal-span-month-year");
        if (option.monthformat === "mmm") {
            elem.innerHTML = data.monthName + " " + data.year.toString();
        } else if (option.monthformat === "full") {
            elem.innerHTML = data.monthNameFull + " " + data.year.toString();
        }
        div.appendChild(elem);
        container.appendChild(div);
        return container;
    }

    function extendSource(source: CalendarOption, defaults: CalendarOption): CalendarOption {
        let property: keyof CalendarOption;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    }

    function getCalendar(year?: number, month?: number, date?: number): CalendarData | boolean {
        const
            dateObj = new Date(),
            dateString: string[],
            result: CalendarData = {},
            idx: number;
        if (year && (year < START_YEAR || year > END_YEAR)) {
            global.console.error("Invalid Year");
            return false;
        }
        if (month && (month > 11 || month < 0)) {
            global.console.error("Invalid Month");
            return false;
        }
        if (date && (date > 31 || date < 1)) {
            global.console.error("Invalid Date");
            return false;
        }
        result.year = year || dateObj.getFullYear();
        result.month = month || dateObj.getMonth();
        result.date = date || dateObj.getDate();
        result.today = {};
        dateString = dateObj.toString().split(" ");
        idx = dayName.ddd.indexOf(dateString[0]);
        result.today.dayIndex = idx;
        result.today.dayName = dateString[0];
        result.today.dayFullName = dayName.full[idx];
        idx = monthName.mmm.indexOf(dateString[1]);
        result.today.monthIndex = idx;
        result.today.monthName = dateString[1];
        result.today.monthNameFull = monthName.full[idx];
        result.today.date = dateObj.getDate();
        result.today.year = dateString[3];
        dateObj.setDate(1);
        dateObj.setMonth(result.month);
        dateObj.setFullYear(result.year);
        dateString = dateObj.toString().split(" ");
        idx = dayName.ddd.indexOf(dateString[0]);
        result.firstDayIndex = idx;
        result.firstDayName = dateString[0];
        result.firstDayFullName = dayName.full[idx];
        idx = monthName.mmm.indexOf(dateString[1]);
        result.monthIndex = idx;
        result.monthName = dateString[1];
        result.monthNameFull = monthName.full[idx];
        dateObj.setFullYear(result.year);
        dateObj.setMonth(result.month + 1);
        dateObj.setDate(0);
        result.totaldays = dateObj.getDate();
        dateObj.setFullYear(result.year);
        dateObj.setMonth(result.month);
        dateObj.setDate(result.date);
        dateString = dateObj.toString().split(" ");
        idx = dayName.ddd.indexOf(dateString[0]);
        result.targetedDayIndex = idx;
        result.targetedDayName = dateString[0];
        result.targetedDayFullName = dayName.full[idx];
        return result;
    }

    function onClick() {
        document.body.onclick = function (e) {
            e = global.event || e;
            let
                targetDomObject = e.target || e.srcElement,
                date: number, month: number, year: number, btn: string, option: CalendarOption, dateObj: Date;
            if ((targetDomObject) && (targetDomObject.classList) && (targetDomObject.classList.contains("dyncal-prev-next-btn"))) {
                date = parseInt(targetDomObject.getAttribute("data-date"));
                month = parseInt(targetDomObject.getAttribute("data-month"));
                year = parseInt(targetDomObject.getAttribute("data-year"));
                btn = targetDomObject.getAttribute("data-btn");
                option = JSON.parse(targetDomObject.parentElement.getAttribute("data-option"));
                if (btn === "prev") {
                    month = month - 1;
                    if (month < 0) {
                        year = year - 1;
                        month = 11;
                    }
                }
                else if (btn === "next") {
                    month = month + 1;
                    if (month > 11) {
                        year = year + 1;
                        month = 0;
                    }
                }
                option.date = date;
                option.month = month;
                option.year = year;
                drawCalendar(option);
            }
            if ((targetDomObject) && (targetDomObject.classList) && (targetDomObject.classList.contains("dyncal-span-month-year"))) {
                option = JSON.parse(targetDomObject.parentElement.getAttribute("data-option"));
                dateObj = new Date();
                option.date = dateObj.getDate();
                option.month = dateObj.getMonth();
                option.year = dateObj.getFullYear();
                drawCalendar(option);
            }
        };
    }

    dyncal.draw = function (option: CalendarOption): void {
        if (!option) {
            global.console.error("Option missing");
            return;
        }
        const
            self = this,
            dateObj = new Date(),
            defaults: CalendarOption = {
                type: "day",
                month: dateObj.getMonth(),
                year: dateObj.getFullYear(),
                date: dateObj.getDate(),
                monthformat: "full",
                dayformat: "full",
                highlighttoday: false,
                highlighttargetdate: false,
                prevnextbutton: "hide"
            };
        option = extendSource(option, defaults);
        drawCalendar(option);
    };

    function drawCalendar(option: CalendarOption): void {
        let
            calendar: CalendarData,
            calendarHTML: HTMLDivElement,
            targetedElementBy = "id",
            targetElem: string,
            i: number, len: number, elemArr: HTMLCollectionOf<Element>;
        if (option.target[0] === "#") {
            targetedElementBy = "id";
        } else if (option.target[0] === ".") {
            targetedElementBy = "class";
        }
        targetElem = option.target.substring(1);
        switch (option.type) {
            case "day":
                calendar = getCalendar(option.year, option.month, option.date) as CalendarData;
                calendarHTML = drawCalendarDay(calendar, option);
                break;
            case "month":
                calendar = getCalendar(option.year, option.month, option.date) as CalendarData;
                calendarHTML = drawCalendarMonthTable(calendar, option);
                break;
            default:
                global.console.error("Invalid type");
                return;
        }
        if (targetedElementBy === "id") {
            document.getElementById(targetElem).innerHTML = calendarHTML.outerHTML;
        } else if (targetedElementBy === "class") {
            elemArr = document.getElementsByClassName(targetElem);
            for (i = 0, len = elemArr.length; i < len; i = i + 1) {
                elemArr[i].innerHTML = calendarHTML.outerHTML;
            }
        }
    }

    onClick();
    global.dyncal = dyncal;
}(typeof window !== "" ? window : this));



*/

export default Calendar;