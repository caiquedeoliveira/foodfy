const modalOverlay = document.querySelector('.modal-overlay')
const confirmDelete = document.querySelector('.edit-control p')

confirmDelete.addEventListener("click", () => {
    modalOverlay.classList.add('active')
})

document.querySelector('.delete-buttons p').addEventListener("click", () => {
    modalOverlay.classList.remove('active')
})

modalOverlay.addEventListener("click", () => {
    modalOverlay.classList.remove('active')
})
