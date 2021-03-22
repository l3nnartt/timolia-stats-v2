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

<!--Import Navbar-->
<?php include"navbar.php"; ?>

<!--Makes a Wrapper-->
<div class="container">

    <!--Container Discordbot-->
    <br><br>
    <div class="jumbotron">
        <p class="lead">Timolia Statistiken Discord-Bot</p>
        <hr class="my-4">
        <p>Dieser Bot fragt die Statistiken der Timolia.de Website ab, schreibt diese in ein Embed und schreibt dir diese Anschließend. Außerdem bietet er die Möglichkeit die aktuelle Karmatop Liste anzuzeigen. Die neue Version des Bots unterstützt außerdem die Toplisten der Spielmodi 4rena, DNA, Castles, Mineception, Splun, Brainbow, InTime und TSpiele. Die Statistiken werden aktuell von der Timolia Website abgefragt(https://timolia.de/stats), die Daten sind jedoch nur so aktuell wie auch die Website aktuell ist. Der Bot bietet einen ausführlichen Hilfebefehl(+help) und ist voll kompatibel mit jedem Servern. Achtet bitte jedoch darauf das der Bot genügend Rechte hat um Nachrichten lesen und schreiben zu können. Jeder Spielmodus, welchen ihr unter Timolia.de/stats finden könnte wird auch vom Bot unterstützt.</p>
        <p class="lead">
            <a class="btn btn-primary btn-lg" href="https://discord.com/api/oauth2/authorize?client_id=803579214553022484&permissions=93248&scope=bot" role="button">Discord-Bot zum Server hinzufügen</a>
        </p>
    </div>

    <!--Top.gg-->
    <a href="https://top.gg/bot/803579214553022484">
        <img src="https://top.gg/api/widget/803579214553022484.svg" alt="Timolia Statistiken" />
    </a>
    <br><br>

</div>

<!--Footer-->
<?php include"footer.php"; ?>