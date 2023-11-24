declare var dyncal: Calendar;

const calendar = document.querySelector('.calendar') as HTMLElement;
const date = document.querySelector('.date') as HTMLElement;
const daysContainer = document.querySelector('.days') as HTMLElement;
const prev = document.querySelector('.prev') as HTMLElement;
const next = document.querySelector('.next') as HTMLElement;
const todayBtn = document.querySelector('.today-btn') as HTMLElement;
const gotoBtn = document.querySelector('.goto-btn') as HTMLElement;
const dateInput = document.querySelector('.date-input') as HTMLInputElement;
const eventDay = document.querySelector('.event-day') as HTMLElement;
const eventDate = document.querySelector('.event-date') as HTMLElement;
const eventsContainer = document.querySelector('.events') as HTMLElement;
const addEventBtn = document.querySelector('.add-event') as HTMLElement;
const addEventWrapper = document.querySelector('.add-event-wrapper') as HTMLElement;
const addEventCloseBtn = document.querySelector('.close') as HTMLElement;
const addEventTitle = document.querySelector('.event-name') as HTMLInputElement;
const addEventFrom = document.querySelector('.event-time-from') as HTMLInputElement;
const addEventTo = document.querySelector('.event-time-to') as HTMLInputElement;
const addEventSubmit = document.querySelector('.add-event-btn') as HTMLElement;

interface Calendar {
    draw(option: Record<string, any>): void;
}

let today = new Date();
let activeDay: number;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
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
];

const eventsArr: {
    day: number;
    month: number;
    year: number;
    events: {
        title: string;
        time: string;
    }[];
}[] = [];

getEvents();
console.log(eventsArr);

//otions
function extendSource(source: any, defaults: any): any {
    let property: string;
    for (property in defaults) {
        if (source.hasOwnProperty(property) === false) {
            source[property] = defaults[property];
        }
    }
    return source;
}

//function to add month and year on prev and next button
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar(Option);
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar(Option);
}

prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);
//initCalendar();

//function to add active on day
function addListener() {
    const days = document.querySelectorAll('.day');
    days.forEach((day) => {
        day.addEventListener('click', (e) => {
            const target = (e.target || e.currentTarget) as HTMLElement;

            getActiveDay(Number(target.innerHTML));
            updateEvents(Number(target.innerHTML));
            activeDay = Number(target.innerHTML);

            // Удаление класса 'active' у всех элементов
            days.forEach((day) => {
                day.classList.remove('active');
            });

            // Если кликнутый элемент содержит класс 'prev-date' или 'next-date'
            if (target.classList.contains('prev-date')) {
                prevMonth();
                // Добавление класса 'active' после смены месяца
                setTimeout(() => {
                    days.forEach((day) => {
                        // Проверка, что day не является null
                        if (
                            day instanceof HTMLElement &&
                            !day.classList.contains('prev-date') &&
                            day.innerHTML === target.innerHTML
                        ) {
                            day.classList.add('active');
                        }
                    });
                }, 100);
            } else if (target.classList.contains('next-date')) {
                nextMonth();
                // Добавление класса 'active' после смены месяца
                setTimeout(() => {
                    days.forEach((day) => {
                        // Проверка, что day не является null
                        if (
                            day instanceof HTMLElement &&
                            !day.classList.contains('next-date') &&
                            day.innerHTML === target.innerHTML
                        ) {
                            day.classList.add('active');
                        }
                    });
                }, 100);
            } else {
                target.classList.add('active');
            }
        });
    });
}

todayBtn.addEventListener('click', () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar(Option);
});

dateInput.addEventListener('input', (e: Event) => {
    if (e instanceof InputEvent) {
        dateInput.value = dateInput.value.replace(/[^0-9/]/g, '');

        if (dateInput.value.length === 2) {
            dateInput.value += '/';
        }

        if (dateInput.value.length > 7) {
            dateInput.value = dateInput.value.slice(0, 7);
        }

        if (e.inputType === 'deleteContentBackward') {
            if (dateInput.value.length === 3) {
                dateInput.value = dateInput.value.slice(0, 2);
            }
        }
    }
});

gotoBtn.addEventListener('click', gotoDate);

function gotoDate() {
    console.log('here');
    const dateArr = dateInput.value.split('/');
    if (dateArr.length === 2) {
        const monthNumber = Number(dateArr[0]);
        const yearNumber = Number(dateArr[1]);
        if (
            !isNaN(monthNumber) &&
            monthNumber > 0 &&
            monthNumber < 13 &&
            !isNaN(yearNumber) &&
            dateArr[1].length === 4
        ) {
            month = monthNumber - 1;
            year = yearNumber;
            initCalendar(Option);
            return;
        }
    }
    alert('Invalid Date');
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date: number) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(' ')[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = `${date} ${months[month]} ${year}`;
}

//function update events when a day is active
function updateEvents(date: number) {
    let events = '';
    eventsArr.forEach((event) => {
        if (date === event.day && month + 1 === event.month && year === event.year) {
            event.events.forEach((event) => {
                events += `<div class="event">
                   <div class="title">
                       <i class="fas fa-circle"></i>
                       <h3 class="event-title">${event.title}</h3>
                   </div>
                   <div class="event-time">
                       <span class="event-time">${event.time}</span>
                   </div>
               </div>`;
            });
        }
    });
    if (events === '') {
        events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
    }
    eventsContainer.innerHTML = events;
    saveEvents();
}

