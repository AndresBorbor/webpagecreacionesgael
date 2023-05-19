const btnSearch = document.querySelector('.btn-submit');
const searchBar = document.querySelector('.search-bar');
const workContainer = document.querySelector('.container');
const title = document.querySelector('.main-title');
const orderList = document.querySelector(".order");
const filterList = document.querySelector('.filter');
const menu = document.querySelector('.menu');
const btnMenu = document.querySelector('.btn-open-menu');
const navCatalogue = document.querySelector('.catalogue-nav');
let workList = [];
let element =null;
let orderOption = 'name';
let filterOption = '';
let selectedArray = [];


const toggleMenu = () => {
    menu.classList.toggle('menu-opened');
}
btnMenu.addEventListener('click',()=>{
    menu.classList.toggle('menu-opened');
})
title.addEventListener('click',()=>{
    window.scrollTo(0,0);
    
})

// navCatalogue.addEventListener('click',()=>{
//     window.scrollTo(0,0);
// })
