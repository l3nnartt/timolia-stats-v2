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
<html lang="en">
<head>
  <!--Head, import Bootstrap-->
    <meta charset="UTF-8">
    <title>Karmatop - Controlpanel</title>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/darkly/bootstrap.min.css" integrity="sha384-nNK9n28pDUDDgIiIqZ/MiyO3F4/9vsMtReZK39klb/MtkZI3/LtjSjlmyVPS3KdN" crossorigin="anonymous">
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>

<!--Shows an alert after edit, delete, save-->
<?php if (isset($_SESSION['message'])): ?>
  <div class="alert alert-<?=$_SESSION['msg_type']?>">
    <?php 
      echo $_SESSION['message'];
      unset($_SESSION['message']);
    ?>
  </div>
<?php endif ?>

<!--Makes a Wrapper-->
<div class="container">

  <!--Shows Username-->
  <div class="page-header">
    <h1>Hallo, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>!</h1>
  </div>
  <!--Buttons, Control-->
  <p>
    <a href="reset-password.php" class="btn btn-warning">Passwort reset</a>
    <a href="logout.php" class="btn btn-danger">Abmelden</a>
  </p>

  <!--Connect to process.php-->
  <?php require_once 'process.php'; ?>

  <!--Table/CRUD-->
  <?php require_once 'process.php'; 
    $mysqli = new mysqli('10.35.46.56:3306', 'k132321_bot', 'karmatopISTdie187gang', 'k132321_karmatop') or die(mysqli_error($mysqli));
    $result = $mysqli->query("SELECT * FROM data") or die($mysqli->error);
    //pre_r($result);
    //pre_r($result->fetch_assoc());
  ?>
  <div class="row justify-content-center">
    <table class="table">
      <thead>
        <tr>
          <th>Spieler</th>
          <th>Karma</th>
          <th colspan="2">Aktion</th>
        </tr>
      </thead>
      <?php 
        while ($row = $result->fetch_assoc()): ?>
        <tr>
          <td><?php echo $row['player']; ?></td>
          <td><?php echo $row['karma']; ?></td>
          <td>
            <a href="welcome.php?edit=<?php echo $row['id']; ?>"
                class="btn btn-info">Bearbeiten</a>
            <a href="welcome.php?delete=<?php echo $row['id']; ?>"
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

  <!--New entry/CRUD-->
  <div class="row justify-content-center">
    <form action="process.php" method="POST">
      <input type="hidden" name="id" value="<?php echo $id; ?>">
      <div class="form-group">
        <label>Spieler</label>
        <input type="text" name="player" class="form-control" value="<?php echo $player; ?>" placeholder="Spieler" id="inputDefault">
      </div>
      <div class="form-group">
        <label>Karma</label>
        <input type="text" name="karma" class="form-control" value="<?php echo $karma; ?>" placeholder="Karma" id="inputDefault">
      </div>
      <div class="form-group">
        <?php if ($update == true): ?>
          <button class="btn btn-info" type="submit" name="update">Änderung übernehmen</button>
        <?php else: ?>
          <button class="btn btn-info" type="submit" name="save">Speichern</button>
        <?php endif ?>
      </div>
    </form>
  </div>
<!--Footer-->
<p>
    <a href="https://lennartloesche.de/datenschutz.html">Datenschutz</a> - <a href="login.php">Login</a> - <a href="index.php">Startseite</a>
<p>  
</div>

</body>
</html>