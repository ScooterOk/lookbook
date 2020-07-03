import Swiper from 'swiper';
export default class Article {
    init() {
        this.slider();
    };
    slider() {
        this.mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            //direction: 'vertical',
            loop: false,
            speed: 800,
            autoHeight: true,
            slidesPerView: 2,
            //slidesPerGroup: 2,
            spaceBetween: 60,
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
}