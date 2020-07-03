import { gsap } from "gsap";
export default class Checkout {
    init() {
        this.fixedSide();
        console.log('сheckout__lookbook_list')
    };

    fixedSide() {
        let listAside = {
            offsetTop: document.querySelector('.сheckout__total').getBoundingClientRect().top - 120,
            asideHeight: $('.сheckout__total').height(),
            articleHeight: $('.сheckout__lookbook_list').height()
        }
        console.log(listAside);
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
            listAside.articleHeight = $('.сheckout__lookbook_list').height();
        })
    }
}