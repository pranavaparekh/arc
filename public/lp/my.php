<?php
$ip = $_SERVER['REMOTE_ADDR'];

echo $ip;
  function ip_details($ip) {
$json = file_get_contents("http://ipinfo.io/{$ip}/geo");
$details = json_decode($json);
return $details;
?>