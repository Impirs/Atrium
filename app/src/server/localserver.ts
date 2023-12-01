import Store from 'electron-store';

const EVENTS_FILE_PATH = '../config/events.json';

interface Event {
    date: number;
    month: number;
    year: number;
    title: string;
    group: string;
}

export class EventManager {
    private events: Event[] = [];
    private store: Store<Event[]> = new Store();

    private EVENTS_STORE_KEY = 'events';

    private async saveEvents() {
        try {
            await this.store.set(this.EVENTS_STORE_KEY, this.events);
        } catch (error) {
            console.error('Failed to save events:', error);
        }
    }

    private async loadEvents() {
        try {
            const storedEvents = await this.store.get(this.EVENTS_STORE_KEY);
            if (storedEvents && Array.isArray(storedEvents)) {
                this.events = storedEvents;
            }
        } catch (error) {
            console.error('Failed to load events:', error);
            this.events = [];
        }
    }

    createEvent(date: number, month: number, year: number, title: string, group: string) {
        const newEvent: Event = { date, month, year, title, group };
        this.events.push(newEvent);
        this.saveEvents();
    }

    deleteEvent(date: number, month: number, year: number, title: string, group: string) {
        this.events = this.events.filter(
            (event) =>
                !(
                    event.date === date &&
                    event.month === month &&
                    event.year === year &&
                    event.title === title &&
                    event.group === group
                )
        );
        this.saveEvents();
    }

    deleteEventsByDate(date: number, month: number, year: number) {
        this.events = this.events.filter(
            (event) => event.date !== date && event.month !== month && event.year !== year
        );
        this.saveEvents();
    }

    deleteEventsByGroup(group: string) {
        this.events = this.events.filter((event) => event.group !== group);
        this.saveEvents();
    }

    getEventsByGroup(group: string) {
        return this.events.filter((event) => event.group === group);
    }

    getEventsByDate(date: number, month: number, year: number) {
        return this.events.filter(
            (event) => event.date === date && event.month === month && event.year === year
        );
    }
}

/* Example usage:
const eventManager = new EventManager();

// Create a new event
eventManager.createEvent(29, 11, 2023, 'Example', 'Group A');

// Delete an event
eventManager.deleteEvent(29, 11, 2023, 'Example', 'Group A');

// Delete events by date
eventManager.deleteEventsByDate(29, 11, 2023);

// Delete events by group
eventManager.deleteEventsByGroup('Group A');

// Get events by group
const eventsByGroup = eventManager.getEventsByGroup('Group A');
console.log('Events by group:', eventsByGroup);

// Get events by date
const eventsByDate = eventManager.getEventsByDate(29, 11, 2023);
console.log('Events by date:', eventsByDate);

*/
