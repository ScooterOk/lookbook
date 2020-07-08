import { gsap } from "gsap";
export default class header {
    constructor(app) {
        this.searchActive = false;
        this.cartActive = false;
        this.cartTransition = false;
        this.app = app;
    }
    init() {
        this.langSelect();
        this.sublinks();
        this.search();
        this.cart();
    };

    langSelect() {
        const that = this;
        let select = document.querySelector('#lang-select');
        let customSelect = document.createElement('div');
        let svg = '<i></i>'
        let current = document.createElement('div');
        current.className = 'lang-select__current';
        current.innerHTML = svg;
        current.prepend(document.createElement('span'));
        let list = document.createElement('ul');
        customSelect.className = 'lang-select';
        list.className = 'lang-select__list';  
        
        select.querySelectorAll('option').forEach(function(el, i){
            if(i == 0){      
            current.querySelector('span').innerText = el.innerText;
            } else {
            let li = document.createElement('li');
            li.setAttribute('data-index', i);
            let span = document.createElement('span');
            span.innerText = el.innerText;
            li.append(span);
            list.append(li);
            }    
        });
        
        customSelect.append(current);
        customSelect.append(list);
        gsap.set(select, {display: 'none'});
        
        document.querySelector('header .header__options .lang').append(customSelect);
        
        customSelect.addEventListener('mouseenter', function(e){
            if(that.app.mode === 'mobile')return;
            let list = this.querySelector('.lang-select__list');
            gsap.set(list, {display: 'block'});
            gsap.fromTo(list, {opacity: 0}, {duration: .3, opacity: 1});
        });
        customSelect.addEventListener('mouseleave', function(e){
            if(that.app.mode === 'mobile')return;
            let list = this.querySelector('.lang-select__list');
            gsap.to(list, {duration: .3, opacity: 0, onComplete: function(){
                gsap.set(list, {display: 'none'});
            }});
        });
        list.querySelectorAll('li').forEach(function(el, i){
            el.addEventListener('click', function(e){
                let i = this.getAttribute('data-index');
                select.selectedIndex = i;
                select.dispatchEvent(new Event('change'));
                console.log(select.value);
            });
        });
    };

    sublinks() {
        let that = this;
        document.querySelectorAll('.header__sub').forEach(function(el, i){
            let root = el;
            let subNav = el.querySelector('.header__sub_menu');
            let list = subNav.querySelector('ul');
            el.querySelector('.header__sub_link').addEventListener('mouseenter', function(e){
                if(root.classList.contains('active') || that.searchActive || that.app.mode == 'mobile') return;
                document.querySelector('.header__mobile_head .title span').innerText = 'menu';
                root.classList.add('active');
                gsap.timeline()
                    .fromTo(subNav, {y: '-110%'}, {duration: 1, y: '0%', ease: "power4.out"})
                    .fromTo(list, {y: -50, opacity: 0}, {duration: 0.8, y: 0, opacity: 1, ease: "power1.out"}, '-=0.8')                    
            });
            el.addEventListener('mouseleave', function(e){                
                if(!root.classList.contains('active') || that.app.mode == 'mobile') return;
                document.querySelector('.header__mobile_head .title span').innerText = 'menu';
                gsap.killTweensOf(subNav);
                gsap.killTweensOf(list);
                root.classList.remove('active');
                gsap.timeline()
                    .to(list, {duration: 0.5, y: -25, opacity: 0, ease: "power1.in"})
                    .to(subNav, {duration: 0.5, y: '-110%', ease: "power1.in"}, '-=0.3')
            });
            el.querySelector('.header__sub_link').addEventListener('click', e => {
                if(that.app.mode === 'mobile'){
                    const title = e.currentTarget.querySelector('span').innerText;
                    root.classList.add('active');
                    gsap.timeline()
                        .to('.header__mobile_head .title span', {duration: 0.5, y: '100%', ease: "power2.in"})
                        .set('.header__mobile_head .title span', {y: '-100%'})
                        .add(()=>{
                            document.querySelector('.header__mobile_head .title span').innerText = title;
                        })
                        .to('.header__mobile_head .title span', {duration: 0.5, y: '0%', ease: "power2.out"})
                        .fromTo(subNav, {y: '-110%'}, {duration: 1, y: '0%', ease: "power4.out"}, '-=1')
                        .fromTo(['.header__sub--back', '.header__sub--all',list], {y: -50, opacity: 0}, {duration: 0.8, y: 0, opacity: 1, ease: "power1.out"}, '-=0.8')                
                    e.preventDefault();
                }                
            });            
            el.querySelector('.header__sub--back').addEventListener('click', e => {                
                root.classList.remove('active');
                gsap.timeline()
                    .to('.header__mobile_head .title span', {duration: 0.5, y: '-100%', ease: "power2.in"})
                    .set('.header__mobile_head .title span', {y: '100%'})
                    .add(()=>{
                        document.querySelector('.header__mobile_head .title span').innerText = 'menu';
                    })
                    .to('.header__mobile_head .title span', {duration: 0.5, y: '0%', ease: "power2.out"})
                    .to(['.header__sub--back', '.header__sub--all',list], {duration: 0.5, y: -25, opacity: 0, ease: "power1.in"}, '-=1')
                    .to(subNav, {duration: 0.5, y: '-110%', ease: "power1.in"}, '-=0.3')                
                e.preventDefault();
            });
            
        });
    }

