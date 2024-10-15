<?php
include 'db.php';

$sql = 'SELECT 
            wiadomosci.id, 
            wiadomosci.imie, 
            wiadomosci.nazwisko, 
            wiadomosci.email, 
            wiadomosci.wiadomosc, 
            zdjecia.src 
        FROM 
            wiadomosci 
        LEFT JOIN 
            zdjecia ON wiadomosci.id = zdjecia.idWiadomosci 
        ORDER BY 
            wiadomosci.id ASC';

$result = $conn->query($sql);

$responses = []; 

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $responses[] = $row; 
    }
    echo json_encode($responses);
} else {
    $response['error'] = "Brak wyników.";
    echo json_encode($response);
}

$conn->close();
?>
