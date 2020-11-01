document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("favorite");
    let idParam = Number(urlParams.get("id"));
    let item;
    let teamId;
    const buttonSave = document.getElementById("save-button");

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

    getById(idParam)
    .then(team => {
        if (team) {
            buttonSave.firstElementChild.innerText = 'bookmark';
        } else {
            buttonSave.firstElementChild.innerText = 'bookmark_border';
        }
    });

    buttonSave.onclick = async function () {
        console.log("Saved button clicked");

        const isTeamSaved = await getById(idParam);

        if (!isTeamSaved) {
            buttonSave.firstElementChild.innerText = 'bookmark';
            saveToFavorite(item);
        } else {
            if (isFromSaved) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will remove this item from favorite?',
                    icon:'warning',
                    showCancelButton: true,
                    confirmButton: '#039688',
                    cancelButtonColor: '$d33',
                    confirmButtonText: 'Yes, remove it!'
                }).then((result) => {
                    if (result.value) {
                        buttonSave.firstElementChild = 'bookmark_border';
                        deleteFavTeam(teamId);
                        window.location.href = 'index.html#favorite';
                    }
                })
            } else {
                buttonSave.firstElementChild.innerText = 'bookmark_border';
                deleteFavTeam(item.id);
            }
        }
    }
})