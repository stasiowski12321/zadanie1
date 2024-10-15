<?php
include 'db.php';

$limit = 5; // liczba wierszy do pobrania
$page = isset($_GET['page']) ? (int)$_GET['page'] : 0; // aktualna strona
$offset = $page * $limit; // oblicz offset

$sql = "SELECT 
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
            wiadomosci.id ASC 
        LIMIT $limit OFFSET $offset";

$result = $conn->query($sql);

$responses = []; 

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $responses[] = $row; 
    }
    echo json_encode($responses);
} else {
    echo json_encode([]);
}

$conn->close();
?>
