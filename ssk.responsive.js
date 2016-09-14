/**
 * Copyright (c) 2016 Sergei Kolesnikov
 * License: MIT 
 * http://iamawesomeguy.ru/projects/ssk-responsive/
**/

function SSKResponsive(settings) {
    var defaults = {
        desktopOnly: false, // Показывать только десктопную
        desktopWidth: 1060, // Ширина сайта

        switcher: false, // Переключать ли версии при клике по элементу
        switcherSelector: '.ssk_responsive', // Класс элемента
    };
    // Объединяем настройки по-умолчанию с пользовательскими
    this._settings = Object.assign(defaults, settings); 

    // Проверка Юзер-агента
    this._isMobile = mobilecheck(); 



    // Проверка на изменение галочки «Полная версия»
    // — this._isMobile — что нам говорит проверка юзер-агента
    // — localStorage.wasMobile — версия страницы из прошлого загрузка скрипта
    if(localStorage.wasMobile == 'false' && this._isMobile)
        localStorage.isResponsive = 'true';
    
    
    // Сохраняем версию страницы из текущего запуска скрипта
    localStorage.wasMobile = this._isMobile;

    // Если можно переключать на десктопную
    if(!this.canToggle()) localStorage.isResponsive = 'false';


    // Если нет мета-вьюпорта, создаём
    if(document.querySelector("meta[name=viewport]") == null)
        document.getElementsByTagName('head')[0].innerHTML += '<meta content="width=device-width, initial-scale=1" name="viewport" />';


    // Если десктопная версия (localStorage.isResponsive == 'false',
    // в мета-тег вьюпорт ставим ширину из настроек    
    if(localStorage.isResponsive == 'false') { 
        document.querySelector("meta[name=viewport]")
            .setAttribute('content', 'width=' + this._settings.desktopWidth + 
                ', initial-scale=' + (screen.width / this._settings.desktopWidth)); 
    }

    // Если в настройках стоит, что есть элемент-преключатель на странице
    if(this._settings.switcher){

        // Дожидаемся загрузки DOM-дерева
        document.addEventListener("DOMContentLoaded", 
            function() {
                // Наш элемент-переключатель
                var el = document.querySelector(this._settings.switcherSelector);

                // Если элемент действительно существует
                if(el != null) {

                    // Если можно переключать между респонзивом и десктопной версией
                    if(this.canToggle()) {

                        // Вешаем на клик переключение между десктопной и респонзив
                        el.addEventListener("click", 
                            function(e) {
                                e = e || window.event;
                                e.preventDefault();

                                this.toggle();
                            }.bind(this)
                        , false);

                    }
                    else {
                        // Если нельзя переключать версию (мы с компа),
                        // делаем элемент невидимым, чтобы не путать пользователя
                        el.style.visibility = 'hidden';
                    }
                }
                else this._settings.switcher = false; // Не существует — выключаем, на всякий случай

            }.bind(this)
        , false);
    }
    
}

// Переключение между десктопной и респонзив
SSKResponsive.prototype.toggle = function(mode) {

    // Можно ли переключать?
    if(this.canToggle()) {

        // Если (сейчас респонзив и не ставим респонзив вручную) или вручную ставим десктопную
        if((localStorage.isResponsive == 'true' && mode != 'responsive')  
        || mode == 'desktop') { 
            document.querySelector("meta[name=viewport]")
                .setAttribute('content', 'width=' + this._settings.desktopWidth + 
                    ', initial-scale=' + (screen.width/this._settings.desktopWidth));

            // Сохраняем режим «десктоп»
            localStorage.isResponsive = 'false';

            return 'desktop';
        } 
        else { // Иначе делаем респонзив
            document.querySelector("meta[name=viewport]")
                .setAttribute('content', 'width=device-width'); 

            // Сохраняем режим «респонзив»
            localStorage.isResponsive = 'true';

            return 'responsive';
        }
    
    } else return false; // Нельзя переключить :(

};

// Можно ли переключать на десктопную
SSKResponsive.prototype.canToggle = function() {
    // Если мы на мобильном и в нестройках не стоит режим «Показывать только десктопную» 
    return (this._isMobile && !this._settings.desktopOnly);
};

// Проверка юзер-агента на мобильность
function mobilecheck() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}