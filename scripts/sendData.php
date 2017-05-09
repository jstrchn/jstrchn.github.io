<?php
$to      = 'strachanj@ceu.edu';
$subject = 'Experiment completed: Participant data attached';
$message = $data;
$headers = 'From: noreply@somby.ceu.edu' . "\r\n" .
'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);
?>