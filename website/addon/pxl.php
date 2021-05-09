<?php
if(!empty($_GET["name"]) && !empty($_GET["color"]) && !empty($_GET["uuid"]) && strlen($_GET["name"]) >= 3 && strlen($_GET["name"]) <= 16 && strlen($_GET["uuid"]) == 36){
    $name = $_GET["name"];
    $uuid = $_GET["uuid"];
    $color = $_GET["color"];
    $serverid = "26c142208fc4cb3e6ed4ebc598d989b4848786ed";
    $response = file_get_contents("https://sessionserver.mojang.com/session/minecraft/hasJoined?username=".$name."&serverId=".$serverid);
    if(!empty($response)){
        $json = json_decode($response, true);
        $id = $json["id"];
        if($id == str_replace("-", "", $uuid))
            $mysqli = new mysqli('10.35.46.56:3306', 'k132321_bot', 'karmatopISTdie187gang', 'k132321_karmatop') or die(mysqli_error($mysqli));
            $sqlselect = $mysqli->query("SELECT COUNT(*) FROM blocks WHERE uuid = '$uuid'");

            $farbe = intval($mysqli->query("SELECT $color FROM `blocks` WHERE uuid = '$uuid'")->fetch_array()[0]);
            $farbeNEW = $farbe + 1;

            $total = intval($mysqli->query("SELECT total FROM `blocks` WHERE uuid = '$uuid'")->fetch_array()[0]);
            $totalNEW = $total + 1;

            
            if (intval($sqlselect->fetch_array()[0]) > 0) {
                $mysqli->query("UPDATE blocks SET player='$name', $color='$farbeNEW' WHERE uuid='$uuid'") or die($mysqli->error);
            } else {
                $mysqli->query("INSERT INTO blocks (player, total, $color, uuid) VALUES('$name', '1', '1', '$uuid')") or die($mysqli->error);
            }

            http_response_code(200);
            return;
        }
        http_response_code(401);
    } else {
        http_response_code(404);
    }
?>

<!doctype html>
<html>
    <h3> Status: OK </h3>
</html>