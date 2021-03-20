<?php
    $username = "";
    $email = "";
    $errors = array();

    //db connection
    $db = mysqli_connect('test', 'k132321_bot', 'kiwi100l.l', 'k132321_timolia');

    //button click
    if (isset($_POST['register'])) {
        $username = mysql_real_escape_string($_POST['username']);
        $email = mysql_real_escape_string($_POST['email']);
        $password_1 = mysql_real_escape_string($_POST['password_1']);
        $password_2 = mysql_real_escape_string($_POST['password_2']);

        //felder ausgefüllt?
        if (empty($username)) {
            array_push($errors, "Benutzername ist erforderlich");
        }
        if (empty($email)) {
            array_push($errors, "Email ist erforderlich");
        }
        if (empty($password_1)) {
            array_push($errors, "Passwort ist erforderlich");
        }

        if ($password_1 != $password_2) {
            array_push($errors, "Passwörter stimmen nicht überein");
        }

        // kein error dann speichern
        if (count($errors) == 0) {
            $password = md5($password_1); //verschlüsselung
            $sql = "INSERT INTO users (username, email, password)
                    VALUES ('$username', '$email', '$password')";
            mysqli_query($db, $sql);
        }
    }
?>