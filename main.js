
import '/styles/reset.css';
import '/styles/vars.css';
import '/styles/font.css';
import '/styles/typography.css';
import '/styles/layout.css';
import '/styles/intro.css';
import '/styles/header.css';
import '/styles/about.css';
import '/styles/resume.css';
import '/styles/contact.css';
import '/styles/footer.css';


var myFeature = {
  // init function
  init: function () {
    this.cacheDom()
    this.bindEvents()
  },
  // cache DOM elements
  cacheDom: function () {
    this.$body = document.body

    // header/navigation variables
    this.$header = this.$body.querySelector('.header')
    this.$nav = this.$header.querySelector('.nav')
    this.$navItems = this.$nav.querySelectorAll('.nav__item')
    this.$btn = this.$header.querySelector('.btn')
    this.$arrow = this.$body.querySelector('.intro__arrow')

    // contact form variables
    this.$form = this.$body.querySelector('#contact-form')
    this.$formChildren = this.$form ? [...this.$form.children] : []
    this.$formName = this.$form.querySelector('#userName')
    this.$formEmail = this.$form.querySelector('#userEmail')
    this.$formSubject = this.$form.querySelector('#subject')
    this.$formContent = this.$form.querySelector('#content')
    this.$formSend = this.$form.querySelector('.send')
    this.$sendStatus = this.$body.querySelector('.send-status')
  },
  // bind events
  bindEvents: function () {
    this.$btn.addEventListener('click', this.toggleClass.bind(this))
    this.$navItems.forEach(item => item.addEventListener('click', this.toggleClass.bind(this)))
    this.$navItems.forEach(item => item.addEventListener('click', this.smoothScroll.bind(this)))
    this.$arrow.addEventListener('click', this.smoothScroll.bind(this))
    this.$formSend.addEventListener('click', this.sendContact.bind(this))
    document.addEventListener('scroll', this.onScroll.bind(this))
  },
  // toggle function for burger menu
  toggleClass: function () {
    if (window.innerWidth < 768) {
      this.$btn.classList.toggle('is-clicked')
      if (this.$nav.style.display === 'block') {
        this.$nav.style.display = 'none'
      } else {
        this.$nav.style.display = 'block'
      }
    }
  },
  // smoothscroll function
  smoothScroll: function (event) {
    const targetId = event.currentTarget.getAttribute('href')
    const target = document.querySelector(targetId)
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      })
      event.preventDefault()
    }
  },
  // on scroll show and update (active class) navigation
  onScroll: function () {
    this.slideHeader()
    this.updateActiveClass(window.scrollY)
  },
  // automatically updates navigation targets based on scroll position similar to Bootstrap ScrollSpy
  updateActiveClass: function (scrollPos) {
    if (window.innerWidth >= 768) {
      this.$navItems.forEach(item => {
        const refElement = document.querySelector(item.getAttribute('href'))
        if (refElement) {
          if (refElement.offsetTop - this.$header.clientHeight <= scrollPos && refElement.offsetTop - this.$header.clientHeight + refElement.clientHeight > scrollPos) {
            this.$navItems.forEach(nav => nav.classList.remove('is-active'))
            item.classList.add('is-active')
          } else {
            item.classList.remove('is-active')
          }
        }
      })
    }
  },
  slideHeader: function () {
    const startPoint = window.innerHeight - document.querySelector('header').clientHeight
    if (window.scrollY >= startPoint) {
      this.$header.style.display = 'block'
    } else if (window.scrollY === 0 && window.innerWidth >= 768) {
      this.$header.style.display = 'none'
    }
  },
  sendContact: function () {
    if (this.validateContact()) {
      const data = new URLSearchParams({
        userName: this.$formName.value,
        userEmail: this.$formEmail.value,
        subject: this.$formSubject.value,
        content: this.$formContent.value
      })

      fetch('contact-form.php', {
        method: 'POST',
        body: data
      })
      .then(response => response.text())
      .then(data => {
        this.$formChildren.forEach(child => child.disabled = true)
        this.$sendStatus.innerHTML = data
      })
      .catch(error => console.error('Error:', error))
    }
  },
  validateContact: function () {
    let valid = true
    valid = this.checkInput(this.$formName) && valid
    valid = this.checkInput(this.$formSubject) && valid
    valid = this.checkInput(this.$formContent) && valid

    // check email
    if (!this.$formEmail.value) {
      this.$formEmail.classList.add('error')
      valid = false
    } else {
      const emailPattern = /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/
      if (!emailPattern.test(this.$formEmail.value)) {
        this.$formEmail.classList.add('error')
        valid = false
      } else {
        this.$formEmail.classList.remove('error')
      }
    }
    return valid
  },
  // check for values in form's input and add or remove class based on that
  checkInput: function (element) {
    if (!element.value) {
      element.classList.add('error')
      return false
    } else {
      element.classList.remove('error')
      return true
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  myFeature.init()
})