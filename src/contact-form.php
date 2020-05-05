<?php
$toEmail = "bmnicolae@gmail.com";
$mailHeaders = "From: " . $_POST["userName"] . "<". $_POST["userEmail"] .">\r\n";
if(mail($toEmail, $_POST["subject"], $_POST["content"], $mailHeaders)) {
print "Contact Mail Sent. Thank you!";
} else {
print "Problem in Sending Mail.";
}
?>
