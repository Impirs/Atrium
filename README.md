# Atrium

_An application for tracking your daily and long-term tasks._

## Content

- Tech information
  - Information keeping
  - Calendar
    - calendar.ts
    - events.ts
    - Calendar.tsx
  - Task list
  - UI
- User information
  - Account
  - Structure
  - Shortcuts

## Tech information

### Information keeping

**JSON Store file structure:**

For today the structure of the storage looks like this. Time and auto repeat of the chosen events, like classess, work meeting, birthdays idt.

```markdown
{
    "groups": {
        "No group",
        "Post"
    }
    "events": {
        "First version": {
            "day": 19,
            "month": 0,
            "year": 2024, 
            "group": "Post",
            "ready": true,
        }
    },
}
```

### Calendar

Let's have a look on functions and their options in the calendar part.
At this moment this module has 3 main files in work:

- calendar.ts
- events.ts
- Calendar.tsx

#### Calendar rendering: calendar.ts

Function for creating the month table:
_Basicaly it renders Monday-Sunday days row, but user can change it in settings._

```typescript
@param object data   this contains the calendar data
@param object option this is the settings object
@return html

function createMonthTable(data: any, option: any): HTMLTableElement {}

@param object data   this contains the calendar data
@param object option this is the settings object
@return html

function drawCalendarMonthTable(data: any, option: any): HTMLDivElement {}
```

Function for creating the chosen day and it's info.

```typescript
@param object data   this contains the calendar data
@param object option this is the settings object
@return html

function drawCalendarDay(data: any, option: any): HTMLDivElement {}
```

```typescript
@param object source     this is the source object
@param object defaults   this is the default object
@return object

function extendSource(source: any, defaults: any): any {}
```

Function to get all info we need about a year of a date:

```typescript
@param integer year                 //(optional) if not set will consider
                                    //the current year.
@param integer month                //0-11 (optional) 0 = Jan, 1 = Feb, ... 11 = Dec,
                                    //if not set will consider the current month.
@param integer date                 //1-31 (optional)
@return boolean|object              //if error return false, else calendar detail

function getCalendar(year?: number, month?: number, date?: number): any {}
```

```typescript
option = {
    target : "#id|.class"           //(mandatory) for id use #id | for class use .class
    type : "calendar-type"          //(optional) values: "day|month" (default "day")
    month : "integer"               //(optional) value 0-11, where 0 = January, 11 = December
    year : "integer"                //(optional) example 1990. (default current year)
    date : "integer"                //(optional) example 1-31. (default current date)
    monthformat : "full"            //(optional) values: "mmm|full" (default "full")
    dayformat : "full"              //(optional) values: "ddd|full" (default "full")
    highlighttoday : boolean        //(optional) (default false) if true will highlight
                                    //today's date
    highlighttargetdate : boolean   //(optional) (default false) if true will highlight
                                    //targeted date of the month year
    prevnextbutton : "hide"         //(optional) (default "hide") (values: "show|hide")
                                    //if set to "show" it will show the nav button (prev|next)
    activeState : boolean           //(optional) (default false) if true dates will have an
                                    //"active" state to have an opportunity to choose and show
                                    //digital information in day calendar
}
@param object option             user preferences
@return boolean                  true if success, false otherwise

export const draw = function (option: Record<string, any>): boolean{}
```

### Events system: events.ts

```typescript
@param string date                  //(mandatory) value 1-31 (default current date)
@param string month                 //(mandatory) value 0-11 (default current month)
@param string year                  //(mandatory) (default current year)

function createAdder(date: string, month: string, year: string) {}
```

```typescript
@param object data                  //this contains the events data for the current

function createEventContainer(data: any): HTMLDivElement {}
```
