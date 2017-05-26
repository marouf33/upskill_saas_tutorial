/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');  
  var submitBtn = $('#form-submit-btn');
  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
  
  //when usr clicks form submitt button
  submitBtn.click(function(event){
    //prevent default submission behavior
    event.preventDefault();
    
    //Collect the credit card fields. 
    var ccNum = $('#card_number').val(),
        cvcNUM = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    //Send the card info to stripe
    Stripe.createToken({
      number: ccNum,
      cvc:  cvcNUM,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });

  
  //Stripe will return a card token.
  //Inject card token as hidden field into form.
  //Submit form to our rails app.
});