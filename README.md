<div style="text-align: center">

# Foodfy Project

Foodfy is an application designed by Rocketseat for the Launchbase Bootcamp.

:brazil: Foodfy é uma aplicação projetada pela Rocketseat para o bootcamp Launchbase.

<img src="./public/assets/readmegif.gif">
</div>

<br/>

### Techniques:

- Template Engine (Nunjucks): dynamic data from a basic database (required in the server) instead of static data in .html/.njk.

- Query Strings: each recipe has its own page (localhost:5500/recipes/1, for example)

```js
const recipes = require('./data')

server.get("/recipes/:index", (req, res)=>{
    const recipesList = [...recipes]
    const recipeIndex = req.params.index

    const currentRecipe = recipesList[recipeIndex - 1]
    
    if(!currentRecipe) {
        return res.render("not-found")
    }

    return res.render("current-recipe", {items: currentRecipe})
})
```

- JavaScript EventListener to redirect a recipe to its own page

```js
const recipes = document.querySelectorAll('.recipe')

for(let i=0; i <= recipes.length; i++){
    recipes[i].addEventListener('click', () => {
        window.location.href = `/recipes/${i+1}`
    })
}
```

- JavaScript: control innerHTML (HIDE/SHOW) and toggle CSS classes

```js
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
```

Developed by Caíque Rodrigues - Web Development Student :tada: