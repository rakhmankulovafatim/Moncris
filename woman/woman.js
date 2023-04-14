let url = "http://localhost:3000/clothes?"
let clothesList = document.querySelector('.cards')
let filterSelector = document.querySelector('.main-select-price')
const filterBrands = document.querySelector('.main-select-brands')
const filterCategorys = document.querySelector('.main-select-category')
let filterSearch = document.querySelector('.input-search')
let basketCard = document.querySelector('.basket-box')

let popup = document.querySelector('.popup')
let clickBasket = document.querySelector('.createPopup')
// let sum = document.querySelector('.basket-sum')

let openBasket = ()=>{
    popup.classList.toggle('active')
}

let backeDb =[

];



backeDb = JSON.parse(localStorage.getItem('product'))
let filterPrice = ''
let filterBrand = ''
let filterCategory = ''
let input = ''

let setLocal = ()=>{
    localStorage.setItem('product',JSON.stringify(backeDb))
}


const getClouthes = ()=>{
    clothesList.innerHTML = ''
    fetch(url + `${filterPrice.length ? '_sort=price&_order=' + filterPrice:''}`)
    .then((res)=>res.json())
    .then((res)=>res.forEach((el)=>{
        clothesList.innerHTML +=`
        <div class="left-card">
            <img src="${el.image}" alt="">
            <p class="description">Название: ${el.title}</p>
            <p class="price">Цена: ${el.price}</p>
            <p class="brand">Брэнд: ${el.brand}</p>
        </div>
        `
    }))
}
filterSelector.addEventListener('change', (e)=>{
    filterPrice = e.terget.value
})
getClouthes()





const getFilter = () => {
    clothesList.innerHTML = ''
    fetch(url + `${filterPrice.length ? '_sort=price&_order=' + filterPrice + '&':''}${filterBrand.length ? 'brand=' + filterBrand + '&': ''}${filterCategory.length ?'category=' + filterCategory +'&': ''}${input.length ? 'title_like=' + input: ''}`)
        .then((res)=>res.json())
        .then((res)=>{
            res.forEach((el)=>{
    clothesList.innerHTML +=`
                        <div class="left-card">
                            <img src="${el.image}" alt="">
                            <p class="description">Название: ${el.title}</p>
                            <p class="price">Цена: ${el.price}</p>
                            <p class="brand">Брэнд: ${el.brand}</p>
                            <div class="backet">

                            
                            </div>
                        </div>
                        
    `
        })
        let addCardbtn = document.querySelectorAll('.addCard')
        let deleteCardbtn = document.querySelectorAll('.closeCard')
        Array.from(addCardbtn).forEach((el)=>{
            el.addEventListener('click',()=>{
                backeDb = [...backeDb, res.find((item)=>item.id ===+el.dataset.id)]
                console.log(backeDb)
                getFilter()
                setLocal()
                
            })
        })
        Array.from(deleteCardbtn).forEach((el)=>{
            el.addEventListener('click',()=>{
                backeDb = backeDb.filter(item=>item.id !== +el.dataset.id)
                getFilter()
                setLocal()
                console.log(backeDb)
            })
        })
    }
    )
    getBasket()
}
// const getBasket = ()=>{
//     basketCard.innerHTML = ''
//     backeDb.forEach((el)=>{
//         basketCard.innerHTML +=
//         `
//         <div class ="basketCard">
//         <img src=${el.image} alt=${el.title}>
//         <div class="basketCard-text">
//             <h4>${el.title}</h4>
//             <h5>${el.price}</h5>
//             <h6>${el.brand}</h6>
//         </div>
//         </div>
//         `
//     })
//     Array.from(sum).forEach((el)=>{
//         el.textContent = backeDb.reduce((acc,rec)=>{
//             return acc+ +rec.price
//         },0)
//     })
// }
// getBasket()




filterSelector.addEventListener('change',(e)=>{
    filterPrice = e.target.value
    console.log(e.target.value);
    getFilter()
    // getClothes()
})

filterBrands.addEventListener("change", (e) => {
    filterBrand = e.target.value
    console.log(e.target.value);
    getFilter()
    // getClothes()
})
filterCategorys.addEventListener('change',(e)=>{
    filterCategory = e.target.value
    console.log(filterCategory)
    getFilter()
})
filterSearch.addEventListener('change',(e)=>{
    input = e.target.value
    getFilter()
})

getFilter()




// ${!backeDb.filter((item) => item.id === el.id).length ? `<div data-id="${el.id}" class="addCard">add</div>` :`<div class="closeCard" data-id="${el.id}">done</div>`}