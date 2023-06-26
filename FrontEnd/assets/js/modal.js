const userId = localStorage.getItem('userId');
if (userId) {

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

    // Créer la modal
    const editButton = document.querySelector('.edit-button');

    editButton.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        
        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;';
        
        const modalText = document.createElement('p');
        modalText.textContent = 'Contenu de la modal...';
        
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalText);
        
        modal.appendChild(modalContent);
        
        // Ajouter la modal au corps du document
        document.body.appendChild(modal);
    });

} 
// fin du if



