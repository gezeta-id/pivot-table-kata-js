function Cell(name, value) {
	Object.defineProperty(this, 'name', {
		get: function() {
			return name;
		}
	});
	Object.defineProperty(this, 'value', {
		get: function() {
			return value;
		}
	});
	return this;
}

module.exports = Cell;