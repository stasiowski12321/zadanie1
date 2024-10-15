<?php
    include "db.php";
    include "regex.php";
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST'){

        $imie = isset($_POST['imie']) ? $_POST['imie'] : '';
        $nazwisko = isset($_POST['nazwisko']) ? $_POST['nazwisko'] : '';
        $email = isset($_POST['email']) ? $_POST['email'] : '';
        $komentarz = isset($_POST['komentarz']) ? $_POST['komentarz'] : '';
        $zdjecie = isset($_POST['plikDoPrzeslania']) ? $_POST['plikDoPrzeslania'] : '';

        $targetDir = "zdjecia/";
        if($_FILES["file"]["error"] == 0){
            $targetFile = $targetDir . basename($_FILES["file"]["name"]);
            $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
            $fileName = basename($_FILES["file"]["name"]);
            
            $check = getimagesize($_FILES["file"]["tmp_name"]);
            if ($check === false) {
                $errors[] = "Plik nie jest obrazem.";
            }
    
            $allowedTypes = ['jpg', 'jpeg', 'png'];
            if (!in_array($imageFileType, $allowedTypes)) {
                $errors[] = "Tylko pliki JPG, JPEG i PNG są dozwolone.";
            }
    
            $hashedSrc = md5($fileName) . "." . $imageFileType;
    
            if (empty($errors) && move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
                // Zmiana nazwy pliku
                if (rename($targetFile, $targetDir . $hashedSrc)) {
                    $errors[] = "Plik " . htmlspecialchars($fileName) . " został przesłany i przemianowany na " . htmlspecialchars($hashedSrc) . ".";
                } else {
                    $errors[] = "Plik został przesłany, ale wystąpił błąd podczas zmiany nazwy.";
                }
            } else {
                if (empty($errors)) {
                    $errors[] = "Wystąpił błąd podczas przesyłania pliku.";
                }
            }
    
        };

        $isvalidated = true;
        $errors = [];

        if (!isString($imie)) {
            $errors[] = "Niepoprawne imię";
            $isvalidated = false;
        }
    
        if (!isString($nazwisko)) {
            $errors[] = "Niepoprawne nazwisko";
            $isvalidated = false;
        }
    
        if (!isEmail($email)) {
            $errors[] = "Niepoprawny adres e-mail";
            $isvalidated = false;
        }
    
        if (!isComment($komentarz)) {
            $errors[] = "Zły format komentarza";
            $isvalidated = false;
        }
        
        $sqlNAzwisko = "SELECT * FROM `wiadomosci` WHERE email = '$email'";
        $result = $conn->query($sqlNAzwisko);

        if ($result && $result->num_rows > 0) {
            $errors[] = "Nie można dodać rekordu do bazy (Podaj inny email)";
            $isvalidated = false;
        }

        if ($isvalidated) {
            $sql = "INSERT INTO `wiadomosci` (`imie`, `nazwisko`, `email`, `wiadomosc`) VALUES ('$imie', '$nazwisko', '$email', '$komentarz')";
            if ($conn->query($sql)) {
                echo json_encode(["success" => true, "wiadomosc" => "dodano do bazy"]);

                    if(isset($hashedSrc)){
                        $resid = $conn->insert_id;
                        $sqlsrc = "INSERT INTO `zdjecia` (`idWiadomosci`, `src`) VALUES ('$resid', '$hashedSrc')";
                        $conn->query($sqlsrc);
                    }
                
            } else {
                $errors[] = "Błąd podczas wysyłania: " . $conn->error;
            }
        }

        if (!empty($errors)) {
        echo json_encode(["success" => false, "errors" => $errors]);
    }

    $conn->close();
}
?>