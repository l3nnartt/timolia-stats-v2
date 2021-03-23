<?php

session_start();

$mysqli = new mysqli('10.35.46.56:3306', 'k132321_bot', 'karmatopISTdie187gang', 'k132321_karmatop') or die(mysqli_error($mysqli));

$id = 0;
$update = false;
$player = "";
$karma = "";
$i = "1";

if (isset($_POST['save'])){
    $player = $_POST['player'];
    $karma = $_POST['karma'];

    $mysqli->query("INSERT INTO data (player, karma) VALUES('$player', '$karma')") or
            die($mysqli->error);

    $_SESSION['message'] = "Der Eintrag wurde erfolgreich gespeichert!";
    $_SESSION['msg_type'] = "sucess";

    header('location: control/index.php');
}

if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $mysqli->query("DELETE FROM data WHERE id=$id") or die($mysqli->error());

    $_SESSION['message'] = "Der Eintrag wurde erfolgreich gelöscht!";
    $_SESSION['msg_type'] = "danger";

    header('location: control/index.php');
}

if (isset($_GET['edit'])) {
    $id = $_GET['edit'];
    $update = true;
    $result = $mysqli->query("SELECT * FROM data WHERE id=$id") or die($mysqli->error());
    if (count($result)==1){
        $row = $result->fetch_array();
        $player = $row['player'];
        $karma = $row['karma'];
    }
}

if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $player = $_POST['player'];
    $karma = $_POST['karma'];

    $mysqli->query("UPDATE data SET player='$player', karma='$karma' WHERE id=$id") or die($mysqli->error);

    $_SESSION['message'] = "Der Eintrag wurde erfolgreich bearbeitet!";
    $_SESSION['msg_type'] = "warning";
    
    header('location: control/index.php');
}