import { gsap } from "gsap";

export default class Catalog {
    constructor(app) {
        this.app = app;
    }
    init() {
        console.log('Hello Catalog');
        this.filter();
    };

    filter() {
        const that = this;
        document.querySelector('.catalog__filter .mobile--title').addEventListener('click', function(e){
            let target = e.currentTarget;
            let active = target.classList.contains('active');      
            if(active){
              gsap.to('.catalog__filter_nav', {duration: 0.3, height: 0, onComplete: function(){
                gsap.set('.catalog__filter_nav', {clearProps: 'all'});
                target.classList.remove('active');
                document.querySelector('.catalog__filter_nav').classList.remove('show');
              }});
              gsap.to(document.querySelectorAll('.catalog__filter_nav li i'), {duration: 0.3, rotation: 0, scale: 1})
              if(document.querySelectorAll('.catalog__filter_list .active').length){
                gsap.to(document.querySelector('.catalog__filter_list .active'), {duration: 0.3, height: 0})
              }        
            }else{
              gsap.set('.catalog__filter_nav', {display: 'flex'});
              gsap.from('.catalog__filter_nav', {duration: 0.3, height: 0, onComplete: function(){
                target.classList.add('active');
              }});
            }
          });
          document.querySelectorAll('.catalog__filter_nav li').forEach(function (el, i) {
            el.addEventListener('click', function (e) {
              let target = document.querySelector('.catalog__filter_list #' + e.currentTarget.getAttribute('data-target'));
              if (document.querySelectorAll('.catalog__filter_list .active').length) {
                gsap.to(document.querySelectorAll('.catalog__filter .catalog__filter_nav li i'), {duration: 0.3, rotation: 0, scale: 1})
                let current = document.querySelector('.catalog__filter_list .active').id == e.currentTarget.getAttribute('data-target');          
                if(that.app.mode == 'descktop'){
                  document.querySelector('.catalog__filter .mobile--title').classList.remove('active');            
                  gsap.set('.catalog__filter_nav', {clearProps: 'all'});
                  document.querySelector('.catalog__filter_nav').classList.remove('show');
                }
                gsap.to(document.querySelector('.catalog__filter_list .active'), {duration: 0.3, 
                  height: 0, opacity: 0, onComplete: function () {
                    gsap.set(document.querySelector('.catalog__filter_list .active'), { clearProps: "all" });
                    document.querySelector('.catalog__filter_list .active').classList.remove('active');              
                    if (!current) {
                      gsap.set(target, {display: 'block' });
                      gsap.to(el.querySelector('i'), {duration: 0.3, rotation: 180, scale: 1.2})
                      gsap.from(target, {duration: 0.3,
                        height: 0, opacity: 0, onComplete: function () {
                          target.classList.add('active');
                          if(that.app.mode == 'descktop'){
                            document.querySelector('.catalog__filter_nav').classList.add('show');
                          }                    
                          document.querySelector('.catalog__filter .mobile--title').classList.add('active');
                        }
                      });
                    }
                  }
                });
              } else {          
                gsap.to(el.querySelector('i'), {duration: 0.3, rotation: 180, scale: 1.2})
                gsap.set(target, { display: 'block' });
                gsap.from(target, {duration: 0.3, 
                  height: 0, opacity: 0, onComplete: function () {
                    target.classList.add('active');
                      if(that.app.mode == 'descktop'){
                        document.querySelector('.catalog__filter_nav').classList.add('show');
                      }              
                    document.querySelector('.catalog__filter .mobile--title').classList.add('active');
                  }
                });
              }
      
      
      
      
            });
          });
    }
}