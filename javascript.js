// skrypt do rejestracji
    document.addEventListener('DOMContentLoaded', function() {
        var regMyForm = document.getElementById("regMyForm");
        if(regMyForm){
            regMyForm.addEventListener('submit', function(event) {
                event.preventDefault();
    
                const loginRegex = /^[a-zA-Z]+$/;
                const emailRegex = /^[a-zA-Z]+(\d+)?(\.[a-zA-Z]+)?@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            
                const registerLogin = document.getElementById('register-login');
                const registerEmail = document.getElementById('register-email');
                const registerPassword = document.getElementById('register-password');
                const registerPasswordPassword = document.getElementById('register-password-password');
                const registerErrorContainer = document.getElementById('register-error-container');
    
                registerErrorContainer.innerHTML = '';
    
                let error = true;
    
                if(registerPassword.value == registerPasswordPassword.value){
                    if(!loginRegex.test(registerLogin.value)){
                        const divError = document.createElement('div');
                        divError.textContent = "Nieprawidłowy login.";
                        registerErrorContainer.appendChild(divError);
                        error = false;
                    }
                    if (!emailRegex.test(registerEmail.value)) {
                        const divError = document.createElement('div');
                        divError.textContent = "js Nieprawidłowy adres e-mail.";
                        registerErrorContainer.appendChild(divError);
                        error = false;
                    }
                    if (!passwordRegex.test(registerPassword.value)) {
                        const divError = document.createElement('div');
                        divError.textContent = "Hasło musi mieć co najmniej 8 znaków, zawierać wielką literę, cyfrę i znak specjalny.";
                        registerErrorContainer.appendChild(divError);
                        error = false;
                    }
    
                }
                else{
                    const divError = document.createElement('div');
                    divError.textContent = "Hasła muszą być takie same!!!";
                    registerErrorContainer.appendChild(divError);
                    error = false;
                }
    
                if(error){
                    const formData = new FormData(document.getElementById('regMyForm'));
                    
                    fetch('register.php',{
                        method: 'POST',
                        body: formData
                    })
                    .then(response =>{
                        if(!response.ok){
                            alert("Wystąpił błąd po stronie serwera.");
                        }
                        return response.json()
                    })
                    .then(data => {
                        console.log(data);
                        if(data.status === 'success'){
                            location.href = "login.html";
                        }
                        else{
                            console.log(data.message);
                        }
                        alert("Witaj na Stronie: "+data.email);
                    })
                }
            })   
        }
    })


// Skrypt do logowania

document.addEventListener('DOMContentLoaded', function() {
    const logMyForm = document.getElementById('logMyForm');
        if(logMyForm){
            logMyForm.addEventListener('submit', function(e) {
                e.preventDefault();
        
                const formData = new FormData(logMyForm);
        
                fetch('login.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Wystąpił błąd po stronie serwera."); // Rzuć błąd
                    }
                    return response.json(); // Przetwarzaj odpowiedź jako JSON
                })
                .then(data => {
                    console.log(data);
                    if (data.success) {
                        alert('Zostałeś pomyślnie zalogowany');
                        location.href = "kontakt.html"; // Przekierowanie
                    } else {
                        alert("Niepoprawne dane do zalogowania");
                    }
                })
            });   
        }
});

    //Skrypt do wylogowywania sie 
    document.addEventListener('DOMContentLoaded', function() {
        var btnLogout= document.getElementById('logout');
        btnLogout.addEventListener('click', function() {
            console.log('Przycisk kliknięty');
            fetch('logout.php')
                .then(response => {
                    if (response.ok) {
                        alert("Pomyślnie wylogowano.");
                        window.location.href = 'oknoWyboru.html';
                    } else {
                        alert("Błąd podczas wylogowywania.");
                    }
                })
        });
    });

    fetch('sesionChcked.php')
    .then(response => {
        if (!response.ok) {}
        return response.json();
    })
    .then(data => {
        if (data.logged === true) {
            document.getElementById('konKontener').style.display = 'block';
            document.getElementById('secondError').style.display = 'none';
            document.getElementById('logoutDoOknoWyboru').style.display = 'none';
            if (data.userName && data.email) {
                    var konaktEmail = document.getElementById('KontaktEmail');
                    var kontaktImie = document.getElementById('kontaktImie');
                    konaktEmail.value = data.email;
                    kontaktImie.value = data.userName;
            }
        } else {
            document.getElementById('logout').style.display = 'none';
            document.getElementById('secondError').style.display = 'block'; 
            var logoutDoOknoWyboru= document.getElementById('logoutDoOknoWyboru');
            logoutDoOknoWyboru.style.display = 'block';
            logoutDoOknoWyboru.addEventListener('click', function() {
                location.href = "oknoWyboru.html";
            })
        }
    })


    //skrypt do pliku kontakt.html

    document.addEventListener('DOMContentLoaded', function() {

        var button = document.querySelector('.kontaktWyslij');
        var divErrors = document.getElementById("kontaktErrors");
        
        button.addEventListener('click', function (event) {

            event.preventDefault();
            
            var stringRegex = /^[A-Za-z]+$/;
            var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
            var komentarzRegex = /^[A-Za-z0-9\s-]+$/;

            let error = false;

            var imie = document.getElementById("kontaktImie").value;
            var nazwisko = document.getElementById("nazwisko").value;
            var email = document.getElementById("KontaktEmail").value;
            var komentarz = document.getElementById("komentarz").value;

            divErrors.innerHTML = ''; 
            error = false;

            if (!stringRegex.test(imie)) {
                divErrors.innerHTML += "js Nieprawidłowy format imienia<br>";
                error = true;
            }

            if (!stringRegex.test(nazwisko)) {
                divErrors.innerHTML += "js Nieprawidłowy format nazwiska<br>";
                error = true;
            }

            if (!emailRegex.test(email)) {
                divErrors.innerHTML += "js Nieprawidłowy format e-mailu<br>";
                error = true;
            }

            if (!komentarzRegex.test(komentarz)) {
                divErrors.innerHTML += "js Nieprawidłowy format komentarza<br>";
                error = true;
            }

            if(!error){
                var form = document.getElementById('konFormularz');
                const formData = new FormData(form);

                fetch('kontakt.php', {
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
                        alert("Pomyślnie wysłano twoją wiadomosć");
                    }
                })
            }
        });
    });
    

    document.addEventListener('DOMContentLoaded', function () {
        fetch('lista.php')
            .then(response => {
                if (!response.ok) {
                    alert("błąd sieciowy");
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                } else {
                    const tableBody = document.getElementById('table-body');
                    //jezeli data bedzie pusta to ma dac jakis alert
                    data.forEach(item => {
                        let zdjecie;
                        if (item.src != null) {
                            zdjecie = `<img src="zdjecia/${item.src}" >`;
                        } else {
                            zdjecie = "-";
                        }
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${item.id}</td>
                            <td>${item.imie}</td>
                            <td>${item.nazwisko}</td>
                            <td>${item.email}</td>
                            <td>${item.wiadomosc}</td>
                            <td>${zdjecie}</td>
                        `;
                        tableBody.appendChild(row);
                    });

                }
            })
            imageLoader();
    });

function imageLoader(){
    const fileInput = document.getElementById('plikDoPrzeslania');
    const backgroundDiv = document.getElementById('zdjecie');

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
