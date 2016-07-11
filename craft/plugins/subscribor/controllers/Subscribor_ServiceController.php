<?php
namespace Craft;
use GuzzleHttp\Client as Client;
use GuzzleHttp\Psr7\Request;

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

     // get the endpoint to which data is submitted
    $endpoint = craft()->request->getPost('endpoint');

    // get all data
    $data = craft()->request->getPost();

    if( !empty(craft()->request->getPost('Areas_of_Interest')) ) {
        // get areas of interest and implode multiple values into comma separated values
        $areas = implode(",", craft()->request->getPost('Areas_of_Interest'));
            // modify the array to include imploded values (see above)
        $data['Areas_of_Interest'] = $areas;
    }

    // this is old version 3.9.3 componser client
    // $client = new \Guzzle\Http\Client();

    // create a new guzzle client with version 6.2.0 from composer package
    $client = new Client();

    // send data to endpoint
    $response = $client->request('POST', $endpoint, [
        'form_params' => $data
    ]);

    if ($response->getStatusCode() == 200) {
      craft()->userSession->setFlash('success', 'You have subscribed successfully to our newsletter');
      $this->redirectToPostedUrl();
    }


  }
      
}

    // $request = new Request('POST', $endpoint, $data);

    // print "<pre>";
    // print "form submitted";
    // print_r($request);
    // print "</pre>";
    // exit();

