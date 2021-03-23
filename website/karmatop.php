<!DOCTYPE html>
<html lang="en">
<head>
  <!--Head, import Bootstrap-->
    <meta charset="UTF-8">
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
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Platz</th>
                    <th>Spieler</th>
                    <th>Karma</th>
                </tr>
                </thead>
                <?php 
                while ($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?php echo $i++; ?></td>
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
    <?php include"assets/footer.php"; ?>

</div>