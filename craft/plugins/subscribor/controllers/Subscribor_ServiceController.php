<?php
namespace Craft;


/**
 * Recaptcha controller
 */
class Subscribor_ServiceController extends BaseController
{
  protected $allowAnonymous = true;
  /**
   * Handle the save user form request.
   */

  public function actionSubscribe()
  {
    
    // make sure its a post request
    $this->requirePostRequest();

    // Get post variables - returns 400 if email not provided
    // $addEmail = craft()->request->getRequiredParam('Email_Address');

    // get all form data
    $data = craft()->request->getPost();

     // get the endpoint to which data is submitted
    $endpoint = craft()->request->getPost('endpoint');

    $areas = craft()->request->getPost('Areas_of_Interest');

    // print "<pre>";
    // print "form submitted";
    // print_r($areas);
    // print "</pre>";
    // exit();

    // create a new guzzle client
    $client = new \Guzzle\Http\Client();

    // configure endpoint
    $request = $client->post($endpoint);

    // add form data to the request
    $request->addPostFields($data);

    // send the data to the endpoint
    $result = $client->send($request);

    if ($result->getStatusCode() == 200) {
      craft()->userSession->setFlash('success', 'You have subscribed successfully to our newsletter');
      $this->redirectToPostedUrl();
    }

  }
      
}

// print "<pre>";
// print "form submitted";
// print_r($data);
// print "</pre>";
// exit();

