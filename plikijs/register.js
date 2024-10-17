document.addEventListener('DOMContentLoaded', function () {
    register();
});

function register() {
    var regMyForm = document.getElementById("regMyForm");
    if (regMyForm) {
        
        regMyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const patterns = {
                login: /^[a-zA-Z]+$/,
                email: /^[a-zA-Z]+(\d+)?(\.[a-zA-Z]+)?@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
                password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_/])[A-Za-z\d!@#$%^&*_]{8,}$/,
            };

            const registerLogin = document.getElementById('register-login');
            const registerEmail = document.getElementById('register-email');
            const registerPassword = document.getElementById('register-password');
            const registerPasswordPassword = document.getElementById('register-password-password');
            const registerErrorContainer = document.getElementById('register-error-container');

            registerErrorContainer.innerHTML = '';

            let error = false;

            if (registerPassword.value === registerPasswordPassword.value) {
                if (!patterns.login.test(registerLogin.value)) {
                    registerErrorContainer.innerHTML += "Nieprawidłowy login.<br>";
                    error = true;
                }
                if (!patterns.email.test(registerEmail.value)) {
                    registerErrorContainer.innerHTML += "Nieprawidłowy adres e-mail.<br>";
                    error = true;
                }
                if (!patterns.password.test(registerPassword.value)) {
                    registerErrorContainer.innerHTML += "Hasło musi mieć co najmniej 8 znaków, zawierać wielką literę, cyfrę i znak specjalny.<br>";
                    error = true;
                }
            } else {
                registerErrorContainer.innerHTML += "Hasła muszą być takie same!!!<br>";
                error = true;
            }

            if (!error) {
                const formData = new FormData();

                Array.from(regMyForm.elements).forEach(el => {
                    if (el.nodeName.toLowerCase() == 'input' && el.name && el.value) {
                        formData.append(el.name, el.value);
                    }
                });

                fetch('./register.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        alert("Wystąpił błąd po stronie serwera.");
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status === 'success') {
                        location.href = "./login.html";
                        alert("Zarejestrowano poprawnie mail: " + data.email + " teraz możesz się zalogować"); //to_do zamuiast tego można od razu odpalić logowanie użytkownika
                    } else {
                        alert(data.message);
                    }
                });
            }
        });
    }
}
