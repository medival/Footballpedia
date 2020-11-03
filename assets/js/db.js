let dbPromised = idb.open("Footballpedia", 1, function (UpgradeDB) {
	let teamsObjectStore = UpgradeDB.createObjectStore("teams", {
		keyPath: "id",
	});
	teamsObjectStore.createIndex("shortName", "shortName", {});
});

function saveToFavorite(team) {
	dbPromised
		.then(function (db) {
			let tx = db.transaction("teams", "readwrite");
			let store = tx.objectStore("teams");
			console.log(team);
			store.add(team);
			return tx.complete;
		})
		.then(function () {
			console.log("Team berhasil disimpan");
			M.toast({
				html: `Saved to favorite club`,
			});
		})
		.catch((error) => console.log(error));
}

function getAll() {
	return new Promise((resolve, reject) => {
		dbPromised
			.then(function (db) {
				let tx = db.transaction("teams", "readonly");
				let store = tx.objectStore("teams");
				return store.getAll();
			})
			.then(function (teams) {
				resolve(teams);
			});
	});
}

function getById(id) {
	return new Promise((resolve, reject) => {
		dbPromised
			.then(function (db) {
				let tx = db.transaction("teams", "readonly");
				let store = tx.objectStore("teams");
				return store.get(id);
			})
			.then(function (team) {
				resolve(team);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

function deleteFavTeam(team) {
	dbPromised
		.then(function (db) {
			let tx = db.transaction("teams", "readwrite");
			let store = tx.objectStore("teams");
			store.delete(team);
			return tx.complete;
		})
		.then(function () {
			console.log("Team has been removed");
			M.toast({
				html: `Team has been removed`,
			});
		})
		.catch((error) => console.log(error));
}
