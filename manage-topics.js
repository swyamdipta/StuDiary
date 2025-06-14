const addtopicForm = document.getElementById("add-topic-form")
addtopicForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const topicName = document.getElementById("add-topic-text").value
    if(!isDuplicateEntry(topicName)){
        addTopic(topicName)
    }
    else{
        alert("Topic already in list.")
    }
})

function isDuplicateEntry(topicName){
    let storedTopics = []
    storedTopics = JSON.parse(localStorage.getItem('topics') || '[]')
    for(let i = 0; i < storedTopics.length; i++){
        if(storedTopics[i] === topicName){
            return true;
        }
    }
    return false;
}

function addTopic(topic){
    let storedTopics = []
    storedTopics = JSON.parse(localStorage.getItem('topics'))
    if(!storedTopics){
        localStorage.setItem('topics', JSON.stringify([topic]))
    }
    else{
        storedTopics.push(topic)
        localStorage.setItem('topics', JSON.stringify(storedTopics))
    }
    alert("Topic added succeessfully")
    window.location.reload()
}

addTopicsInsideSelectionTag()

function addTopicsInsideSelectionTag(){
    let storedTopicsInsideHTMLOptionsTag = `<option disabled selected>Select An Option</option>`;
    let storedTopics = JSON.parse(localStorage.getItem('topics') || '[]')
    if(!storedTopics.length){
        document.getElementById("delete-topic-form").hidden = true
        document.getElementById("delete-topic-form-container").appendChild(document.createTextNode("No Topics To Delete"))
    }
    else{
        storedTopics.forEach((element) => {
            storedTopicsInsideHTMLOptionsTag += `<option>${element}</option>`
        })
        const deleteTopicSelection = document.getElementById("delete-topic-selection")
        deleteTopicSelection.innerHTML = storedTopicsInsideHTMLOptionsTag
    }
}

const deleteTopicForm = document.getElementById("delete-topic-form")
    if(deleteTopicForm){            // Should work well even without this check...is there just for EXTRA safety :)
        deleteTopicForm.addEventListener("submit", (e)=>{
            e.preventDefault()
            try{
                const selectedTopicForDeletion = document.getElementById("delete-topic-selection").value
                storedTopics = JSON.parse(localStorage.getItem('topics'))
                const deletedTopics = storedTopics.filter((element) => element !== selectedTopicForDeletion)
                localStorage.setItem('topics', JSON.stringify(deletedTopics)) //Replacing old topics with deleted list of topics
                alert(`Topic ${selectedTopicForDeletion} deleted successflly`)
                window.location.reload()
                document.getElementById("message-field").hidden = false
            }
            catch(err){
                document.getElementById("message-field").innerText = `Failed to delete topic due to ${err}`
            }
        })
}