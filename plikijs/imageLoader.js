document.addEventListener('DOMContentLoaded', function(){
    imageLoader();
})

function imageLoader() {
    const fileInput = document.getElementById('plikDoPrzeslania');
    const backgroundDiv = document.getElementById('zdjecie');

    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            console.log("działa na tym etapie ");
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    backgroundDiv.style.backgroundImage = `url(${e.target.result})`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}
