(function(win, doc, $) {

  'use strict';

  var data, fillForm, FormData, len, rand;

  $.getScript('//cdnjs.cloudflare.com/ajax/libs/Faker/0.7.2/MinFaker.js')
    .done(function() {
      data = new FormData(win.Faker);
      fillForm(data);
    })
    .fail(function() {
      win.console.error('ERROR: FakerJS not loaded!');
    });

  /*==========  CREATE DATA OBJECT  ==========*/

  FormData = function(faker) {

    this.faker     = faker;

    this.username  = 'fake_' + faker.Internet.domainWord();
    this.username  += faker.random.number(9999);

    this.firstName = faker.Name.firstName();
    this.lastName  = faker.Name.lastName();
    this.name      = faker.Name.findName();

    this.phone1    = faker.Helpers.replaceSymbolWithNumber('###');
    this.phone2    = faker.Helpers.replaceSymbolWithNumber('###');
    this.phone3    = faker.Helpers.replaceSymbolWithNumber('####');

    this.address1  = faker.Address.streetAddress();
    this.address2  = faker.Address.secondaryAddress();
    this.city      = faker.Address.city();
    this.state     = faker.random.br_state_abbr();
    this.zip       = faker.Address.zipCode();

    this.cc        = '4242 4242 4242 4242';
    this.exp1      = Math.floor( Math.random() * 12) + 1;
    this.exp2      = Math.floor( Math.random() * 8) + 14;
    this.cvv       = Math.floor( Math.random() * 899) + 100;

  };

  FormData.prototype.randomSelect = function(el) {
    var $el = $(el);

    len  = $el.find('option').length - 1;
    rand = Math.floor( Math.random() * len ) + 1;

    $el.children('option')
      .prop('selected', false)
      .eq( rand )
      .prop('selected', true);
  };

  FormData.prototype.randomRadio = function(radios) {
    radios = radios.not('[type="hidden"]');
    len    = radios.length;
    rand   = Math.floor( Math.random() * len );

    radios
      .prop('checked', false)
      .eq( rand )
      .prop('checked', true);
  };

  FormData.prototype.randomParagraph = function(el) {
    $(el).val(this.faker.Lorem.paragraph());
  };

  FormData.prototype.randomCheckbox = function(el) {
    rand = Math.floor( Math.random() * 2 );
    var $el  = $(el);

    $el.prop('checked', false);

    if (rand === 0) {
      $el.prop('checked', true);
    }
  };

  FormData.prototype.randomEmail = function() {
    return 'chriscoyier+' + this.faker.Internet.domainWord() + '@gmail.com';
  };

  /*==========  FILL IN THE FORM  ==========*/

  fillForm = function(data) {

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

    data.randomRadio($('[name="radio-choice"]'));

    // Randomize all select boxes
    $('select').each(function() {
      data.randomSelect(this);
    });

    // Randomize all checkboxes
    $('input[type="checkbox"').each(function() {
      data.randomCheckbox(this);
    });

    // Randomize all textareas
    $('textarea').each(function() {
      data.randomParagraph(this);
    });

    // Randomize any email field
    $('input[type="email"]').each(function() {
      $(this).val(data.randomEmail());
    });

  };

}(window, window.document, window.jQuery));
