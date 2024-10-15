<?php
session_start();

$response = ["logged" => false];

if (isset($_SESSION["logged"]) && $_SESSION["logged"] === true) {
    $response["logged"] = true;
}


if ( isset($_SESSION['userName']) && isset($_SESSION['email'])) {
    $response["userName"] = $_SESSION['userName'];
    $response["email"] = $_SESSION['email'];
}
echo json_encode($response);
?>
