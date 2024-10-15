<?php
include 'db.php';

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userName = $_POST['login'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $passwordPasswor = $_POST['password-password'];

    if (empty($userName) || empty($email) || empty($password) || empty($passwordPasswor)) {
        echo json_encode(['status' => 'error', 'message' => 'Wszystkie pola są wymagane.']);
        exit;
    }

    if ($password !== $passwordPasswor) {
        echo json_encode(['status' => 'error', 'message' => 'Hasła się nie zgadzają.']);
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO `users` (`userName`, `email`, `password`) VALUES ('$userName', '$email', '$hashed_password')";

    if ($conn->query($sql)) {
        $response['status'] = 'success';
        $response['message'] = 'Rejestracja udana!';
        $response['email'] = $email;
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Błąd podczas rejestracji: ' . $conn->error;
    }
    
    echo json_encode($response);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Żądanie musi być typu POST.']);
}
$conn->close();
?>
