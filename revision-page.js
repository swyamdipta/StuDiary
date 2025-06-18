//When redirected with date
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const date = urlParams.get('date')
if (date) {   
    document.querySelector(".date-area").innerHTML = `Notes Taken On : ${dateYYYYMMDDtoDDMMYYY(date)}`
    
    function getNotes(date){
        const allNotes = JSON.parse(localStorage.getItem('notes'))
        return allNotes.find((element)=> element.date === date)
    }
    
    const data = getNotes(date)
     const mainContainer = document.querySelector(".main-container")
    
    mainContainer.innerHTML = ``
   
    if(!data){
        mainContainer.innerHTML = `
        <div class="no-content-message" style="text-align: center;">
        <h3>No Notes Found</h3>
        <p>No records found for this date. Try selecting a different date or create your first entry!</p>
        <div class="back-button-container">
            <button onclick="window.location = './revision-page.html'" class="button secondary">Go Back</button>
        </div>
    </div>
    `
    }

    for(let i = 0; i < data.record.length; i++){
        const newDiv = document.createElement("div")
        newDiv.setAttribute("class", `record`)
        newDiv.setAttribute("id", `record-${i}`)
        newDiv.innerHTML = `
        <p class="topic">Topic: ${data.record[i].topic}</p>
        <p class="summary">Summary: ${data.record[i].summary}</p>
        <p class="note">Note: ${data.record[i].note}</p>
        `
        mainContainer.appendChild(newDiv)
    }
    
    
    class Record {
        constructor(topic, summary, notes){
            this.topic = topic
            this.summary = summary
            this.notes = notes
        }
        createSection(){
            document.createElement("div")
        }
    }
} else  {   //When visiting page directly (not redirected)
    const dateInput = document.getElementById("date-input")
    dateInput.addEventListener("change", (e)=>{
        const selectedDate = dateInput.value
        if (confirm(`Do you want to see your notes for ${dateYYYYMMDDtoDDMMYYY(selectedDate)}`)) {
            window.location = `./revision-page.html?date=${selectedDate}`
        } else {
            window.location.reload()
        }
    })
}


function dateYYYYMMDDtoDDMMYYY(date){  //Converts date in YYYY-MM-DD format to DD-MM-YYYY format
    const spilitedDate = date.split("-")
    return spilitedDate[2] + "-" + spilitedDate[1] + "-" + spilitedDate[0]
}