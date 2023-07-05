const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

let modalClose = true;

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
    
    const publishButton = document.createElement('button');
    publishButton.textContent = 'Publier les changements';
    
    editModeBanner.appendChild(editIcon);
    editModeBanner.appendChild(editText);
    editModeBanner.appendChild(publishButton);
    
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
        
        // Indiquer que la modale est ouverte
        modalClose = false;

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

        const deleteButton = document.createElement('p');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Supprimer la galerie';

        // Ajouter les éléments au DOM
        modalFooter.appendChild(addButton);
        modalFooter.appendChild(deleteButton);
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
        
                // Ajout de l'icône de direction seulement pour le premier élément
                if (i === 0) {
                const arrowDirection = document.createElement('span');
                arrowDirection.classList.add('arrow-direction');
                arrowDirection.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>';
                figureWork.appendChild(arrowDirection);
                }
        
                // Ajout des éléments au DOM
                figureWork.appendChild(imageWork);
                figureWork.appendChild(figcaption);
                figureWork.appendChild(iconDelete);
                modalGallery.appendChild(figureWork);
            }
        }

        // Appeler la fonction pour remplir la modal-gallery
        if (!modalClose) {
            generateWorksInModal();
            attachDeleteEvent();
        }


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

        const addPictureButton = document.createElement('button');
        addPictureButton.textContent = '+ Ajouter photo';

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
        

        const modalBorder2 = document.createElement('div');
        modalBorder2.classList.add('modal-border');

        const validateButton = document.createElement('button');
        validateButton.classList.add('add-project--validation');
        validateButton.setAttribute('type', 'submit');
        validateButton.textContent = 'Valider';

        // Ajout des éléments au DOM
        addPicture.appendChild(imageIcon);
        addPicture.appendChild(addPictureButton);
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
                        'Authorization': `Bearer ${token}`
                    }
                });
            
                if (response.status === 200) {
                    console.log('Le travail a été supprimé avec succès.');
        
                } else if (response.status === 401) {
                    console.error('Non autorisé à supprimer le travail.');
        
                } else {
                    console.error('Erreur lors de la suppression du travail.');
        
                }
            } catch (error) {
                console.error('Erreur lors de la suppression du travail :', error);
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
            await deleteWork(workId, token);

            // Vérifier si la modale est encore ouverte
        if (!modalClose) {
            // Supprimer le projet de la galerie dans la modale
            const workElement = this.parentElement;
            workElement.remove();
        }
        }







    // fin du Listener
    });


// fin du if
} 