const btnOpenMenue = document.getElementById('icon-menue')
const alertMoblieMenue = document.getElementById('alert-dark')
const mobileMenue = document.getElementById('mobile-menue')
const spaceClose = document.getElementById('space')
const xCloseMenue = document.getElementById('x-close-menue')

///////////////////// mobile menue /////////////////////////
btnOpenMenue.onclick = function(){
    if(alertMoblieMenue.style.display == 'none' || alertMoblieMenue.style.display == ''){
        alertMoblieMenue.style.display = 'flex'
        mobileMenue.style.display = 'block'
        setTimeout(() => mobileMenue.style.transform = 'translate(0)' , 50);
    }else{
        alertMoblieMenue.style.display = 'none'
        mobileMenue.style.display = 'none'
        mobileMenue.style.transform = 'translate(-100%)'
    }
}
spaceClose.onclick = function(){
    alertMoblieMenue.style.display = 'none'
    mobileMenue.style.display = 'none'
    mobileMenue.style.transform = 'translate(-100%)'
}
xCloseMenue.onclick = function(){
    alertMoblieMenue.style.display = 'none'
    mobileMenue.style.display = 'none'
    mobileMenue.style.transform = 'translate(-100%)'
}


/////////////////////// user photo /////////////////////////////
let userPhoto = document.getElementById('userPhoto');
let inpAddPhoto = document.getElementById('inpAddPhoto');

let varUserData;
localStorage.userPhoto;
if(localStorage.userPhoto != null){
    varUserData  = localStorage.userPhoto
}else{
    varUserData = 'img/images/image-avatar.png';
}

userPhoto.onclick = function(){
    inpAddPhoto.click()
    inpAddPhoto.onchange = function(){
        const photo = inpAddPhoto.files[0]
        if(photo){
            if(photo.size > 3.5 * 1024 * 1024){
                window.alert(`the size of this photo is ${((photo.size) / (1024 * 1024)).toFixed(1)}MB\n the size of photo must me less than 3.5MB`)
                return
            }else{
                const fileReader = new FileReader()
                fileReader.onload = function(fileData){
                    localStorage.userPhoto = fileData.target.result
                    varUserData = localStorage.userPhoto
                    userPhoto.src = varUserData
                    showPhoto()
                }
                fileReader.readAsDataURL(photo)
            }
        }
    }
}

function showPhoto(){
    userPhoto.src = varUserData
}
showPhoto()


//////////////////////// container /////////////////////////
const mainImg = document.querySelector('.mainImg img')
const allImages = document.querySelectorAll('.smallImg .img img')
const AllMainImgs = [
    'img/images/image-product-1.jpg',
    'img/images/image-product-2.jpg',
    'img/images/image-product-3.jpg',
    'img/images/image-product-4.jpg',
];
let indexImg ;// this variable is so important
allImages.forEach((img) => {
    img.onclick = function(){
        allImages.forEach((ele) =>{
            ele.style.opacity = '1'
            ele.parentElement.style.borderColor = 'transparent'
        })
        img.style.opacity = '.5'
        img.parentElement.style.borderColor = '#ff7d1a'

        mainImg.src = AllMainImgs[Array.from(allImages).indexOf(img)]
        indexImg = Array.from(allImages).indexOf(img)// index number
    }
    allImages[0].click()
})


////////////////// number of products that are put in cart ////////////////////////
const counter = document.getElementById('number');
const minusIcon = document.getElementById('minusIcon');
const plusIcon = document.getElementById('plusIcon');

let numberProducts = 1
plusIcon.onclick = function() {
    numberProducts += 1;
    counter.innerHTML = numberProducts
};
minusIcon.onclick = function() {
    if(numberProducts <= 0){
        numberProducts = 0;
    }
    numberProducts -= 1;
    counter.innerHTML = numberProducts
};


////////////////////////////////////////// alert cart /////////////////////////////
const alertCart = document.querySelector('.alert-cart')
const cartIcon = document.querySelector('.icon-cart img')
const emptyCart = document.querySelector('.content-cart')
const fillCart = document.querySelector('.listCart')

cartIcon.onclick = function(){
    if(alertCart.style.display == 'none' || alertCart.style.display == ''){
        alertCart.style.display = 'flex'
        setTimeout(() => alertCart.style.opacity = '1', 50);
        cartIcon.style.filter = 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))'

        ////function check products in cart or no 
        checkProCart()

    }else{
        alertCart.style.display = 'none'
        alertCart.style.opacity = '0'
        cartIcon.style.filter =  'drop-shadow(0 0 0 transparent)'
    }
}
//function check products in cart or no 
function checkProCart(){
    if(fillCart.firstElementChild.innerHTML){
        fillCart.style.display = 'flex'
        emptyCart.style.display = 'none'
    }else{
        fillCart.style.display = 'none'
        emptyCart.style.display = 'flex'
    }
}

