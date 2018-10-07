(function($){

$.fn.boishakhCarousel = function( options ){
  // html usage please... add elament like this .boishakh-carousel
  // > .bc-container > .bc-content > .bc-item
    let itIs = this;
    // variablies to use
    let containerWidth;
    let contentHTML;
    let containerClass    = itIs.children().attr('class');
    let hasContainerClass = containerClass.indexOf('bc-container');
    let opts            = $.extend( {}, $.fn.boishakhCarousel.defaults, options );
    let container       = this.find('.bc-container');
    let content         = this.find('.bc-content');
    let item            = this.find('.bc-item');
    // setting up width for carousel
    containerWidth = this.parent().width();
    // end setting up width for carousel
    let contentWidth    = ( containerWidth*( item.length ) )+100;
    let itemOnScreen    = opts.items;
    let itemWidth       = containerWidth/itemOnScreen;
    let sliderCount     = 0;
    let autoPlayIn      = 2000;
    let transformVal;
    let mousePosition   = [];
    let autoPlay;
    let pauseOnHover    = true;
    // katsat
    if( typeof containerWidth === 'undefined'){
      containerWidth  = $(window).width();
    }
    // katsat end
    // responsive grid style code
      if( $(window).width() >= '960' ){
        itemOnScreen    = opts.items;
      }else if( $(window).width() <= '360' ){
        itemOnScreen    = opts.itemsOnMobile;
      }else if( $(window).width() <= '720' ){
        itemOnScreen    = opts.itemsOnTablet;
      }else if( $(window).width() <= '960' ){
        itemOnScreen    = opts.itemsBigTablet;
      }
    // responsive grid style code ends
    // variablies to use end

    // katsat
    // katsat end


    // structur the slider if not structured
    // error here
    if( hasContainerClass === -1 ){
      contentHTML = itIs.html();
      itIs.html( '<div class="bc-container">'+contentHTML+'</div>' );

      container       = itIs.find('.bc-container');
      content         = itIs.find('.bc-content');
      item            = itIs.find('.bc-item');
    }
    // error end
    // structur the slider if not structured end

    // adding navigation
    container.after('<span class="prev">'+opts.prev+'</span><span class="next">'+opts.next+'</span>');
    // ading navigation end
    // click functionalitiy
    $('.next').click(function(){
      runSlide('next');
    });
    $('.prev').click(function(){
      runSlide('prev');
    });
    // click functionalitiy end
    // Autoplay functionality
    if( opts.autoPlay === true ){
      autoPlay = setInterval( function(){
        runSlide('next');
      }, autoPlayIn );
      // pause on hover functionality
      if( pauseOnHover === true ){
        $(this).on('mouseover',function(){
          clearInterval(autoPlay);
        });
        $(this).on('mouseleave',function(){
          container.css({'cursor':'auto','opacity':'1'});
          autoPlay = setInterval( function(){
              runSlide('next');
            }, autoPlayIn
          );
        });
      }
    }
    // pause on hover functionality ends
    // Drug functionalitiy
    container.on('mousedown',function(evt){
      evt.preventDefault();
      container.css({'cursor':'grab','opacity':'.8'});
      mousePosition[0] = evt.clientX;
    });

    container.on('mouseup',function(evt){
      evt.preventDefault();

      container.css({'cursor':'auto','opacity':'1'});
      mousePosition[1] = evt.clientX;
      var firstValInc = mousePosition[0]+10;
      var firstValDec = mousePosition[0]-10;
      if( firstValInc <= mousePosition[1] ){
        runSlide('prev');
      }else if( firstValDec >= mousePosition[1] ){
        runSlide('next');
      }
    });
    // slider link functionality
    $('.bc-item a').click(function(){
      return false;
    });
    var mouseStart;
    $('.bc-item a').on('mousedown',function(e){
       mouseStart  = e.clientX;
    });
    $('.bc-item a').on('mouseup',function(e){
      e.preventDefault();
      var ee = e;
      var mouseEnd    = e.clientX;
      var location = $(this).attr('href');

      setTimeout(function(){
        if( mouseStart === mouseEnd && e.button === 0 ){
          window.location.href = location;
        }
        return false;
      },1);

    });
    // Drug functionality end
    // slider runing function
    function runSlide( param ){

      if( param === 'next' ){
        // after clicking next button
        if( sliderCount >= item.length-itemOnScreen ){
        sliderCount = 0;
        transformVal = itemWidth*sliderCount;
          content.css('transform','translateX(-'+transformVal+'px)');
        }else if( sliderCount >= 0 && sliderCount <= item.length-itemOnScreen ){
          sliderCount += 1;
          transformVal = itemWidth*sliderCount;
          content.css('transform','translateX(-'+transformVal+'px)');
        }


        // adding active class to active items
        itIs.children('.bc-container').children('.bc-content').children('.bc-item').removeClass('active');
        for(i=0;i<itemOnScreen;i++){
          itIs.children('.bc-container').children('.bc-content').children('.bc-item:nth-child('+(i+sliderCount+1)+')').addClass('active');
        }

      }else if( param === 'prev' ){
        // after clicking previous button
        if( sliderCount <= 0 ){
        sliderCount = item.length-itemOnScreen;
        transformVal = itemWidth*sliderCount;
          content.css('transform','translateX(-'+transformVal+'px)');
        }else if( sliderCount >= 0 && sliderCount <= item.length ){
          sliderCount -= 1;
          transformVal = itemWidth*sliderCount;
          content.css('transform','translateX(-'+transformVal+'px)');
        }

        // adding active class to active items
        itIs.children('.bc-container').children('.bc-content').children('.bc-item').removeClass('active');
        for(i=0;i<itemOnScreen;i++){
          itIs.children('.bc-container').children('.bc-content').children('.bc-item:nth-child('+(i+sliderCount+1)+')').addClass('active');
        }
      }

    }
    // item background
    item.css('background',opts.background);
    // slider runing function end
      container.width( containerWidth );
      content.width( contentWidth );

      var marginVal = itemOnScreen*(opts.margin*2);
      if( opts.margin > 0 ){
        itemWidthAdj     = itemWidth - (opts.margin*2);
        item.css( {'padding':opts.margin+'px','box-sizing':'content-box'} );
        item.width( itemWidthAdj );
      }else{
        item.width( itemWidth );
      }

};
// setting up defaults
$.fn.boishakhCarousel.defaults = {
  items: 2,
  itemsBigTablet: 3,
  itemsOnTablet: 2,
  itemsOnMobile: 3,
  margin: 2,
  pauseOnHover: true,
  autoStructure: true,
  background: '#ffffff',
  prev: 'Atras',
  next: 'Adelante',
  autoPlay: false
};
}(jQuery));
