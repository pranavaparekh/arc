<?php
namespace Craft;


/**
 * Recaptcha controller
 */
class Recaptcha_ServiceController extends BaseController
{
    protected $allowAnonymous = true;
    /**
     * Handle the save user form request.
     */

    public function actionSaveForm()
    {
        $this->requirePostRequest();
        
        $captcha = craft()->request->getPost('g-recaptcha-response');

        $data = craft()->request->getPost();


        // use the verify service
        $verified = craft()->recaptcha_verify->verify($captcha);

        if ($verified) {

            // get all form data
            $data = craft()->request->getPost();

            // get the endpoint to which data is submitted
            $endpoint = craft()->request->getPost('endpoint');

            // create a new guzzle client
            $client = new \Guzzle\Http\Client();

            // configure endpoint
            $request = $client->post($endpoint);

            // add form data to the request
            $request->addPostFields($data);

            // send the data to the endpoint
            $result = $client->send($request);

            if ($result->getStatusCode() == 200) {
                craft()->userSession->setFlash('success', 'Your details have been sent to our team');
                $this->redirectToPostedUrl();
            }

        } else {
            craft()->userSession->setFlash('failure', 'submission failed - go back try again');

            // $data = craft()->request->getPost();
            // print "<pre>";
            // print "submission failed - go back try again";
            // // print_r($data);
            // print "</pre>";
            // exit();
        }

        
    }
}
