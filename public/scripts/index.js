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


const recipes = document.querySelectorAll('.recipe')
for(let i=0; i <= recipes.length; i++){
    recipes[i].addEventListener('click', () => {
        window.location.href = `/recipes/${i+1}`
    })
}
