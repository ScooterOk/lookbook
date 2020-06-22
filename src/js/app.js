import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Header from './lib/header';
import Chessboard from './lib/chessboard';
import Slider from './lib/slider';
import Homepage from './lib/homepage';
import Card from './lib/card';
import Catalog from './lib/catalog';

gsap.registerPlugin(ScrollToPlugin);


const app = {
  mode: 'descktop'
}


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
  
    default:      
      break;
  }




  // Header init
  new Header().init();

  
  document.querySelector('#gotop').addEventListener('click', function(e){
    gsap.to(window, {duration: 1, scrollTo: 0, ease: "power3.inOut"});
  });
  
  // Global events
  

  window.addEventListener('scroll', function(){
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
  }})
}






window.onload = appInit;


