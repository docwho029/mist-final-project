var swiper1 = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
  });

  var swiper2 = new Swiper(".product-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 17,
    freeMode: true,
    navigation: {
  nextEl: ".product-swiper-button-next",
  prevEl: ".product-swiper-button-prev",
},
  });

  var swiper3 = new Swiper(".popup-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 25,
    freeMode: true,
    navigation: {
  nextEl: ".popup-swiper-button-next",
  prevEl: ".popup-swiper-button-prev",
},
  });