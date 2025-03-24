const btnOpenMenue = document.getElementById('icon-menue')
const alertMoblieMenue = document.getElementById('alert-dark')
const mobileMenue = document.getElementById('mobile-menue')
const spaceClose = document.getElementById('space')
const xCloseMenue = document.getElementById('x-close-menue')

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


// user photo
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


// container
const mainImg = document.querySelector('.mainImg img')
const allImages = document.querySelectorAll('.smallImg .img img')
const AllMainImgs = [
    'img/images/image-product-1.jpg',
    'img/images/image-product-2.jpg',
    'img/images/image-product-3.jpg',
    'img/images/image-product-4.jpg',
]

allImages.forEach((img) => {
    img.onclick = function(){
        allImages.forEach((ele) =>{
            ele.style.opacity = '1'
            ele.parentElement.style.borderColor = 'transparent'
        })
        img.style.opacity = '.5'
        img.parentElement.style.borderColor = '#ff7d1a'

        mainImg.src = AllMainImgs[Array.from(allImages).indexOf(img)]
    }
    allImages[0].click()
})


//counter
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



