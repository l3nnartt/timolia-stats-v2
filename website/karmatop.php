<!DOCTYPE html>
<html lang="de">
    <head>
        <!--Head, import Bootstrap-->
        <title>Karmatop.de | Karmatop</title>

        <!--Import Head-->
        <?php include"assets/header.php"; ?>
    </head>
    <body>
        <!--Import Navbar-->
        <?php include"assets/navbar.php"; ?>

        <!--Makes a Wrapper-->
        <div class="container">

            <!--Connect to process.php-->
            <?php require_once 'process.php'; ?>

            <!--Table/CRUD-->
            <div class="jumbotron">

                <!--DB Connection-->
                <?php require_once 'process.php';
                $mysqli = new mysqli('10.35.46.56:3306', 'k132321_bot', 'karmatopISTdie187gang', 'k132321_karmatop') or die(mysqli_error($mysqli));
                $result = $mysqli->query("SELECT * FROM data ORDER BY karma+0 DESC") or die($mysqli->error);
                arsort($row['karma']);
                ?>

                <!--Table-->
                <div class="row justify-content-center">
                    <table class="table table-bordered table-striped table-dark">
                        <thead class="thead-dark">
                            <tr>
                                <th>Platz</th>
                                <th>Spieler</th>
                                <th>Karma</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php while ($row = $result->fetch_assoc()): ?>
                                <tr>
                                    <td><?php echo $i++; ?></td>
                                    <td><?php echo $row['player']; ?></td>
                                    <td><?php echo $row['karma']; ?></td>
                                </tr>
                            <?php endwhile; ?>
                        </tbody>
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

        </div>

        <!--Scripts-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>

        <!--alt?-->
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

    </body>

    <footer>
        <!--Footer-->
        <?php include"assets/footer.php"; ?>
    </footer>

</html>