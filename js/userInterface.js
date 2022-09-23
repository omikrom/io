const userInterfaceController = function() {
    let uiToggle = document.querySelector('#toggle');
    let uiControls = document.querySelector('#ui-controls');

    uiToggle.addEventListener('click', function() {
        uiControls.classList.toggle('hidden');
    });


}

export default userInterfaceController;