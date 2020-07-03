export default class Account {
    init() {
        this.table();
        this.tabs();
    };

    table() {
        if(document.querySelectorAll('#orders-table').length) {
           document.querySelectorAll('#orders-table tr.view').forEach(el => {
               el.addEventListener('click', e => {
                    let visible = el.classList.contains('visible');
                    let fold = el.nextElementSibling;
                    if(visible) {
                        el.classList.remove('visible');
                        fold.classList.remove('visible');
                    }else{                        
                        el.classList.add('visible');
                        fold.classList.add('visible');
                    }
                    
               });
           });
        }
    }
    tabs() {
        document.querySelectorAll('.tabs .tabs__nav li a').forEach(el => {
            el.addEventListener('click', e => {
                let target = e.target.closest('li').getAttribute('data-target');
                e.target.closest('.tabs').querySelector('.tabs__nav li.current').classList.remove('current');
                e.target.closest('li').classList.add('current');

                e.target.closest('.tabs').querySelector('.tabs__body li.current').classList.remove('current');
                e.target.closest('.tabs').querySelector('.tabs__body li#'+target).classList.add('current');                
                e.preventDefault();
            });
        });
    }
}