<?php
if ((isset($_POST['firstname'])) && (strlen(trim($_POST['firstname'])) > 0)) {
	$firstname = stripslashes(strip_tags($_POST['firstname']));
} else {$firstname = 'No first name field entered';}
if ((isset($_POST['lastname'])) && (strlen(trim($_POST['lastname'])) > 0)) {
  $lastname = stripslashes(strip_tags($_POST['lastname']));
} else {$lastname = 'No last name field entered';}
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
  $funnel = "SQL";
} else {$comment = 'No comment entered'; $funnel = "MQL";}
$ip=$_SERVER['REMOTE_ADDR'];
if ((isset($_POST['form'])) && (strlen(trim($_POST['form'])) > 0)) {
	$form = stripslashes(strip_tags($_POST['form']));
} else {$form = 'No form entered';}
$formname = $_POST['_form_name_'];
$subscribe = $_POST['subscribe'];
ob_start();

/*$con = mysql_connect("arancafdb.db.4413882.hostedresource.com","arancafdb","Aranca2011") or die(mysql_error());
mysql_select_db("arancafdb", $con) or die(mysql_error());
$sql="INSERT INTO lma2012 (name ,title ,company , company_type ,tel ,email ,message)VALUES('$name','$title','$company','$type','$tel','$email','$message')";
mysql_query($sql,$con) or die(mysql_error());
mysql_close($con); */
?>

<?php

    /**
    * Post form submission data to Act-On and convert visitors to known via cURL, allowing no direct touch
    * between Act-On and your website vistitor's browser to be necessary
    */

    class ActonConnection
    {

      protected $_postItems = array();

      protected function getPostItems()
      {
        return $this->_postItems;
      }

    /**
    * for setting your form's POST items (key is your form input's name, value is the input value)
    * @param string $key first part of key=value for form field submission (name in name=John)
    * @param string $value latter part of key=value for form field submission (John in name=John)
    */
      public function setPostItems($key,$value)
      {
        $this->_postItems[$key] = (string)$value;
      }

      protected function getDomain($address)
      {
        $pieces = parse_url($address);
        $domain = isset($pieces['host']) ? $pieces['host'] : '';
        if (preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i', $domain, $regs))
        {
          return $regs['domain'];
        }
        return false;
      }

      protected function getUserIP()
      {
      //check proxy
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
      {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
      }
      else
      {
        $ip = $_SERVER['REMOTE_ADDR'];
      }

      return $ip;
      }

      /**
      * process form data for submission to your Act-On external form URL
      * @param string $extPostUrl your external post (Proxy URL) for your Act-On "proxy" form
      */
      public function processConnection($extPostUrl)
      {

        $this->setPostItems('_ipaddr',$this->getUserIP()); // Act-On accepts manually defined IPs if using field name '_ipaddr'

        $fields = http_build_query($this->getPostItems()); // encode post items into query-string

        $handle = curl_init();
        curl_setopt($handle, CURLOPT_POST, 1);
        curl_setopt($handle, CURLOPT_URL, "$extPostUrl");
        curl_setopt($handle, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
        curl_setopt($handle, CURLOPT_HEADER, 1);
        curl_setopt($handle, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($handle, CURLOPT_POSTFIELDS, $fields);

        $response = curl_exec($handle);

        if($response === FALSE){
          $response = "cURL Error: " . curl_error($handle);
        }
        else
        {
          preg_match_all('/^Set-Cookie:\040wp\s*([^;]*)/mi', $response, $ra); // pull response "set-cookie" values from cURL response header
          parse_str($ra[1][0], $cookie); // select the "set-cookie" for visitor conversion and store to array $cookie

          // set updated website visitor tracking cookie with processed "set-cookie" content from curl
          setrawcookie('wp' . key($cookie), implode(",", $cookie), time() + 86400 * 365, "/", $this->getDomain($extPostUrl)); //       set cookie expiry date to 1 year
        }

        curl_close($handle);
      }
    }


//Contact Us form
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Contact Us') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->setPostItems('formurl',$_REQUEST['formurl']);
$post1->setPostItems('utm_source',$_REQUEST['utm_source']);
$post1->setPostItems('utm_medium',$_REQUEST['utm_medium']);
$post1->setPostItems('utm_content',$_REQUEST['utm_content']);
$post1->setPostItems('utm_campaign',$_REQUEST['utm_campaign']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0001/d-ext-0003');
} else {
header('Location: http://www.aranca.com/');
}

//Gated Content
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Gated Content') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('designation',$_REQUEST['designation']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('region',$_REQUEST['region']);
$post1->setPostItems('industry',$_REQUEST['industry']);
$post1->setPostItems('title',$_REQUEST['title']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->setPostItems('formurl',$_REQUEST['formurl']);
$post1->setPostItems('utm_source',$_REQUEST['utm_source']);
$post1->setPostItems('utm_medium',$_REQUEST['utm_medium']);
$post1->setPostItems('utm_content',$_REQUEST['utm_content']);
$post1->setPostItems('utm_campaign',$_REQUEST['utm_campaign']);
$post1->setPostItems('subscribe',$_REQUEST['subscribe']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0014/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

//Investment Reserarch
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Investment Research') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0002/d-ext-0002');
} else {
header('Location: http://www.aranca.com/');
}

//Business Research
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Business Research') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0003/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

//Intellectual Property Research
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Intellectual Property Research') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0004/d-ext-0001 ');
} else {
header('Location: http://www.aranca.com/');
}

//Valuation and Advisory Services
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Valuation and Advisory Services') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0005/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

//Knowledge Center
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Knowledge Center') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0006/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

//Request Sample form
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Request Samples') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('sample',$_REQUEST['sample']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0007/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

//Landing pages
// LP_409A Valuations
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == '409A Valuations') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0008/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

