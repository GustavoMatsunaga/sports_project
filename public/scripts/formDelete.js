const deleteForm = document.querySelector('#form-delete')
deleteForm.addEventListener("submit", function(event) {
    const confirmation = confirm("Confirm to delete")
    if(!confirmation) {
        event.preventDefault()
    }
})
