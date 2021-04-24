<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="de">
  <head>
    <!--Head/Title-->
    <title>Karmatop.de | Controlpanel</title>

    <!--Import Head-->
    <?php include"../assets/header.php"; ?>
  </head>

  <!--Body-->
  <body>
  
    <!--Shows an alert after edit, delete, save-->
    <?php if (isset($_SESSION['message'])): ?>
      <div class="alert alert-dismissible alert-<?=$_SESSION['msg_type']?>">
        <p class="mb-0">
          <?php 
              echo $_SESSION['message'];
              unset($_SESSION['message']);
            ?>
        </p>
      </div>
    <?php endif ?>

    <!--Import Navbar-->
    <?php include"../assets/navbar.php"; ?>

    <!--Makes a Container-->
    <div class="container">

      <!--Jumbotron-->
      <div class="jumbotron">

        <!--Shows Username-->
        <div class="page-header">
          <h1>Hallo, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>!</h1>
        </div>

        <!--Buttons, Control-->
        <p>
          <a href="reset-password.php" class="btn btn-warning">Reset Passwort</a>
          <a href="logout.php" class="btn btn-danger">Abmelden</a>
        </p>

        <!--Connect to process.php-->
        <?php require_once '../process.php'; ?>

        <!--New entry/CRUD-->
        <div class="row justify-content-center">
          <form action="../process.php" method="POST">
            <table class="table table-striped">
              <input type="hidden" name="id" value="<?php echo $id; ?>">
                <thead>
                <tr>
                    <th>Spieler</th>
                    <th>Karma</th>
                    <th>Control</th>
                </tr>
                </thead>
                <tr>
                  <td>
                    <div class="form-group">
                      <input type="text" name="player" class="form-control" value="<?php echo $player; ?>" placeholder="Spieler" id="inputDefault">
                    </div>
                  </td>
                  <td>
                    <div class="form-group">
                      <input type="text" name="karma" class="form-control" value="<?php echo $karma; ?>" placeholder="Karma" id="inputDefault">
                    </div>
                  </td>
                  <td>
                    <div class="form-group">
                      <?php if ($update == true): ?>
                        <button class="btn btn-info" type="submit" name="update">Änderung übernehmen</button>
                      <?php else: ?>
                        <button class="btn btn-info" type="submit" name="save">Speichern</button>
                      <?php endif ?>
                    </div>
                  </td>
                </tr>
            </table>
          </form>
        </div>
      
        <!--Table/CRUD-->
        <?php require_once '../process.php'; 
        $mysqli = new mysqli('10.35.46.56:3306', 'k132321_bot', 'karmatopISTdie187gang', 'k132321_karmatop') or die(mysqli_error($mysqli));
        $result = $mysqli->query("SELECT * FROM data ORDER BY karma+0 DESC") or die($mysqli->error);
        arsort($row['karma']);
        ?>
        <div class="row justify-content-center">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Spieler</th>
                    <th>Karma</th>
                    <th>Control</th>
                </tr>
                </thead>
                <?php 
                while ($row = $result->fetch_assoc()): ?>
                <tr>
                  <td><?php echo $row['player']; ?></td>
                  <td><?php echo $row['karma']; ?></td>
                  <td>
                    <a href="index.php?edit=<?php echo $row['id']; ?>"
                      class="btn btn-info">Bearbeiten</a>
                    <a href="index.php?delete=<?php echo $row['id']; ?>"
                      class="btn btn-danger">Löschen</a>
                  </td>
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
      <?php include"../assets/footer.php"; ?>
  </footer>

</html>