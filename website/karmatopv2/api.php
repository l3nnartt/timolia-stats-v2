<?php require_once 'process.php'; 
$mysqli = new mysqli('10.35.46.56:3306', 'k132321_bot', 'karmatopISTdie187gang', 'k132321_karmatop') or die(mysqli_error($mysqli));
$result = $mysqli->query("SELECT * FROM data ORDER BY karma+0 DESC") or die($mysqli->error);
arsort($row['karma']);
?>
[<?php 
while ($row = $result->fetch_assoc()): ?>
{"<?php echo $row['player']; ?>":"<?php echo $row['karma']; ?>"},
<?php endwhile; ?>]
<?php
function pre_r( $array ) {
    echo '<pre>';
    print_r($array);
    echo '</pre>';
}
?>