// cart 
const btnAddToCart = document.getElementById('btn-add-cart');
const noticeCart = document.getElementById('com');
const productBox = document.getElementById('contPro');

///////////////////////////////// notice //////////////////////////
let noticeCounter;
localStorage.loNoticeCounter;
if(localStorage.loNoticeCounter != null){
    noticeCounter = JSON.parse(localStorage.loNoticeCounter)
}else{
    noticeCounter = 0
}
// function show notice
function showNotice(){
    if(noticeCounter <= 0){
        noticeCart.style.display = 'none'
    }else{
        noticeCart.style.display = 'block'
        noticeCart.innerHTML = noticeCounter
    }
}
showNotice()



/////////// create data products
localStorage.loArrDataProducts;
let arrDataProducts;
if(localStorage.loArrDataProducts != null){
    arrDataProducts = JSON.parse(localStorage.loArrDataProducts)
}else{
    arrDataProducts = []
}
// btn add to cart
btnAddToCart.onclick = function(){
    // notice
    noticeCounter += 1
    localStorage.loNoticeCounter = JSON.stringify(noticeCounter)
    showNotice()
    
    // create data product
    let OBJDataProduct = {
        imgIndex: AllMainImgs[indexImg],
        numberPro: numberProducts
    }
    arrDataProducts.push(OBJDataProduct)
    localStorage.loArrDataProducts = JSON.stringify(arrDataProducts)
    showProCart()
    checkProCart()
    window.scrollTo({top:0, behavior:'smooth'})
}

// function show products in cart
function showProCart(){
    productBox.innerHTML = '';
    for(let i = 0; i < arrDataProducts.length; i++){
        productBox.innerHTML +=`
            <div class="products">
                <img class="img-pro-alert" src="${arrDataProducts[i].imgIndex}" alt="">
                <div class="text-alert">
                    <p class="f-alert">fall limite edition sneakers</p>
                    <p class="s-alert">$125.00 x ${arrDataProducts[i].numberPro} = 
                    <span>$${Number(arrDataProducts[i].numberPro) * 125}.00</span></p>
                </div>
                <img onclick="delProCart(${i})" class="deleteIcont" src="img/images/icon-delete.svg" alt="">
            </div>
        `
    }
}
showProCart()

// function delete product in cart
function delProCart(i){
    arrDataProducts.splice(i,1);
    noticeCounter -= 1
    localStorage.loArrDataProducts = JSON.stringify(arrDataProducts)
    localStorage.loNoticeCounter = JSON.stringify(noticeCounter)
    showProCart()// function show products in cart
    checkProCart()// function checkProCart products in cart
    showNotice()// function showNotice products in cart
}

// btn checkout
const btnCheckOut = document.querySelector('.btn-chechout');
btnCheckOut.onclick = function(){
    arrDataProducts.splice(0)
    localStorage.loArrDataProducts = JSON.stringify(arrDataProducts)
    console.log(arrDataProducts)
    noticeCounter = 0
    localStorage.loNoticeCounter = JSON.stringify(noticeCounter)
    showProCart()
    checkProCart()
    showNotice()
}



/////////////////////////////// Galary //////////////////////////////
const smallImgsASI = document.querySelectorAll('.imgs4-ASI div img');
const mainGalary = document.querySelector('.alert-show-img');
const btnCloseGalary = document.getElementById('btn-close-ASI');
const mainImgASI = document.getElementById('mainImg-ASI');
const angleleftASI = document.getElementById('angle-left-ASI');
const anglerightASI = document.getElementById('angle-right-ASI');

// open galary
mainImg.addEventListener('click',function(){
    mainGalary.style.display = 'flex';
    mainGalary.style.padding = '20px';
    setTimeout(() => mainGalary.style.opacity = '1', 50);
    smallImgsASI[indexImg].click()
})
// close calary
btnCloseGalary.addEventListener('click',function(){
    mainGalary.style.opacity = '0';
    mainGalary.style.display = 'none';
    // 
    allImages[indexImg].click()
})

// small images
smallImgsASI.forEach((img) => {
    img.onclick = function(){
        smallImgsASI.forEach((img) =>{
            img.parentElement.style.borderColor = 'transparent'
            img.style.opacity = '1'
        })
        img.parentElement.style.borderColor = '#ff7d1a'
        img.style.opacity = '.5'

        //
        mainImgASI.src = AllMainImgs[Array.from(smallImgsASI).indexOf(img)]
        indexImg = Array.from(smallImgsASI).indexOf(img)
    }
})

//////////////////////// moveimg in galary
anglerightASI.onclick = function(){
    indexImg += 1
    indexImg >= 4 ? indexImg = 0 : indexImg
    smallImgsASI[indexImg].click()
}
angleleftASI.onclick = function(){
    indexImg -= 1
    indexImg  < 0 ? indexImg = 3 : indexImg
    smallImgsASI[indexImg].click()
}
