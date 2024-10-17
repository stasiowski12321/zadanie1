document.addEventListener('DOMContentLoaded',function() {
    dodajKolejne();
    loadData();
})

function dodajKolejne() {
    var dodajKolejne = document.getElementById('dodajKolejne');
    if (dodajKolejne) {
        dodajKolejne.addEventListener('click', loadData);
    }
}

let currentPage = 0;

async function loadData() {
    const tableBody = document.getElementById('table-body');
    if (tableBody) {
        try {
            const response = await fetch(`lista.php?page=${currentPage}`);
            if (!response.ok) {
                alert("Błąd sieciowy");
                return;
            }

            const data = await response.json();
            if (data.result.length > 0) {
                data.result.forEach((item) => {
                    let zdjecie = item.src ? `<img src="zdjecia/${item.src}">` : "-";
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

                    if (item.end === true) {
                        var divEnd = document.createElement('div');
                        divEnd.textContent = "To jest już cała lista";
                        var endList = document.getElementById("endList");
                        endList.style.display = "block";
                        endList.appendChild(divEnd);
                        if(dodajKolejne = document.getElementById('dodajKolejne')){
                            dodajKolejne.style.display = 'none';
                        }
                    }   
                });
                currentPage++;
            } else {
                alert("Koniec listy.");
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
            alert("Wystąpił błąd podczas ładowania danych.");
        }
    }
}