//function to add event
addEventBtn.addEventListener('click', () => {
    addEventWrapper.classList.toggle('active');
});

addEventCloseBtn.addEventListener('click', () => {
    addEventWrapper.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target as Node)) {
        addEventWrapper.classList.remove('active');
    }
});

//allow 50 chars in eventtitle
addEventTitle.addEventListener('input', (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
});

//allow only time in eventtime from and to
addEventFrom.addEventListener('input', (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, '');
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ':';
    }
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

addEventTo.addEventListener('input', (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, '');
    if (addEventTo.value.length === 2) {
        addEventTo.value += ':';
    }
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

//function to add event to eventsArr
addEventSubmit.addEventListener('click', () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;
    if (eventTitle === '' || eventTimeFrom === '' || eventTimeTo === '') {
        alert('Please fill all the fields');
        return;
    }
    //check correct time format 24 hour
    const timeFromArr = eventTimeFrom.split(':');
    const timeToArr = eventTimeTo.split(':');
    if (
        timeFromArr.length !== 2 ||
        timeToArr.length !== 2 ||
        Number(timeFromArr[0]) > 23 ||
        Number(timeFromArr[1]) > 59 ||
        Number(timeToArr[0]) > 23 ||
        Number(timeToArr[1]) > 59
    ) {
        alert('Invalid Time Format');
        return;
    }
    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);
    //check if event is already added
    let eventExist = false;
    eventsArr.forEach((event) => {
        if (event.day === activeDay && event.month === month + 1 && event.year === year) {
            event.events.forEach((event) => {
                if (event.title === eventTitle) {
                    eventExist = true;
                }
            });
        }
    });
    if (eventExist) {
        alert('Event already added');
        return;
    }
    const newEvent = {
        title: eventTitle,
        time: `${timeFrom} - ${timeTo}`,
    };
    console.log(newEvent);
    console.log(activeDay);
    let eventAdded = false;
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }
    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }
    console.log(eventsArr);
    addEventWrapper.classList.remove('active');
    addEventTitle.value = '';
    addEventFrom.value = '';
    addEventTo.value = '';
    updateEvents(activeDay);
    //select active day and add event class if not added
    const activeDayEl = document.querySelector('.day.active') as HTMLElement;
    if (!activeDayEl.classList.contains('event')) {
        activeDayEl.classList.add('event');
    }
});

//function to delete event when clicked on event
eventsContainer.addEventListener('click', (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;

    if (targetElement && targetElement.classList.contains('event')) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this event?')) {
            const eventTitle = targetElement.children[0].children[1].innerHTML;
            eventsArr.forEach((event) => {
                if (
                    event.day === activeDay &&
                    event.month === month + 1 &&
                    event.year === year
                ) {
                    event.events.forEach((item, index) => {
                        if (item.title === eventTitle) {
                            event.events.splice(index, 1);
                        }
                    });
                    //if no events left in a day then remove that day from eventsArr
                    if (event.events.length === 0) {
                        eventsArr.splice(eventsArr.indexOf(event), 1);
                        //remove event class from day
                        const activeDayEl = document.querySelector(
                            '.day.active'
                        ) as HTMLElement;
                        if (activeDayEl.classList.contains('event')) {
                            activeDayEl.classList.remove('event');
                        }
                    }
                }
            });
            updateEvents(activeDay);
        }
    }
});

//function to save events in local storage
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
    //check if events are already saved in local storage then return event else nothing
    if (localStorage.getItem('events') === null) {
        return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem('events') as string));
}

function convertTime(time: string) {
    // convert time to 24-hour format
    let timeArr = time.split(':');
    let timeHour = Number(timeArr[0]);
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? 'PM' : 'AM';
    timeHour = timeHour % 12 || 12;
    time = `${timeHour}:${timeMin} ${timeFormat}`;
    return time;
}

//function to add days in days with class day and prev-date next-date
// on previous month and next month days and active on today
function initCalendar(option: Record<string, any>): void {
    const firstDay = new Date(year, month, 0);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;
    date.innerHTML = `${months[month]} ${year}`;
    let days = '';
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }
    for (let i = 1; i <= lastDate; i++) {
        //check if event is present on that day
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                event = true;
            }
        });
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);
            if (event) {
                days += `<div class="day today active event">${i}</div>`;
            } else {
                days += `<div class="day today active">${i}</div>`;
            }
        } else {
            if (event) {
                days += `<div class="day event">${i}</div>`;
            } else {
                days += `<div class="day ">${i}</div>`;
            }
        }
    }
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListener();
}

(dyncal as any).draw = function (option: Record<string, any>): boolean {
    if (option === undefined) {
        console.error('Option missing');
        return false;
    }

    const defaults = {
        start: 0,
    } as const;

    // extend user options with predefined options
    option = extendSource(option, defaults);
    const result = initCalendar(option);

    // assuming drawCalendar returns a boolean, update as needed
    return result === undefined ? false : result;
};

export const drawCalendar = (dyncal as any).draw;
