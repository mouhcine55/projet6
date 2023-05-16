// Récupérer la modal
const modal = document.getElementById("myModal");

// Récupérer le bouton "modifier"
const editButton = document.querySelector(".modif-projet");

// Récupérer le span avec la classe "close" pour fermer la modal
const closeSpan = document.querySelector(".close");

// Récupérer l'élément DOM qui contiendra la galerie
const gallery = document.querySelector("#gallery-modal");

// Récupérer modal content
const modalContent = document.querySelector(".modal-content");

// Récupérer le formulaire et le bouton submit
const form = document.getElementById("form-addwork");
const submitButton = document.getElementById("submit-work");
const imgButton = document.getElementById("add-imgbutton");

// Fonction pour actualiser la page
function refreshPage() {
  location.reload();
}

// Fonction pour supprimer 
function DeleteWorkId(event) {
  deleteWork(this.dataset.id);
  //Suppression de la figure
  let figure = this.parentNode.parentNode;
  figure.parentNode.removeChild(figure);
}

// Récupération des projets via l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    for (let i = 0;i < data.length; i++) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let deleteIcon = document.createElement("i");
      let figcaption = document.createElement("figcaption");

      img.src = data[i].imageUrl;
      img.alt = data[i].title;

      figcaption.textContent = "éditer";
      deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
      deleteIcon.setAttribute("data-id",data[i].id);
      /*deleteIcon.addEventListener("click", function(){
        deleteWork(this.dataset.id);
        //Suppression de la figure
        let figure = this.parentNode.parentNode;
        figure.parentNode.removeChild(figure);
      });*/
      deleteIcon.addEventListener("click", DeleteWorkId);

      figcaption.appendChild(deleteIcon);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      figure.classList.add("figure-modal-add");
     
      gallery.appendChild(figure);
    }
  
  })
  .catch(error => console.error(error));

// Ajouter un événement "click" au bouton "modifier" 
editButton.addEventListener("click", function() {
  modal.style.display = "block";
});

// Ajouter un événement "click" au span "close" pour fermer la modal
closeSpan.addEventListener("click", function() {
  modal.style.display = "none";
  refreshPage();
  });

// Ajouter un événement "click" en dehors de la modal pour fermer la modal
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    refreshPage();
  }
});

// Ajouter un événement "keydown" pour détecter l'appui sur la touche "Esc"
window.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
    refreshPage();
  }
});

// Récupérer le bouton "add-bts"
const addButton = document.querySelector(".add-bts");

// Fonction pour réinitialiser le formulaire
function resetForm() {
  let imgPreview = document.querySelector(".img-preview");
  if (imgPreview !== null){
    imgPreview.remove();
  }
  document.getElementById("input-container").style.display = "";
  document.querySelector("#img-container p").style.display = "";
  form.reset();
}
// Récupérer la modal-addwork
const modalAddwork = document.querySelector(".modal-addwork");

// Ajouter un événement "click" au bouton "add-bts"
addButton.addEventListener("click", function() {
  resetForm();
  modalAddwork.style.display = "block";
  modalContent.style.display = "none";
});

// Récupérer la flèche retour
const backArrow = document.querySelector(".fa-solid.fa-arrow-left");

// Ajouter un événement "click" à la flèche retour
backArrow.addEventListener("click", function() {
  // Masquer la modal-addwork
  modalAddwork.style.display = "none";
  // Afficher la modal-content
  modalContent.style.display = "block";
});

// Récupérer la croix de fermeture de la modal
const closeIcons = document.querySelectorAll(".close");

// Ajouter un événement "click" à chaque croix de fermeture
closeIcons.forEach(icon => {
  icon.addEventListener("click", function() {
    // Masquer la modal
    modal.style.display = "none";
    // Réinitialiser les champs du formulaire
    document.getElementById("form-addwork").reset();
  });
});

// Récupérer la liste déroulante
const categorySelect = document.getElementById("category-option");

// Récupérer les catégories depuis l'API
fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(data => {
    // Parcourir les catégories et créer une option pour chaque catégorie
    for (let i = 0; i < data.length; i++) {
      let option = document.createElement("option");
      option.value = data[i].id;
      option.text = data[i].name;
      categorySelect.appendChild(option);
    }
  })
  .catch(error => console.error(error));

// Récupérer les éléments du formulaire
const titleInput = document.getElementById("title-img");
const imageInput = document.getElementById("add-imgbutton");

//Ecouter le clic sur le bouton Ajouter photo
imgButton.addEventListener("change", function() {
  const file = this.files[0];
  const reader = new FileReader();
  reader.addEventListener("load", function() {
    const imageUrl = reader.result;
    const imgPreview = document.createElement("img");
    imgPreview.src = imageUrl;
    imgPreview.classList.add("img-preview");

    // Masquer les autres éléments et afficher l'image
    imgPreview.style.display = "block";
    imgButton.style.display = "none";
    document.getElementById("input-container").style.display = "none";
    document.querySelector("#img-container p").style.display = "none";
    document.getElementById("img-container").appendChild(imgPreview);
  });
  reader.readAsDataURL(file);
});

