declare var dyncalendar: Dyncalendar;

interface Dyncalendar {
    draw(option: Record<string, any>): boolean;
}

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
    type?: 'day' | 'month';
    month?: number;
    year?: number;
    date?: number;
    monthformat?: 'mmm' | 'full';
    dayformat?: 'ddd' | 'full';
    highlighttoday?: boolean;
    highlighttargetdate?: boolean;
    prevnextbutton?: 'show' | 'hide';
}

(function (global: any) {
    'use strict';
    const //this will be used by the user.
        dyncalendar: any = {},
        //window document
        document = global.document,
        //najmanja godina, koju mozete koristiti
        MIN_YEAR = 1111,
        //najveca godina, koju mozete koristiti
        MAX_YEAR = 9999,
        //imena mesece
        monthName = {
            full: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            mmm: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
        },
        //name of the days
        dayName = {
            full: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
            d: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            dd: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            ddd: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        };
    /*
     * this function will create month table.
     *
     * @param object data   this contains the calendar data
     * @param object option this is the settings object
     * @return html
     */
    function createMonthTable(
        data: any,
        option: any
    ): HTMLTableElement {
        let table: HTMLTableElement,
            tr: HTMLTableRowElement,
            td: HTMLTableCellElement,
            row: number,
            value: number,
            count: number;
        table = document.createElement('table');
        tr = document.createElement('tr');
        //createf 1st row for the day letters
        for (value = 0; value <= 6; value++) {
            td = document.createElement('td');
            td.innerHTML = 'MTWTFSS'[value];
            tr.appendChild(td);
        }
        table.appendChild(tr);
        //create 2nd row for dates
        tr = document.createElement('tr');
        //blank td
        for (value = 0; value <= 6; value++) {
            if (value === data.firstDayIndex) {
                break;
            }
            td = document.createElement('td');
            tr.appendChild(td);
        }
        //remaing td of dates for the 2nd row
        count = 1;
        while (value <= 6) {
            td = document.createElement('td');
            td.innerHTML = count.toString();
            if (
                data.today.date === count &&
                data.today.monthIndex === data.monthIndex &&
                option.highlighttoday === true
            ) {
                td.setAttribute('class', 'dyncalendar-today-date');
            }
            if (
                option.date === count &&
                option.month === data.monthIndex &&
                option.highlighttargetdate === true
            ) {
                td.setAttribute('class', 'dyncalendar-target-date');
            }
            tr.appendChild(td);
            count++;
            value++;
        }
        table.appendChild(tr);
        //create remaining rows
        for (row = 3; row <= 7; row++) {
            tr = document.createElement('tr');
            for (value = 0; value <= 6; value++) {
                if (count > data.totaldays) {
                    table.appendChild(tr);
                    return table;
                }
                td = document.createElement('td');
                td.innerHTML = count.toString();
                if (
                    data.today.date === count &&
                    data.today.monthIndex === data.monthIndex &&
                    option.highlighttoday === true
                ) {
                    td.setAttribute(
                        'class',
                        'dyncalendar-today-date'
                    );
                }
                if (
                    option.date === count &&
                    option.month === data.monthIndex &&
                    option.highlighttargetdate === true
                ) {
                    td.setAttribute(
                        'class',
                        'dyncalendar-target-date'
                    );
                }
                count++;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return table;
    }
    /*
     * this function will draw Calendar Month Table
     *
     * @param object data   this contains the calendar data
     * @param object option this is the settings object
     * @return html
     */
    function drawCalendarMonthTable(
        data: any,
        option: any
    ): HTMLDivElement {
        let table: HTMLTableElement,
            div: HTMLDivElement,
            container: HTMLDivElement,
            elem: HTMLSpanElement;
        //get table
        table = createMonthTable(data, option);
        //calendar container
        container = document.createElement('div');
        container.setAttribute(
            'class',
            'dyncalendar-month-container'
        );
        //-------------------------- Header ------------------
        //header div
        div = document.createElement('div');
        div.setAttribute('class', 'dyncalendar-header');
        div.setAttribute('data-option', JSON.stringify(option));
        //prev button
        if (option.prevnextbutton === 'show') {
            elem = document.createElement('span');
            elem.setAttribute(
                'class',
                'dyncalendar-prev-next-btn prev-btn'
            );
            elem.setAttribute('data-date', option.date);
            elem.setAttribute('data-month', option.month);
            elem.setAttribute('data-year', option.year);
            elem.setAttribute('data-btn', 'prev');
            elem.innerHTML = '&lt;';
            //add prev button span to header div
            div.appendChild(elem);
        }
        //month span
        elem = document.createElement('span');
        elem.setAttribute('class', 'dyncalendar-span-month-year');
        if (option.monthformat === 'mmm') {
            elem.innerHTML = data.monthName + ' ' + data.year;
        } else if (option.monthformat === 'full') {
            elem.innerHTML = data.monthNameFull + ' ' + data.year;
        }
        //add month span to header div
        div.appendChild(elem);
        //next button
        if (option.prevnextbutton === 'show') {
            elem = document.createElement('span');
            elem.setAttribute(
                'class',
                'dyncalendar-prev-next-btn next-btn'
            );
            elem.setAttribute('data-date', option.date);
            elem.setAttribute('data-month', option.month);
            elem.setAttribute('data-year', option.year);
            elem.setAttribute('data-btn', 'next');
            elem.innerHTML = '&gt;';
            //add prev button span to header div
            div.appendChild(elem);
        }
        //add header div to container
        container.appendChild(div);
        //-------------------------- Body ------------------
        //body div
        div = document.createElement('div');
        div.setAttribute('class', 'dyncalendar-body');
        div.appendChild(table);
        //add body div to container div
        container.appendChild(div);
        //return container
        return container;
    }
    /*
     * this function will draw Calendar Day
     *
     * @param object data   this contains the calendar data
     * @param object option this is the settings object
     * @return html
     */
    function drawCalendarDay(data: any, option: any): HTMLDivElement {
        let div: HTMLDivElement,
            container: HTMLDivElement,
            elem: HTMLSpanElement;
        //calendar container
        container = document.createElement('div');
        container.setAttribute('class', 'dyncalendar-day-container');
        //------------------------- Header ------------------------//
        //-------------------------- Date -------------------------//
        //header div
        div = document.createElement('div');
        div.setAttribute('class', 'dyncalendar-header');
        //date span
        elem = document.createElement('span');
        elem.setAttribute('class', 'dyncalendar-span-date');
        elem.innerHTML = data.date;
        //add date span to body div
        div.appendChild(elem);
        //add body div to container
        container.appendChild(div);

        //-------------------------- Body -------------------------//
        //--------------------------- Day -------------------------//
        //body div
        div = document.createElement('div');
        div.setAttribute('class', 'dyncalendar-body');
        //day span
        elem = document.createElement('span');
        elem.setAttribute('class', 'dyncalendar-span-day');
        if (option.dayformat === 'ddd') {
            elem.innerHTML = dayName.ddd[data.targetedDayIndex];
        } else if (option.dayformat === 'full') {
            elem.innerHTML = dayName.full[data.targetedDayIndex];
        }
        //add day span to footer div
        div.appendChild(elem);
        //add header div to container
        container.appendChild(div);

        //------------------------- Footer ------------------------//
        //--------------------- Month and year --------------------//
        //footer div
        div = document.createElement('div');
        div.setAttribute('class', 'dyncalendar-footer');
        //month span
        elem = document.createElement('span');
        elem.setAttribute('class', 'dyncalendar-span-month-year');
        if (option.monthformat === 'mmm') {
            elem.innerHTML = data.monthName + ' ' + data.year;
        } else if (option.monthformat === 'full') {
            elem.innerHTML = data.monthNameFull + ' ' + data.year;
        }
        //add month span to footer div
        div.appendChild(elem);
        //add footer div to container
        container.appendChild(div);

        //return container
        return container;
    }
    /*
     * this function will extend source object with defaults object.
     *
     * @param object source     this is the source object
     * @param object defaults   this is the default object
     * @return object
     */
    function extendSource(source: any, defaults: any): any {
        let property: string;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    }
    /*
     * This function will return calendar detail.
     *
     * @param integer year        1111-9999 (optional) if not set will consider
     *                          the current year.
     * @param integer month        0-11 (optional) 0 = Jan, 1 = Feb, ... 11 = Dec,
     *                          if not set will consider the current month.
     * @param integer date      1-31 (optional)
     * @return boolean|object    if error return false, else calendar detail
     */
    function getCalendar(
        year?: number,
        month?: number,
        date?: number
    ): any {
        let dateObj = new Date(),
            dateString: string[],
            result: any = {},
            idx: number;
        if (year && (year < MIN_YEAR || year > MAX_YEAR)) {
            global.console.error('Invalid Year');
            return false;
        }
        if (month && (month > 11 || month < 0)) {
            global.console.error('Invalid Month');
            return false;
        }
        if (date && (date > 31 || date < 1)) {
            global.console.error('Invalid Date');
            return false;
        }
        result.year = year;
        result.month = month;
        result.date = date;

        //today
        result.today = {};
        dateString = dateObj.toString().split(' ');
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
        dateString = dateObj.toString().split(' ');
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
        dateString = dateObj.toString().split(' ');
        idx = dayName.ddd.indexOf(dateString[0]);
        result.targetedDayIndex = idx;
        result.targetedDayName = dateString[0];
        result.targetedDayFullName = dayName.full[idx];
        return result;
    }

    function onClick() {
        document.body.onclick = function (e: MouseEvent | any) {
            e = e || window.event;
            let targetDomObject = e.target || e.srcElement;
            let date, month, year, btn, option, dateObj;

            // prev-next button
            if (
                targetDomObject &&
                targetDomObject.classList &&
                targetDomObject.classList.contains(
                    'dyncalendar-prev-next-btn'
                )
            ) {
                date = parseInt(
                    targetDomObject.getAttribute('data-date') || '0',
                    10
                );
                month = parseInt(
                    targetDomObject.getAttribute('data-month') || '0',
                    10
                );
                year = parseInt(
                    targetDomObject.getAttribute('data-year') || '0',
                    10
                );
                btn = targetDomObject.getAttribute('data-btn');
                option = JSON.parse(
                    targetDomObject.parentElement?.getAttribute(
                        'data-option'
                    ) || '{}'
                );

                if (btn === 'prev') {
                    month = month - 1;
                    if (month < 0) {
                        year = year - 1;
                        month = 11;
                    }
                } else if (btn === 'next') {
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

            // month
            if (
                targetDomObject &&
                targetDomObject.classList &&
                targetDomObject.classList.contains(
                    'dyncalendar-span-month-year'
                )
            ) {
                option = JSON.parse(
                    targetDomObject.parentElement?.getAttribute(
                        'data-option'
                    ) || '{}'
                );
                dateObj = new Date();
                option.date = dateObj.getDate();
                option.month = dateObj.getMonth();
                option.year = dateObj.getFullYear();
                drawCalendar(option);
            }
        };
    }

    //------------------------------ dyncalendar.draw() ----------------------
    /*
     * this function will draw the calendar based on user preferences.
     *
     * option = {
     *  target : "#id|.class"           //(mandatory) for id use #id | for class use .class
     *  type : "calendar-type"          //(optional) values: "day|month" (default "day")
     *  month : "integer"               //(optional) value 0-11, where 0 = January, 11 = December
     *  year : "integer"                //(optional) example 1990. (default current year)
     *  date : "integer"                //(optional) example 1-31. (default current date)
     *  monthformat : "full"            //(optional) values: "mmm|full" (default "full")
     *  dayformat : "full"              //(optional) values: "ddd|full" (default "full")
     *  highlighttoday : boolean        //(optional) (default false) if true will highlight
     *                                    today's date
     *  highlighttargetdate : boolean   //(optional) (default false) if true will highlight
     *                                    targeted date of the month year
     *  prevnextbutton : "hide"         //(optional) (default "hide") (values: "show|hide")
     *                                    if set to "show" it will show the nav button (prev|next)
     * }
     *
     * @param object option             user preferences
     * @return boolean                  true if success, false otherwise
     */

    (dyncalendar as any).draw = function (
        option: Record<string, any>
    ): boolean {
        if (option === undefined) {
            console.error('Option missing');
            return false;
        }

        const dateObj = new Date();
        const defaults = {
            type: 'day',
            month: dateObj.getMonth(),
            year: dateObj.getFullYear(),
            date: dateObj.getDate(),
            monthformat: 'full',
            dayformat: 'full',
            highlighttoday: false,
            highlighttargetdate: false,
            prevnextbutton: 'hide',
        } as const;

        // extend user options with predefined options
        option = extendSource(option, defaults);
        const result = drawCalendar(option);

        // assuming drawCalendar returns a boolean, update as needed
        return result === undefined ? false : result;
    };

    //------------------------------ dyncalendar.draw() ends here ------------
    /*
     * this function will draw the calendar inside the target container.
     */
    function drawCalendar(option: any) {
        let //variables for creating calendar
            calendar: any,
            calendarHTML: any,
            targetedElementBy = 'id',
            targetElem: string,
            //other variables
            i: number,
            len: number,
            elemArr: HTMLCollectionOf<Element>;
        //find target element by
        if (option.target[0] === '#') {
            targetedElementBy = 'id';
        } else if (option.target[0] === '.') {
            targetedElementBy = 'class';
        }
        targetElem = option.target.substring(1);
        //get calendar HTML
        switch (option.type) {
            case 'day':
                //get calendar detail
                calendar = getCalendar(
                    option.year,
                    option.month,
                    option.date
                );
                //get calendar html
                calendarHTML = drawCalendarDay(calendar, option);
                break;
            case 'month':
                //get calendar detail
                calendar = getCalendar(
                    option.year,
                    option.month,
                    option.date
                );
                //get calendar html
                calendarHTML = drawCalendarMonthTable(
                    calendar,
                    option
                );
                break;
            default:
                global.console.error('Invalid type');
                return false;
        }

        //draw calendar
        if (targetedElementBy === 'id') {
            const targetElement = document.getElementById(targetElem);
            if (targetElement) {
                removeAllChildren(targetElement);
                targetElement.appendChild(
                    calendarHTML.cloneNode(true)
                );
            }
        } else if (targetedElementBy === 'class') {
            const elements = document.querySelectorAll(
                `.${targetElem}`
            );
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
    //events
    onClick();

    //attach to global window object
    global.dyncalendar = dyncalendar;
})(typeof window !== 'undefined' ? window : this);

//export functions you will need in other components
export const drawCalendar = (dyncalendar as any).draw;
