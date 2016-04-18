<?php
if ((isset($_POST['name'])) && (strlen(trim($_POST['name'])) > 0)) {
	$name = stripslashes(strip_tags($_POST['name']));
} else {$name = 'No first name field entered';}
if ((isset($_POST['designation'])) && (strlen(trim($_POST['designation'])) > 0)) {
	$designation = stripslashes(strip_tags($_POST['designation']));
} else {$designation = 'No designation entered';}
if ((isset($_POST['company'])) && (strlen(trim($_POST['company'])) > 0)) {
	$company = stripslashes(strip_tags($_POST['company']));
} else {$company = 'No company field entered';}
if ((isset($_POST['email'])) && (strlen(trim($_POST['email'])) > 0)) {
	$email = stripslashes(strip_tags($_POST['email']));
} else {$email = 'No email field entered';}
if ((isset($_POST['tel'])) && (strlen(trim($_POST['tel'])) > 0)) {
	$tel = $_POST['tel'];
} else {$tel = 'No tel entered';}
if ((isset($_POST['comment'])) && (strlen(trim($_POST['comment'])) > 0)) {
	$comment = $_POST['comment'];
} else {$comment = 'No comment entered';}
$ip=$_SERVER['REMOTE_ADDR'];
if ((isset($_POST['form'])) && (strlen(trim($_POST['form'])) > 0)) {
	$form = stripslashes(strip_tags($_POST['form']));
} else {$form = 'No form entered';}
ob_start();

/*$con = mysql_connect("arancafdb.db.4413882.hostedresource.com","arancafdb","Aranca2011") or die(mysql_error());
mysql_select_db("arancafdb", $con) or die(mysql_error());
$sql="INSERT INTO lma2012 (name ,title ,company , company_type ,tel ,email ,message)VALUES('$name','$title','$company','$type','$tel','$email','$message')";
mysql_query($sql,$con) or die(mysql_error());
mysql_close($con); */ 
?>
<html>
<head>
<style type="text/css">
</style>
</head>
<body>
<div style="display:none;">
<table width="550" border="1" cellspacing="2" cellpadding="2">

  <tr bgcolor="#eeffee">
    <td>Name</td>
    <td><?php echo $name; ?></td>
  </tr>       
 <!-- <tr bgcolor="#eeeeff">
    <td>Designation</td>
    <td><?php //echo $designation; ?></td>
  </tr> -->
<tr bgcolor="#eeeeff">
    <td>Company</td>
    <td><?php echo $company; ?></td>
  </tr>   
    <tr bgcolor="#eeffee">
    <td>Email</td>
    <td><?php echo $email; ?></td>
  </tr>
<tr bgcolor="#eeffee">
    <td>Tel</td>
    <td><?php echo $tel; ?></td>
  </tr>
    
  <!-- <tr bgcolor="#eeffee">
    <td>Comments</td>
    <td><?php //echo $comment; ?></td>
  </tr>  -->
   <tr bgcolor="#ffffee">
    <td>IP Address</td>
    <td><?php echo $ip; ?></td>
  </tr>
</table></body>
</html>
</div>
<?php
if(isset($_POST['url']) && $_POST['url'] == ''){
$body = ob_get_contents();
$to = "info@aranca.com";
$fromaddress = "info@aranca.com";
$fromname = "Aranca";

require("phpmailer.php");

$mail = new PHPMailer();

$mail->From     = $email;
$mail->FromName = "";
$mail->AddAddress("info@aranca.com");
$mail->AddBCC("girish.bhise@aranca.com");
$mail->AddBCC("");

$mail->WordWrap = 50;
$mail->IsHTML(true);

$mail->Subject  =  $_POST['subject'];
$mail->Body     =  $body;
$mail->AltBody  =  "This is the text-only body";

if(!$mail->Send()) {
	$recipient = "ilyasnone@gmail.com";
	$subject = 'Contact form failed';
	$content = $body;	
  mail($recipient, $subject, $content, "From: mail@yourdomain.com\r\nReply-To: $email\r\nX-Mailer: DT_formmail");  
}
header('Location:'.$_POST['redirect']) ;
}
else{
	echo "Have a good Day!";
}

?>
