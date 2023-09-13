// Récupération des travaux et crétaions des filtres depuis l'API Works
let works = [];
let categories = [];

(async () => {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        works = await response.json();

        generateWorks(works);
        generateCategories(works);

        console.log('importation réussie');

    } catch (error) {
        console.error('Erreur lors de la récupération des travaux:', error);
    }
})();


// Fonction pour générer les travaux
function generateWorks(works) {
    // Récupération de l'élément du DOM qui accueillera la gallerie
    const sectionGallery = document.querySelector(".gallery");

    // Réinitialiser la galerie avant l'importation
    sectionGallery.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        // Créer les éléments HTML pour chaque projet
        const figureWork = document.createElement("figure");
        const imageWork = document.createElement("img");
        const nameWork = document.createElement("figcaption");

        imageWork.src = work.imageUrl;
        imageWork.alt = work.title;
        nameWork.innerText = work.title;

        figureWork.appendChild(imageWork);
        figureWork.appendChild(nameWork);
        sectionGallery.appendChild(figureWork);
    }
}

// Fonction pour générer les catégories
function generateCategories(works) {
    const sectionCategories = document.querySelector(".categories");

    // Réinitialiser les catégories
    sectionCategories.innerHTML = "";
    categories = [];

    const allButton = document.createElement("div");
    allButton.classList.add("category", "button-actived");
    allButton.innerText = "Tous";
    allButton.addEventListener("click", () => {
        generateWorks(works);
        document.querySelector('.button-actived').classList.remove("button-actived");
        allButton.classList.add("button-actived");
    });

    sectionCategories.appendChild(allButton);

    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        const category = work.category;

        if (!categories.map(c => c.id).includes(category.id)) {
            const categoryButton = document.createElement("div");
            categoryButton.classList.add("category");
            categoryButton.innerText = category.name;
            categoryButton.addEventListener("click", () => {
                const filteredWorks = works.filter((work) => work.category.name === category.name);
                generateWorks(filteredWorks);
                document.querySelector('.button-actived').classList.remove("button-actived");
                categoryButton.classList.add("button-actived");
            });

            categories.push(category);
            sectionCategories.appendChild(categoryButton);
        }
    }
}

