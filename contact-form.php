<?php
// Validate email input
if(filter_var($_POST["userEmail"], FILTER_VALIDATE_EMAIL) && !empty($_POST["userName"]) && !empty($_POST["subject"]) && !empty($_POST["content"])) {

    $toEmail = "bmnicolae@gmail.com";
    $userName = htmlspecialchars($_POST["userName"]);
    $userEmail = htmlspecialchars($_POST["userEmail"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $content = htmlspecialchars($_POST["content"]);

    $mailHeaders = "From: $userName <$userEmail>\r\n";
    
    if(mail($toEmail, $subject, $content, $mailHeaders)) {
        echo "Contact Mail Sent. Thank you!";
    } else {
        echo "Problem in Sending Mail.";
    }
} else {
    echo "Invalid Input. Please check your form and try again.";
}
?>