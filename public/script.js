const correntPage = location.pathname
const menuItems =  document.querySelectorAll("header .links a")

// for(item of menuItems) {
//     if( correntPage == item.getAtribute("href")) {
//         item.classList.add("active")
//     }
// }

for(item of menuItems) {
    if( correntPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}