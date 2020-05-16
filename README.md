# Still in work!!!!

This repo just home work of bioinf course.

## How to


### Install

- ```git clone <this_url>```
- ``` cd ... ```
- ``` yarn install ```

### How to run

- ```yarn build```
- ```yarn start```

### Test

- ```yarn test```

## Build

- ```yarn make``` will build app for your platform
- ```yarn make:win``` will build app for windows platform

Before building for windows install [Wine](https://www.davidbaumgold.com/tutorials/wine-mac/#part-2:-install-wine-using-homebrew) and [mono] ```brew intall mono```  

### Todo

- ORF highlight
- ORF start stop positions
- 2 task bioinf:  <br/>
Итак, второе домашнее задание. Цель - исследовать зависимость вероятности нахождения хотя бы одной орф от GC состава последовательности. Запустить программу предсказания орф для gc состава от 20 до 80%, с шагом 1. Для каждого из значений gc запускать программу 10000 раз и считать процент последовательностей днк длиной 1000, в которых найдена хотя бы 1 орф минимальной длины 30 кодонов. Выход - файл с двумя столбцами: процент gc и вероятность. Соответствующий график можно построить в excel, например. Если зависимость будет не очевидной, попробовать изменить минимальное число кодонов и длину генерируемой последовательности днк.
- Find or create lib to generate pdf plots

### Think about
- Dynamic test compare search with [Orf searcher](http://bioinformatics.org/sms/orf_find.html)
- Webpack 5
- worker threads on electron side