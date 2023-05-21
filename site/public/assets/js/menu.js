function menuShow(){
    let menuMobile = document.querySelector('.mobile-menu');
    if(menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "./assets/img/menu_white_36dp.svg"
    }else{
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "./assets/img/close_white_36dp.svg"
    }
}

function menuPerfilMobile(){
    let menuMobile = document.querySelector('.sidebar');
    if(menuMobile.style.display == "flex"){
        menuMobile.style.display = "none";
        menuMobile.style.position = "relative";
    }else{
        menuMobile.style.display = "flex";
        menuMobile.style.position = "fixed";
    }

}

function voltar(){
    window.location = "../index.html";
}


$('#carrossel').slick({
    // infinite: true,
    slidesToShow: 1,
    // centerMode: true,
    slidesToScroll: 1,
    dots: true,
    arrows: true
});