const foodfyLogo = document.querySelector('.logo')
foodfyLogo.addEventListener('click', () => {
    window.location.href = "/"
})


const currentPage = location.pathname
let menuItems = document.querySelectorAll('header .menu .menu-links a')
for(item of menuItems){
    if(currentPage.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
}

