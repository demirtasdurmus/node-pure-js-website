const form = document.querySelector("#searchForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    makeImages([]);
    const searchQuery = form.elements.query.value;
    axios.post("http://localhost:8001/api/v1/films", { searchQuery: searchQuery })
        .then((res) => {
            console.log(res.data);
            makeImages(res.data);
        })
        .catch((err) => {
            console.log(err.response.data.message);
        })
});


const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const showImage = result.show.image.medium;
            const newImg = document.createElement("img");
            newImg.src = showImage;
            document.body.append(newImg);
        }
    }
};