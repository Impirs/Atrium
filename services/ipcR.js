const Store = require("electron-store");
const store = new Store();

// ================================ GLOBAL ================================= //

const checkButton = () => {
    const answer = "It works";
    return answer;
};

const openWin = () => {
    return;
};

// =============================== CALENDAR ================================ //

// ================================ EVENTS ================================= //

const getEvents = () => {
    return store.get("events") || [];
};

const getGroups = () => {
    return store.get("groups") || [];
};

const createEvent = (day, month, year, title, group) => {
    const events = getEvents();
    const groups = getGroups();

    // Объединяем день, месяц и год в одну дату
    const date = `${year}-${month}-${day}`;

    // Добавляем новую группу, если ее еще нет
    if (!groups.includes(group)) {
        groups.push(group);
        store.set("groups", groups);
    }

    const newEvent = { date, title, group };
    events.push(newEvent);
    store.set("events", events);
    return newEvent;
};

const deleteEvent = (day, month, year, title, group) => {
    const events = getEvents();
    const date = `${year}-${month}-${day}`;

    const updatedEvents = events.filter(
        (event) =>
            !(
                event.date === date &&
                event.title === title &&
                event.group === group
            )
    );
    store.set("events", updatedEvents);
};

const deleteEventsByDate = (day, month, year) => {
    const events = getEvents();
    const date = `${year}-${month}-${day}`;

    const updatedEvents = events.filter((event) => event.date !== date);
    store.set("events", updatedEvents);
};

const deleteEventsByGroup = (group) => {
    const events = getEvents();
    const updatedEvents = events.filter((event) => event.group !== group);
    store.set("events", updatedEvents);
};

const getEventsByGroup = (group) => {
    const events = getEvents();
    return events.filter((event) => event.group === group);
};

const getEventsByDate = (day, month, year) => {
    const events = getEvents();
    const date = `${year}-${month}-${day}`;

    return events.filter((event) => event.date === date);
};

const getAllGroups = () => {
    return getGroups();
};

module.exports = {
    // checkButton,
    getEvents,
    getGroups,
    createEvent,
    deleteEvent,
    deleteEventsByDate,
    deleteEventsByGroup,
    getAllGroups,
    getEventsByDate,
    getEventsByGroup,
};

/* Пример использования:
createEvent(29, 11, 2023, "Пример события", "Группа событий A");
deleteEvent(29, 11, 2023, "Пример события", "Группа событий A");
deleteEventsByDate(29, 11, 2023);
deleteEventsByGroup("Группа событий A");
const eventsByGroup = getEventsByGroup("Группа событий A");
const eventsByDate = getEventsByDate(29, 11, 2023);
const allGroups = getAllGroups();
console.log("Events by group:", eventsByGroup);
console.log("Events by date:", eventsByDate);
console.log("All groups:", allGroups);

*/
