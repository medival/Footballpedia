let baseUrl = "https://api.football-data.org/v2/";
const authToken = "0dd585b1af05408ab6ae1d12cdb63462";

// Fetch competition
const fetchApi = (baseUrl, competitionId) => {
	return fetch(`${baseUrl}competitions/${competitionId}/teams`, {
		headers: {
			"X-Auth-Token": authToken,
		},
	});
};

// If respons OK
function status(response) {
	if (response.status !== 200) {
		console.log(`Error : ${response.status}`);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
}

// Parsing JSON to Array
function json(response) {
	return response.json();
}

// Catch error
function error(error) {
	console.log(`Error : ${error}`);
}

// Cache All Team
function cacheCompetition(id) {
	fetchApi(baseUrl, id).then(status);
}

// Request Data
function getTeams(competitionId) {
	fetchApi(baseUrl, competitionId)
		.then(status)
		.then(json)
		.then((data) => {
			let teamsHTML = "";

			data.teams.forEach((team) => {
				if (team.crestUrl !== null && team.crestUrl !== "") {
					teamsHTML += inputCards(team);
				} else {
					console.assert(`${team.name} dont have a logo`);
				}
			});

			document.getElementById("teams").innerHTML = teamsHTML;
		});
}

function getTeamById() {
	return new Promise((resolve, reject) => {
		let urlParams = new URLSearchParams(window.location.search);
		let idParam = urlParams.get("id");

		console.log(idParam);
		if ("caches" in window) {
			caches
				.match(`${baseUrl}teams/${idParam}`)
				.then((response) => {
					if (response) {
						response.json().then((data) => {
							teamInfo(data);
							showClubMember(data);
							resolve(data);
						});
					}
				})
				.catch(error);
		}
		let endPoint = `${baseUrl}teams/${idParam}`;
		fetch(endPoint, {
			headers: {
				"X-Auth-Token": authToken,
			},
		})
			.then(status)
			.then(json)
			.then((data) => {
				teamInfo(data);

				showClubMember(data);
				resolve(data);
			})
			.catch((err) => {
				return reject(err);
			});
	});
}

function getFavoriteTeam() {
	getAll().then((teams) => {
		let teamsHTML = "";

		const titleLeague = document.querySelector("h2.league-name");
		const title = "Favorite Team";

		titleLeague.innerText = title;

		if (teams.length === 0) {
			document.getElementById("teams").innerHTML =
				'<h5 class="center"> You dont have a favorite soccer team </h5>';
		} else {
			teams.forEach((team) => {
				let src = team.crestUrl;

				teamsHTML += `
                <div class="col s12 m6 l3 card-wrapper">
                    <div class="club-wrapper">
                        <div class="club-info">
                            <div class="card-content center-align">
                                <a href="/pages/team.html?id=${
									team.id
								}&favorite=true">
                                    <div class="club-image waves-effect waves-block waves-light">
                                        <img src="${src.replace(
											/^http:\/\//i,
											"https://"
										)}" class="responsive-img" alt="${
					team.shortName
				}" title="${team.shortName}">
                                    </div>
                                </a>
                            </div>
                            <div class="card-action center-align">
                                <h6>${team.shortName}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                `;
			});
			document.getElementById("teams").innerHTML = teamsHTML;
		}
	});
}

function getSavedTeamById() {
	let urlParams = new URLSearchParams(window.location.search);
	let idParam = Number(urlParams.get("id"));

	getById(idParam).then((team) => {
		teamInfo(team);
		showClubMember(team);
	});
	return idParam;
}

function teamInfo(data) {
	let teamInfoHTML = `
        <div class="col s5 teamLeft center">
            <img src="${data.crestUrl}" alt="${data.name}" srcset="" class="responsive-img">
            <h5 class="founded">${data.founded}</h5>
        </div>
        <div class="col s7">
            <h4 class="team-heading"> ${data.name} </h4>
            <div class="row">
                <div class="col s1"><i class="material-icons">place</i></div>
                <div class="col">${data.address}</div>
            </div>
            <div class="row">
                <div class="col s1"> <i class="material-icons">phone</i></div>
                <div class="col">${data.phone}</div>
            </div>
            <div class="row">
                <div class="col s1"><i class="material-icons">language</i></div>
                <div class="col"> <a href="${data.website}" target="_blank">${data.website}</a></div>
                </div>
        </div>
        `;

	document.getElementById("team-info").innerHTML = teamInfoHTML;
}

// Convert Date to Age
const getAge = (birthDate) =>
	Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

function showClubMember(data) {
	console.log(data);
	let squadHTML = `
        <thead>
            <tr>
                <th> # </th>
                <th> Name </th>
                <th> Position </th>
                <th> Age </th>
                <th> Nationatlity </th>
                <th> Role </th>
            </th>
        </thead>
        <tbody>
    `;
	data.squad.forEach((player) => {
		let shirtNumber = "";
		let position = "";

		player.shirtNumber == null
			? (shirtNumber = "-")
			: (shirtNumber = player.shirtNumber);
		player.position == null
			? (position = "-")
			: (position = player.position);

		squadHTML += `
            <tr>
                <td>${shirtNumber}</td>
                <td>${player.name}</td>
                <td>${position}</td>
                <td>${getAge(player.dateOfBirth)}</td>
                <td>${player.nationality}</td>
                <td>${player.role}</td>
            </tr>
        `;
	});
	squadHTML += `</tbody>`;
	document.getElementById("squadPlayer").innerHTML = squadHTML;
}

function inputCards(team) {
	let card;
	let src = team.crestUrl;
	let nation = team.area.name;

	card = `
        <div class="col s12 m6 l3 card-wrapper">
            <div class="club-wrapper">
                <div class="club-info">
                    <div class="card-content center-align">
                        <a href="/pages/team.html?id=${team.id}">
                            <div class="club-image waves-effect waves-block waves-light">
                                <img src="${src.replace(
									/^http:\/\//i,
									"https://"
								)}" class="responsive-img" alt="${
		team.shortName
	}" title="${team.shortName}">
                            </div>
                        </a>
                    </div>
                    <div class="card-action center-align">
                        <h6>${team.shortName}</h6>
                    </div>
                </div>
            </div>
        </div>
    `;

	return card;
}
