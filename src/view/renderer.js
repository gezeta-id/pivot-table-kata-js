require('console.table');

function inspect(table) {
    console.log("Table contents - (cols, rows): (" + table.numCols() + "," + table.numRows() + ")");

    console.log("Headers:")
    console.dir(table.header,{colors:true});
    console.log("Rows:")
    table.rows.forEach(function(r, i) {
        console.log("Row [" + i + "]:");
        r.cells.forEach(function(c) {
            console.log("Name: " + c.name + ", Value: " + c.value);
        });
    });
}
function render(table) {
    var outputTable = table.rows.map(function(r) {
        return r.valuesMap();
    });
    console.table("Table:", outputTable);
}
function toHtml(table) {
    var container = ["<table>\n"];

    var headers = table.header.map(function(h) { return "<th>" + h +"</th>\n"; }).join("");
    container.push("<thead>\n" + headers + "</thead>\n");

    var rows = table.rows.map(function(r) {
        return "<tr>\n" + table.header.map(function(h) {
            return "<td>" + r.valueAtName(h) + "</td>\n";
        }).join("") + "</tr>\n";
    });
    container.push("<tbody>\n" + rows + "</tbody>\n");
    container.push("</table>");

    return container.join("");
}

module.exports = { render: render, inspect: inspect, toHtml: toHtml };
