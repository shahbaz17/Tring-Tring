(function () {
	
	var rec = new MozActivity({
		name: "record"
	});

	rec.onsuccess = function () {
		var img = document.createElement("img");
		img.src = window.URL.createObjectURL(this.result.blob);
	}

})();