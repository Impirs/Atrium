import { title } from 'process';

const document = global.document;
const ipcRenderer = (window as any).ipcRenderer;

// ================================== HTML =================================== //
function createPoint(
    date: string,
    month: string,
    year: string,
    title: string
): HTMLDivElement {
    let container: HTMLDivElement;

    container = document.createElement('div');
    container.id = 'event-ready-marker';
    container.setAttribute('data-date', date);
    container.setAttribute('data-month', month);
    container.setAttribute('data-year', year);
    container.setAttribute('data-title', title);

    return container;
}

function createDeleteButton(
    date: string,
    month: string,
    year: string,
    title: string
): HTMLDivElement {
    let container: HTMLDivElement;

    container = document.createElement('div');
    container.id = 'delete-event-button';
    container.setAttribute('data-date', date);
    container.setAttribute('data-month', month);
    container.setAttribute('data-year', year);
    container.setAttribute('data-title', title);
    container.innerHTML = 'x';
    // const closeIMG = document.createElement("img");
    // closeIMG.src = "../icons/close.svg";
    // closeIMG.setAttribute("class", "deleteEvent");
    /// container.appendChild(closeIMG);

    return container;
}

function createAdder(date: string, month: string, year: string) {
    let container: HTMLDivElement,
        line: HTMLDivElement,
        box: HTMLDivElement,
        span: HTMLSpanElement,
        input: HTMLInputElement;

    container = document.createElement('div');
    container.setAttribute('class', 'add-event-wrapper');

    box = document.createElement('div');
    box.setAttribute('class', 'wrapper-header');
    span = document.createElement('span');
    span.setAttribute('class', 'wrapper-header-title');
    span.innerHTML = 'Create new event';
    box.appendChild(span);
    container.appendChild(box);

    box = document.createElement('div');
    box.setAttribute('class', 'wrapper-body');
    // Title
    line = document.createElement('div');
    line.setAttribute('class', 'add-event-input');
    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Title');
    input.setAttribute('class', 'event-title-input');
    line.appendChild(input);
    box.appendChild(line);
    // Group
    line = document.createElement('div');
    line.setAttribute('class', 'add-event-input');
    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Group');
    input.setAttribute('class', 'event-group-input');
    line.appendChild(input);
    box.appendChild(line);
    container.appendChild(box);

    span = document.createElement('span');
    span.setAttribute('class', 'create-event-button');
    span.setAttribute('data-date', date);
    span.setAttribute('data-month', month);
    span.setAttribute('data-year', year);
    span.innerHTML = 'Create';
    container.appendChild(span);
    return container;
}

