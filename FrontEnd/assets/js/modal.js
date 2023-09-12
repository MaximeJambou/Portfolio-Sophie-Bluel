// localStorage
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');


if (userId && token) {

    // Ajouter le padding-top de 59px au header
    const header = document.querySelector('header');
    header.style.paddingTop = '59px';

    // Générer le bandeau de mode édition
    const editModeBanner = document.createElement('div');
    editModeBanner.classList.add('edit-mode');
    
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid');
    editIcon.classList.add('fa-pen-to-square');
    
    const editText = document.createElement('p');
    editText.textContent = 'Mode édition';
    
    
    editModeBanner.appendChild(editIcon);
    editModeBanner.appendChild(editText);
    
    
    document.body.appendChild(editModeBanner);

    // Changement du bouton login et déconnexion
    const logOut = document.querySelector('.logout a')
    logOut.textContent = 'logout';

    logOut.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
    
        window.location.reload();
    });

    // Création du bouton modifier
    const galleryTitle = document.querySelector('.gallery-title');
    galleryTitle.classList.add('gallery-title--edit')
    // galleryTitle.innerHTML += ' <span class="edit-button"> <i class="fa-solid fa-pen-to-square"> </i>modifier</span>';
    const spanElement = document.createElement('span');
    spanElement.classList.add('edit-button');

    const iconElement = document.createElement('i');
    iconElement.classList.add('fa-solid');
    iconElement.classList.add('fa-pen-to-square');

    const textNode = document.createTextNode('modifier');

    spanElement.appendChild(iconElement);
    spanElement.appendChild(textNode);

    galleryTitle.appendChild(spanElement);



    // Déclencher l'ouverture de la modale
    const editButton = document.querySelector('.edit-button');

    editButton.addEventListener('click', function(event) {
        event.stopPropagation();
        
        // Création de la modale
        const modal = document.createElement('div');
        modal.classList.add('modal');


        // Création de la première page de la modale
        const modalContent1 = document.createElement('div');
        modalContent1.classList.add('modal-content');
        modalContent1.classList.add('modal-1');

        // Création du contenu de la première page de la modale
        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.textContent = 'x';

        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');

        const modalTitle = document.createElement('h2');
        modalTitle.classList.add('modal-title');
        modalTitle.textContent = 'Galerie photo';

        const modalGallery = document.createElement('div');
        modalGallery.classList.add('modal-gallery');

        const modalBorder = document.createElement('div');
        modalBorder.classList.add('modal-border');

        const modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');

        const addButton = document.createElement('button');
        addButton.classList.add('modal-button--addProject');
        addButton.textContent = 'Ajouter une photo';

        

        // Ajouter les éléments au DOM
        modalFooter.appendChild(addButton);
        modalContainer.appendChild(modalTitle);
        modalContainer.appendChild(modalGallery);
        modalContainer.appendChild(modalBorder);
        modalContainer.appendChild(modalFooter);
        modalContent1.appendChild(closeButton);
        modalContent1.appendChild(modalContainer);
        modal.appendChild(modalContent1);

        document.body.appendChild(modal);

        
        // Fonction pour remplir la modal-gallery avec les travaux depuis l'API
        async function generateWorksInModal() {

            // Récupération de l'élément du DOM qui accueillera la modal-gallery
            const modalGallery = document.querySelector('.modal-gallery');

            // Réinitialiser la galerie avant l'importation
            modalGallery.innerHTML = "";

            // Parcourir les travaux et créer les éléments HTML pour chaque projet
            for (let i = 0; i < works.length; i++) {
                const work = works[i];
        
                // Création de la figure pour le projet et attibution d'un ID
                const figureWork = document.createElement('figure');
                figureWork.id = `work-${work.id}`;
                figureWork.setAttribute('data-workid', work.id);
        
                // Création de l'image du projet
                const imageWork = document.createElement('img');
                imageWork.src = work.imageUrl;
                imageWork.alt = work.title;
        
                // Création du figcaption avec le texte "éditer"
                const figcaption = document.createElement('figcaption');
                figcaption.innerText = 'éditer';
        
                // Ajout de l'icône de suppression
                const iconDelete = document.createElement('span');
                iconDelete.classList.add('icon-delete');
                iconDelete.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        
                
        
                // Ajout des éléments au DOM
                figureWork.appendChild(imageWork);
                figureWork.appendChild(figcaption);
                figureWork.appendChild(iconDelete);
                modalGallery.appendChild(figureWork);
            }
        }

        // Appeler la fonction pour remplir la modal-gallery
        
        generateWorksInModal();
        attachDeleteEvent();
        


        // Création de la deuxième page de la modale
        const modalContent2 = document.createElement('div');
        modalContent2.classList.add('modal-content');
        modalContent2.classList.add('modal-2');

        // Création des éléments de la deuxième page de la modale
        const closeButton2 = document.createElement('span');
        closeButton2.classList.add('close-button');
        closeButton2.textContent = 'x';

        const arrowLeft = document.createElement('span');
        arrowLeft.classList.add('arrow-left');

        const arrowIcon = document.createElement('i');
        arrowIcon.classList.add('fas');
        arrowIcon.classList.add('fa-arrow-left');

        const modalContainer2 = document.createElement('div');
        modalContainer2.classList.add('modal-container');

        const modalTitle2 = document.createElement('h2');
        modalTitle2.classList.add('modal-title');
        modalTitle2.textContent = 'Ajout photo';

        const modalForm = document.createElement('form');
        modalForm.classList.add('modal-form');

        const addPicture = document.createElement('div');
        addPicture.classList.add('add-picture');

        const imageIcon = document.createElement('i');
        imageIcon.classList.add('far');
        imageIcon.classList.add('fa-image');

        const imageInput = document.createElement('input');
        imageInput.setAttribute('type', 'file');
        imageInput.setAttribute('id', 'upload-photo');
        imageInput.setAttribute('accept', 'image/*');
        imageInput.style.display = 'none';

        const addPictureLabel = document.createElement('label');
        addPictureLabel.classList.add('add-picture--label');
        addPictureLabel.setAttribute('for', 'upload-photo');
        addPictureLabel.textContent = '+ Ajouter photo';

        const maxSizeText = document.createElement('p');
        maxSizeText.textContent = 'jpg,png: 4mo max';

        const titleLabel = document.createElement('label');
        titleLabel.setAttribute('for', 'title');
        titleLabel.textContent = 'Titre';

        const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('id', 'title');
        titleInput.setAttribute('name', 'title');

        const categoryLabel = document.createElement('label');
        categoryLabel.setAttribute('for', 'category');
        categoryLabel.textContent = 'Catégorie';

        const categorySelect = document.createElement('select');
        categorySelect.setAttribute('id', 'category');
        categorySelect.setAttribute('name', 'category');

        // Création des options du select
        for (let i = 0; i < categories.length; i++) {
            const categoryOption = document.createElement('option');
            console.log(categories[i]);
            categoryOption.value = categories[i].id;
            categoryOption.textContent = categories[i].name;
            categorySelect.appendChild(categoryOption);
        }

        const modalBorder2 = document.createElement('div');
        modalBorder2.classList.add('modal-border');

        const validateButton = document.createElement('button');
        validateButton.classList.add('add-project--validation');
        validateButton.setAttribute('type', 'submit');
        validateButton.textContent = 'Valider';

        // Ajout des éléments au DOM
        addPicture.appendChild(imageIcon);
        addPicture.appendChild(imageInput);
        addPicture.appendChild(addPictureLabel);
        addPicture.appendChild(maxSizeText);

        modalForm.appendChild(addPicture);
        modalForm.appendChild(titleLabel);
        modalForm.appendChild(titleInput);
        modalForm.appendChild(categoryLabel);
        modalForm.appendChild(categorySelect);
        modalForm.appendChild(modalBorder2);
        modalForm.appendChild(validateButton);

        modalContainer2.appendChild(modalTitle2);
        modalContainer2.appendChild(modalForm);

        arrowLeft.appendChild(arrowIcon);

        modalContent2.appendChild(closeButton2);
        modalContent2.appendChild(arrowLeft);
        modalContent2.appendChild(modalContainer2);

        modal.appendChild(modalContent2);

        // Ajout de la deuxième page de modale au DOM
        modal.appendChild(modalContent2);

        showFirstPage();



        // Gestion des évènements

        // Passage d'une page de modale à l'autre
        // Fonction pour afficher la première page de la modale
        function showFirstPage() {
            modalContent1.classList.remove('hidden');
            modalContent2.classList.add('hidden');
        }
        
        // Fonction pour afficher la deuxième page de la modale
        function showSecondPage() {
            modalContent1.classList.add('hidden');
            modalContent2.classList.remove('hidden');
        }
        
        // Passage de la première à la deuxième page
        addButton.addEventListener('click', function () {
            showSecondPage();
        });
        
        // Retour sur la première page
        arrowLeft.addEventListener('click', function () {
            showFirstPage();
        });


        // Gestion de la fermeture de la modale
        // Fermeture de la modale en cliquant sur la croix
        const closeButtons = document.querySelectorAll('.close-button');

        closeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Supprimer la modale du DOM
                modal.remove();
            });
        });

        // Gestion de la fermeture de la modale en cliquant à l'extérieur
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
            // Supprimer la modale du DOM
            modal.remove();
            }
        });

        // Gestion de la fermeture de la modale en appuyant sur la touche Echap
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
            // Supprimer la modale du DOM
            modal.remove();
            }
        });


        // Supprimer un projet

        // Fonction pour suppriumer le projet
        async function deleteWork(workId, token) {
            try {
                const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept' : '/'
                    }
                    
                });
            
                if (response.ok) {
                    return true;
        
                } else if (response.status === 401) {
                    return false;
        
                } else {
                    return false;
        
                }
            } catch (error) {
                return false;
            }
        }

        // Fonction pour attacher l'événement de suppression aux icônes de suppression
        function attachDeleteEvent() {
            const iconDeleteElements = document.querySelectorAll('.icon-delete');

            iconDeleteElements.forEach((iconDeleteElement) => {
                iconDeleteElement.removeEventListener('click', deleteEvent); // Supprime l'ancien gestionnaire d'événement s'il existe
                iconDeleteElement.addEventListener('click', deleteEvent);
            });
        }

        // Fonction pour gérer l'événement de suppression
        async function deleteEvent(event) {
            event.stopPropagation();
            const workId = this.parentElement.getAttribute('data-workid');
            let deletedWork = await deleteWork(workId, token);


            if (deletedWork){
             // Supprimer le projet de la galerie dans la modale
            const workElement = this.parentElement;
            workElement.remove();
            generateWorks();
            generateCategories();
            }else{
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
        
            window.location.href ='login.html';
            }            
        }




       // Gestionnaire d'événement pour le bouton "+ Ajouter photo"
        addPictureLabel.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            
            imageInput.addEventListener('change', function(event) {
            event.stopPropagation();
            const file = event.target.files[0];
            
                // Vérifier si un fichier a été sélectionné
                if (file) {
                    // Créer un objet FileReader pour lire le contenu de la photo
                    const reader = new FileReader();
                    
                    reader.addEventListener('load', function() {
                        const imageUrl = reader.result;
                        
                        // Afficher la photo dans la zone "add-picture"
                        const image = document.createElement('img');
                        image.src = imageUrl;
                        image.classList.add('image-preview');
                        
                        // Supprimer le contenu précédent de la zone "add-picture"
                        addPicture.innerHTML = '';
                        
                        // Ajouter la photo à la zone "add-picture"
                        addPicture.appendChild(image);
                    });
                    
                    // Lire le contenu de la photo en tant que URL de données
                    reader.readAsDataURL(file);
                }
            });
            
            // Cliquez sur le champ d'entrée pour sélectionner une photo
            imageInput.click();
        });
        
        // Fonction pour vérifier si tous les champs sont remplis
        function checkFormCompletion() {
            const title = titleInput.value;
            const category = categorySelect.value;
            const image = addPicture.querySelector('img');
            
            if (title && category && image) {
                validateButton.classList.add('completed-form');
            } else {
                validateButton.classList.remove('completed-form');
            }
        }

        // Gestionnaire d'événement pour les champs du formulaire
        titleInput.addEventListener('input', checkFormCompletion);
        categorySelect.addEventListener('input', checkFormCompletion);
        addPicture.addEventListener('input', checkFormCompletion);

        // Gestionnaire d'événement pour le bouton "Valider"
        validateButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const title = titleInput.value;
            const category = categorySelect.value;
            const image = addPicture.querySelector('img');
            
            // Vérifier si tous les champs sont remplis
            if (title && category && image) {
                console.log('formulaire rempli');
                // Créer un objet FormData pour envoyer les données
                const formData = new FormData();
                formData.append('title', title);
                formData.append('category', category);
                formData.append('image', imageInput.files[0]);
                
                // Envoyer les données à l'API
                fetch('http://localhost:5678/api/works', {
                    method: 'POST',
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    },
                    body: formData
                })
                .then(response => {
                    if (response.status === 201) {
                    console.log('Le projet a été ajouté avec succès.');
                    
                    // Actualiser la modale et la page
                    generateWorksInModal();
                    generateWorks();
                    generateCategories();
                    showFirstPage();
                    
                    } else if (response.status === 401) {
                    console.error('Non autorisé à ajouter le projet.');
                    } else {
                    console.error('Une erreur s\'est produite lors de l\'ajout du projet.');
                    }
                })
                .catch(error => {
                    console.error('Une erreur s\'est produite lors de la communication avec l\'API.', error);
                });
                } else {
                console.error('Veuillez remplir tous les champs avant de valider.');
                }
        });




    // fin du Listener
    });


// fin du if
} 
