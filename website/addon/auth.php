<?php

//$mysqli = new mysqli('10.35.46.56:3306', 'k132321_bot', 'karmatopISTdie187gang', 'k132321_karmatop') or die(mysqli_error($mysqli));
//$sqlselect = $mysqli->query("SELECT COUNT(*) FROM data WHERE player = 'weaweawe'");


//var_dump(intval($sqlselect->fetch_array()[0]));


if(!empty($_GET["name"]) && !empty($_GET["karma"]) && !empty($_GET["uuid"]) && strlen($_GET["name"]) >= 3 && strlen($_GET["name"]) <= 16 && strlen($_GET["uuid"]) == 36){
    $name = $_GET["name"];
    $uuid = $_GET["uuid"];
    $karma = $_GET["karma"];
    $serverid = "26c142208fc4cb3e6ed4ebc598d989b4848786ed";
    $response = file_get_contents("https://sessionserver.mojang.com/session/minecraft/hasJoined?username=".$name."&serverId=".$serverid);
    if(!empty($response)){
        $json = json_decode($response, true);
        $id = $json["id"];
        if($id == str_replace("-", "", $uuid))
            
            //Bums
            $mysqli = new mysqli('10.35.46.56:3306', 'k132321_bot', 'karmatopISTdie187gang', 'k132321_karmatop') or die(mysqli_error($mysqli));
            $sqlselect = $mysqli->query("SELECT COUNT(*) FROM data WHERE uuid = '$uuid'");

            if (intval($sqlselect->fetch_array()[0]) > 0) {
                $mysqli->query("UPDATE data SET player='$name', karma='$karma' WHERE uuid='$uuid'") or die($mysqli->error);
            } else {
                $mysqli->query("INSERT INTO data (player, karma, uuid) VALUES('$name', '$karma', '$uuid')") or die($mysqli->error);
            }

            $mysqli->close();

            http_response_code(200);
            return;
        }
        http_response_code(401);
    } else {
        http_response_code(404);
    }
?>