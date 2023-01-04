let elcards = document.querySelector(".cards");
let elSelect = document.querySelector(".category-select");
let cartBtn = document.querySelector("#cartBtn");
let removeBtn = document.querySelector("#removeBtn");
let addedItem = document.querySelector(".offcanvas-body");

const getProducts = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderProducts(data));
};
const getCategories = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderCategory(data));
};

function renderProducts(products) {
  console.log(products);
  elcards.innerHTML = null;
  products.forEach((element) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("my-2");
    card.classList.add("p-2");
    card.style.width = "300px";
    card.innerHTML = `
        <img src="${element.image}" alt="${element.title}">
        <p class='fs-5 fw-bolder' style='height:100px; overflow:auto;'>${element.title}</p>
        <p><span class="badge text-bg-primary fs-6">$ ${element.price}</span></p>
        `;
    elcards.appendChild(card);
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("btn-success");
    btn.classList.add("after");

    btn.addEventListener("click", (e) => {
      console.log(
        e.path[1].childNodes[3].textContent,
        e.path[1].childNodes[5].textContent
      );
      let item = document.createElement("a");
      item.classList.add("card");
      item.classList.add("border");
      item.classList.add("border-dark");
      item.classList.add("p-1");
      item.classList.add("mb-2");
      item.innerHTML = `<p class='p-0 m-0 fs-5 fw-bolder'>${e.path[1].childNodes[3].textContent}</p> <p class='p-0 pt-2 m-0 fw-semibold'>Price: ${e.path[1].childNodes[5].textContent}</p>`;

      addedItem.appendChild(item);
    });
    card.appendChild(btn);
  });
}

removeBtn.addEventListener('click', ()=>{
  addedItem.innerHTML = ''
})

function renderCategory(categories) {
  categories.forEach((element) => {
    let option = document.createElement("option");
    option.value = element;
    option.textContent = element.toUpperCase();
    elSelect.appendChild(option);
  });
}

elSelect.addEventListener("change", function (e) {
  if (e.target.value === "all") {
    getProducts("https://fakestoreapi.com/products");
  } else {
    getProducts(`https://fakestoreapi.com/products/category/${e.target.value}`);
  }
});

getProducts("https://fakestoreapi.com/products");
getCategories("https://fakestoreapi.com/products/categories");
