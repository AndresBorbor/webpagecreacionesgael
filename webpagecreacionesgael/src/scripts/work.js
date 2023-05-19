
class Work{
    constructor(name,category,description, price,imageUrl){
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}



const generateItemInfo = (work) => {
    let itemInfo = document.createElement('div')
    itemInfo.classList.add('item-info');
    itemInfo.innerHTML = `
        <h4>${work.name}</h4>
        <p>Categoria: ${work.category}</p>
    `;
    return itemInfo;
}

const generateItemImg = (work)=> {
    
    let itemImg = document.createElement('img')

    
    itemImg.classList.add('item-image');
    itemImg.src = `data:${work.imageType};base64,${work.image}`;
    
    
    return  itemImg;
    
}

const createItems = (workArray,condition) => {
    let itemsArray = [];
    workArray.map(work => {
        if(condition? work.name[0] === condition[1]: true){
            let item = document.createElement('div');
            
            item.appendChild(generateItemInfo(work));
            item.appendChild(generateItemImg(work));
            
            itemsArray.push(item);
        }
    });
    return itemsArray;
}


const getWorkList = async() => {
    
    await fetch("https://apirestcreacionesgael.netlify.app/.netlify/functions/api/products", { headers: { accept: "Accept: application/json" } })
    .then(res => res.json())
    .then(data => {
       if(workList.length !== 0 && data.length === workList.length) return false;
        workList = [];
        selectedArray = [];
        selectedArray.push(...data);
        workList.push(...data);
        
        workList.sort( (a,b) => {
            return a.name.localeCompare( b.name);
        });
        

    })
        
        
}

//Div con blur
const fullItemInfo = document.createElement('div');
fullItemInfo.classList.add('item-full-info');

const getFullItems = (work)=>{
    let infoItems = document.createElement('div');
    infoItems.classList.add('full-info-items');
    let infoImg =  document.createElement('img');
    infoImg.classList.add('full-info_image');

    infoImg.src = `data:${work.imageType};base64,${work.image}`;

    let infoContent = document.createElement('div');
    infoContent.classList.add('full-info_content');
    infoContent.innerHTML = `
        <h3>${work.name} </h3>
        <p><b>Precio:</b> $ ${work.price}</h3>
        <p><b>Categoría:</b>${work.category}</p>
        <p> <b>Descripción:</b> <br/>
            ${work.description}
        </p>
    `;

    let imgWrapper = document.createElement('div');
    imgWrapper.classList.add('img-wrapper');
    imgWrapper.appendChild(infoImg);
    imgWrapper.appendChild(createWaterMark());

    infoItems.appendChild(imgWrapper);
    infoItems.appendChild(infoContent);
    return infoItems;
}

const generateItemButton = () => {
    let buyButton = document.createElement('button');
    buyButton.classList.add('full-info_button');
    buyButton.textContent = 'Hacer Pedido';
    buyButton.addEventListener('click', (event)=>{
        event.stopPropagation();
        alert('a');
    })
    return buyButton;
}
const showFullInfo = (work)=>{
    fullItemInfo.innerHTML='';
    fullItemInfo.classList.toggle('full-info-show');
    let infoContainer = document.createElement('div');
    infoContainer.classList.add('full-info-container');
    let fullItems = getFullItems(work);
    infoContainer.appendChild(fullItems);
    
    // let button = generateItemButton();
    // infoContainer.appendChild(button);
    fullItemInfo.appendChild(infoContainer);
    
    fullItemInfo.addEventListener('click',event => {
        fullItemInfo.classList.remove('full-info-show');
    })
    workContainer.appendChild(fullItemInfo);
}
const createWaterMark = () => {
    let waterMark = document.createElement('img');
    waterMark.src = "src/assets/storeImage.jpg";
    waterMark.classList.add('waterMark');
    return waterMark;
}
const chargeCatalogue = async (array,condition) => {
    await getWorkList();
    workContainer.innerHTML = '';
    if(array.length > 0){
        
        array.map(async (work) => {
            if(condition? work.category === condition: true){
                let item = document.createElement('div');
                
                item.appendChild(createWaterMark());
                item.classList.add('item');
                item.id=`producto${work.id}`;
                let itemImg = generateItemImg(work);
                let itemInfo = generateItemInfo(work);
                item.appendChild(itemImg);
                item.appendChild(itemInfo);
                item.addEventListener('click', (event)=>{
                    showFullInfo(work);
                })
                workContainer.appendChild(item);
            }
        }) 
    }

}

const main = async() => {
    await getWorkList();
    chargeCatalogue(selectedArray);
}


main();

