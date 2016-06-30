function Table(header, rows) {
	header = header.slice(0); rows = rows.slice(0);
	Object.defineProperty(this, 'header', {
		get: function() {
			return header.slice(0);
		}
	});
	Object.defineProperty(this, 'rows', {
		get: function() {
			return rows.slice(0);
		}
	});
	return this;
}

Table.prototype.numRows = function() {
	return this.rows.length;
};
Table.prototype.numCols = function() {
	return this.header.length;
};
Table.prototype.row = function(index) {
	return this.rows[index];
};
Table.prototype.hasContent = function() {
	return this.rows.length > 0;
};

module.exports = Table;
