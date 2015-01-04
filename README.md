Simon Buechis Open Data Experiments
===================================

Part I - Time Tracking
-----------------------
**Idea** 

Time reporting as easy as possible using Google Calendar, tracking and visualization according to your needs.

* Report your time by adding a item to a Google Calendar. That is the only manual task necessary.
* Automated tracking in Google Spreadsheet
* Query your data to your preferred application (e.g. visualizations in D3 or Google Charts)

**How to setup** 

1. Create a new (empty) calendar in Google Calendar that will be used fo time tracking (e.g. named "TimeTracking")
2. Create Google Spreadsheet
3. Add Google Script to spreadsheet.
4. Add trigger to script, to run daily during the night (e.g. "2.00-3.00am")
5. Start tracking your time to your calendar.

**Default format**
All calendar items must be in this format: [free text, can be empty] [#tag1] [#tag2] [#tag3]. Personally I use [#tag1] for a general category, [#tag2] for the project and [#tag3] to identify the activity.

Examples:
* "Meeting with Max #business #companyXYZ #meeting"
* "#leisure #sport #workout"
* "book review on my blog #private #blog #write"

**Source material** 

* google-calendar-tracking: code.gs
* Google Spreadsheet template for time tracking (tbd)
* Google Spreadsheet template for visualization (tbd)

Part II - Writing
-----------------
tbd
