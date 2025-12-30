let topicSelectorSelectionTag = document.querySelector("#topic-selection")
function fetchAndShowTopicsInTopicSelectionBox(){
    const topicsList = JSON.parse(localStorage.getItem("topics"))
    let htmlForOptionTag = `<option value="Select a topic" selected disabled>Select an option</option>`
    topicsList.forEach(element => {
        //Add each element inside the select tag as an 'option'
        htmlForOptionTag += `<option>${element}</option>`
    });
    topicSelectorSelectionTag.innerHTML = htmlForOptionTag
}

fetchAndShowTopicsInTopicSelectionBox()
topicSelectorSelectionTag.addEventListener("change", (e)=>{
    e.preventDefault()
    let selectedTopic = e.target.value
    displayBox.innerHTML = ""
    fetchSummeryAndNote(selectedTopic)
})
let displayBox = document.querySelector(".display-box")
function fetchSummeryAndNote(selectedTopic){
    let isTopicFound = false
    JSON.parse(localStorage.getItem("notes")).forEach(dataForEachDay => { //Record against each day
        for(let i = 0; i < dataForEachDay.record.length; i++){
            if(dataForEachDay.record[i].topic == selectedTopic){
                isTopicFound = true
                let date =  dataForEachDay.date
                let summary = dataForEachDay.record[i].summary
                let note = dataForEachDay.record[i].note
                let data = `<div class="cards"><div><b>Date:</b> ${date}</div><div><b>Summary:</b> ${summary}</div><div><b>Note:</b> ${note}</div></div><hr>`
                displayBox.innerHTML += `${data}\n`
            }
        }
    });
    if(!isTopicFound){
        displayBox.innerText += `No Record Found for The Given Topic.\nSelect Another Topic.`
        if(!displayBox.classList.contains("no-topic-found")){
            displayBox.classList.add("no-topic-found")
        }
    }
    else{
        displayBox.classList.remove("no-topic-found")
    }
}