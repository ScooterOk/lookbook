import { gsap } from "gsap";
import IMask from 'imask';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Header from './lib/header';
import Chessboard from './lib/chessboard';
import Account from './lib/account';
import Homepage from './lib/homepage';
import Card from './lib/card';
import Catalog from './lib/catalog';
import Article from './lib/article';
import Checkout from './lib/сheckout';



gsap.registerPlugin(ScrollToPlugin);


const app = {
  mode: 'descktop',
  touch: false
}

console.log(app);

function appInit() {
  window.scrollTo(0, 0);
  
  const page = document.querySelector('main').className;  
  switch(page) {
    case 'home':
      new Homepage(Chessboard).init();
      break;
    case 'card':
      new Card().init();
      break;
    case 'catalog':
      new Catalog(app).init();
      break;
    case 'account':
      new Account().init();
      break;
    case 'article':
      new Article().init();
      break;
    case 'сheckout':
      new Checkout().init();
      break;     
  
    default:      
      break;
  }




  // Header init
  new Header(app).init();
  if(window.innerWidth <= 1024) {
    app.mode = 'mobile';
  }
  if(window.innerWidth > 1024) {
    app.mode = 'descktop';
  }

  window.addEventListener('resize', function(e){    
    setTimeout(function(){      
      if(window.innerWidth <= 1024) {
        app.mode = 'mobile';
      }
      if(window.innerWidth > 1024) {
        app.mode = 'descktop';
      }
    }, 100);
  });    
  window.addEventListener('orientationchange', function(e){
    setTimeout(function(){
      if(window.innerWidth <= 1024) {
        app.mode = 'mobile';
      }
      if(window.innerWidth > 1024) {
        app.mode = 'descktop';
      }
    }, 100);
  });
  window.addEventListener('deviceorientation', function(e){
    setTimeout(function(){
      if(window.innerWidth <= 1024) {
        app.mode = 'mobile';
      }
      if(window.innerWidth > 1024) {
        app.mode = 'descktop';
      }
    }, 100);
  });    
  // *End* //
  // Touch //
  document.addEventListener('touchstart', function(e){
    if(!app.touch) {
      app.touch = true;
      document.body.classList.add('touch');
    }
  });
  // *End* //

  
  document.querySelector('#gotop').addEventListener('click', function(e){
    gsap.to(window, {duration: 1, scrollTo: 0, ease: "power3.inOut"});
  });
  
  // Global events
  

  window.addEventListener('scroll', function(){
    if(app.mode === 'mobile') return;
    const y = window.pageYOffset;
    if(y > 0) {
      document.querySelector('header').classList.add('small');
      if(y > window.innerHeight) {
        gsap.to('#gotop', {duration: 0.8, opacity: 1, zIndex: 10})
      }else{
        gsap.to('#gotop', {duration: 0.8, opacity: 0, zIndex: 0})
      }
    }else{
      document.querySelector('header').classList.remove('small');
    }

    const gtPoint = (document.body.clientHeight - document.querySelector('footer').clientHeight + (document.querySelector('.footer__toplinks').clientHeight / 2) + 50 + 20)
    if((y + window.innerHeight) >  gtPoint) {
      document.querySelector('#gotop').classList.add('absolute');
    }else{
      document.querySelector('#gotop').classList.remove('absolute');
    }
  });

  gsap.to('#loader', {duration: 0.8, opacity: 0, onComplete() {
    gsap.set('#loader', {display: 'none'});
  }});

  // Forms init
  document.querySelectorAll('.form-control input, .form-control textarea').forEach(function(el, i){

    el.addEventListener('focus', function(e){
      const fc = this.closest('.form-control');
      const ph = fc.querySelector('label');
      gsap.to(ph, {duration: 0.4, opacity: 0});
    });

    el.addEventListener('blur', function(e){
      const val = this.value.trim().length;
      const fc = this.closest('.form-control');
      const ph = fc.querySelector('label');
      if(val){
       fc.classList.add('filled');
      }else{
        fc.classList.remove('filled');
        this.value = '';
        gsap.to(ph, {duration: 0.4, opacity: 1});
      }      
    });

    el.addEventListener('keyup', function(e){      
      const val = this.value.trim().length;
      const fc = this.closest('.form-control');
      console.log(val);
      if(val){
        fc.classList.add('filled');
      }else{
        fc.classList.remove('filled');
      }
    });
  });
  document.querySelectorAll('input[type="tel"]').forEach(el => {
    IMask(
      el, {
        mask: '+{38}(000)000-00-00'
      });
  })
}






window.onload = appInit;


