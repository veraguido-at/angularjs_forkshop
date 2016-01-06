# angularjs_forkshop
Repo con el workshop de AngularJS (AKA forkshop) 
//
Antes de empezar, asegurate de tener instalado

 * NodeJS: Segui [estas](https://nodejs.org/en/download/package-manager/) instrucciones
 * Grunt-cli: Segui [estas](https://github.com/gruntjs/grunt-cli) instrucciones (Presta atencion al flag -g)

# Que vimos en la ultima clase?
En la clase anterior revisamos conceptos de NPM, Grunt, Bower y de la estructura de proyectos. Va la tarea :D

## Tarea

### Paso 1: Github

 - Create un fork de github de [este mismo repo](https://github.com/mliwski/angularjs_forkshop) (si lo tenias de la primer clase eliminalo y forkea nuevamente)

### Paso 2: NPM

 - Configura bien el script de test con la linea ```"node node_modules/karma/bin/karma start test/karma.conf.js"```
 - Tenes que subir todo a [travis-ci](https://travis-ci.org)
 y ver que rompen los test online (se supone que esta publicado en https://travis-ci.org/USERNAME/angularjs_forkshop/builds).

**Bonus:**

 - Agregale al README tu badge de travis: https://docs.travis-ci.com/user/status-images/)

### Paso 3: Grunt 

 - Ups nos olvidamos de agregar un el modulo ```grunt-karma``` ... parece que sin eso falla el comando ```grunt compile``` ... arreglalo y que funcione en travis-ci (build passing)

### Paso 4: Bower

 - Me parece que el author es incorrecto, fijate de cambiarlo ;)


### Paso 5: Implementacion

 - Implementa el servicio de POST, OJO! tu coverage tiene que estar arriba del 50% o no van a pasar los test.
 - WAIT ... la estructura que esta planteada no es muy copada ... pasalo a una estructura de proyecto mejor ;)

### Paso 6: Token de entrada

 - Crea una tarea con el sigiuente formato: TUNOMBRE - Ir a la clase de AngularJS 


# Recursos

Dejamos aca los links de las principales tecnologias que utilizamos, te pueden servir si te encontras con algun problema o tenes alguna duda

 - [NPM](https://www.npmjs.com/): Gestor de modulos de node
 - [Grunt](http://gruntjs.com/): Tasks runner
 - [Bower](http://bower.io/): Gestor de paquetes para javascript (browser side)
 - [AngularJS](https://docs.angularjs.org/api): Link a la api de AngularJS
 - [Karma](http://karma-runner.github.io/0.13/index.html): Runner de tests para AngularJS (Simil PHPUnit o Junit) 
 - [Mocha](https://mochajs.org/): Framework de test para javascript
 - [Chai](http://chaijs.com/): Libreria de assertions con mucha vitamina mediante plugins
 - [travis-ci](https://travis-ci.org): Integracion continua en la nube
 - [Mongolab API](http://docs.mongolab.com/data-api/): API Rest de mongolab
 
