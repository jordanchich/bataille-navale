const tour = document.querySelector("#tour");
const alert = document.querySelector(".alert");
const messageJ1 = document.querySelector("#j1");
const messageJ2 = document.querySelector("#j2");

var nbBateauSaisie= 0;
var joueurEnCours = 1;
var finJeu = false;

var pointJ1 = 0;
var pointJ2 = 0;



function jouer(ligne,colonne){
    jouerCase(ligne,colonne);
    var celluleIA = IA.getCellule();
    jouerCase(celluleIA.ligne,celluleIA.colonne)
}
function jouerCase(ligne, colonne){
    if(!finJeu){
        jeu.jouerCase(ligne,colonne);
        jeu.afficherGrille();
        if(jeu.verificationFinJeu(joueurEnCours)){
            gererFinJeu();
        }
        if(joueurEnCours === 1){
            joueurEnCours = 2;
            tour.innerHTML = "Tour du joueur 2";
        } else {
            joueurEnCours = 1;
            tour.innerHTML = "Tour du joueur 1";
        }
    }
}

function initialisationTableau(nbBateau){
    jeu.nbCaseJ1 = 0;
    jeu.nbCaseJ2 = 0;
    finJeu = false;
    joueurEnCours = 1;
    alert.classList.add("d-none");
    var contentJ1 = "<img src='./images/J1.png' class='bg-danger rounded-circle' /><br />";
    contentJ1 += pointJ1; 
    messageJ1.innerHTML = contentJ1;
    var contentJ2 = "<img src='./images/J2.png' class='bg-info rounded-circle' /><br />";
    contentJ2 += pointJ2; 
    messageJ2.innerHTML = contentJ2;

    jeu.initialisation(nbBateau);
    jeu.afficherGrille();
}

function gererFinJeu(){
    finJeu = true;
    var contentAlert = "Partie terminée, le gagnant est : " + joueurEnCours + "<br />";
    contentAlert += '<button type="button" class="btn btn-secondary" onClick = initialisationTableau('+nbBateauSaisie+')>Recommencer</button>';
    afficherAlert(contentAlert, 1) // type 1 pour l avoir en vert
    if(joueurEnCours===1){
        pointJ1++;
    } else {
        pointJ2++;
    }
}

function afficherAlert(txt, type){
if(type===1){
    alert.classList.add("alert-success");
    alert.classList.remove("alert-danger");
} else{
    alert.classList.remove("alert-success");
    alert.classList.add("alert-danger");
}
alert.innerHTML = txt;
alert.classList.remove("d-none");
}

function startGame(){
   nbBateauSaisie = parseInt(document.querySelector("#nbBateau").value); //parseInt pour la transformer en valeur num
   if(nbBateauSaisie < 2) afficherAlert("le nombre de bateaux doit être supérieur à 2", 2);
   if(nbBateauSaisie > 4) afficherAlert("le nombre de bateaux doit être inférieur à 5", 2)
   if(nbBateauSaisie >= 2 && nbBateauSaisie <= 4) initialisationTableau(nbBateauSaisie);
}

addEventListener("click", function(event){
  var target = event.target;
  if(target.id === "play"){
    var image = "<img src='./images/explosion00.png' id='explo' style='width:100px;height:100px;position:absolute;top:"+(event.clientY-50)+"px;left:"+(event.clientX-50)+"px' />";      var body = document.querySelector("body");
      var element = document.createElement("p");
      element.innerHTML = image;
      body.appendChild(element);

      imageExplo(9);

      function imageExplo(time){
          var explo = document.querySelector("#explo");
          if(time >=1){
              if(time===9) explo.setAttribute("src", "./images/explosion01.png");
              if(time===8) explo.setAttribute("src", "./images/explosion02.png");
              if(time===7) explo.setAttribute("src", "./images/explosion03.png");
              if(time===6) explo.setAttribute("src", "./images/explosion04.png");
              if(time===5) explo.setAttribute("src", "./images/explosion05.png");
              if(time===4) explo.setAttribute("src", "./images/explosion06.png");
              if(time===3) explo.setAttribute("src", "./images/explosion07.png");
              if(time===2) explo.setAttribute("src", "./images/explosion08.png");
              if(time===1) explo.remove(this); //on supprime la balise expo directement

              setTimeout(function(){
                imageExplo(time - 1); // fonction recursive. le break s effectuera quand time < 1
              },25);
              
          }
      }
  }
})

