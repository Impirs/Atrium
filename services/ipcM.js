const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const eventManager = require("./ipcR");

// ================================ GLOBAL ================================= //

ipcMain.on("check-button", (event) => {
    const answer = eventManager.checkButton();
    event.reply("check-button-reply", answer);
});

ipcMain.on("send-data-to-main", (event, { htmlElement, cssFile }) => {
    // Здесь вы можете создать окно или что-то еще с полученными данными
    const floatingWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    floatingWindow.loadFile("path/to/your/floating-window.html"); // Замените путем к вашему файлу

    // Передайте данные в окно
    floatingWindow.webContents.on("did-finish-load", () => {
        floatingWindow.webContents.send("create-floating-window", {
            htmlElement,
            cssFile,
        });
    });

    // Пример закрытия окна и ответа на запрос от ipcRenderer
    floatingWindow.on("closed", () => {
        event.reply(
            "create-floating-window-reply",
            "Window created successfully"
        );
    });
});

// =============================== CALENDAR ================================ //

ipcMain.on("new-date-active", (event, { date, month, year }) => {
    const newDate = { date, month, year };
    event.reply("new-date-active-reply", newDate);
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

ipcMain.on("get-events-by-date", (event, { selDate, selMonth, selYear }) => {
    const eventsByDate = eventManager.getEventsByDate(
        selDate,
        selMonth,
        selYear
    );
    event.reply("get-events-by-date-reply", eventsByDate);
});

ipcMain.on("get-events-by-group", (event, { groupName }) => {
    const eventsByGroup = eventManager.getEventsByDate(groupName);
    event.reply("get-events-by-group-reply", eventsByGroup);
});

ipcMain.on(
    "create-event",
    (event, { selDate, selMonth, selYear, eventName, groupName }) => {
        const newEvent = eventManager.createEvent(
            selDate,
            selMonth,
            selYear,
            eventName,
            groupName
        );
        event.reply("create-event-reply", newEvent);
    }
);

ipcMain.on(
    "delete-event",
    (event, { selDate, selMonth, selYear, eventName, groupName }) => {
        eventManager.deleteEvent(
            selDate,
            selMonth,
            selYear,
            eventName,
            groupName
        );
        event.reply("delete-event-reply", "Event deleted successfully");
    }
);

ipcMain.on("delete-events-by-date", (event, { selDate, selMonth, selYear }) => {
    eventManager.deleteEventsByDate(selDate, selMonth, selYear);
    event.reply("delete-events-by-date-reply", "Events deleted successfully");
});

ipcMain.on("delete-events-by-group", (event, { group }) => {
    eventManager.deleteEventsByGroup(group);
    event.reply("delete-events-by-group-reply", "Events deleted successfully");
});
