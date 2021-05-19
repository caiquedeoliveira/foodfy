const visibilityItems = document.querySelectorAll('.text-content p')
const recipeInfo = document.querySelectorAll('.recipe_info')

for(let button of visibilityItems){
    button.addEventListener('click', () => {
        if(button.innerHTML === "ESCONDER"){
            button.innerHTML = "MOSTRAR"
        } else {
            button.innerHTML = "ESCONDER"
        }
    })
}

for (let button in visibilityItems){
    visibilityItems[button].addEventListener('click', () => {
      recipeInfo[button].classList.toggle('hidden')
    })
}