# My Personal website example

## Description


This is the code that powers my responsive single page personal website :). To build it I've used [Jade](http://jade-lang.com/), [SASS](http://sass-lang.com/), JavaScript ([jQuery](https://jquery.com/), [MixItUp](https://mixitup.kunkalabs.com/), [Colorbox](http://www.jacklmoore.com/colorbox/), [lasySized](https://github.com/aFarkas/lazysizes)) and PHP.

For the development environment I've used [Yeoman](http://yeoman.io/)'s [generator-yeogurt@1.4.0](https://github.com/larsonjj/generator-yeogurt).

The live site is currently running on [www.bmn.com.ro](http://www.bom.com.ro).

This is licensed under the MIT and GPL licenses.

## Install and run

For this to work you need to have installed [Git](https://git-scm.com/) and [Node](nodejs.org) with npm.

Clone the repository from Github:

```sh
git clone https://github.com/bogdanmihainicolae/personal-website
```
Install the packages required:

```sh
cd personal-website && npm install
```

### Automated tasks

This project uses [Gulp](http://gulpjs.com) to run automated tasks for development and production builds.
The tasks are as follows:

`gulp serve`: Compiles preprocessors and boots up development server
`gulp serve --open`: Same as `gulp serve` but will also open up site/app in your default browser
`gulp serve --production`: Same as `gulp serve` but will run all production tasks so you can view the site/app in it's final optimized form

`gulp --production`: Same as `gulp serve --production` also run `gulp test` and  not boot up production server

`gulp test`: Lints all `*.js` file in the `source` folder using eslint



## File structure

The basic file structure for the project is organized in the following way:
```
└── _images
    └── small
    └── large
└── _layouts
    └── base.jade
└── _modules
    └── about.jade
    └── contact.jade
    └── footer.jade
    └── header.jade
    └── intro.jade
    └── portofolio.jade
    └── resume.jade
└── _scripts
    └── main.js
└── _styles
    └── 1-tools
    └── 2-basics
    └── 3-modules
    └── main.scss
└── fonts
└── index.jade
```

## Technologies used

### Jade
One of the best static HTML template engine is [Jade](http://jade-lang.com/) and I've used it to render my HTML and split in separated modules. The files structure for Jade is organized in the following way:
```
└── _layouts
    └── base.jade
└── _modules
    └── about.jade
    └── contact.jade
    └── footer.jade
    └── header.jade
    └── intro.jade
    └── portofolio.jade
    └── resume.jade
└── index.jade
```
### SASS and web fonts
Taking advantage of the modularity feature provided by [SASS](http://sass-lang.com/), the code was split in several modules (grouped in 3 folders), for quick access and easier maintenance. The class names were constructed using [BEM](https://en.bem.info) methodology just for fun. The files structure for SASS is organized in the following way:
```
└── _styles
    └── 1-tools
      └── _bmn-fonts.scss
      └── _colorbox.scss
      └── _vars.scss
    └── 2-basics
      └── _layout.scss
      └── _links.scss
      └── _miscellaneous.scss
      └── _typography.scss
    └── 3-modules
      └── _about.scss
      └── _contact.scss
      └── _footer.scss
      └── _header.scss
      └── _intro.scss
      └── _portofolio.scss
      └── _resume.scss
    └── main.scss
```
The web font icons files were created with [Fontello](http://fontello.com) and are organized in the following way:
```
└── _styles
    └── 1-tools
      └── _bmn-fonts.scss
└── fonts
    └── bmn-fonts.eot
    └── bmn-fonts.svg
    └── bmn-fonts.ttf
    └── bmn-fonts.woff
```
### JavaScript
To mix all the JavaScript parts I've use object literal pattern organized in the following way:

```js
var myFeature = {
    //init function
    init: function(){
      ...
    },
     //cache DOM elements
    cacheDom: function(){
      ...
    },
     //bind events
    bindEvents: function(){
      ...
    },
    //rest of the functions
    ........
  };
$(document).ready( function(){
  myFeature.init();
});

```
The object literal pattern is also shown in this great e-book by [Addy Osmani](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).  

Because I didn't want to code all features in vanilla JavaScript I've used [jQuery](https://jquery.com/) and the following plugins:
- [lasySized](https://github.com/aFarkas/lazysizes) for image lazy loading to speed up load time;
- [MixItUp](https://mixitup.kunkalabs.com/) for image filtering;
- [Colorbox](http://www.jacklmoore.com/colorbox/) for overlaying images on top of the current page. 


### PHP
I've used PHP just for the contact form using a simple script that get the AJAX data and put in an email.  
```php
<?php
  $toEmail = "bogdan@bmn.com.ro";
  $mailHeaders = "From: " . $_POST["userName"] . "<". $_POST["userEmail"] .">\r\n";
  if(mail($toEmail, $_POST["subject"], $_POST["content"], $mailHeaders)) {
  print "Contact Mail Sent. Thank you!";
  } else {
  print "Problem in Sending Mail.";
  }
?>

```
