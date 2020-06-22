export default class Chessboard {
    init() {
        document.querySelectorAll('.chessboard__row').forEach(function(el, i){
            let img = el.querySelector('.background img').cloneNode(true);
            img.className = 'substrate';
            if(el.querySelectorAll('.details--photo').length) {
                el.querySelector('.details--photo a').appendChild(img);
            }            
        });
    }   
}
