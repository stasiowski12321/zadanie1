document.addEventListener('DOMContentLoaded', function() {
    kontakt();
    imageLoader();
});

function kontakt() {
    var button = document.querySelector('.kontaktWyslij');
    if (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            const stringRegex = /^[A-Za-z]+$/;
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
            const komentarzRegex = /^[A-Za-z0-9\s-]+$/;

            let error = false;

            var imie = document.getElementById("kontaktImie").value;
            var nazwisko = document.getElementById("nazwisko").value;
            var email = document.getElementById("KontaktEmail").value;
            var komentarz = document.getElementById("komentarz").value;

            var divErrors = document.getElementById("kontaktErrors");
            if (divErrors) {
                divErrors.innerHTML = ''; 
                error = false;

                if (!stringRegex.test(imie)) {
                    divErrors.innerHTML += "Nieprawidłowy format imienia<br>";
                    error = true;
                }

                if (!stringRegex.test(nazwisko)) {
                    divErrors.innerHTML += "Nieprawidłowy format nazwiska<br>";
                    error = true;
                }

                if (!emailRegex.test(email)) {
                    divErrors.innerHTML += "Nieprawidłowy format e-mailu<br>";
                    error = true;
                }

                if (!komentarzRegex.test(komentarz)) {
                    divErrors.innerHTML += "Nieprawidłowy format komentarza<br>";
                    error = true;
                }

                if (!error) {
                    var form = document.getElementById('konFormularz');
                    const formData = new FormData(form);

                    Array.from(form.elements).forEach(el => {
                        if (el.nodeName.toLowerCase() == 'input' && el.name && el.value) {
                            formData.append(el.name, el.value);
                        }
                    });

                    fetch('./kontakt.php', {
                        method: 'POST',
                        body: formData 
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Odpowiedź sieciowa nie była poprawna');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.success === false) {
                            data.errors.forEach(err => {
                                divErrors.innerHTML += err + "<br>";
                            });
                        } else {
                            alert("Pomyślnie wysłano twoją wiadomość");
                        }
                    });
                }
            }
        });
    }
}
function imageLoader() {
    const fileInput = document.getElementById('plikDoPrzeslania');
    const backgroundDiv = document.getElementById('zdjecie');

    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
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

