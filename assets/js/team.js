document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let idParam = Number(urlParams.get("id"));
    let item;
    let teamId;
    const btnSave = document.getElementById("save-button");

    if (isFromSaved) {
        teamId = getSavedTeamById();
    } else {
        getTeamById()
        .then(response => {
            console.log(response);
            item = response;
            teamId = item.id;
        })
        .catch(err => {
            console.error(err);
            M.toast({
                html: `API is limited`
            });
        });
    }

    // getById(idParam)
    // .then(team => {
    //     if (team) {
    //         btnSave.firstElementChild.innerText = 'favorite';
    //     } else {
    //         btnSave.firstElementChild.innerText = 'favorite_border';
    //     }
    // });

    // btnSave.onclick = async function () {
    //     console.log("Saved button clicked");

    //     const isTeamSaved = await getById(idParam);

    //     if (!isTeamSaved) {
    //         btnSave.firstElementChild.innerText = 'favorite';
    //         saveForLater(item);
    //     } else {

    //     }
    // }
})