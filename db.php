<?php
// Dane do połączenia z bazą danych MySQL
$host = "localhost"; // domyślny host dla XAMPP
$dbname = "kontakt"; // nazwa bazy danych
$username = "root"; // domyślny użytkownik w XAMPP
$password = ""; // domyślnie brak hasła w XAMPP

// Tworzenie połączenia
$conn = new mysqli($host, $username, $password, $dbname);

// Sprawdzanie, czy połączenie się powiodło
if ($conn->connect_error) {
    die("Błąd połączenia: " . $conn->connect_error);
}
?>
