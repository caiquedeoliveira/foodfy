document.querySelector('.add-ingredient').addEventListener("click", () => {
    const ingredients = document.querySelector('.ingredients')
    const ingredient = document.querySelectorAll('.ingredients input')

    const newIngredient = ingredient[ingredient.length - 1].cloneNode(true)

    if(newIngredient.value == "") return false

    newIngredient.value = ""
    ingredients.appendChild(newIngredient)
})


document.querySelector('.add-step').addEventListener('click', () => {
    const preparations = document.querySelector('.preparations')
    const preparationStep = document.querySelectorAll('.preparations input')

    const newStep = preparationStep[preparationStep.length - 1].cloneNode(true)

    if(newStep.value == "") return false

    newStep.value = ""
    preparations.appendChild(newStep)
})

