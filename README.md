# Atrium

_An application for tracking your daily and long-term tasks._

## Content

- Tech information
  - Information keeping
  - Calendar
  - Events
  - Database
  - UI
- User information
  - Account
  - Structure
  - Shortcuts

## Tech information

### Information keeping

**JSON file structure:**

```markdown
{
    "user_info": {
        "name": "admin",
        "mail": "@gmail.com",
        "password": "QWerty1234",
        "created_at": "08:33 27.11.23",
        "status": 1,
        "auto": 0
    },
    "user_events": {
        "My birthday": {
            "day": 17, // 0.1 => every monday and so on
            "month": 8, // 1 => every month
            "year": 1, // 1 => every year
            "show_from": 0, // 0 => chosen day
            "show_untill": 0, // 1 => infinity, 0 => once
            "time_hours": 24,
            "time_minutes": 0,
            "disc": "This is my birthday"
        }
    },
    "user_widgets": {
        "1": {
            "contains": "calendar",
            "size": "two-two"
        },
        "2": {
            "contains": "budget",
            "size": "one-two"
        },
        "3": {
            "contains": "image",
            "size": "two-one"
        }
    }
}
```

### Calendar

Let's have a look on functions and their options in the calendar part.
At this moment this module has 2 files in work, 1 in development and non connected data storage and manager.
So, first thing we need to observe: is the "calendar's brain" - calendar_lib.ts:

```typescript

@param object data   this contains the calendar data
@param object option this is the settings object
@return html

function createMonthTable(data: any, option: any): HTMLTableElement
```

```typescript

@param object data   this contains the calendar data
@param object option this is the settings object
@return html

function drawCalendarMonthTable(data: any, option: any): HTMLDivElement {}
```

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

```typescript

@param integer year                 //1111-9999 (optional) if not set will consider
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
