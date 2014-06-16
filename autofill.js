(function(win, doc, $) {

  'use strict';

  var $ = window.jQuery, data, fillForm, FormData, len, _rand;

  _rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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
    this.randomWord = faker.Internet.domainWord();

    this.username  = 'fake_' + this.randomWord;
    this.username  += _rand(100,9999);

    this.firstName = faker.Name.firstName();
    this.lastName  = faker.Name.lastName();

    this.phone1    = faker.Helpers.replaceSymbolWithNumber('###');
    this.phone2    = faker.Helpers.replaceSymbolWithNumber('###');
    this.phone3    = faker.Helpers.replaceSymbolWithNumber('####');

    this.address1  = faker.Address.streetAddress();
    this.address2  = faker.Address.secondaryAddress();
    this.city      = faker.Address.city();
    this.state     = faker.Address.usState();
    this.zip       = faker.Address.zipCode();

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

  fillForm = function(data) {

    $('#Field17').val(data.username);
    $('#Field2').val(data.firstName);
    $('#Field3').val(data.lastName);
    $('#Field11').val(data.phone1);
    $('#Field11-1').val(data.phone2);
    $('#Field11-2').val(data.phone3);
    $('#Field4').val(data.address1);
    $('#Field5').val(data.address2);
    $('#Field6').val(data.city);
    $('#Field7').val(data.state);
    $('#Field8').val(data.zip);
    $('#Field13').val(data.text1);

    data.randomizeRadio($('[name="Field21"]'));

    $('select').each(function() {
      data.randomizeSelect(this);
    });

    $('input[type="checkbox"').each(function() {
      data.randomizeCheckbox(this);
    });

    $('textarea').each(function() {
      data.randomizeParagraph(this);
    });

    $('input[type="email"').each(function() {
      data.randomizeEmail(this);
    });

  };

}(window, window.document, window.jQuery));
