import getCurrentDate from "./utils/common.js"

let currentDateStr = getCurrentDate()

let currentYear = parseInt(currentDateStr.slice(0,4));
let currentMonth = parseInt(currentDateStr.slice(5,7));
let currentDay = parseInt(currentDateStr.slice(8,10));

let today = {
    date: currentDay,
    month: currentMonth,
    year: currentYear
}

//Get last 7 days-->

let lastSevenDays = []
let lastSevenDates = []


function getPreviousDate(){
    if(today.date === 1){
        if(today.month === 1){    //Condition for YYYY-01-01
            today.year--;
            today.month = 12;
        }
        else{
            today.month--;
        }
        today.date = getNumberOfDaysInAMonth(today.month, today.year);
    }
    else{
        today.date--;
    }
    return (today.year + "-" + today.month.toString().padStart(2, "0") + "-" + today.date.toString().padStart(2, "0"))
}

function getNumberOfDaysInAMonth(month, year){
    if(isLeapYear(year) && month == 2){
        return 29   //Return 29 if it's Feb & new year
    }
    const daysInAMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return daysInAMonth[month-1]
}
function isLeapYear(year){
    if(year%100 === 0){
        return (year%400 === 0)
    }
    return (year%4 === 0)
}

for(let i = 0; i < 7; i++){
    const lastDate = getPreviousDate()
    lastSevenDays.push(lastDate)
    lastSevenDates.push({
        date: lastDate.slice(8, 10),
        isRecordFound: false
    })
}

const notes = JSON.parse(localStorage.getItem("notes")) || []
let recordsFoundForDates = []
for(let i = 0; i < lastSevenDays.length; i++){
    recordsFoundForDates[i]
    notes.forEach(note => {
        if(lastSevenDays[i] === note.date){
            lastSevenDates[i].isRecordFound = true
        }
    });
}

//DOM:
const streakSection = document.querySelector(".streak-circle-container")
lastSevenDates.forEach(day=>{
    const newDiv = document.createElement("div")
    newDiv.classList.add("streak-date")
    newDiv.textContent = day.date
    if(day.isRecordFound){
        newDiv.style.backgroundColor = "#e6ff2b"
    }
    streakSection.appendChild(newDiv)
})


//Enabling users to view jump into a particular day's notes from the streak section-->
const streakCircleContainer = document.querySelector(".streak-circle-container")
streakCircleContainer.addEventListener("click", (e)=>{
    if(e.target.classList.contains("streak-date")){
        let selectedDate = e.target.textContent
        let indexOfSelectedDate = null //0-based
        for(let i = 0; i < lastSevenDates.length; i++){
            if(selectedDate == lastSevenDates[i].date){
                indexOfSelectedDate = i
                break
            }
        }
        selectedDate = lastSevenDays[indexOfSelectedDate] 
        window.location.href = `/revision-page.html?date=${selectedDate}`
    }
})