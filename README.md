# ui
## Сборка шрифта

В проекте используется npm package grunt-webfont  
Для работы данного пакета требуется установить **[Python](https://www.python.org/downloads/)**, **[ttfautohint](http://www.freetype.org/ttfautohint/#download)** и **[fontforge](http://fontforge.github.io/en-US/downloads/windows/)**  

## Определить переменные среды: 
* PATH C:\Python37  
* PYTHON C:\Python37\python.exe 
* PATH < install path ttfautohint >  
* PATH C:\Program Files (x86)\FontForgeBuilds\bin  

## SVG файлы иконок
SVG файл иконки должен содержать всего один слой составного контура.  
Сам же составной контур не должен содержать в себе ни одного контура. Все контуры должны быть преобразованы в кревые и залиты чёрным цветом.
