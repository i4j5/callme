;(function(){
  'use strict';

  if (window.jQuery === undefined) {

    load.parallel([
      'https://yastatic.net/jquery/2.1.4/jquery.min.js',
      '.tmp/_.css',
    ], init);
    
  } else{
    load.css('https://yastatic.net/jquery/2.1.4/jquery.min.js', init);
  }

  function init() {
    $(function(){

      $('body').on('click', '.i4j5-callme__icon', function() {

        $('.i4j5-callme__modal').addClass('i4j5-callme__modal_active');

        $('.i4j5-callme-bg').addClass('i4j5-callme-bg_active');
      
      }); // click .i4j5-callme__icon


      $('body').on('click', '.i4j5-callme-bg', function() {
        
        var modal = $('.i4j5-callme__modal');

        if ( modal.hasClass('i4j5-callme__modal_active') ) {
          modal.removeClass('i4j5-callme__modal_active');  
        }

        $(this).removeClass('i4j5-callme-bg_active');

      }); // click .i4j5-callme-bg

    });
  }

})();