# My Personal website example

## Description


This is the code that powers my responsive single page personal website :). To build it I've used [Vite](https://vitejs.dev/), JavaScript (Vanilla and [lasySized](https://github.com/aFarkas/lazysizes)) and PHP.

The live site is currently running on [bogminic.com](https://bogminic.com).

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


## Technologies used

### CSS and web fonts
Taking advantage of the modularity feature provided by [Vite](https://vitejs.dev/), the styles were splited in several modules, for quick access and easier maintenance. The class names were constructed using [BEM](https://en.bem.info) methodology just for fun. 

The web font icons files were created with [Fontello](http://fontello.com) and are organized in the following way:
```
└── styles
      └── font.css
└── public
    └──fonts
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
document.addEventListener('DOMContentLoaded', function () {
  myFeature.init()
})

```
The object literal pattern is also shown in this great e-book by [Addy Osmani](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).  

Because I didn't want to code all features in vanilla JavaScript I've used and the following plugins:
- [lasySized](https://github.com/aFarkas/lazysizes) for image lazy loading to speed up load time;


### PHP
I've used PHP just for the contact form using a simple script that get the AJAX data and put in an email.  
```php
<?php
// Validate email input
if(filter_var($_POST["userEmail"], FILTER_VALIDATE_EMAIL) && !empty($_POST["userName"]) && !empty($_POST["subject"]) && !empty($_POST["content"])) {

    $toEmail = "bmnicolae@gmail.com";
    $userName = htmlspecialchars($_POST["userName"]);
    $userEmail = htmlspecialchars($_POST["userEmail"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $content = htmlspecialchars($_POST["content"]);

    $mailHeaders = "From: $userName <$userEmail>\r\n";
    
    if(mail($toEmail, $subject, $content, $mailHeaders)) {
        echo "Contact Mail Sent. Thank you!";
    } else {
        echo "Problem in Sending Mail.";
    }
} else {
    echo "Invalid Input. Please check your form and try again.";
}
?>
```