    search() {
        let that = this;
        document.querySelector('[data-action="toggleSearch"]').addEventListener('click', function(e){
            this.classList.add('active');
            if(!that.searchActive) {
                that.searchActive = true;
                document.querySelector('#header-search-input').value = '';
                gsap.timeline()
                    .set('#header-search-submit', {opacity: 0})
                    .fromTo('header .search__from', {y: '-110%'}, {duration: 1, y: '0%', ease: "power4.out"})
                    .fromTo('header .search__from .close, #header-search-input', {y: -50, opacity: 0}, {y: 0, opacity: 1, stagger: 0.3, ease: "power1.out"}, '-=0.7')
                    .add(function(){
                        document.querySelector('#header-search-input').focus();
                    })
            }else{
                that.searchActive = false;
                this.classList.remove('active');
                gsap.timeline()
                    .to('header .search__from .close, #header-search-input', {duration: .5, y: -50, stagger: 0.2, opacity: 0, ease: "power1.in"})
                    .to('header .search__from', {duration: 0.5, y: '-110%', ease: "power3.in"}, '-=0.3')                    

            }
        });
        document.querySelector('#header-search-input').addEventListener('keyup', function(e) {
            if(this.value.length > 1) {
                gsap.to('#header-search-submit', {duration: 0.4, opacity: 1})
            }else{
                gsap.to('#header-search-submit', {duration: 0.4, opacity: 0})
            }
        });
        document.querySelector('#header-close-form').addEventListener('click', function(e){
            that.searchActive = false;            
            gsap.timeline()
                .to('header .search__from .close, #header-search-input', {duration: .5, y: -50, stagger: 0.2, opacity: 0, ease: "power1.in"})
                .to('header .search__from', {duration: 0.5, y: '-110%', ease: "power3.in"}, '-=0.3')
                .add(function(){
                    document.querySelector('[data-action="toggleSearch"]').classList.remove('active');
                }, '-=0.5')
        });
    }

    cart() {
        let that = this;
        document.querySelector('[data-action="toggleCart"]').addEventListener('mouseenter', function(e){
            if(!that.cartActive && !that.cartTransition) {
                that.cartTransition = true;
                this.classList.add('active');
                that.cartActive = true;
                gsap.timeline()
                    .fromTo('header .cart .cart__details', {y: '-110%', opacity: 0}, {duration: 1, y: '0%', opacity: 1, ease: "power3.out"})
                    .add(function(){                        
                        that.cartTransition = false;
                    })
            }
        });
        document.querySelector('header .cart .cart__details').addEventListener('mouseleave', function(e){
            if(that.cartActive && !that.cartTransition) {
                setTimeout(function(){
                    document.querySelector('[data-action="toggleCart"]').classList.remove('active');
                }, 300);
                gsap.timeline()
                    .to('header .cart .cart__details', {duration: 0.6, y: '-110%', opacity: 0, ease: "power2.in"})                    
                    .add(function(){                      
                        that.cartActive = false;
                        that.cartTransition = false;
                    })                    
            }
        });
    }
}