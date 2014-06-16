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

    this.email     = 'chriscoyier+' + this.username + '@gmail.com';

    this.phone1    = faker.Helpers.replaceSymbolWithNumber('###');
    this.phone2    = faker.Helpers.replaceSymbolWithNumber('###');
    this.phone3    = faker.Helpers.replaceSymbolWithNumber('####');

    this.address1  = faker.Address.streetAddress();
    this.address2  = faker.Address.secondaryAddress();
    this.city      = faker.Address.city();
    this.state     = faker.Address.usState();
    this.zip       = faker.Address.zipCode();

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

  /*==========  FILL IN THE FORM  ==========*/

  fillForm = function(data) {

    $('#Field17').val(data.username);
    $('#Field2').val(data.firstName);
    $('#Field3').val(data.lastName);
    $('#Field10').val(data.email);
    $('#Field11').val(data.phone1);
    $('#Field11-1').val(data.phone2);
    $('#Field11-2').val(data.phone3);
    $('#Field4').val(data.address1);
    $('#Field5').val(data.address2);
    $('#Field6').val(data.city);
    $('#Field7').val(data.state);
    $('#Field8').val(data.zip);
    $('#Field13').val(data.text1);

    data.randomRadio($('[name="Field21"]'));

    // Randomize all select boxes
    $('select').each(function() {
      data.randomSelect(this);
    });

    // Randomize all checkboxes
    $('input[type="checkbox"').each(function() {
      data.randomCheckbox(this);
    });

    // Randomize all text areas
    $('textarea').each(function() {
      data.randomParagraph(this);
    });

  };

}(window, window.document, window.jQuery));
