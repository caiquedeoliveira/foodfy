const foodfyLogo = document.querySelector('.logo')

foodfyLogo.addEventListener('click', () => {
    window.location.href = "/"
})

const recipes = document.querySelectorAll('.recipe')

for(let i=0; i <= recipes.length; i++){
    recipes[i].addEventListener('click', () => {
        window.location.href = `/recipes/${i+1}`
    })
}


