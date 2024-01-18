const Store = require("electron-store");
const store = new Store();

const getEvents = () => {
    return store.get("events") || [];
};

const getGroups = () => {
    return store.get("groups") || [];
};

const setReadyEvent = (date, month, year, title) => {
    const events = getEvents();
    const selDate = `${year}-${month}-${date}`;
    // console.log(selDate, title);
    for (let i = 0; i < events.length; i++) {
        if (events[i].date === selDate && events[i].title === title) {
            // console.log(events[i].ready);
            events[i].ready = !events[i].ready;
            // console.log(events[i].ready);
            break;
        }
    }

    store.set("events", events);
};

const createEvent = (day, month, year, title, group) => {
    const events = getEvents();
    const groups = getGroups();
    // console.log("%d, %d, %d, %s, %s", day, month, year, title, group);
    const date = `${year}-${month}-${day}`;

    const existingEvent = events.find(
        (event) =>
            event.date === date &&
            event.title === title &&
            event.group === group
    );
    if (existingEvent) {
        return "done"; // make another reply
    }
    if (!groups.includes(group)) {
        groups.push(group);
        store.set("groups", groups);
    }

    const ready = false;
    const newEvent = { date, title, group, ready };

    events.push(newEvent);
    store.set("events", events);
    return "done";
};

const deleteEvent = (date, month, year, title) => {
    const events = getEvents();
    const groups = getGroups();
    const selDate = `${year}-${month}-${date}`;
    console.log(selDate, title);
    const updatedEvents = events.filter((event) => {
        return !(event.date === selDate && event.title === title);
    });

    const groupOfDeletedEvent = events.find(
        (event) => event.date === selDate && event.title === title
    )?.group;

    store.set("events", updatedEvents);

    const eventsInGroup = updatedEvents.filter(
        (event) => event.group === groupOfDeletedEvent
    );

    if (eventsInGroup.length === 0 && groupOfDeletedEvent) {
        const updatedGroups = groups.filter(
            (group) => group !== groupOfDeletedEvent
        );
        store.set("groups", updatedGroups);
    }
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

const getEventsByDate = (date, month, year) => {
    const events = getEvents();
    const selDate = `${year}-${month}-${date}`;

    return events.filter((event) => event.date === selDate);
};

const getEventsCountByDate = (date, month, year) => {
    try {
        const events = getEvents();
        const data = `${year}-${month}-${date}`;

        const eventsCount = events.reduce((count, event) => {
            return event.date === data ? count + 1 : count;
        }, 0);
        // console.log(eventsCount);
        return eventsCount;
    } catch (error) {
        console.error("Error fetching events number:", error);
        throw error;
    }
};

const getAllGroups = () => {
    return getGroups();
};

module.exports = {
    // checkButton,
    getEvents,
    getGroups,
    setReadyEvent,
    createEvent,
    deleteEvent,
    deleteEventsByDate,
    deleteEventsByGroup,
    getAllGroups,
    getEventsByDate,
    getEventsByGroup,
    getEventsCountByDate,
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
