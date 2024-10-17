<?php
function isEmail($email) {
    return preg_match('/^[a-zA-Z]+(\d+)?(\.[a-zA-Z]+)?@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/', $email);
}
function isString($string) {
    return preg_match ('/^[a-zA-Z ]+$/', $string);
}
function isComment($string){
    return preg_match('/^[A-Za-z0-9\s-]+/',$string);
}
function isPassword($password){
    return preg_match('/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/', $password);
}
?>