<!DOCTYPE html>
<html lang="en">
<head>
  <!--Head, import Bootstrap-->
    <meta charset="UTF-8">
    <title>Karmatop.de | Karmatop</title>
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://karmatop.de/">
    <meta property="og:title" content="karmatop.de - Karmatop">
    <meta property="og:description" content="Hier findest du die Website zum Timolia Statistiken Discord Bot, sowie die Karmatop Liste und weitere Informationen über den Bot und den Timolia Achievment Community Discord.">
    <meta property="og:image" content="https://i.imgur.com/Pa1h7gG.png">
    <meta name="theme-color" content="#7289da">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/darkly/bootstrap.min.css" integrity="sha384-nNK9n28pDUDDgIiIqZ/MiyO3F4/9vsMtReZK39klb/MtkZI3/LtjSjlmyVPS3KdN" crossorigin="anonymous">
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>

<!--Import Navbar-->
<?php include"navbar.php"; ?>

<!--Makes a Wrapper-->
<div class="container">

    <!--Connect to process.php-->
    <?php require_once 'process.php'; ?>

    <!--Table/CRUD-->
    <br><br>
    <div class="jumbotron">

        <!--Title-->
        <p class="lead">Karmatop</p>

        <!--DB Connection-->
        <?php require_once 'process.php';
        $mysqli = new mysqli('10.35.46.56:3306', 'k132321_bot', 'karmatopISTdie187gang', 'k132321_karmatop') or die(mysqli_error($mysqli));
        $result = $mysqli->query("SELECT * FROM data ORDER BY karma+0 DESC") or die($mysqli->error);
        arsort($row['karma']);
        ?>

        <!--Table-->
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

        <!--Loop-->
        <?php
        function pre_r( $array ) {
            echo '<pre>';
            print_r($array);
            echo '</pre>';
        }
        ?>

    </div>

    <!--Footer-->
    <?php include"footer.php"; ?>

</div>