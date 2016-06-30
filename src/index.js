var Table = require('./domain/table.js');
var Row = require('./domain/row.js');
var Cell = require('./domain/cell.js');

var pivot = require('./processing/pivot.js').pivot;

var render = require('./view/renderer.js').render;
//var inspect = require('./view/renderer.js').inspect;

var Celda = function(nombre) { return function(valor) { return new Cell(nombre, valor); }; };
var Enero = Celda("ENERO"); var Febrero = Celda("FEBRERO"); var Marzo = Celda("MARZO"); var Abril = Celda("ABRIL");
var Fecha = Celda("FECHA"); var Valor = Celda("VALOR"); var Gestor = Celda("GESTOR"); var Linea = Celda("LINEA");


var header = ["GESTOR", "LINEA", "FECHA", "VALOR"];

var rows = [
    new Row([Gestor("Sam"), Linea("Segunda Mano"), Fecha("ENERO"), Valor(20)]),
    new Row([Gestor("Sam"), Linea("Segunda Mano"), Fecha("FEBRERO"), Valor(21)]),
    new Row([Gestor("Sam"), Linea("Segunda Mano"), Fecha("MARZO"), Valor(22)]),
    new Row([Gestor("Sam"), Linea("Segunda Mano"), Fecha("ABRIL"), Valor(25)]),
    new Row([Gestor("Max"), Linea("Segunda Mano"), Fecha("ENERO"), Valor(30)]),
    new Row([Gestor("Max"), Linea("Segunda Mano"), Fecha("MARZO"), Valor(32)]),
    new Row([Gestor("Max"), Linea("Segunda Mano"), Fecha("ABRIL"), Valor(35)])
];

var table = new Table(header, rows);

//inspect(table);
render(table);

console.log("Pivotamos...\n");

var pivotedTable = pivot(table, "FECHA", "VALOR");

render(pivotedTable);
