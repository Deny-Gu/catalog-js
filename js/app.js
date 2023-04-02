let catalogWrapper = document.querySelector('.catalog-wrapper');
let filterList = document.querySelectorAll('.catalog-sidebar-filter li');
let filterAll = document.getElementById('all');
let btnAddItem = document.querySelector('.add-item');
let popup = document.querySelector('.popup-add-item');
let addBtn = document.getElementById('add-btn');
let cancelBtn = document.getElementById('cancel-btn');
let inputTitle = document.querySelector('form #title');
let selectCategory = document.querySelector('form select');
let inputPrice = document.querySelector('form #price');
let inputFile = document.querySelector('form #file');



function addItem (title, category, brend, price, img) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.classList.add(category);
    itemDiv.classList.add(brend);
    catalogWrapper.appendChild(itemDiv);

    let itemImg = document.createElement('div');
    itemImg.classList.add('item-img');
    let linkImg = document.createElement('a');
    linkImg.href = '#'
    let imgSrc = document.createElement('img');
    imgSrc.src = img;
    linkImg.appendChild(imgSrc);
    itemImg.appendChild(linkImg);
    itemDiv.appendChild(itemImg);

    let itemTitle = document.createElement('div');
    itemTitle.classList.add('item-title');
    let linkTitle = document.createElement('a');
    linkTitle.href = '#'
    linkTitle.innerHTML = title;
    itemTitle.appendChild(linkTitle);
    itemDiv.appendChild(itemTitle);

    let itemPrice = document.createElement('div');
    itemPrice.classList.add('item-price');
    itemPrice.innerHTML = price + ' руб.';
    itemDiv.appendChild(itemPrice);

    let itemBuy = document.createElement('div');
    itemBuy.classList.add('item-buy');
    let itemBtn = document.createElement('button');
    itemBtn.innerHTML = 'Купить';
    itemBuy.appendChild(itemBtn);
    itemDiv.appendChild(itemBuy);
};

let url = 'https://64284586161067a83b0ab0fb.mockapi.io/items';

async function getCatalogAll () { 
    await fetch(url)
    .then(response => response.json())
    .then(data => 
        data.forEach(item => 
            addItem(item.title, item.category, item.brend, item.price, item.img)
    ))};

async function getCatalogCategory (itemList) {   
    await fetch(url)
    .then(response => response.json())
    .then(data => 
        data.forEach((item) => { 
             if (item.category === itemList.id) {
                addItem(item.title, item.category, item.brend, item.price, item.img)
            }
    }))
}

window.addEventListener('load', () => {
    getCatalogAll();
}
);

filterAll.addEventListener('click', () => {
    catalogWrapper.innerHTML = '';
    getCatalogAll();
});

    
filterList.forEach((itemList) => {
    itemList.addEventListener('click', () => {
        catalogWrapper.innerHTML = '';
        getCatalogCategory(itemList);
    }
)
});

btnAddItem.addEventListener('click', () => {
    if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
    }
})

cancelBtn.addEventListener('click', () => {
    if (!popup.classList.contains('hidden')) {
        popup.classList.add('hidden');
    }
})

addBtn.addEventListener('click', function postAddItem () { 
    if (!popup.classList.contains('hidden')) {
        popup.classList.add('hidden');
    }
    
    let item = {
        title: inputTitle.value,
        category: selectCategory[0].value,
        brend: 'gang',
        price: inputPrice.value,
        img: inputFile.value
      };

    async function postCatalogAll () { 
    await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
      })
    .then(response => response.json())
    .then(async function postI (data) { 
        data[JSON.stringify(item)],
        catalogWrapper.innerHTML = '',
        getCatalogAll()
    })
    }

    postCatalogAll();

    inputTitle.value = '';
    inputPrice.value = '';

}
);