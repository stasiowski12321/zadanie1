document.addEventListener('DOMContentLoaded', function () {
    logowanie();
});

function logowanie() {
    const logMyForm = document.getElementById('logMyForm');
    if (logMyForm) {
        logMyForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(logMyForm);

            Array.from(logMyForm.elements).forEach(el => {
                if (el.nodeName.toLowerCase() == 'input' && el.name && el.value) {
                    formData.append(el.name, el.value);
                }
            });

            fetch('./login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error("Wystąpił błąd po stronie serwera.");
                }
                return response.json();
            })
            .then(data => {
                console.log(data.success);
                if (data.success) {
                    alert('Zostałeś pomyślnie zalogowany');
                    window.location.href = "./kontakt.html";
                } else {
                    alert("Niepoprawne dane do zalogowania");
                }
            })
            .catch(error => {
                console.error('Wystąpił błąd:', error); 
            });
        });
    }
}
