export default function getCurrentDate(){      //Returns The Current Date in YYYY-MM-DD format
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const currentDate = new Date().getDate()
    return (currentYear.toString().padStart(2, "0") + "-" + currentMonth.toString().padStart(2, "0") + "-" + currentDate.toString().padStart(2, "0"));
}

export function getDateOneWeekAgo(){
    const today = new Date();
    const dateOneWeekAgo = new Date(today)
    dateOneWeekAgo.setDate(today.getDate() - 7)
    return dateOneWeekAgo
}

const mobileMenu = document.querySelector(".mobile-menu")
const mobileMenuButton = document.querySelector(".mobile-menu-button")
mobileMenuButton.addEventListener("click", (e)=>{
    e.preventDefault()
    if(mobileMenu.style.display === "none" || mobileMenu.style.display === ""){
        mobileMenu.style.display = "block"
        mobileMenu.ariaHidden = false
    }
    else{
        mobileMenu.style.display = "none"
        mobileMenu.ariaHidden = true
    }
})