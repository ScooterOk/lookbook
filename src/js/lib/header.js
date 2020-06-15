import { gsap } from "gsap";
export default class header {
    constructor() {
        this.transition = false;
    }
    init() {
        this.langSelect();
        this.sublinks();
    };

    langSelect() {
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
            let list = this.querySelector('.lang-select__list');
            gsap.set(list, {display: 'block'});
            gsap.fromTo(list, {opacity: 0}, {duration: .3, opacity: 1});
        });
        customSelect.addEventListener('mouseleave', function(e){
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
            });
        });
    };

    sublinks() {
        document.querySelectorAll('.header__sub').forEach(function(el, i){
            let root = el;
            let subNav = el.querySelector('.header__sub_menu');
            let list = subNav.querySelector('ul');
            el.querySelector('.header__sub_link').addEventListener('mouseenter', function(e){
                if(root.classList.contains('active')) return;
                root.classList.add('active');                
                gsap.timeline()
                    .fromTo(subNav, {y: '-110%'}, {duration: 1, y: '0%', ease: "power4.out"})
                    .fromTo(list, {y: -50, opacity: 0}, {duration: 0.8, y: 0, opacity: 1, ease: "power1.out"}, '-=0.8')
                    .add(function(){
                        //gsap.killTweensOf(subNav);                        
                    })
                    
                
                
            });
            el.addEventListener('mouseleave', function(e){
                if(!root.classList.contains('active')) return;
                gsap.killTweensOf(subNav);
                gsap.killTweensOf(list);
                gsap.timeline()
                    .to(list, {duration: 0.5, y: -25, opacity: 0, ease: "power1.in"})
                    .to(subNav, {duration: 0.5, y: '-110%', ease: "power1.in"}, '-=0.3')
                    .add(function(){
                        root.classList.remove('active');                        
                    })
            });
        });
    }
}