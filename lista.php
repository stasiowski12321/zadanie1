<?php
include 'db.php';

$limit = 5; 
$page = isset($_GET['page']) ? (int)$_GET['page'] : 0;
$offset = $page * $limit;

$countSql = "SELECT COUNT(*) as total FROM wiadomosci";
$countResult = $conn->query($countSql);
$totalRecords = $countResult->fetch_assoc()['total'];

if ($totalRecords == 0) {
    echo json_encode(['result' => [], 'totalRecords' => 0]);
    $conn->close();
    exit;
}

if ($offset >= $totalRecords) {
    echo json_encode(['result' => [], 'totalRecords' => $totalRecords]);
    $conn->close();
    exit;
}

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
    $responses = $result->fetch_all(MYSQLI_ASSOC);
}

foreach ($responses as $index => $response) {

    $response['end'] = false;


    if ($offset + $index + 1 >= $totalRecords) {
        $response['end'] = true; 
    }

    $responses[$index] = $response;
}

$data = [
    'result' => $responses,
    'totalRecords' => $totalRecords
];

echo json_encode($data);

$conn->close();
?>
