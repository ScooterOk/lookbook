import { gsap } from "gsap";
export default class Checkout {
    init() {
        this.fixedSide();
        document.querySelectorAll('[name="departament"').forEach(el => {
            el.addEventListener('change', e => {
                if(e.target.value == 'departament') {
                    gsap.set('#nova-poshta-department', {display: 'block'});
                }else{
                    gsap.set('#nova-poshta-department', {display: 'none'});
                }
                console.log();
            });
        });
    };

    fixedSide() {
        let listAside = {
            offsetTop: document.querySelector('.сheckout__total').getBoundingClientRect().top - 120,
            asideHeight: document.querySelector('.сheckout__total').clientHeight
        }
        if(document.querySelectorAll('.сheckout__lookbook_list').length) {
            listAside.articleHeight = document.querySelector('.сheckout__lookbook_list').clientHeight;
        }
        if(document.querySelectorAll('.сheckout__form').length) {
            listAside.articleHeight = document.querySelector('.сheckout__form').clientHeight;
        }
        window.addEventListener('scroll', function(){
            let y = window.pageYOffset;
            let diff = listAside.offsetTop + (listAside.articleHeight - listAside.asideHeight);
            if(y > listAside.offsetTop) {                    
                document.querySelector('.сheckout__total').classList.add('fixed');
                gsap.set(document.querySelector('.сheckout__total'), {clearProps: 'all'})
            }else{
                document.querySelector('.сheckout__total').classList.remove('fixed');
            }
            if(y > diff) {
                document.querySelector('.сheckout__total').classList.remove('fixed');
                gsap.set(document.querySelector('.сheckout__total'), {marginTop: (listAside.articleHeight - listAside.asideHeight)});                
            }            
        });
        window.addEventListener('resize', () => {            
            listAside.asideHeight = $('.сheckout__total').height();
            if(document.querySelectorAll('.сheckout__lookbook_list').length) {
                listAside.articleHeight = document.querySelector('.сheckout__lookbook_list').clientHeight;
            }
            if(document.querySelectorAll('.сheckout__form').length) {
                listAside.articleHeight = document.querySelector('.сheckout__form').clientHeight;
            }
        })
    }
}