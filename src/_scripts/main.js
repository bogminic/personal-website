'use strict';
// To create the page functionality I've used the object literal pattern.

var myFeature = {
    //init function
    init: function(){
    this.cacheDom();
    this.bindEvents();
    this.lazySizesInit();
    this.mixItUpInit();
    this.colorBoxInit();
    },
     //cache DOM elements
    cacheDom: function(){
      this.$body = $('body');

      // header/navigation variables
      this.$header = this.$body.find('.header');
      this.$nav = this.$header.find('.nav');
      this.$navItem = this.$nav.find('.nav__item');
      this.$btn = this.$header.find('.btn');

      //portofolio variables
      this.$portofolio = this.$body.find('.mix');
      this.$colorbox = this.$body.find('.mix__link').not('.mix__link.mix__link--web');

      //contact form variables
      this.$form = this.$body.find('#contact-form');
      this.$formChildren = this.$form.children();
      this.$formName = this.$form.find('#userName');
      this.$formEmail = this.$form.find('#userEmail');
      this.$formSubject = this.$form.find('#subject');
      this.$formContent = this.$form.find('#content');
      this.$formSend = this.$form.find('.send');
      this.$sendStatus = this.$body.find('.send-status');
    },
     //bind events
    bindEvents: function(){
      this.$btn.on('click', this.toggleClass.bind(this));
      this.$navItem.on('click', this.toggleClass.bind(this));
      this.$navItem.on('click', this.smoothScroll);
      this.$formSend.on('click', this.sendContact.bind(this));
      $(document).on('scroll', this.onScroll.bind(this));

    },
    // toggle function for burger menu
    toggleClass: function(){
      if ($(window).width() < 768) {
        this.$btn.toggleClass('is-clicked');
        this.$nav.slideToggle(350);

      }
    },
    // smoothscroll function
    smoothScroll: function(){
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
              scrollTop: target.offset().top
         }, 1000); // The number here (1000) represents the speed of the scroll in milliseconds
         return false;
      }
      }
    },
    // on scroll show and update (active class) navigation
    onScroll: function(){
      this.slideHeader();
      this.updateActiveClass(this,$(window).scrollTop());
    },
    //  automatically updates navigation targets based on scroll position similar with Boostrap ScrollSpy http://getbootstrap.com/javascript/#scrollspy
    updateActiveClass : function(self, scrollPos){
      if ($(window).width() >= 768) {
          self.$navItem.each(function () {
              var $currentLink = $(this);
              var refElement = $($currentLink.attr('href'));
              if (refElement.position().top-self.$header.height() <= scrollPos && refElement.position().top - self.$header.height() + refElement.height() > scrollPos) {
                  self.$navItem.removeClass('is-active');
                  $currentLink.addClass('is-active');
              }
              else {
                $currentLink.removeClass('is-active');
              }
          }
        );
      }
    },
    slideHeader : function() {
      var $starPoint = $(window).height()-($('header').height());
      if (this.$body.length){
        if ($(window).scrollTop()>= $starPoint ) {
            this.$header.slideDown();
           
        }
        else if ($(window).scrollTop()==0 && $(window).width() >= 768) {
            this.$header.slideUp();
        }
       }
    },
    // mixItUp init function
    mixItUpInit: function(){
      this.$portofolio.mixItUp({
        controls:{
          activeClass:'is-active'
        },
        layout:{
          display:'block'
        },
      	selectors: {
        	target: '.mix__item',
          filter: '.filter__item',
      	}
      });
    },
    // lazyloading init function
    lazySizesInit: function(){
      window.lazySizesConfig = window.lazySizesConfig || {};
      //only for demo in production I would use normal expand option
      window.lazySizesConfig.expand = 3;
    },
    // colorbox init function + fix for resposive images
    colorBoxInit: function(){
      var cboxOptions = {
        width: '95%',
        height: '95%',
        maxWidth: '960px',
        maxHeight: '960px',
      };
      this.$colorbox.colorbox(cboxOptions);
      $(window).resize(function(){
      $.colorbox.resize({
        width: window.innerWidth > parseInt(cboxOptions.maxWidth) ? cboxOptions.maxWidth : cboxOptions.width,
        height: window.innerHeight > parseInt(cboxOptions.maxHeight) ? cboxOptions.maxHeight : cboxOptions.height
      });
    });
  },
   sendContact: function() {
    var valid;
    valid = this.validateContact();
    if(valid) {
      jQuery.ajax({
			url: 'contact-form.php',
			data:'userName='+this.$formName.val()+'&userEmail='+this.$formEmail.val()+'&subject='+this.$formSubject.val()+'&content='+this.$formContent.val(),
			type: 'POST',
      context: this,
			success:function(data){
           this.$formChildren.prop('disabled', true);
           this.$sendStatus.html(data);

			},
			error:function (){}
			});
    }
  },
  validateContact: function() {
    var valid = true;
    valid = this.checkInput(this.$formName);
    valid = this.checkInput(this.$formSubject);
    valid = this.checkInput(this.$formContent);

    //check email
    if(!this.$formEmail.val()) {
        this.$formEmail.addClass('error');
        valid = false;
    }
    else {
      if(!this.$formEmail.val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
          this.$formEmail.addClass('error');
          valid = false;
      }
      else {
        this.$formEmail.removeClass('error');
      }
    }
    return valid;
  },
  //check for values in form's imput and add or remove class related with that
  checkInput: function($object){
    if(!$object.val()) {
        $object.addClass('error');
        return false;
    }
    else {
      $object.removeClass('error');
      return true;
    }
  }
  };
$(document).ready( function(){
  myFeature.init();
});
