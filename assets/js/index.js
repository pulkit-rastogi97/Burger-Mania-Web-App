//To get Element By Id
function $(id){
    return document.getElementById(id);
}

//To enable or disable the login button
function buttonState(){
    if(this.value.length == 10)
    {
        $("mobNoSubmit").disabled = false;
    }
    else
    {
        $("mobNoSubmit").disabled = true;
    }
    
}

//To restrict the input field for having only number as input.
function restrictNumber() {  
    var newValue = this.value.replace(new RegExp(/[^\d]/,'ig'), "");
    this.value = newValue;
}

//To login and display products page.
function login(){
    window.open("./products.html","_self");
}

//Clean localstorage for app related variables
window.onload = function (){
    this.localStorage.removeItem("cartItems");
    this.localStorage.removeItem("burgerArray");
}

//To disable the login button at starting
$("mobNoSubmit").disabled = true;

//Event Listeners for the input field.
$("mobNo").addEventListener('input', restrictNumber);
$("mobNo").addEventListener('input', buttonState);

//Event listener for the login button
$("mobNoSubmit").addEventListener('click', login);




