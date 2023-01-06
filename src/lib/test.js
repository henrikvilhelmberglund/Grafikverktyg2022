Array.prototype.map = function (projectionFunction) {
	var results = [];
	this.forEach(function (itemInArray) {
		results.push(projectionFunction(itemInArray));

		// ------------ INSERT CODE HERE! ----------------------------
		// Apply the projectionFunction to each item in the array and add
		// each result to the results array.
		// Note: you can add items to an array with the push() method.
		// ------------ INSERT CODE HERE! ----------------------------
	});

	return results;
};

console.log(
	JSON.stringify(
		[1, 2, 3].map(function (x) {
			return x + 1;
		})
	)
);

// map returns the new values
JSON.stringify([1, 2, 3].map((x) => x + 1));
// forEach does not return
console.log(JSON.stringify([1, 2, 3].forEach((x) => x + 1)));
