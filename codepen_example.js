var runBookmarklet = function() {


/*==========  Code starts here, above is for demo to work inside CodePen  ==========*/

(function(win, doc, $) {

  'use strict';

  // Don't run script if jQuery isn't loaded
  if (typeof win.jQuery === 'undefined') {
    return;
  }

  var data, fillForm, FormData, len, _rand;

  // I like Chris's randomize function.  Lets use it here.
  _rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Load FakerJS library
  $.getScript('//cdnjs.cloudflare.com/ajax/libs/Faker/0.7.2/MinFaker.js')
    .done(function() {
      fillForm();
    })
    .fail(function() {
      win.console.error('ERROR: FakerJS not loaded!');
    });




  /*==========  CREATE DATA OBJECT  ==========*/

  FormData = function(faker) {

    this.faker     = faker;

    this.randomWord = faker.Internet.domainWord();

    this.username  = 'fake_' + this.randomWord;
    this.username  += _rand(100,9999);

    // set this value to your password specifications
    this.password  = 'pass1234';

    this.name      = faker.Name.findName();

    this.address1  = faker.Address.streetAddress();
    this.city      = faker.Address.city();
    this.state     = faker.random.br_state_abbr();
    this.zip       = faker.Address.zipCode();

    // Chris's actual credit card number
    this.cc        = '4242 4242 4242 4242';
    this.exp1      = _rand(1,12);
    this.exp2      = _rand(14,22);
    this.cvv       = _rand(100,999);

  };


  FormData.prototype.randomizeSelect = function(el) {
    var $el = $(el);

    len  = $el.find('option').length - 1;

    $el.children('option')
      .prop('selected', false)
      .eq( _rand( 1,len + 1 ) )
      .prop('selected', true);
  };

  FormData.prototype.randomizeRadio = function(radios) {
    radios = radios.not('[type="hidden"]');
    len    = radios.length;

    radios
      .prop('checked', false)
      .eq( _rand( 0, len - 1 ) )
      .prop('checked', true);
  };

  FormData.prototype.randomizeParagraph = function(el) {
    $(el).val(this.faker.Lorem.sentence(5));
  };

  FormData.prototype.randomizeCheckbox = function(el) {
    var $el  = $(el);

    $el.prop('checked', false);

    if (_rand( 0,1 ) === 0) {
      $el.prop('checked', true);
    }
  };

  FormData.prototype.randomizeEmail = function(el) {
    $(el).val('chriscoyier+' + this.randomWord + '@gmail.com');
  };



  /*==========  FILL IN THE FORM  ==========*/

  fillForm = function() {
    data = new FormData(win.Faker);

    $('#name').val(data.name);
    $('#username').val(data.username);
    $('#cc').val(data.cc);
    $('#exp-1').val(data.exp1);
    $('#exp-2').val(data.exp2);
    $('#cvv').val(data.cvv);
    $('#address').val(data.address1);
    $('#city').val(data.city);
    $('#state').val(data.state);
    $('#zip').val(data.zip);
    $('#pw').val(data.password);
    $('#pw-repeat').val(data.password);

    data.randomizeRadio($('[name="radio-choice"]'));

    // Randomize all select boxes
    $('select').each(function() {
      data.randomizeSelect(this);
    });

    // Randomize all checkboxes
    $('input[type="checkbox"').each(function() {
      data.randomizeCheckbox(this);
    });

    // Randomize all textareas
    $('textarea').each(function() {
      data.randomizeParagraph(this);
    });

    // Randomize all emails
    $('input[type="email"').each(function() {
      data.randomizeEmail(this);
    });

  };

}(window, window.document, window.jQuery));


/*==========  EOF Bookmarklet Code. Below is for Codepen demo. ==========*/

};
runBookmarklet();
window.jQuery('#prefill').on('click', runBookmarklet);

