const viewRecipe = document.querySelectorAll('.recipe-view p')
for(let i=0; i <= viewRecipe.length; i++){
    viewRecipe[i].addEventListener('click', ()=>{
        window.location.href = `/admin/recipes/${i+1}`
    })
}