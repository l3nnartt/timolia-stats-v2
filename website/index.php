<!DOCTYPE html>
<html lang="de">

    <head>
        <!--Head, import Bootstrap-->
        <meta charset="UTF-8">
        <title>Karmatop.de | Startseite</title>

        <!--Import Head-->
        <?php include"assets/header.php"; ?>
    </head>

    <body>
        <!--Navbar-->
        <?php include"assets/navbar.php"; ?>

        <!--Cards-->
        <div class="container padding">
            <div class="row padding">

                <!--Card 1-->
                <div class="col-sm-6 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <h4 class="card-title">Website</h4>
                            <p>Auf dieser Website findest du die Karmatop Liste, welche alle Spieler die auf dem Timolia Achievement Community beinhaltet, und deren Karma auflistet. Wenn du mehr erfahren möchtest oder eine Frage hast, dann komm doch einfach auf den Timolia Achievment Community Discord</p>
                        </div>
                        <div class="card-footer">
                            <a href="karmatop.php" class="btn btn-primary w-100">Zur Karmatop</a>
                        </div>
                    </div>
                </div>

                <!--Card 2-->
                <div class="col-sm-6 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <h4 class="card-title">Discord-Bot</h4>
                            <p>Einer unserer Dienste ist ein Discord Bot welcher euch ermöglicht eure Statistiken von Timolia abzufragen, außerdem bietet dieser einen Karmatop und einen Userinfo Command um immer die Karmapunkte einzelner Spieler nachschauen zu können.</p>
                        </div>
                        <div class="card-footer">
                            <a href="https://discord.com/api/oauth2/authorize?client_id=803579214553022484&permissions=8&scope=bot" class="btn btn-primary w-100">Zum Discord-Bot</a>
                        </div>
                    </div>
                </div>

                <!--Card 3-->
                <div class="col-sm-6 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <h4 class="card-title">Discord-Server</h4>
                            <p>Um Stets auf dem neusten Stand zu sein ist es sinnvoll auf dem Achievement Discord zu joinen, dort werden immer die neusten Infos bekannt gegeben.</p>
                        </div>
                        <div class="card-footer">
                            <a href="https://discord.gg/t9Jny6ds3E" class="btn btn-primary w-100">Discord-Server beitreten</a>
                        </div>
                    </div>
                </div>

                <!--Card 4-->
                <div class="col-sm-6 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <h4 class="card-title">Labymod Addon</h4>
                            <p>Dieses Addon aktualisiert automatisch deine aktuellen Karmapunkte mit der Website wenn du auf Timolia joinst. Außerdem gibt es weitere Features wie Stats in Pixelspace und eine AutoGG Funktionen für jeden Modus.</p>
                        </div>
                        <div class="card-footer">
                            <a href="https://github.com/l3nnartt/timolia-addon-1.8/releases" class="btn btn-primary w-100">Download auf GitHub</a>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <!--Scripts-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>

        <!--Old for Burger Menu-->
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

    </body>

    <footer>
        <!--Footer-->
        <?php include"assets/footer.php"; ?>
    </footer>

</html>