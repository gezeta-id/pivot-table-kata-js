# Kata/Ejercicio Pivotando Tablas

En una imaginaria aplicación que hemos desarrollado para generar informes y tablas de datos, nos
encontramos con que toda una serie de tablas tienen una pinta como la siguiente:

| Gestor |     Línea    | Fecha   | Valor |
|--------|:------------:|---------|------:|
| Sam    | Segunda Mano | Enero   | 20    |
| Sam    | Segunda Mano | Febrero | 22    |
| Sam    | Segunda Mano | Marzo   | 25    |
| Max    | Segunda Mano | Enero   | 15    |
| Max    | Segunda Mano | Marzo   | 19    |

Y tras usar la aplicación durante un tiempo empezamos a recibir solicitudes para mostrar los datos
de este otro modo:

| Gestor |     Línea    | Enero | Febrero | Marzo |
|--------|:------------:|------:|--------:|------:|
| Sam    | Segunda Mano | 20    | 22      | 25    |
| Max    | Segunda Mano | 15    |         | 19    |

Es decir, resulta mucho más cómodo y práctico para los usuarios poder _pivotar_ la tabla,
agrupando ciertas filas y mostrando el contenido de las columnas diferentes como celdas de la misma
fila. En el ejemplo, hemos escogido dos columnas en la tabla original:

 - "Fecha" es la columna que se convertirá en cabecera
 - "Valor" es la columna que se convertirá en valores

Luego se agrupa por el resto de columnas y se pivota respecto a las columnas elegidas.


El objetivo del ejercicio consiste en implementar la función `pivot` (y las entidades auxiliares que
necesitemos, claro) que hace la transformación de la tabla.

## El código de partida

Para el ejecricio hemos implementado una aplicación básica en JavaScript.

La aplicación incialmente consta de un _dominio_ (`src/domain`) que contiene 3 entidades: `Table`,
`Row`, y `Cell`. Las tres nos permiten generar objetos del tipo correspondiente que serán _inmutables_
de modo que cualquier operación que suponga modificación debe resultar en un nuevo objeto del tipo
correspondiente.

Más abajo se describe brevemente el API del dominio. Este dominio de la aplicación, ya está en uso, de modo que se considera que una solución válida no debería modificar ninguno de estos ficheros salvo en caso de encontrar un bug o alguna emergencia similar. Si queremos podemos inspeccionar su código para comprender mejor la aplicación, pero no es realmente necesario más allá de conocer su interfaz público.

Además de esto, nuestro mentor nos ha dejado preparadas algunas cosas más que podremos usar:

 - Nuestro campo de trabajo es el módulo `src/processing/pivot.js` que debe exportar una función única `pivot` que realiza el pivotaje. De partida la función simplemente devuelve la misma tabla recibida, tal cual :)
 - Hay un `src/index.js` (ejecutable con `npm run main`) que podemos usar como ejemplo sencillo para entender el problema.
 - En la carpeta (`src/view/`) hemos dejado un par de utilidades que nos permiten pintar objeto `Table` en consola.

Por último tenemos `test/spec.js` que contiene unos tests básicos sobre el dominio que quizá nos ayuden a entender cómo funciona este y otra serie de tests sobre el caso más básico de pivotaje. Este será el punto de partida para nuestro trabajo.

## Cómo empezar

Requisitos: NodeJS + npm.

Lo ideal es clonar el repositorio, crear una nueva rama y empezar a trabajar en la nueva rama para tener siempre `master` con una versión fresca y limpia del ejercicio sin soluciones. El repositorio original incluye una rama con una posible solución pero se recomienda encarecidamente no mirarla para que el ejercicio tenga sentido.

Si no, siempre podemos bajar el proyecto sin clonarlo y empezar a trabajar directamente sin gestión de versiones. Pero es mucho más divertido con!

Una vez tengamos el proyecto, ejecutamos en la carpeta raíz del mismo:

```bash
> npm install
```

para instalar las dependencias propias del proyecto.

Una vez hecho esto podemos:

 - Ver el proyecto en marcha ejecutando `npm run main`. Saldrán por consola dos tablas incialmente iguales.
 - Ejecutar los tests que nos indicarán por dónde deberíamos empezar a trabajar: `npm test`.

Podemos usar el editor o IDE que más nos guste. Todo el proyecto corre en consola con NodeJS de modo que no necesitamos más herramientas.

Si queremos, también tenemos la posibilidad de ejecutar

```bash
> npm run watch
```

que dejará un proceso abierto en consola que ejecutará los tests una vez inicial y luego cada vez que modifiquemos algún fichero.

A partir de aquí, editaremos `src/processing/pivot.js` para ir haciendo que pasen los varios test que inicialmente fallan.

## API del Dominio

Según las reglas del ejercicio, se considera que no deberemos modificar ninguna de estas entidades, ya que están en uso en otras partes de nuestra aplicación imaginaria. El API de cada una de ellas es relativamente sencillo:

### Cell

```javascript
var cell = new Cell("Mes", "Enero");

console.log(cell.name, cell.value); // "Mes" "Enero" - sólo lectura
```

### Row

```javascript
var row = new Row([new Cell("Mes", "Enero"), new Cell("Visitas", 4)]);

console.log(row.cells); // [new Cell("Mes", "Enero"), new Cell("Visitas", 4)] - sólo lectura
console.log(row.size()); // 2
console.log(row.nameAt(1)); // "Visitas"
console.log(row.valueAt(1)); // 4
console.log(row.valueAtName("Visitas")); // 4
console.log(row.cellNamed("Visitas")); // new Cell("Visitas", 4)
console.log(row.values()); // ["Enero", 4]
console.log(row.valuesMap()); // { "Mes": "Enero", "Visitas": 4 }
console.log(row.contains("Visitas")); // true
```

### Table

```javascript
var table = new Table(["Mes", "Visitas"], [row, row, row]);

console.log(table.header); // ["Mes", "Visitas"] - sólo lectura
console.log(table.rows); // [row, row, row] - sólo lectura
console.log(table.numRows()); // 3
console.log(table.numCols())); // 2
console.log(table.row(1)); // row
console.log(table.hasContent()); // true
```
