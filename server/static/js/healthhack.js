function submit_by_id() {
    data=JSON.stringify({"name": document.getElementById("contact-name").value,
                    "age":document.getElementById("contact-age").value,
                    "gender":document.getElementById("contact-gender").value,
                    "height":document.getElementById("contact-height").value,
                    "weight":document.getElementById("contact-weight").value,
                    "goal":document.getElementById("contact-goal").value
    });
    appendToStorage("users", data);
    var signedin = document.getElementById("contact-name").value;
    document.getElementById("greetings").innerHTML="<h3>Hello "+signedin+" !</h3>";
}

function getUser(inputName){
var regUsers = JSON.parse(window.localStorage.users);

   if(inputName === regUsers.name){
       return regUsers.name;
   }
}

function login(){
    var signedin = getUser(document.getElementById("signin-nm").value);
    document.getElementById("greetings").innerHTML="<h3>Hello "+signedin+" !</h3>";
}


function appendToStorage(name, data){
    window.localStorage.setItem(name, data);
}

