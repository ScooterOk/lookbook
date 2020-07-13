import { gsap } from "gsap";
import Swiper from 'swiper';


export default class Homepage {
    constructor(Chessboard) {
        this.mySwiper;
        this.Chessboard = Chessboard;        
    }
    init() {        
        new this.Chessboard().init();
        this.slider();
    };    

    slider() {
        this.mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            //direction: 'vertical',
            loop: false,
            speed: 800,
            autoHeight: true,
            slidesPerView: 1,
            //slidesPerGroup: 2,
            spaceBetween: 0,
            slideVisibleClass: 'swiper-slide-visible',

            breakpoints: {
            // when window width is >= 320px                
                960: {
                    slidesPerView: 2,
                    spaceBetween: 60,
                    
                }
            },
        
        
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
}