// LP_Customized Market and Competitive Intelligence
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Customized Market and Competitive Intelligence') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0009/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

// LP_Competitive Intelligence
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Competitive Intelligence') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/000a/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

// LP_Intellectual Property Research Solutions
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Intellectual Property Research Solutions') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/000b/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

//LP_Customized Feasibility Study
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Customized Feasibility Study') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/000e/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

//LP_IR_Equity
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Equity Investment Research') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/000f/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

//LP_Market_Research
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Customized Market Research') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0010/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

//LP_Sustainable_and_Responsible_Investing
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'SRI Research') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/000d/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

//LP Stock Options Valuations
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Stock Options Valuations') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/0012/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}

//Landing Page
if ((isset($_POST['url'])) && (strlen(trim($_POST['url'])) == '') && $formname == 'Landing Page') {
$post1 = new ActonConnection;
$post1->setPostItems('firstname',$_REQUEST['firstname']);
$post1->setPostItems('lastname',$_REQUEST['lastname']);
$post1->setPostItems('company',$_REQUEST['company']);
$post1->setPostItems('tel',$_REQUEST['tel']);
$post1->setPostItems('email',$_REQUEST['email']);
$post1->setPostItems('comment',$_REQUEST['comment']);
$post1->setPostItems('created_by__c',$_REQUEST['created_by__c']);
$post1->setPostItems('practice__c',$_REQUEST['practice__c']);
$post1->setPostItems('lead_source__c',$_REQUEST['lead_source__c']);
$post1->setPostItems('_form_name_',$_REQUEST['_form_name_']);
$post1->setPostItems('referrer',$_REQUEST['referrer']);
$post1->setPostItems('ao_refurl',$_REQUEST['ao_refurl']);
$post1->setPostItems('formurl',$_REQUEST['formurl']);
$post1->setPostItems('title',$_REQUEST['title']);
$post1->setPostItems('utm_source',$_REQUEST['utm_source']);
$post1->setPostItems('utm_medium',$_REQUEST['utm_medium']);
$post1->setPostItems('utm_content',$_REQUEST['utm_content']);
$post1->setPostItems('utm_campaign',$_REQUEST['utm_campaign']);
$post1->processConnection('http://connect.aranca.com/acton/eform/17562/001b/d-ext-0001');
} else {
header('Location: http://www.aranca.com/');
}
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
    <td>FirstName</td>
    <td><?php echo $firstname; ?></td>
  </tr>
  <tr bgcolor="#eeffee">
    <td>LastName</td>
    <td><?php echo $lastname; ?></td>
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

  <tr bgcolor="#eeffee">
    <td>Comments</td>
    <td><?php echo $comment; ?></td>
  </tr>
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
$to = "sandesh.smartguy@gmail.com";
$fromaddress = "info@aranca.com";
$fromname = "Aranca Customized Fisibility";

require("phpmailer.php");

$mail = new PHPMailer();

$mail->From     = $email;
$mail->FromName = "";
$mail->AddAddress("sandesh.mandavkar@aranca.com");
//$mail->AddBCC("vikas.sharan@aranca.com");

$mail->WordWrap = 50;
$mail->IsHTML(true);

$mail->Subject  =  $_POST['subject'];
$mail->Body     =  $body;
$mail->AltBody  =  "This is the text-only body";

if(!$mail->Send()) {
	$recipient = "sandesh.smartguy@gmail.com";
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
