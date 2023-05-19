const binarySearch = (array,element,start, end) => {
    if(start > end) return false;
    let mid = Math.floor((start+end)/2);
    
    if(array[mid].name.replace(/\s+/g,'').toLowerCase() === element) return array[mid];

    if(array[mid].name.replace(/\s+/g,'').toLowerCase().localeCompare(element)>0){
        
        return binarySearch(array,element,start,mid-1);
    }else{
        return binarySearch(array,element,mid+1,end);
    }
}

const showSearch = (event) => {

    if(searchBar.value.length === 0 ) {
        return chargeCatalogue(selectedArray,filterOption);
    }
    
    element = binarySearch(workList, searchBar.value.replace(/\s+/g,'').toLowerCase(), 0,workList.length-1);
    
    if(element && (filterOption !== ''? element.category.trim() === filterOption :true)){
        chargeCatalogue([element]);
    }else{
        workContainer.innerHTML = '<h3> NO SE ENCONTRÓ EL PRODUCTO </h3>';
    }
}
searchBar.addEventListener('keypress', event => {
    if(event.key === 'Enter'){
        btnSearch.click();
    }
})

btnSearch.addEventListener('click', event =>{
    showSearch(event);
})


const orderBy = (option)=> {
    switch(option){
        case 'name':
            selectedArray.sort( (a,b) => {
                return a.name.localeCompare( b.name);
            });
            break;
        case 'price':
            selectedArray.sort( (a,b) => {
               
                return parseInt(a.price,10) - parseInt(b.price,10);
            } );
            break;
            
        default:
            selectedArray.sort( (a,b) => {
                return a.name.localeCompare( b.name);
            });
            break;
    }
    
}

orderList.addEventListener('change', event => {
    orderOption = event.target.value;
    orderBy(orderOption);
    if(!element)chargeCatalogue(selectedArray,filterOption);
    btnSearch.click();
});

filterList.addEventListener('change', event => {
    filterOption = event.target.value;
    if(!element)chargeCatalogue(selectedArray,filterOption);
    btnSearch.click();
})

