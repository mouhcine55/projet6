// Récupération du formulaire et de ses champs
const form = document.querySelector("#login");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
// Écoute de l'événement de soumission du formulaire
form.addEventListener("submit", (event) => {
  // Empêcher l'envoi du formulaire par défaut
  event.preventDefault();

  // Récupération des valeurs des champs
  const email = emailInput.value;
  const password = passwordInput.value;

  // Envoi de la requête POST à l'API pour se connecter avec les informations de connexion saisies
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json()) // Transformation de la réponse en objet JSON
    .then((data) => {
        const login = document.getElementById("login");
      // Vérification des données renvoyées par l'API
      if (data.message === "user not found" || data.error) {
        // Affichage d'un message d'erreur si l'utilisateur n'a pas été trouvé ou si le mot de passe est incorrect
        let messageError = document.createElement("span");
        messageError.innerText = "Erreur dans l'identifiant ou le mot de passe";
        messageError.style.color = "red";
        messageError.id ="messageError";

        if (!document.getElementById("messageError")){
            login.appendChild(messageError); // Ajout du message d'erreur à la page de connexion
        }
      } else {
        // Stockage du token d'authentification dans la sessionStorage
        sessionStorage.setItem("token", data.token);
        // Redirection vers la page d'accueil si l'utilisateur est connecté
        window.location.href = "./index.html";
        const messageError =document.getElementById("messageError");
        login.removeChild(messageError);// Suppression du message d'erreur de la page de connexion s'il existe
      }
    })
    .catch((error) => console.error(error));
 
});



  