function createEventContainer(data: any): HTMLDivElement {
    let container: HTMLDivElement,
        delbut: HTMLDivElement,
        point: HTMLDivElement,
        tools: HTMLDivElement,
        info: HTMLDivElement,
        box: HTMLDivElement,
        list: HTMLUListElement,
        li: HTMLLIElement,
        span: HTMLSpanElement,
        i: number,
        eventsByDate = data.events,
        count = data.count,
        date = data.date,
        month = data.month,
        year = data.year;

    container = document.createElement('div');
    container.setAttribute('class', 'events-manager');

    box = document.createElement('div');
    box.setAttribute('class', 'event-list-container');
    // creating event list
    list = document.createElement('ul');
    list.setAttribute('class', 'event-list');
    for (i = 0; i < count; i++) {
        li = document.createElement('li');
        li.setAttribute('class', 'event');
        // event title
        span = document.createElement('span');
        span.setAttribute('class', 'event-title');
        span.innerHTML = eventsByDate[i].title;
        li.appendChild(span);
        // group field
        info = document.createElement('div');
        info.setAttribute('class', 'group-field');
        info.setAttribute('data-group', eventsByDate[i].group);
        span = document.createElement('span');
        span.setAttribute('class', 'group-field-inner');
        span.innerHTML = eventsByDate[i].group;
        info.appendChild(span);
        li.appendChild(info);
        // readyness marker and delete event button
        tools = document.createElement('div');
        tools.setAttribute('class', 'event-toolbox');
        point = createPoint(date, month, year, eventsByDate[i].title);
        if (eventsByDate[i].ready === false) point.classList.add('non-ready');
        tools.appendChild(point);
        delbut = createDeleteButton(date, month, year, eventsByDate[i].title);
        tools.appendChild(delbut);
        li.appendChild(tools);

        list.appendChild(li);
    }
    box.appendChild(list);
    container.appendChild(box);
    // create event wrapper
    box = createAdder(date, month, year);
    container.appendChild(box);
    // number of events for today and ADD button
    box = document.createElement('div');
    box.setAttribute('class', 'event-tools');
    //number of events scoreboard
    span = document.createElement('span');
    span.setAttribute('class', 'scoreboard');
    // console.log(count);
    if (count === 0) {
        span.innerHTML = 'No events for today';
    } else span.textContent = `${count} events for today`;
    box.appendChild(span);
    // add button
    span = document.createElement('span');
    span.setAttribute('class', 'add-event-button');
    span.innerHTML = 'Add';
    box.appendChild(span);

    container.appendChild(box);
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

function handleReply(event: any, reply: string) {
    console.log('Reply: %s', reply);
}
// ================================== SHOW =================================== //
function revealEventList(options: any) {
    let eventslistHTML: any,
        targetedElementBy = 'id',
        targetElem: string;
    //find target element by
    if (options.target[0] === '#') {
        targetedElementBy = 'id';
    } else if (options.target[0] === '.') {
        targetedElementBy = 'class';
    }
    targetElem = options.target.substring(1);
    //get events list HTML
    if (options.type === 'list') {
        eventslistHTML = createEventContainer(options);
    } else {
        global.console.error('Invalid type');
        return false;
    }

    if (targetedElementBy === 'id') {
        const targetElement = document.getElementById(targetElem);
        if (targetElement) {
            removeAllChildren(targetElement);
            targetElement.appendChild(eventslistHTML.cloneNode(true));
        }
    } else if (targetedElementBy === 'class') {
        const elements = document.querySelectorAll(`.${targetElem}`);
        elements.forEach((element: Element) => {
            removeAllChildren(element as HTMLElement);
            (element as HTMLElement).appendChild(
                eventslistHTML.cloneNode(true) as HTMLElement
            );
        });
    }

    // function for deleting all children elements
    function removeAllChildren(element: HTMLElement) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}
// ================================= CLICKS ================================== //
function onClick() {
    document.addEventListener('click', function (e: MouseEvent | any) {
        e = e || window.event;
        let targetDomObject = e.target || e.srcElement;
        let date, month, year, title;

        // set event ready
        if (
            targetDomObject &&
            targetDomObject.id &&
            targetDomObject.id === 'event-ready-marker'
        ) {
            date = parseInt(targetDomObject.getAttribute('data-date') || '0', 10);
            month = parseInt(targetDomObject.getAttribute('data-month') || '0', 10);
            year = parseInt(targetDomObject.getAttribute('data-year') || '0', 10);
            title = targetDomObject.getAttribute('data-title') || 'none';
            if (targetDomObject.classList.contains('non-ready')) {
                targetDomObject.classList.remove('non-ready');
            } else {
                targetDomObject.classList.add('non-ready');
            }
            // console.log(date, month, year, title);
            ipcRenderer.send('set-ready-event', { date, month, year, title });
            ipcRenderer.send('update-active-date', {
                date,
                month,
                year,
            });
        }
        // add event button
        if (
            targetDomObject &&
            targetDomObject.classList &&
            targetDomObject.classList.contains('add-event-button')
        ) {
            const target = document.querySelector('.add-event-wrapper');

            if (target) {
                if (target.classList.contains('active')) {
                    target.classList.remove('active');
                } else {
                    target.classList.toggle('active');
                }
            }
        }
        // create event button
        if (
            targetDomObject &&
            targetDomObject.classList &&
            targetDomObject.classList.contains('create-event-button')
        ) {
            // Get Title
            const eventTitleInput: HTMLInputElement | null =
                document.querySelector('.event-title-input');
            // get new event title info
            let eventTitle: string | undefined;
            if (eventTitleInput) {
                // console.log("'.event-title-input' defind");
                eventTitle = eventTitleInput.value.trim();
                if (eventTitle === '') {
                    eventTitleInput.placeholder = 'Please enter a title';
                    eventTitleInput.classList.add('error');
                    // console.log("ERROR can not save an event without a title!");
                } else {
                    if (eventTitleInput.classList.contains('error'))
                        eventTitleInput.classList.remove('error');
                    console.log('input contains: %s', eventTitle);
                }
            } else {
                console.log("'.event-title-input' undefind");
            }

            // Get Group
            const eventGroupInput: HTMLInputElement | null =
                document.querySelector('.event-group-input');
            let eventGroup: string | undefined;
            if (eventGroupInput) {
                // console.log("'.event-group-input' defind");
                eventGroup = eventGroupInput.value.trim() || 'No group';
                console.log('input contains: %s', eventGroup);
            } else {
                console.log("'.event-group-input' undefind");
            }
            // Get date
            date = parseInt(targetDomObject.getAttribute('data-date') || '0', 10);
            month = parseInt(targetDomObject.getAttribute('data-month') || '0', 10);
            year = parseInt(targetDomObject.getAttribute('data-year') || '0', 10);

            // Send new event data
            if (!eventTitleInput?.classList.contains('error')) {
                ipcRenderer.send('create-event', {
                    date,
                    month,
                    year,
                    eventTitle,
                    eventGroup,
                });
                ipcRenderer.once('create-event-reply', handleReply);
                const target = document.querySelector('.add-event-wrapper');
                if (target) target.classList.remove('active');
                ipcRenderer.send('update-active-date', {
                    date,
                    month,
                    year,
                });
            } else {
                console.log("Event wasn't created");
            }
        }
        // delete event button
        if (
            targetDomObject &&
            targetDomObject.id &&
            targetDomObject.id === 'delete-event-button'
        ) {
            date = parseInt(targetDomObject.getAttribute('data-date') || '0', 10);
            month = parseInt(targetDomObject.getAttribute('data-month') || '0', 10);
            year = parseInt(targetDomObject.getAttribute('data-year') || '0', 10);
            title = targetDomObject.getAttribute('data-title') || 'none';
            if (targetDomObject.classList.contains('non-ready')) {
                targetDomObject.classList.remove('non-ready');
            } else {
                targetDomObject.classList.add('non-ready');
            }
            console.log(date, month, year, title);
            ipcRenderer.send('delete-event', { date, month, year, title });
            ipcRenderer.once('delete-event-reply', handleReply);
            ipcRenderer.send('update-active-date', {
                date,
                month,
                year,
            });
        }
    });
}
// ================================= EXPORT ================================== //
onClick();

export const reveal = function (options: Record<string, any>): boolean {
    if (options === undefined) {
        console.error('Option missing');
        return false;
    }

    const dateObj = new Date();
    const number = 0;
    const defaults = {
        type: 'list',
        month: dateObj.getMonth(),
        year: dateObj.getFullYear(),
        date: dateObj.getDate(),
        events: [],
        count: number,
        showDoneBut: 'false',
    } as const;

    options = extendSource(options, defaults);
    const result = revealEventList(options);

    return result === undefined ? false : result;
};
