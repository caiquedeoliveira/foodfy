const viewRecipe = document.querySelectorAll('.recipe-update')


for(let i=0; i <= viewRecipe.length; i++){
    viewRecipe[i].addEventListener('click', () => {
        window.location.href = `/recipes/${i+1}`
    })
}