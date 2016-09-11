#SSK Responsive
Помогает переключаться между мобильной и десктопной версиями сайта. 

##Использование
Для начала, скачайте [ssk.responsive.min.js](https://raw.githubusercontent.com/win0err/ssk-responsive/master/ssk.responsive.min.js).

В секции `<head>` подключите скрипт и инициализируйте его:
```html
<script type="text/javascript" src="ssk.responsive.min.js"></script>
<script type="text/javascript">
	var Responsive = new SSKResponsive();
</script>
```

##Конфигурация
Настройки по умолчанию:
```js
var Responsive = new SSKResponsive({
	
	// Показывать только десктопную версию сайта
	desktopOnly: false,
	// Ширина десктопной версии сайта в пикселях
	desktopWidth: 1060, 					

	// Если ли переключалка версий на странице
	switcher: false,
	// Селектор переключалки
	switcherSelector: '.ssk_responsive'
});
```

--
Разработал [Сергей Колесников](http://iamawesomeguy.ru/projects/ssk-responsive/).
Используется в [ССК](http://ssk.moscow)