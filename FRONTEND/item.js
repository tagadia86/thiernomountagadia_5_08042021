
let urlSearch = new URLSearchParams(window.location.search);
let selectedCam = urlSearch.get('id');
let mainBlock = document.getElementById("main_block");


//let productToAdd = new Object();
//Object.defineProperty(productToAdd, "itemCounter", {value:0});

//console.log("product to add =");
//let counter = 0;
//counter++;
//productToAdd.itemCounter = counter;
//console.log(productToAdd.itemCounter);


const get = (url)=> 
{
  return new Promise((resolve,reject)=>
  {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
      {
        resolve(JSON.parse(this.responseText));
      }
    }
    request.open("GET",url);
    request.send();
  });
};

get("http://localhost:3000/api/furniture").then((response)=>{
  displayChoosen(response);
})

const displayChoosen = (furnitures)=>
{
  furnitures.forEach(furniture => 
  {

    if (furniture._id == selectedCam )
    {
      // card main div for each item
      let card_wrapper = document.createElement("div");
      card_wrapper.classList.add("container","col-lg-6",);
      main_block.appendChild(card_wrapper);

      // card second div for each item
      let card_wrapper_child = document.createElement("div");
      card_wrapper_child.classList.add("card", "mb-4", "mb-lg-0", "border-light", "shadow-sm");
      card_wrapper.appendChild(card_wrapper_child);

      //appending the card image
      let imageCamera = document.createElement("img");
      imageCamera.classList.add("card-img-top");
      card_wrapper_child.appendChild(imageCamera);
      imageCamera.src = furniture.imageUrl;
      
      // creating description wrapper
      let description_wrapper = document.createElement("div"); 
      description_wrapper.classList.add("card-body");
      card_wrapper_child.appendChild(description_wrapper);

      //appending the card title
      let itemName = document.createElement("h5");
      itemName.classList.add("card-title");
      card_wrapper_child.appendChild(itemName);
      itemName.innerHTML += furniture.name;

      //appending the card title
      let itemPrice = document.createElement("p");
      itemPrice.classList.add("card-text");
      card_wrapper_child.appendChild(itemPrice);
      itemPrice.innerHTML += furniture.price;

      //appending the card id
      let itemId = document.createElement("p");
      itemId.classList.add("card-text");
      card_wrapper_child.appendChild(itemId);
      itemId.innerHTML += furniture._id;

      //appending the card title
      let itemDescription = document.createElement("p");
      itemDescription.classList.add("card-text");
      card_wrapper_child.appendChild(itemDescription);
      itemDescription.innerHTML += furniture.description;

      //choosing one option
      let formContainer = document.createElement("div");
      card_wrapper_child.appendChild(formContainer);
      let formulaire = document.createElement("form");
      formContainer.appendChild(formulaire);
      formulaire.innerHTML = "choisissez votre vernis";
      let selectElement = document.createElement("select");
      selectElement.id = "mySelect";
      formulaire.appendChild(selectElement);

      let choosenVarnish;
      furniture.varnish.forEach(eachVarnish => {
          let optionElement = document.createElement("option")
          selectElement.appendChild(optionElement);
          optionElement.value += eachVarnish;
          optionElement.innerHTML += eachVarnish;
          choosenVarnish = optionElement.value;
        });

      //creating the button
      let itemButton = document.createElement("a");
      itemButton.classList.add("btn","btn-primary");
      card_wrapper_child.appendChild(itemButton);
      itemButton.innerHTML += "Ajouter au panier";
      itemButton.role = "button";
      /*end of the part to create the button*/

      let productToAdd = new itemDuplicate(furniture._id,furniture.name,furniture.price,furniture.description,furniture.imageUrl,1);
      //productToAdd = (furniture);
      

      
      itemButton.addEventListener('click', function() 
      {   
        let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
        let i = 0;
        let cpt = 0;
        if (shoppingCart === null) 
        {
          shoppingCart = [];
        }
        else
        {
          if(shoppingCart.length < 1)
          {
            shoppingCart.push(productToAdd);
            //shoppingCart[0].count = 1;
          }
          else
          {
            while(i < shoppingCart.length)
            {
              if(productToAdd._id == shoppingCart[i]._id)
              {
                shoppingCart[i].count +=1;
                cpt++;
              }
              i++;
              //end of while loop
            }
            if(cpt == 0 )
             {
              console.log("LE PRODUIT N'Y EST PAS ENCORE")
              //productToAdd.count +=1;
              shoppingCart.push(productToAdd);
              //shoppingCart[i-1].count +=1;
             }
             else
             {

              
             }
          }
          //shoppingCart[i].count ++;
        }
        console.log("i = ");
        console.log(i);
        console.log("shoppingcart = ");
        console.log(shoppingCart);
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      });
      /*end of the function to add an item in the cart*/ 
    }
    /*end of the if to find the item with his ID*/
  });
  /*end of the loop foreach */
}
/*end of the function displayChoosen*/

//creating an object 
// Constructor

  class itemDuplicate{
  constructor(_id,name,price,description,imageUrl,count) 
  {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.count = count;
  }
}