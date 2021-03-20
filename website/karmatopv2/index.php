<!DOCTYPE html>
<html lang="en">
<head>
  <!--Head, import Bootstrap-->
    <meta charset="UTF-8">
    <title>Karmatop</title>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/darkly/bootstrap.min.css" integrity="sha384-nNK9n28pDUDDgIiIqZ/MiyO3F4/9vsMtReZK39klb/MtkZI3/LtjSjlmyVPS3KdN" crossorigin="anonymous">
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>

<!--Makes a Wrapper-->
<div class="container">

<!--Connect to process.php-->
<?php require_once 'process.php'; ?>

<!--Table/CRUD-->
<?php require_once 'process.php'; 
$mysqli = new mysqli('10.35.46.56:3306', 'k132321_bot', 'karmatopISTdie187gang', 'k132321_karmatop') or die(mysqli_error($mysqli));
$result = $mysqli->query("SELECT * FROM data ORDER BY CAST karma") or die($mysqli->error);
arsort($row['karma']);
//pre_r($result);
//pre_r($result->fetch_assoc());
?>
<div class="row justify-content-center">
<table class="table">
    <thead>
    <tr>
        <th>Spieler</th>
        <th>Karma</th>
    </tr>
    </thead>
    <?php 
    while ($row = $result->fetch_assoc()): ?>
    <tr>
        <td><?php echo $row['player']; ?></td>
        <td><?php echo $row['karma']; ?></td>
    </tr>
    <?php endwhile; ?>
</table>
</div>
<?php
function pre_r( $array ) {
    echo '<pre>';
    print_r($array);
    echo '</pre>';
}
?>
<!--Footer-->
<p>
<a href="https://lennartloesche.de/datenschutz.html">Datenschutz</a> - <a href="login.php">Login</a> - <a href="index.php">Startseite</a>
<p>

</div>