var gloablDataLogget = false; 

document.addEventListener('DOMContentLoaded',function (){
    if(gloablDataLogget)
    {
        logout();
    }
})
function logout(){
    var btnLogout = document.getElementById('logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            fetch('./logout.php')
                .then(response => {
                    if (response.ok) {
                        alert("Pomyślnie wylogowano.");
                        window.location.href = './oknoWyboru.html';
                    } else {
                        alert("Błąd podczas wylogowywania.");
                    }
                });
        });
    }
} 

    fetch('sesionChcked.php')
    .then(response => {
        if (!response.ok) {}
        return response.json();
    })
    .then(data => {
        gloablDataLogget = data.logged;
        if (gloablDataLogget) {
            var konKontener = document.getElementById('konKontener');
            if(konKontener){
                konKontener.style.display = 'block';
                document.getElementById('secondError').style.display = 'none';
                document.getElementById('logoutDoOknoWyboru').style.display = 'none';
                if (data.userName && data.email) {
                        var konaktEmail = document.getElementById('KontaktEmail');
                        var kontaktImie = document.getElementById('kontaktImie');
                        konaktEmail.value = data.email;
                        kontaktImie.value = data.userName;
                }
            }
        } else {
            var logout = document.getElementById('logout');
            if(logout){
                logout.style.display = 'none';
                document.getElementById('secondError').style.display = 'block'; 
                var logoutDoOknoWyboru= document.getElementById('logoutDoOknoWyboru');
                logoutDoOknoWyboru.style.display = 'block';
                logoutDoOknoWyboru.addEventListener('click', function() {
                location.href = "oknoWyboru.html";
                    })
            }
        }
    })
    