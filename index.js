import getCurrentDate from './utils/common.js'
import {getDateOneWeekAgo} from './utils/common.js'
const currentDate = getCurrentDate()
const dateArea = document.querySelector(".date-area")
dateArea.innerHTML = `Today's date: ${currentDate}`

function getPreviousDay(){
    const today = new Date();
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    return yesterday
}

const yesterday = getPreviousDay()
const yesterdayDDMMYYYY = yesterday.getDate().toString().padStart(2, "0") + "-" + (yesterday.getMonth()+1).toString().padStart(2, "0") + "-" + yesterday.getFullYear().toString()
const yesterdayYYYYMMDD = yesterday.getFullYear().toString() + "-" + (yesterday.getMonth()+1).toString().padStart(2, "0") + "-" + yesterday.getDate().toString().padStart(2, "0")


function getTopicsAndNoteSummariesForGivenDate(date){  //Expected format for date = YYYY-MM-DD
    let topicAndSummaries = {
        topics: [],
        summaries: [],
        recordExists: false,    // To track whether a record exists for the given date
    }
    const allNotes = JSON.parse(localStorage.getItem('notes'))
    if(!allNotes){
        console.log("No notes found.")
        return topicAndSummaries
    }
    for(let i = 0; i < allNotes.length; i++){
        if(allNotes[i].date === date){
            topicAndSummaries.recordExists = true
            for(let j = 0; j < allNotes[i].record.length; j++){
                topicAndSummaries.topics.push(allNotes[i].record[j].topic)
                topicAndSummaries.summaries.push(allNotes[i].record[j].summary)
            }
        }
    }
    return topicAndSummaries
}

const topicsAndSummariesYesterday = getTopicsAndNoteSummariesForGivenDate(yesterdayYYYYMMDD)

let topicsYesterdayHTML = "Topics: "
let summariesYesterdayHTML = "Summaries: "

if(topicsAndSummariesYesterday.recordExists){
    topicsAndSummariesYesterday.topics.forEach((topic)=>{
        topicsYesterdayHTML += `<div class="topic-card">${topic}</div>`
    })
    topicsAndSummariesYesterday.summaries.forEach((summary)=>{
        summariesYesterdayHTML += `<div class="summary-card">${summary}</div>`
    })
}


document.querySelector("#yesterday-date-container").innerHTML = `<div class="card" id="yesterday-date">Date: ${yesterdayDDMMYYYY}</div>`
document.querySelector(".topics-container-daily").innerHTML = `${topicsYesterdayHTML}`
document.querySelector(".summaries-container-daily").innerHTML = `${summariesYesterdayHTML}`

if(topicsAndSummariesYesterday.recordExists){
    document.querySelector(".daily-revision-container").hidden = false
}
else{
    document.querySelector(".daily-revision-container").innerHTML = `<div style="text-align:center;">No records found for yesterday</div>`
    document.querySelector(".daily-revision-container").hidden = false
}

const dateOneWeekAgo = getDateOneWeekAgo()
const dateOneWeekAgoYYYYMMDD = dateOneWeekAgo.getFullYear().toString() + "-" + (dateOneWeekAgo.getMonth()+1).toString().padStart(2, "0") + "-" + dateOneWeekAgo.getDate().toString().padStart(2, "0")
const dateOneWeekAgoDDMMYYYY = dateOneWeekAgo.getDate().toString() + "-" + (dateOneWeekAgo.getMonth()+1).toString().padStart(2, "0") + "-" + dateOneWeekAgo.getFullYear().toString().padStart(2, "0")
const topicsAndSummariesOneWeekAgo = getTopicsAndNoteSummariesForGivenDate(dateOneWeekAgoYYYYMMDD)
console.log(topicsAndSummariesOneWeekAgo)

let topicsPreviousWeekHTML = "Topics: "
let summariesPreviousWeekHTML = "Summaries: "

if(topicsAndSummariesOneWeekAgo.recordExists){
    topicsAndSummariesOneWeekAgo.topics.forEach((topic)=>{
        topicsPreviousWeekHTML += `<div class="topic-card">${topic}</div>`
    })
    topicsAndSummariesOneWeekAgo.summaries.forEach((summary)=>{
        summariesPreviousWeekHTML += `<div class="summary-card">${summary}</div>`
    })
}

document.querySelector("#weekly-date-container").innerHTML = `<div class="card" id="weekly-date">Date: ${dateOneWeekAgoDDMMYYYY}</div>`
document.querySelector(".topics-container-weekly").innerHTML = `${topicsPreviousWeekHTML}`
document.querySelector(".summaries-container-weekly").innerHTML = `${summariesPreviousWeekHTML}`

if(topicsAndSummariesOneWeekAgo.recordExists){
    document.querySelector(".weekly-revision-container").hidden = false
}
else{
    document.querySelector(".weekly-revision-container").innerHTML = `<div style="text-align:center;">No records found for day one week ago</div>`
    document.querySelector(".weekly-revision-container").hidden = false
}