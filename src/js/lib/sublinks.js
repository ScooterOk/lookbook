import { gsap } from "gsap";
export default class Sublinks {
    init() {
        document.querySelectorAll('.header__sub').forEach(function(el, i){
            el.querySelector('.header__sub_link').addEventListener('mouseenter', function(e){
                let root = this.closest('.header__sub');
                let subNav = root.querySelector('.header__sub_menu');

                root.classList.add('active');
                gsap.timeline()
                    .set(subNav, {display: 'flex'})
                    .fromTo(subNav, {y: -50, opacity: 0}, {duration: 0.5, y: 0, opacity: 1})
                    
                    
                
                console.log(root);
            });
        });
    }   
}
