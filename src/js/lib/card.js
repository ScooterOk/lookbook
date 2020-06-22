import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Swiper from 'swiper';

gsap.registerPlugin(ScrollToPlugin);


export default class Card {
    constructor() {
        this.mySwiper;        
    }
    init() {
        this.slider();
        this.fixedSide();
        document.querySelector('[data-link="description"]').addEventListener('click', (e) =>{
            let y = document.querySelector('.card__description').offsetTop - 120;
            gsap.to(window, {duration: 1, scrollTo: y, ease: "power4.inOut"});
            e.preventDefault();
        });
    };    

    slider() {
        this.mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            //direction: 'vertical',
            loop: false,
            speed: 800,
            autoHeight: true,
            slidesPerView: 3,
            //slidesPerGroup: 2,
            spaceBetween: 80,
            slideVisibleClass: 'swiper-slide-visible',
        
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },
        
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }            
        })
    }

    fixedSide() {
        let listAside = {
            offsetTop: document.querySelector('.card__article_details').getBoundingClientRect().top - 120,
            asideHeight: $('.card__article_details').height(),
            articleHeight: $('.card__article_photo').height()
        }
        console.log(listAside);
        window.addEventListener('scroll', function(){
            let y = window.pageYOffset;
            let diff = listAside.offsetTop + (listAside.articleHeight - listAside.asideHeight);
            if(y > listAside.offsetTop) {                    
                document.querySelector('.card__article_details').classList.add('fixed');
                gsap.set(document.querySelector('.card__article_details'), {clearProps: 'all'})
            }else{
                document.querySelector('.card__article_details').classList.remove('fixed');
            }
            if(y > diff) {
                document.querySelector('.card__article_details').classList.remove('fixed');
                gsap.set(document.querySelector('.card__article_details'), {marginTop: (listAside.articleHeight - listAside.asideHeight)});                
            }            
        });
        window.addEventListener('resize', () => {
            console.log(listAside);
            listAside.asideHeight = $('.card__article_details').height();
            listAside.articleHeight = $('.card__article_photo').height();
        })
    }
}