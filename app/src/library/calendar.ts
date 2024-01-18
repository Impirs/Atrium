/*
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
}*/
/*
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
}*/
const document = global.document;
const ipcRenderer = (window as any).ipcRenderer;
//najmanja godina, koju mozete koristiti
const MIN_YEAR = 1111;
//najveca godina, koju mozete koristiti
const MAX_YEAR = 9999;
//imena mesece
const monthName = {
    full: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    mmm: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
};
//name of the days
const dayName = {
    full: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    d: ["M", "T", "W", "T", "F", "S", "S"],
    dd: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    ddd: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

// ================================== HTML =================================== //
function createMonthTable(data: any, options: any): HTMLTableElement {
    let table: HTMLTableElement,
        tr: HTMLTableRowElement,
        td: HTMLTableCellElement,
        row: number,
        value: number,
        count: number;
    table = document.createElement("table");
    tr = document.createElement("tr");
    //createf 1st row for the day letters
    for (value = 0; value <= 6; value++) {
        td = document.createElement("td");
        td.innerHTML = "MTWTFSS"[value];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    //create 2nd row for dates
    tr = document.createElement("tr");
    let i = data.firstDayIndex;
    const prevDate = new Date();
    if (options.monthIndex === 0) {
        prevDate.setFullYear(options.year - 1);
    } else prevDate.setFullYear(options.year);
    prevDate.setMonth(options.month);
    prevDate.setDate(0);
    const total = prevDate.getDate();
    for (value = 0; value <= 6; value++) {
        const td = document.createElement("td");
        if (i === 0) {
            break;
        }

        td.innerHTML = (total + 1 - i).toString();
        td.setAttribute("data-date", (prevDate.getDate() + 1 - i).toString());
        td.setAttribute("data-month", prevDate.getMonth().toString());
        td.setAttribute("data-year", prevDate.getFullYear().toString());
        td.setAttribute("class", "table-prev-data");

        tr.appendChild(td);

        i--;
    }

    //remaing td of dates for the 2nd row
    count = 1;
    while (value <= 6) {
        td = document.createElement("td");
        td.innerHTML = count.toString();
        td.setAttribute("data-date", count.toString());
        td.setAttribute("data-month", options.month);
        td.setAttribute("data-year", options.year);
        if (
            data.today.date === count &&
            data.today.monthIndex === data.monthIndex &&
            parseInt(options.year) === parseInt(data.today.year) &&
            options.highlighttoday === true
        ) {
            td.setAttribute("class", "dyncalendar-today-date");
        } else if (
            options.date === count &&
            options.month === data.monthIndex &&
            options.highlighttargetdate === true
        ) {
            td.setAttribute("class", "dyncalendar-target-date");
        } else td.setAttribute("class", "table-data");
        tr.appendChild(td);
        count++;
        value++;
    }
    table.appendChild(tr);
    //create remaining rows
    for (row = 3; row <= 7; row++) {
        tr = document.createElement("tr");
        for (value = 0; value <= 6; value++) {
            if (count > data.totaldays && value !== 0) {
                const nextDate = new Date();
                if (options.monthIndex === 11) {
                    nextDate.setDate(1);
                    nextDate.setMonth(0);
                    nextDate.setFullYear(options.year + 1);
                } else {
                    nextDate.setDate(1);
                    nextDate.setMonth(options.month + 1);
                }
                let i = 1;
                while (value <= 6) {
                    td = document.createElement("td");
                    td.innerHTML = nextDate.getDate().toString();
                    td.setAttribute("data-date", nextDate.getDate().toString());
                    td.setAttribute(
                        "data-month",
                        nextDate.getMonth().toString()
                    );
                    td.setAttribute(
                        "data-year",
                        nextDate.getFullYear().toString()
                    );
                    td.setAttribute("class", "table-next-data");
                    tr.appendChild(td);
                    nextDate.setDate(1 + i);
                    i++;
                    value++;
                }
                table.appendChild(tr);
                return table;
            } else if (count > data.totaldays && value === 0) {
                table.appendChild(tr);
                return table;
            }
            td = document.createElement("td");
            td.innerHTML = count.toString();
            td.setAttribute("data-date", count.toString());
            td.setAttribute("data-month", options.month);
            td.setAttribute("data-year", options.year);
            if (
                data.today.date === count &&
                data.today.monthIndex === data.monthIndex &&
                parseInt(options.year) === parseInt(data.today.year) &&
                options.highlighttoday === true
            ) {
                td.setAttribute("class", "dyncalendar-today-date");
            } else if (
                options.date === count &&
                options.month === data.monthIndex &&
                options.highlighttargetdate === true
            ) {
                td.setAttribute("class", "dyncalendar-target-date");
            } else td.setAttribute("class", "table-data");
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

function drawCalendarMonth(data: any, options: any): HTMLDivElement {
    let table: HTMLTableElement,
        div: HTMLDivElement,
        container: HTMLDivElement,
        elem: HTMLSpanElement;
    //get table
    table = createMonthTable(data, options);
    //calendar container
    container = document.createElement("div");
    container.setAttribute("class", "dyncalendar-month-container");
    //-------------------------- Header ------------------
    //header div
    div = document.createElement("div");
    div.setAttribute("class", "dyncalendar-header");
    div.setAttribute("data-options", JSON.stringify(options));
    //prev button
    if (options.prevnextbutton === "show") {
        elem = document.createElement("span");
        elem.setAttribute("class", "dyncalendar-prev-next-btn prev-btn");
        elem.setAttribute("data-date", options.date);
        elem.setAttribute("data-month", options.month);
        elem.setAttribute("data-year", options.year);
        elem.setAttribute("data-btn", "prev");
        elem.innerHTML = "&lt;";
        //add prev button span to header div
        div.appendChild(elem);
    }
    //month span
    elem = document.createElement("span");
    elem.setAttribute("class", "dyncalendar-span-month-year");
    if (options.monthformat === "mmm") {
        elem.innerHTML = data.monthName + " " + data.year;
    } else if (options.monthformat === "full") {
        elem.innerHTML = data.monthNameFull + " " + data.year;
    }
    //add month span to header div
    div.appendChild(elem);
    //next button
    if (options.prevnextbutton === "show") {
        elem = document.createElement("span");
        elem.setAttribute("class", "dyncalendar-prev-next-btn next-btn");
        elem.setAttribute("data-date", options.date);
        elem.setAttribute("data-month", options.month);
        elem.setAttribute("data-year", options.year);
        elem.setAttribute("data-btn", "next");
        elem.innerHTML = "&gt;";
        //add prev button span to header div
        div.appendChild(elem);
    }
    //add header div to container
    container.appendChild(div);
    //-------------------------- Body ------------------
    //body div
    div = document.createElement("div");
    div.setAttribute("class", "dyncalendar-body");
    div.appendChild(table);
    //add body div to container div
    container.appendChild(div);
    //return container
    return container;
}

function drawCalendarDay(data: any, options: any): HTMLDivElement {
    let div: HTMLDivElement, container: HTMLDivElement, elem: HTMLSpanElement;
    //calendar container
    container = document.createElement("div");
    container.setAttribute("class", "dyncalendar-day-container");
    //------------------------- Header ------------------------//
    //-------------------------- Date -------------------------//
    //header div
    div = document.createElement("div");
    div.setAttribute("class", "dyncalendar-header");
    //date span
    elem = document.createElement("span");
    elem.setAttribute("class", "dyncalendar-span-date");
    elem.innerHTML = data.date;
    //add date span to header div
    div.appendChild(elem);
    //add header div to container
    container.appendChild(div);

    //-------------------------- Body -------------------------//
    //--------------------------- Day -------------------------//
    //body div
    div = document.createElement("div");
    div.setAttribute("class", "dyncalendar-body");
    //day span
    elem = document.createElement("span");
    elem.setAttribute("class", "dyncalendar-span-day");
    if (options.dayformat === "ddd") {
        elem.innerHTML = dayName.ddd[data.targetedDayIndex];
    } else if (options.dayformat === "full") {
        elem.innerHTML = dayName.full[data.targetedDayIndex];
    }
    //add day span to body div
    div.appendChild(elem);
    //add body div to container
    container.appendChild(div);

    //------------------------- Footer ------------------------//
    //--------------------- Month and year --------------------//
    //footer div
    div = document.createElement("div");
    div.setAttribute("class", "dyncalendar-footer");
    //month span
    elem = document.createElement("span");
    elem.setAttribute("class", "dyncalendar-span-month-year");
    if (options.monthformat === "mmm") {
        elem.innerHTML = data.monthName + " " + data.year;
    } else if (options.monthformat === "full") {
        elem.innerHTML = data.monthNameFull + " " + data.year;
    }
    //add month span to footer div
    div.appendChild(elem);
    //add footer div to container
    container.appendChild(div);

    //return container
    return container;
}
// =============================== FUNCTIONS ================================= //
function extendSource(source: any, defaults: any): any {
    let property: string;
    for (property in defaults) {
        if (source.hasOwnProperty(property) === false) {
            source[property] = defaults[property];
        }
    }
    return source;
}

function getCalendar(year?: number, month?: number, date?: number): any {
    let dateObj = new Date(),
        dateString: string[],
        result: any = {},
        idx: number;
    if (year && (year < MIN_YEAR || year > MAX_YEAR)) {
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
    result.year = year;
    result.month = month;
    result.date = date;

    //today
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

    //get month-year first day
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

    //get total days for the month-year
    dateObj.setFullYear(result.year);
    dateObj.setMonth(result.month + 1);
    dateObj.setDate(0);
    result.totaldays = dateObj.getDate();

    //get month-year targeted date
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
// ================================== DRAW =================================== //
function drawCalendar(options: any) {
    let //variables for creating calendar
        calendar: any,
        calendarHTML: any,
        targetedElementBy = "id",
        targetElem: string;
    //find target element by
    if (options.target[0] === "#") {
        targetedElementBy = "id";
    } else if (options.target[0] === ".") {
        targetedElementBy = "class";
    }
    targetElem = options.target.substring(1);
    //get calendar HTML
    switch (options.type) {
        case "day":
            //get calendar detail
            calendar = getCalendar(options.year, options.month, options.date);
            //get calendar html
            calendarHTML = drawCalendarDay(calendar, options);
            break;
        case "month":
            //get calendar detail
            calendar = getCalendar(options.year, options.month, options.date);
            //get calendar html
            calendarHTML = drawCalendarMonth(calendar, options);
            break;
        default:
            global.console.error("Invalid type");
            return false;
    }

    //draw calendar
    if (targetedElementBy === "id") {
        const targetElement = document.getElementById(targetElem);
        if (targetElement) {
            removeAllChildren(targetElement);
            targetElement.appendChild(calendarHTML.cloneNode(true));
        }
    } else if (targetedElementBy === "class") {
        const elements = document.querySelectorAll(`.${targetElem}`);
        elements.forEach((element: Element) => {
            removeAllChildren(element as HTMLElement);
            (element as HTMLElement).appendChild(
                calendarHTML.cloneNode(true) as HTMLElement
            );
        });
    }

    // Функция для удаления всех дочерних элементов
    function removeAllChildren(element: HTMLElement) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}
// ================================= CLICKS ================================== //
function onClick() {
    document.addEventListener("click", function (e: MouseEvent | any) {
        e = e || window.event;
        let targetDomObject = e.target || e.srcElement;
        let date, month, year, btn, options, dateObj;

        // prev-next button
        if (
            targetDomObject &&
            targetDomObject.classList &&
            targetDomObject.classList.contains("dyncalendar-prev-next-btn")
        ) {
            date = parseInt(
                targetDomObject.getAttribute("data-date") || "0",
                10
            );
            month = parseInt(
                targetDomObject.getAttribute("data-month") || "0",
                10
            );
            year = parseInt(
                targetDomObject.getAttribute("data-year") || "0",
                10
            );
            btn = targetDomObject.getAttribute("data-btn");
            options = JSON.parse(
                targetDomObject.parentElement?.getAttribute("data-options") ||
                    "{}"
            );

            if (btn === "prev") {
                month = month - 1;
                if (month < 0) {
                    year = year - 1;
                    month = 11;
                }
            } else if (btn === "next") {
                month = month + 1;
                if (month > 11) {
                    year = year + 1;
                    month = 0;
                }
            }
            // console.log(date, month, year);
            options.date = date;
            options.month = month;
            options.year = year;
            drawCalendar(options);
        }

        // month
        if (
            targetDomObject &&
            targetDomObject.classList &&
            targetDomObject.classList.contains("dyncalendar-span-month-year")
        ) {
            options = JSON.parse(
                targetDomObject.parentElement?.getAttribute("data-options") ||
                    "{}"
            );
            dateObj = new Date();
            options.date = dateObj.getDate();
            options.month = dateObj.getMonth();
            options.year = dateObj.getFullYear();
            drawCalendar(options);
        }

        //choose the date
        if (
            targetDomObject &&
            targetDomObject.classList &&
            (targetDomObject.classList.contains("table-data") ||
                targetDomObject.classList.contains("dyncalendar-today-date") ||
                targetDomObject.classList.contains("dyncalendar-target-date") ||
                targetDomObject.classList.contains("table-prev-data") ||
                targetDomObject.classList.contains("table-next-data"))
        ) {
            date = parseInt(
                targetDomObject.getAttribute("data-date") || "0",
                10
            );
            month = parseInt(
                targetDomObject.getAttribute("data-month") || "0",
                10
            );
            year = parseInt(
                targetDomObject.getAttribute("data-year") || "0",
                10
            );
            ipcRenderer.send("update-active-date", {
                date,
                month,
                year,
            });
        }
    });
}
// ================================= EXPORT ================================== //
onClick();

export const draw = function (options: Record<string, any>): boolean {
    if (options === undefined) {
        console.error("Option missing");
        return false;
    }

    const dateObj = new Date();
    const defaults = {
        type: "day",
        month: dateObj.getMonth(),
        year: dateObj.getFullYear(),
        date: dateObj.getDate(),
        monthformat: "full",
        dayformat: "full",
        highlighttoday: false,
        highlighttargetdate: false,
        prevnextbutton: "hide",
    } as const;

    // extend user optionss with predefined optionss
    options = extendSource(options, defaults);
    const result = drawCalendar(options);

    // assuming drawCalendar returns a boolean, update as needed
    return result === undefined ? false : result;
};
