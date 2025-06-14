import getCurrentDate from './utils/common.js'

let selectedDate = undefined
let numberOfRecords = 1

const todayButton = document.getElementById("today-button")
todayButton.addEventListener("click", (e)=>{
    e.preventDefault()
    const currentDate = getCurrentDate()
    selectedDate = currentDate
    console.log("Selected Date = ", selectedDate)
    displayDateAndNotesArea(currentDate)
})

const dateInputFromCalender = document.getElementById("date-input");
dateInputFromCalender.addEventListener("change", (e)=>{
    selectedDate = dateInputFromCalender.value
    console.log("Selected Date = ", selectedDate)
    displayDateAndNotesArea(dateInputFromCalender.value)
})

const topics = JSON.parse(localStorage.getItem('topics') || '[]')
if(!topics.length){
    console.log("No topics found")
}

function displayDateAndNotesArea(date){
    const dateDisplayDiv = document.getElementById("date-display")
    dateDisplayDiv.innerHTML = ""
    dateDisplayDiv.textContent = `Date: ${date}`
    document.getElementById("date-and-notes-container").hidden = false
}

function loadOptionsFromLocalstorage(recordIndex){
    let storedTopicsInsideHTMLOptionsTag = `<option value="" disabled selected>Select An Option</option>`;
    let storedTopics = JSON.parse(localStorage.getItem('topics') || '[]')
    if(!storedTopics.length){
        document.getElementById(`label-and-selection-tag-container-${recordIndex}`).innerHTML = `<option disabled selected>No Topics Found</option>`
    }
    else{
        storedTopics.forEach((element) => {
            storedTopicsInsideHTMLOptionsTag += `<option>${element}</option>`
        })
        const updateTopicSelection = document.getElementById(`topic-selection-${recordIndex}`)
        updateTopicSelection.innerHTML = storedTopicsInsideHTMLOptionsTag
    }    
}

loadOptionsFromLocalstorage("0") //Arg. = For index of the record. (e.g. - for 1st record (already )

document.getElementById("add-new-record").addEventListener("click", (e)=>{
    e.preventDefault()
    addNewNotesNode(numberOfRecords)
})

function addNewNotesNode(recordIndex){
    const newDiv = document.createElement("div")
    newDiv.innerHTML = `
    <div id="label-and-selection-tag-container-${recordIndex}">
        <label for="topic-selection">Select a topic: </label>
        <select name="" id="topic-selection-${recordIndex}" required>
        </select>
    </div>
    <br>
    <label for="summary-text-${recordIndex}">Enter a short summary: </label>
    <input type="text" class="summary" id="summary-text-${recordIndex}">
    <br>
    <label for="textarea-${recordIndex}" class="notes-labels">Write Your Notes Here: </label>
    <br>
    <textarea id="textarea-${recordIndex}" class="notes-textarea"></textarea>
    `
    document.getElementById("add-record-button-container").before(newDiv)
    loadOptionsFromLocalstorage(recordIndex)
    numberOfRecords++
}

const notesForm = document.getElementById("notes-entry-form")
notesForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    if(confirm("Are you sure you want to add that to your notes?")){
        addNewEntry(selectedDate, numberOfRecords)
    }
})

function addNewEntry(selectedDate, recordIndex){
    const newEntry = {
        date: selectedDate,
        record: [],
    }
    for(let i = 0; i < recordIndex; i++){
        console.log("Topic selection: ", document.getElementById(`topic-selection-${i}`).value)
        let newRecord = {
                topic: document.getElementById(`topic-selection-${i}`).value,
                summary: document.getElementById(`summary-text-${i}`).value,
                note: document.getElementById(`textarea-${i}`).value,
            }
        newEntry.record.push(newRecord)
    }

    //Retriving already stored information

    let storedNotes = JSON.parse(localStorage.getItem('notes') || '[]')

    //If Selected date already exists, append the old data to the new data

    for(let i = 0; i < storedNotes.length; i++){
        if(storedNotes[i].date === selectedDate){  //Checking if the same date exists in records
            let previouslyAddedRecord = storedNotes[i].record  //Storing what was stored against the particualar date
            for(let j = 0; j < storedNotes[i].record.length; j++){
                newEntry.record.push(previouslyAddedRecord[j])  //Loops runs over the stored array and pushes every previous individual record (topic+note) (e.g.: {topic: 'JavaScript', note: 'a'}) into newEntry to combine with the new data
            }
            storedNotes.splice(i, 1)  //Removing the old data for this particular date
            break
        }
    }


    if(storedNotes.length > 0){ //If any note is already stored -> push into the array & update the localstorage record
        storedNotes.push(newEntry)
        localStorage.setItem('notes', JSON.stringify(storedNotes))
    }
    else{ //If there's no note, just push the newEntry as a new array
        localStorage.setItem('notes', JSON.stringify([newEntry]))
    }
    alert("Note added successfully")
}