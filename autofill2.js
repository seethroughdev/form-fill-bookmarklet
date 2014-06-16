var fillForm = function() {

  'use strict';

  if (typeof window.jQuery === 'undefined') {
    return;
  }

  var $ = window.jQuery, data, fillForm, FormData, len, rand;

  // Load FakerJS library
  $.getScript('//cdnjs.cloudflare.com/ajax/libs/Faker/0.7.2/MinFaker.js')
    .done(function() {
      fillForm();
    })
    .fail(function() {
      window.console.error('ERROR: FakerJS not loaded!');
    });

  /*==========  CREATE DATA OBJECT  ==========*/

  FormData = function(faker) {

    this.faker     = faker;

    this.username  = 'fake_' + faker.Internet.domainWord();
    this.username  += faker.random.number(9999);

    // set this value to your password specifications
    this.password  = 'pass1234';

    this.name      = faker.Name.findName();

    this.address1  = faker.Address.streetAddress();
    this.city      = faker.Address.city();
    this.state     = faker.random.br_state_abbr();
    this.zip       = faker.Address.zipCode();

    // Chris's actual credit card number
    this.cc        = '4242 4242 4242 4242';
    this.exp1      = Math.floor( Math.random() * 12) + 1;
    this.exp2      = Math.floor( Math.random() * 8) + 14;
    this.cvv       = Math.floor( Math.random() * 899) + 100;

  };

  FormData.prototype.randomizeSelect = function(el) {
    var $el = $(el);

    len  = $el.find('option').length - 1;
    rand = Math.floor( Math.random() * len ) + 1;

    $el.children('option')
      .prop('selected', false)
      .eq( rand )
      .prop('selected', true);
  };

  FormData.prototype.randomizeRadio = function(radios) {
    radios = radios.not('[type="hidden"]');
    len    = radios.length;
    rand   = Math.floor( Math.random() * len );

    radios
      .prop('checked', false)
      .eq( rand )
      .prop('checked', true);
  };

  FormData.prototype.randomizeParagraph = function(el) {
    $(el).val(this.faker.Lorem.sentence(5));
  };

  FormData.prototype.randomizeCheckbox = function(el) {
    rand = Math.floor( Math.random() * 2 );
    var $el  = $(el);

    $el.prop('checked', false);

    if (rand === 0) {
      $el.prop('checked', true);
    }
  };

  FormData.prototype.randomizeEmail = function() {
    return 'chriscoyier+' + this.faker.Internet.domainWord() + '@gmail.com';
  };

  /*==========  FILL IN THE FORM  ==========*/

  fillForm = function() {
    data = new FormData(window.Faker);

    $('#name').val(data.name);
    $('#email').val(data.randomizeEmail());
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

  };

};

fillForm();

$('#prefill').on('click', fillForm);
