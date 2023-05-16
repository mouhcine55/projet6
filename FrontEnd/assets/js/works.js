// Sélection de l'élément DOM qui va contenir la galerie
  const gallery = document.querySelector(".gallery"); 
//Récupérer les projets via l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    //Créer un élément figure 
    for (let i = 0; i < data.length; i++) {
      
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      img.src = data[i].imageUrl;
      img.alt = data[i].title;

      figcaption.textContent = data[i].title;
      figure.className = data[i].category.name.replaceAll(' ', '-');
      figure.setAttribute("data-id", data[i].id); // Ajout de l'attribut data-id
      
      figure.appendChild(img);
      figure.appendChild(figcaption);

      gallery.appendChild(figure);
    }
  })
  .catch(error => console.error(error));

// Fonction pour cacher/supprimer les filtres
function hideFilters() {
  const activeElement = document.querySelector(".filter-buttons");
  if (activeElement) {
    activeElement.style.display = "none";
  }
}

// Ajout des filtres pour afficher les travaux par catégorie
fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(categories => {
  
    // Créer un élément div pour les filtres
    const filters = document.createElement("div");
    const buttonAll = document.createElement("button");
   
    // Ajouter une classe CSS à l'élément div des filtres
    filters.classList.add("filter-buttons");
    gallery.before(filters);
    // Créer un bouton pour afficher tous les éléments
    buttonAll.innerText = "Tous";
    filters.appendChild(buttonAll);

    // Ajouter une classe CSS active au bouton "Tous"
    buttonAll.addEventListener("click", function(){
        let children = filters.childNodes;
      
        for (let i = 0; i < children.length; i++) {
          if(children[i].classList.contains("active")){
            children[i].classList.remove("active");
          }
        }
      
      buttonAll.classList.add("active");

      // Afficher tous 
      let figures = document.querySelectorAll("figure");
      for (let i = 0; i < figures.length; i++){
        figures[i].style.display = "block";
      }
    });
  
    // Créer un bouton pour chaque catégorie
    for(let i=0; i < categories.length; i++){
      const filterButton = document.createElement("button");
      filterButton.innerText = categories[i].name;

      // Ajouter le bouton à l'élément parrent des filtres
      filters.appendChild(filterButton);

      // Ajouter un événement click au bouton pour filtrer les éléments
      filterButton.addEventListener("click", function(){

      // Retirer la classe "active" de tous les boutons de filtre
      if (filters.hasChildNodes()) {
        let children = filters.childNodes;
      
        for (let i = 0; i < children.length; i++) {
          if(children[i].classList.contains("active")){
            children[i].classList.remove("active");
          }
        }
      }
      
      // Ajouter la classe "active" au bouton de filtre sélectionné
      filterButton.classList.add("active");

      // Afficher les éléments de la catégorie correspondante, et masquer les autres 
       filterButtons(this.textContent);
      });
    };
    // Masquer les filtres si l'utilisateur est connecté
    if (sessionStorage.getItem("token")) {
      hideFilters();
    }
  })
  .catch(error => console.error(error));

  //Filtrer les éléments en fonction de la catégorie
  function filterButtons(className) {
    let figures = document.querySelectorAll("figure");
    for (let i = 0; i < figures.length; i++) {
      console.log( figures[i]);
      if (figures[i].classList.contains(className.replaceAll(' ', '-'))) {
        figures[i].style.display = "block";
      } else {
        figures[i].style.display = "none";
      }
    }
  }
 
// Récupération du bouton de connexion dans la nav
const loginButton = document.querySelector('nav li a[href="./login.html"]');

// Vérification de la présence du token dans la sessionStorage
if (sessionStorage.getItem("token")) {
  // Afficher "Logout" sur le bouton de connexion
  loginButton.textContent = "Logout";
}

// Fonction pour alterner l'état de connexion de l'utilisateur
function toggleLogin() {
  if (sessionStorage.getItem("token")) {
    // Déconnecter l'utilisateur et supprimer le token de la sessionStorage
    sessionStorage.removeItem("token");
    loginButton.textContent = "Login";
  } else {
    // Connecter l'utilisateur et stocker le token dans la sessionStorage
    sessionStorage.setItem("token", "mytoken");
    loginButton.textContent = "Logout";
  }
}

// Ajout d'un gestionnaire d'événements de clic pour appeler la fonction toggleLogin()
loginButton.addEventListener("click", toggleLogin);

// Vérifier si le token est stocké dans sessionStorage
if (sessionStorage.getItem("token")) {
/// Mode édition///
  // Créer la section parente pour tous les éléments
  const editModeSection = document.createElement("section");
  editModeSection.classList.add("edit-mode-section");

  // Créer l'élément div pour le rectangle noir
  const editModeDiv = document.createElement("div");
  editModeDiv.classList.add("edit-mode");

  // Créer l'élément avec l'icône et le texte "Mode édition" pour le rectangle noir
  const editModeIcon = document.createElement("i");
  editModeIcon.classList.add("fa-regular", "fa-pen-to-square");
  const editModeText = document.createTextNode("Mode édition");

  // Créer l'élément bouton pour publier les changements
  const publishButton = document.createElement("button");
  publishButton.classList.add("publish-btn");
  publishButton.textContent = "Publier les changements";

  // Ajouter l'icône et le texte dans div pour le rectangle noir
  editModeDiv.appendChild(editModeIcon);
  editModeDiv.appendChild(editModeText);

  // Ajouter div et le bouton à la section parente
  editModeSection.appendChild(editModeDiv);
  editModeSection.appendChild(publishButton);

  // Trouver l'élément header
  const header = document.querySelector("header");

  // Insérer la section parente nouvellement créée avant le header
  header.parentElement.insertAdjacentElement("beforebegin", editModeSection);

  // Créer l'élément avec l'icône et le texte "modifier" pour la section #introduction
  const introEditLink = document.createElement("a");
  introEditLink.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
  introEditLink.classList.add("modif-image");

  // Trouver l'image dans la section #introduction
  const introImage = document.querySelector("#introduction figure img");

  // Insérer l'élément nouvellement créé juste après l'image
  introImage.insertAdjacentElement("afterend", introEditLink);

  // Créer l'élément avec l'icône et le texte "modifier" pour la section #articles
  const articlesEditLink = document.createElement("a");
  articlesEditLink.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
  articlesEditLink.classList.add("modif-article");

  // Trouver la première section dans la section #articles
  const firstSection = document.querySelector("article h2");

  // Insérer l'élément nouvellement créé juste avant la première section
  firstSection.insertAdjacentElement("beforebegin", articlesEditLink);

  // Créer l'élément avec l'icône et le texte "modifier" pour la section #portfolio
  const modifProjet = document.createElement("a");
  modifProjet.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
  modifProjet.classList.add("modif-projet");

  // Trouver le titre h2 dans la section #portfolio
  const portfolioEditLink = document.querySelector("#portfolio div");

  // Insérer l'élément portfolioEditLink juste après la modifProject
  portfolioEditLink.insertAdjacentElement("beforeend", modifProjet);
}



