<?php
include 'db.php';
header('Content-Type: application/json');

$response = []; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = $_POST['userName'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Sprawdzenie pustych danych
    if (empty($login) || empty($email) || empty($password)) {
        $response['error'] = 'Brak niektórych danych';
        echo json_encode($response);
        exit;
    }

    $login = $conn->real_escape_string($login);
    $email = $conn->real_escape_string($email);

    $sql = "SELECT * FROM users WHERE userName = '$login' AND email = '$email'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Weryfikacja hasła
        if (password_verify($password, $row['password'])) {
            session_start();
            $_SESSION['logged'] = true;
            $_SESSION['userName'] = $login; 
            $_SESSION['email'] = $email;

            $response['success'] = 'Użytkownik zalogował się';
            echo json_encode($response);
            exit;
        }
    }
    
    // Błąd, gdy hasło jest niepoprawne
    $response['error'] = 'Logowanie nie powiodło się';
    echo json_encode($response);
    exit;
} else {
    $response['error'] = 'Nieprawidłowa metoda żądania.';
    echo json_encode($response);
    exit;
}

$conn->close();
?>
