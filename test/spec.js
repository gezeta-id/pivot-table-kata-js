var chai = require('chai'),
    expect = chai.expect;
    
var Table = require('../src/domain/table.js');
var Row = require('../src/domain/row.js');
var Cell = require('../src/domain/cell.js');

var pivot = require('../src/processing/pivot.js').pivot;

    
var originalTable, expectedTable, emptyTable;
var originalHeader, pivotedHeader;
var originalRows, pivotedRows;
var testRow;


describe('A Table...', function () {
    beforeEach(function() {
        createTestTables();
    });
    it('has a .header property which returns a copy of its header', function () {
        expect(originalTable.header).to.not.equal(originalHeader);
        expect(originalTable.header).to.deep.equal(originalHeader);
    });
    it('may have some content', function () {
        expect(originalTable.hasContent()).to.be.true;
        expect(emptyTable.hasContent()).to.be.false;
    });
    it('has a number of Rows', function () {
        expect(originalTable.numRows()).to.equal(8);
    });
    it('has a number of Columns', function () {
        expect(originalTable.numCols()).to.equal(4);
    });
    it('allows reading its content', function () {
        expect(originalTable.row(1)).to.equal(originalRows[1]);
    });
});

describe('A Row...', function () {
    beforeEach(function() {
        createTestRow();
    });
    it('has a size which is the number of cells', function () {
        expect(testRow.size()).to.equal(4);
        expect(testRow.size()).to.equal(testRow.cells.length);
    });
    it('knows about the cells it contains', function () {
        expect(testRow.contains("LINEA")).to.be.true;
        expect(testRow.contains("BINGO")).to.be.false;
    });
    it('allows searching its cells', function() {
        expect(testRow.nameAt(1)).to.equal("LINEA");
        expect(testRow.valueAt(1)).to.equal("Segunda Mano");
        expect(testRow.valueAtName("LINEA")).to.equal("Segunda Mano");
    });
});
describe('A Cell...', function () {
    var testCell;
    beforeEach(function() {
        testCell = new Cell("NAME", "VALUE");
    });
    it('has a name', function () {
        expect(testCell.name).to.equal("NAME");
    });
    it('has a value', function () {
        expect(testCell.value).to.equal("VALUE");
    });
    it('is inmutable', function () {
        testCell.name = "NONE";
        testCell.value = "NADA";
        expect(testCell.name).to.equal("NAME");
        expect(testCell.value).to.equal("VALUE");
    });
});

describe('When pivoting a Table...', function() {
    beforeEach(function() {
        createTestTables();
    });
    it('The pivoted table should have the expected number of rows', function () {
        var pivotedTable = pivot(originalTable, "FECHA", "VALOR");
        expect(pivotedTable.numRows()).to.equal(expectedTable.numRows());
    });
    it('The pivoted table should have the expected number of columns', function () {
        var pivotedTable = pivot(originalTable, "FECHA", "VALOR");
        expect(pivotedTable.numCols()).to.equal(expectedTable.numCols());
    });
    it('The pivoted table should have the expected header', function () {
        var pivotedTable = pivot(originalTable, "FECHA", "VALOR");
        expect(pivotedTable.header).to.deep.equal(expectedTable.header);
    });
    it('The pivoted table should have the expected content', function() {
        var pivotedTable = pivot(originalTable, "FECHA", "VALOR");
        var pivotedCellNameAt14 = pivotedTable.row(1).nameAt(3);
        var pivotedCellValueAt14 = pivotedTable.row(1).valueAt(3);
        expect(pivotedCellNameAt14).to.equal("FEBRERO");
        expect(pivotedCellValueAt14).to.equal(31);
    });

});

/* -- -- Building Test Fixtures -- -- */

var Celda = function(nombre) { return function(valor) { return new Cell(nombre, valor); }; };
var Enero = Celda("ENERO"); var Febrero = Celda("FEBRERO"); var Marzo = Celda("MARZO"); var Abril = Celda("ABRIL");
var Fecha = Celda("FECHA"); var Valor = Celda("VALOR"); var Gestor = Celda("GESTOR"); var Linea = Celda("LINEA");

function createTestTables() {
        originalHeader = ["GESTOR", "LINEA", "FECHA", "VALOR"];
        pivotedHeader = ["GESTOR", "LINEA", "ENERO", "FEBRERO", "MARZO", "ABRIL"];

        originalRows = [
            new Row([Gestor("Sam"), Linea("Segunda Mano"), Fecha("ENERO"), Valor(20)]),
            new Row([Gestor("Sam"), Linea("Segunda Mano"), Fecha("FEBRERO"), Valor(21)]),
            new Row([Gestor("Sam"), Linea("Segunda Mano"), Fecha("MARZO"), Valor(22)]),
            new Row([Gestor("Sam"), Linea("Segunda Mano"), Fecha("ABRIL"), Valor(25)]),
            new Row([Gestor("Max"), Linea("Segunda Mano"), Fecha("ENERO"), Valor(30)]),
            new Row([Gestor("Max"), Linea("Segunda Mano"), Fecha("FEBRERO"), Valor(31)]),
            new Row([Gestor("Max"), Linea("Segunda Mano"), Fecha("MARZO"), Valor(32)]),
            new Row([Gestor("Max"), Linea("Segunda Mano"), Fecha("ABRIL"), Valor(35)])
        ];
        pivotedRows = [
            new Row([Gestor("Sam"), Linea("Segunda Mano"), Enero(20), Febrero(21), Marzo(22), Abril(25)]),
            new Row([Gestor("Max"), Linea("Segunda Mano"), Enero(30), Febrero(31), Marzo(32), Abril(35)])
        ];

        originalTable = new Table(originalHeader, originalRows);
        expectedTable = new Table(pivotedHeader, pivotedRows);
        emptyTable = new Table(originalHeader, []);
}

function createTestRow() {
    testRow =  new Row([Gestor("Max"), Linea("Segunda Mano"), Fecha("ABRIL"), Valor(35)])
}
