const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const eventManager = require("./f_Events");

// ================================ GLOBAL ================================= //
// =============================== CALENDAR ================================ //

ipcMain.on("update-active-date", (event, { date, month, year }) => {
    const newDate = { date, month, year };
    event.reply("new-active-date-reply", newDate);
});

ipcMain.on("default-date-active", (event) => {
    const today = new Date();
    const defaultDate = {
        date: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
    };
    event.reply("default-date-active-reply", defaultDate);
});

// ================================ EVENTS ================================= //

ipcMain.on(
    "create-event",
    (event, { date, month, year, eventTitle, eventGroup }) => {
        const result = eventManager.createEvent(
            date,
            month,
            year,
            eventTitle,
            eventGroup
        );
        if (result === "done") event.reply("create-event-reply", result);
        else event.reply("create-event-reply", "error");
    }
);

ipcMain.on("set-ready-event", (event, { date, month, year, title }) => {
    eventManager.setReadyEvent(date, month, year, title);
});

ipcMain.on("delete-event", (event, { date, month, year, title }) => {
    eventManager.deleteEvent(date, month, year, title);
    event.reply("delete-event-reply", "Event was deleted successfuly"); // Отправляем сообщение об успешном выполнении
});

ipcMain.on("delete-events-by-date", async (event, { day, month, year }) => {
    await fileManager.deleteEventsByDate(day, month, year);
    event.reply("delete-events-by-date-reply", "success"); // Отправляем сообщение об успешном выполнении
});

ipcMain.on("delete-events-by-group", async (event, group) => {
    await fileManager.deleteEventsByGroup(group);
    event.reply("delete-events-by-group-reply", "success"); // Отправляем сообщение об успешном выполнении
});

ipcMain.handle("get-events-by-group", async (event, group) => {
    return await fileManager.getEventsByGroup(group);
});

ipcMain.on("get-events-by-date", (event, { date, month, year }) => {
    const eventsByDate = eventManager.getEventsByDate(date, month, year);
    // console.log(eventsByDate);
    event.reply("get-events-by-date-reply", eventsByDate);
});

ipcMain.on("get-events-count-by-date", (event, { date, month, year }) => {
    // console.log("Check number of events for: ", day, month, year);
    const result = eventManager.getEventsCountByDate(date, month, year);
    event.reply("get-events-count-by-date-reply", result);
});

ipcMain.handle("get-all-groups", async (event) => {
    return await fileManager.getAllGroups();
});

// =============================== SETTINGS ================================ //

ipcMain.on("set-theme-mode", (event, mode) => {
    event.reply("set-theme-mode-reply", mode);
});

