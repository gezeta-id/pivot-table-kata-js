function Row(cells) {
	cells = cells||[];
	Object.defineProperty(this, 'cells', {
		get: function() {
			return cells.slice(0);
		}
	});
	return this;
}
Row.prototype.size = function() {
	return this.cells.length;
};
Row.prototype.valueAtName = function(name) {
	if (this.contains(name)) {
		return this.cells.filter(function(c) { return c.name === name; })[0].value;
	} else {
		return null;
	}
};
Row.prototype.valueAt = function(index) {
	return this.cells[index] && this.cells[index].value;
};
Row.prototype.nameAt = function(index) {
	return this.cells[index] && this.cells[index].name;
};
Row.prototype.cellNamed = function(name) {
	return this.cells.filter(function(c) { return c.name === name; });
};
Row.prototype.values = function() {
	return this.cells.map(function(c) { return c.value; });
};
Row.prototype.valuesMap = function() {
	return this.cells.reduce(function(m, c) { m[c.name] = c.value; return m; }, {});
};
Row.prototype.contains = function(name) {
	return this.cells.some(function(c) { return c.name === name; });
};

module.exports = Row;