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


const PhotosUpload = {
    input: "",
    preview: document.querySelector("#photos-preview"),
    uploadLimit: 5,
    files: [],
    handleFileInput(event){
        const {files: fileList} = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const container = PhotosUpload.getContainer(image)
                PhotosUpload.preview.appendChild(container)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles() // dataTransfer.files
    },
    hasLimit(event){
        const {uploadLimit, input, preview} = PhotosUpload
        const {files: fileList} = input

        if(fileList.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} imagens.`)
            event.preventDefault()
            return true
        }

        const photosContainer = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo")
                photosContainer.push(item)
        })

        const totalPhotos = fileList.length + photosContainer.length

        if(totalPhotos > uploadLimit){
            alert("Você atingiu o limite máximo de imagens.")
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image){
        const container = document.createElement('div')
        container.classList.add('photo')

        container.onclick = PhotosUpload.removePhoto

        container.appendChild(image)

        container.appendChild(PhotosUpload.getRemoveButton())

        return container
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event){
        const photoContainer = event.target.parentNode

        const photosArray = Array.from(PhotosUpload.preview.children)

        const index = photosArray.indexOf(photoContainer)
        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoContainer.remove()
    }
}