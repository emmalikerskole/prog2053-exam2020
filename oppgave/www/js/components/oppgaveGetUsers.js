//Lag en side som lister ut alle brukere. Hent brukere fra api/fetchUsers.php med fetch i JavaScript. Vis lista med brukere 
//på venstre side av skjermen. Når en bruker velges fra lista skal et skjema for å redigere brukerens info vises på høyre side av skjermen.
//ferdiglagd php skrupt i oppgave/www/api for å hente og oppdatere informasjon


//funksjonen fetcher brukerne i databasen og lager en liste
function getUsers() {
    fetch(`api/fetchUsers.php`, {
    }).then(res=>res.json())
    .then(data=>{
        var userContainter = document.getElementById("users");

        data.forEach(x=> {

        var newUserElement = document.createElement('div');
        newUserElement.setAttribute("id", x.uid)
        newUserElement.innerText = x.uname + "\n" + x.firstName + " " + x.lastName + "\n";
        userContainter.appendChild(newUserElement);

        newUserElement.onclick = function() {getUser(newUserElement)};
        });
    });

}

//funksjon som kalles når en bruker velges. Informasjon om denne hentes.
function getUser(e){
    var user = document.getElementById("user");
    user.style.display = "block";
    fetch("api/fetchUser.php?id=" + e.toString(), {
  
    }).then(res=>res.json())
    .then(data=>{

        document.getElementById("lastName").value = data.lastName;
        document.getElementById("uid").value = e;
        document.getElementById("firstName").value = data.firstName;
        document.getElementById("uname").value = data.uname;

    });
}


//Oppdaterer informasjon om en bruker.
document.getElementById("submitForm").addEventListener('click', e=>{
    const dataForm = new FormDat(e.target.form);
    fetch('api/updateUser.php', {
        method: 'POST',
        body: dataForm
       }).then(res=>res.json())
         .then(data=>{
           if (data.status=='success') {
               console.log("The user was updated");
               getAllUsers();
           } else {
               console.log("The user was not updated");
           }
         })
})