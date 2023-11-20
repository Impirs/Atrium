# Atrium

_An application for tracking your daily and long-term tasks._

## Content

-   Tech information
    -   Calendar
    -   Events
    -   Database
    -   UI
-   User information
    -   Account
    -   Structure
    -   Shortcuts

## Tech information

### Calendar

Technically, most important part you use to print the calendar on the screen is function **.draw()**. Then you call it from the

```markdown
this function will draw the calendar based on user preferences. \*
_ option = {
_ target : "#id|.class" //(mandatory) for id use #id | for class use .class
_ type : "calendar-type" //(optional) values: "day|month" (default "day")
_ month : "integer" //(optional) value 0-11, where 0 = January, 11 = December
_ year : "integer" //(optional) example 1990. (default current year)
_ date : "integer" //(optional) example 1-31. (default current date)
_ monthformat : "full" //(optional) values: "mmm|full" (default "full")
_ dayformat : "full" //(optional) values: "ddd|full" (default "full")
_ highlighttoday : boolean //(optional) (default false) if true will highlight
_ today's date
_ highlighttargetdate : boolean //(optional) (default false) if true will highlight
_ targeted date of the month year
_ prevnextbutton : "hide" //(optional) (default "hide") (values: "show|hide")
_ if set to "show" it will show the nav button (prev|next)
_ }
_
_ @param object option user preferences
_ @return boolean true if success, false otherwise
```
