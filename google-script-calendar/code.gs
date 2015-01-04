var mycal = "TimeTracking"; // Name of your Calendar to be tracked
var sheetData = "TimeTracking"; // Name of the spreadsheet sheet where data is stored
var sheetSetting = "Mgt";

function export_gcal_load(){
  
  var cal = CalendarApp.getCalendarsByName(mycal);
  
  var startDate = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetSetting).getRange("B11").getValue();
  var endDate = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetSetting).getRange("B12").getValue();
  
  var events = cal[0].getEvents(startDate, endDate);
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetData); 
  var lastRow = sheet.getLastRow() + 1;
  
  // Loop through all calendar events found and write them out starting on calulated ROW 2 (i+2)
  for (var i=0;i<events.length;i++) {
    var row = i + lastRow;
    var myformula_placeholder = '';
    // Matching the "header=" entry above, this is the detailed row entry "details=", and must match the number of entries of the GetRange entry below
    // NOTE: I've had problems with the getVisibility for some older events not having a value, so I've had do add in some NULL text to make sure it does not error
    var details=[[events[i].getId(),
                  events[i].getTitle(),  
                  events[i].getStartTime(), 
                  events[i].getEndTime(), 
                  events[i].getDateCreated(), 
                  events[i].getLastUpdated(),
                  events[i].getCreators(), 
                  events[i].isAllDayEvent(), 
                  events[i].isRecurringEvent()]];
    var range=sheet.getRange(row,1,1,9);
    range.setValues(details);
  }
}

// Create a header record on the current spreadsheet in cells A1:..1 - Match the number of entries in the "header=" to the last parameter
function export_gcal_reset(){

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetData); 
  sheet.clear();
  
  var header = [["ID",
                 "Event Title", 
                 "Event Start", 
                 "Event End",  
                 "Date Created", 
                 "Last Updated", 
                 "Created By", 
                 "All Day Event", 
                 "Recurring Event"]]
  var range = sheet.getRange(1,1,1,9);
  range.setValues(header);
}

function onOpen() {   
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [{name: "Load from calendar", functionName: "export_gcal_load"},
                     {name: "Reset", functionName:"export_gcal_reset"}];
  ss.addMenu("TimeTracking", menuEntries);  
}
