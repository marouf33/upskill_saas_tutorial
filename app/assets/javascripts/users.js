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
    submitBtn.val("Processing").prop('disabled',true);
    
    //Collect the credit card fields. 
    var ccNum = $('#card_number').val(),
        cvcNUM = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //Use Stripe JS library to check for card erros
    var error = false;
    
    //Validate Card Number.   
    if(!Stripe.card.validteCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid.');
    }
    
    //Validate CVC number.
    if(!Stripe.card.validteCVC(cvcNUM)) {
      error = true;
      alert('The CVC number appears to be invalid.');
    }
    
    //Validate expiration date.
    if(!Stripe.card.validteExpiry(expMonth,expYear)) {
      error = true;
      alert('The expiration date appears to be invalid.');
    }
    
    if (error){
      //If there are card erros, don't send to Stripe
      submitBtn.prop('disabled',false).val("Sign Up");
    }else{
      //Send the card info to stripe
      Stripe.createToken({
        number: ccNum,
        cvc:  cvcNUM,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  });
  

  //Stripe will return a card token.
  function stripeResponseHandler(status, response){
    //Get the token from the response
    var token = response.id;
    
    //Inject the card token in a hidden field
    theForm.append( $('<input type="hidden name= "user[stripe_card_token]">').val(token) );
    
    //Submit form to our rails app.
    theForm.get(0).submit();
  }
  
 
});