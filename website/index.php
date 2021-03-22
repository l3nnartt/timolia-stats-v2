<!DOCTYPE html>
<html lang="en">
<head>
  <!--Head, import Bootstrap-->
    <meta charset="UTF-8">
    <title>Karmatop.de | Startseite</title>
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://karmatop.de/">
    <meta property="og:title" content="karmatop.de - Startseite">
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

<!--Navbar-->
<?php include"navbar.php"; ?>

<!--Makes a Wrapper-->
<div class="container">

    <!--Container Karmatop-->
    <br><br>
    <div class="jumbotron">
        <p class="lead">Karmatop</p>
        <hr class="my-4">
        <p>Auf dieser Website findest du die Karmatop Liste, welche alle Spieler die auf dem Timolia Achievment Community beinhaltet, und deren Karma auflistet. Wenn du mehr erfahren möchtest oder eine Frage hast, dann komm doch einfach auf den Timolia Achievment Community Discord</p>
        <p class="lead">
            <a class="btn btn-primary btn-lg" href="karmatop.php" role="button">Zur Karmatop</a>
        </p>
    </div>
    <!--Container Discordbot-->
    <br><br>
    <div class="jumbotron">
        <p class="lead">Timolia Statistiken</p>
        <hr class="my-4">
        <p>Außerdem gibt es den Timolia Statistiken Discord-Bot welcher euch ermöglicht eure Timolia Statistiken abzufragen, euch Informationen über einen Spieler gibt oder andere nützliche Informationen zu Timolia. Weitere Informationen zum Discord-Bot findest du auf der entsprechenden Seite</p>
        <p class="lead">
            <a class="btn btn-primary btn-lg" href="bot.php" role="button">Zum Discord-Bot</a>
        </p>
    </div>
    <!--Container Timolia Achievment Community-->
    <br><br>
    <div class="jumbotron">
        <p class="lead">Timolia Achievment Community</p>
        <hr class="my-4">
        <p>Neben unseren Online Diensten gibt es auch einen Discord Server auf welchem wir uns über Achievments unterhalten. Außerdem erhaltet ihr Informationen wenn es neue Achievments gibt, oder es andere Neuigkeiten gibt. Wenn du auch auf der Karmatop Liste eingetragen werden möchtest, oder fragen zu Achievments hast kannst du gerne auf dem Server vorbeischauen</p>
        <p class="lead">
            <a class="btn btn-primary btn-lg" href="https://discord.gg/t9Jny6ds3E" role="button">Zum Discord-Server</a>
        </p>
    </div>

    <!--Footer-->
    <?php include"footer.php"; ?>

</div>