// Fonction pour créer les éléments à ajouter dans le DOM
function createGalleryItem(title, imageUrl) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  const deleteIcon = document.createElement("i");
  const galleryModal = document.getElementById("gallery-modal");

  // Définir les attributs des éléments créés
  img.src = imageUrl;
  img.alt = title;
  deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
  /*deleteIcon.addEventListener("click", function(){
    deleteWork(this.dataset.id);
    //Suppression de la figure
    let figure = this.parentNode.parentNode;
    figure.parentNode.removeChild(figure);
  });*/
  deleteIcon.addEventListener("click", DeleteWorkId);

  // Ajouter les éléments créés au DOM
  figure.appendChild(img);
  figcaption.textContent = title;
  figure.appendChild(figcaption);
  gallery.appendChild(figure);

  figcaption.textContent = "éditer";
  figcaption.appendChild(deleteIcon);
  figure.classList.add("figure-modal-add");
  galleryModal.appendChild(figure);
}

// Fonction pour vérifier les champs de saisie et mettre à jour le style du bouton de soumission
 function checkInputModal(){
 if(titleInput.value !== "" && categorySelect.value !== "" && imageInput.value !== ""){
  submitButton.style.color ="white";
  submitButton.style.background ="#1D6154";
 }
 };

 //Fonction pour affiche un message dans la modal 
 function showMessage(message, type) {
  let messageElement = document.createElement("span");
  messageElement.textContent = message;
  
  if (type === "success") {
    messageElement.classList.add("success-message");
  } else if (type === "delete") {
    messageElement.classList.add("delete-message");
  };
  
  modalContent.appendChild(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, 3000);
}  

// Ajouter des écouteurs d'événements pour les champs de saisie
titleInput.addEventListener("change", checkInputModal);

categorySelect.addEventListener("change", checkInputModal);

imageInput.addEventListener("change", checkInputModal);
 
// Ajouter un événement pour gérer les messages d'erreur
submitButton.addEventListener("click", function(event) {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Vérifier si l'image est charger
  if (imageInput.value === "") {
    // Créer un message d'erreur
    let messageErrorTitle = document.createElement("span");
    messageErrorTitle.innerText = "Veuillez mettre un image.";
    messageErrorTitle.style.color = "red";
    messageErrorTitle.id ="messageErrorImage";

    // Ajouter le message d'erreur au formulaire
    form.appendChild(messageErrorTitle);
    return;
    
  }
 
  // Vérifier si le champ titre est rempli
  if (titleInput.value === "") {
    // Créer un message d'erreur
    let messageErrorTitle = document.createElement("span");
    messageErrorTitle.innerText = "Veuillez mettre un titre valide.";
    messageErrorTitle.style.color = "red";
    messageErrorTitle.id ="messageErrorTitle";

    // Ajouter le message d'erreur au formulaire
    form.appendChild(messageErrorTitle);
    return;
    
  }

  // Vérifier si la catégorie est selectionner
  if (categorySelect.value=== "") {
    // Créer un message d'erreur
    let messageErrorTitle = document.createElement("span");
    messageErrorTitle.innerText = "Veuillez sélectionner une catégorie.";
    messageErrorTitle.style.color = "red";
    messageErrorTitle.id ="messageErrorId";

    // Ajouter le message d'erreur au formulaire
    form.appendChild(messageErrorTitle);
    return;
    
  }

  // Récupérer le token depuis la sessionStorage
  const token = sessionStorage.getItem("token");

  // Créer les données à envoyer à l'API
  const formData = new FormData();
  formData.append("image", imgButton.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", categorySelect.value);

  // Effectuer la requête pour envoyer l'image à l'API
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "accept": "*/*",
      "Authorization": `Bearer ${token}`
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi de l'image");
    }
    return response.json();
  })
  .then(data => {
    // Créer les éléments à ajouter dans le DOM
    createGalleryItem(titleInput.value, data.imageUrl);

    // Réinitialiser le formulaire
    resetForm();
    // Masquer la modal-addwork
    modalAddwork.style.display = "none";
    // Afficher la modal-content
    modalContent.style.display = "block";

    // Ajouter un message de succès
    showMessage("L'image a été envoyée avec succès!", "success");
   
  })
  .catch(error => {
    console.error(error);
  });
});

function deleteWork(id) {
  const token = sessionStorage.getItem("token");
  fetch(`http://localhost:5678/api/works/` + id, {
    method: "DELETE",
    headers: {
      "accept": "*/*",
      "Authorization": `Bearer ${token}`
    }
  })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du travail");
        }
        // Afficher la modal-content
        modalContent.style.display = "block";

        // Afficher un message de confirmation
        showMessage("Le travail a été supprimé avec succès.", "delete");

      })
      .catch(error => {
        console.error(error);
      });
}


