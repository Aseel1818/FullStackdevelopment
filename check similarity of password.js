let value1= document.getElementById("password").value;
let value2= document.getElementById("pass").value;
let element= document.getElementById("b");
 element.addEventListener("click", function(){ 
 if ( document.getElementById("password").value != document.getElementById("pass").value ){
alert("Repeat Password Well"); 
}
  });
