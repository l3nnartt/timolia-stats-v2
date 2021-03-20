<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
define('DB_SERVER', '10.35.46.56:3306');
define('DB_USERNAME', 'k132321_bot');
define('DB_PASSWORD', 'karmatopISTdie187gang');
define('DB_NAME', 'k132321_karmatop');
 
/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>