var Table = require('../domain/table.js');
var Row = require('../domain/row.js');
var Cell = require('../domain/cell.js');

function hash(row, headerColumn, valueColumn) {
    return row.cells.filter(function(cell) {
        return cell.name !== headerColumn && cell.name !== valueColumn;
    }).reduce(function(hash, cell) {
        return hash + "." + cell.value;
    }, "");
}
function values(obj) {
	return Object.keys(obj).map(function(key) { return obj[key]; });
}

function generateRows(rows, headerColumn, valueColumn) {
    var groupedRows = rows.reduce(function(dict, row) {
        var rowHash = hash(row, headerColumn, valueColumn);
        if (!dict[rowHash]) {
            dict[rowHash] = row.cells.filter(function(cell) {
                return cell.name !== headerColumn && cell.name !== valueColumn;
            });
        }
        dict[rowHash].push(new Cell(row.valueAtName(headerColumn), row.valueAtName(valueColumn)));
        return dict;
    }, {});

    return values(groupedRows).map(function(quasiRow) {
        return new Row(quasiRow);
    });
}

function generateHeaders(table, headerColumn, valueColumn) {
    var newHeaders = table.header.filter(function(header) {
        return header !== headerColumn && header !== valueColumn;
    });
    var valuesAtHeaderColumn = table.rows.map(function(row) {
        return row.valueAtName(headerColumn);
    });
    var distinctValues = valuesAtHeaderColumn.filter(function(value, index) {
        return valuesAtHeaderColumn.indexOf(value) === index;
    });
    return newHeaders.concat(distinctValues);
}

function pivot(table, headerColumn, valueColumn) {

    var pivotedRows = generateRows(table.rows, headerColumn, valueColumn);

    var pivotedHeaders = generateHeaders(table, headerColumn, valueColumn);

    return new Table(pivotedHeaders, pivotedRows);

}


module.exports = { pivot: pivot };
