let catalogWrapper = document.querySelector('.catalog-wrapper');
let filterList = document.querySelectorAll('.catalog-sidebar-filter li');
let filterAll = document.getElementById('all');

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

window.addEventListener('load', () => 
    fetch(url)
    .then(response => response.json())
    .then(data => 
        data.forEach(item => 
            addItem(item.title, item.category, item.brend, item.price, item.img)
    ))
);

filterAll.addEventListener('click', async function getCatalogAll () { 
    catalogWrapper.innerHTML = '',
    
    await fetch(url)
    .then(response => response.json())
    .then(data => 
        data.forEach(item => 
            addItem(item.title, item.category, item.brend, item.price, item.img)
    ))}
);
    
filterList.forEach((itemList) => {
    itemList.addEventListener('click', async function getCatalogOes () { 
    catalogWrapper.innerHTML = '',
    
    await fetch(url)
    .then(response => response.json())
    .then(data => 
        data.forEach((item) => { 
            if (item.category === itemList.id) {
                addItem(item.title, item.category, item.brend, item.price, item.img)
            }
    }))
}
)
});
