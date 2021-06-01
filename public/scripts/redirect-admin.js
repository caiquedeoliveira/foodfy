const adminLogo = document.querySelector('.admin-area .logo')

adminLogo.addEventListener("click", () => {
    window.location.href = "/admin"
})

const currentPage = location.pathname
let menuItems = document.querySelectorAll('.admin-area .menu .menu-links a')
for(let item of menuItems){
    if(currentPage.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
}