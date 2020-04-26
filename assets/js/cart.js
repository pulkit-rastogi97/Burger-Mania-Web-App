
//Initiliazing cartItems
var cartItems = new Array();

priceTeller= function(value){
    if(value == "veg")
    {
        return "100";
    }
    else if (value == "egg"){
        return "150";
    }
    else if(value == "chicken"){
        return "200";
    }
}

getCartItems = function(){
    return JSON.parse(localStorage.getItem("cartItems"));
}

getTotalQuantity = function(){
    cartItems = getCartItems();
    var totalQuantity = 0 ;
    for(var i = 0; i< cartItems.length; i++)
    {
        totalQuantity += cartItems[i].quantity;
    }
    return totalQuantity;
}

getTotalPrice = function(){
    cartItems = getCartItems();
    var totalPrice = 0;
    for(var i = 0; i< cartItems.length; i++)
    {
        totalPrice += priceTeller(cartItems[i].burgerCategory) * cartItems[i].quantity;
    }
    return totalPrice;
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

displayCart=function(){
    cartItems = getCartItems();
    for(var i = 0 ; i < cartItems.length; i++)
    {
        var row = document.createElement("tr");
        var data1 = document.createElement("td");
        var burgerType = document.createTextNode(cartItems[i].burgerType);
        data1.appendChild(burgerType);
        var data2 = document.createElement("td");
        var burgerCategory = document.createTextNode(toTitleCase(cartItems[i].burgerCategory));
        data2.appendChild(burgerCategory);

        var data3 = document.createElement("td");
        var priceValue = priceTeller(cartItems[i].burgerCategory);
        var price = document.createTextNode(priceValue);
        data3.appendChild(price);
        var data4 = document.createElement("td");
        var quantity = document.createTextNode(cartItems[i].quantity);
        data4.appendChild(quantity);
        var data5 = document.createElement("td");
        var totalPrice = document.createTextNode(eval(cartItems[i].quantity * priceValue));
        data5.appendChild(totalPrice);
        var data6 = document.createElement("td");
        var remove = document.createElement("button");
        remove.className="remove";
        remove.innerHTML="X";
        remove.click=remove;
        data6.appendChild(remove);
        row.appendChild(data1);
        row.appendChild(data2);
        row.appendChild(data3);
        row.appendChild(data4);
        row.appendChild(data5);
        row.appendChild(data6);
        document.getElementById("tdata").appendChild(row);
    }

    var totalBill = document.createElement("p");
    totalBill.textContent = "Total Quantity " + getTotalQuantity() + " & Total Price Rs. " + getTotalPrice();
    document.getElementById("total").appendChild(totalBill);

}

placeOrder = function(){
    totalPrice = getTotalPrice();
    totalQuantity = getTotalQuantity();

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var finalAmount = JSON.parse(this.responseText);
            document.getElementById("total").innerHTML="Total Quantity is " + finalAmount.quantity + ", you will get " + finalAmount.discount + "% discount <br>&<br> Total Price after Discount is Rs. " + finalAmount.price;
        }
    };

    var reqBody = {
        "totalPrice" : totalPrice,
        "totalQuantity" : totalQuantity,
    }
    xhttp.open('POST',"http://localhost:9876/orders", true);
    xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
    xhttp.send(JSON.stringify(reqBody));


}
window.onload= displayCart();
document.getElementById("placeOrder").addEventListener('click',placeOrder);


