const cartBtn = document.querySelector(".fa-shopping-cart");
const searchBtn = document.querySelector(".fa-search");

const crossPopup = document.querySelector(".fa-times-circle");
const overlay = document.querySelector(".overlay");
const menu = document.querySelector(".popup");

const searchBar = document.querySelector(".searchBar");
const searchBarInput = document.querySelector(".searchBarInput");
const submitSearchBtn = document.querySelector(".submitSearch");

function openMenu() {
    overlay.classList.remove("hidden");
    menu.classList.remove("hidden");
    
    setTimeout( () => {
        overlay.classList.add("backdrop-blur-md");
        menu.classList.remove("opacity-0")
    }, 10 )
    
}

function closeMenu() {
    overlay.classList.remove("backdrop-blur-md");
    menu.classList.add("opacity-0");
    searchBar.classList.add("opacity-0");
    console.log("close")
    
    setTimeout( () => {
        menu.classList.add("hidden");
        searchBar.classList.add("hidden");
    } , 200 )
    
    setTimeout( () => {
        overlay.classList.add("hidden");
    } , 400)

}

console.log(cartBtn, crossPopup, overlay, menu)
console.log(searchBtn)

overlay.onclick = closeMenu;
crossPopup.onclick = closeMenu;

cartBtn.onclick = () => { openMenu(); renderCart() };

searchBtn.onclick = search;

function search() {
    overlay.classList.remove("hidden");
    searchBar.classList.remove("hidden");

    setTimeout( () => {
        overlay.classList.add("backdrop-blur-md");
        searchBar.classList.remove("opacity-0")
    }, 10 )

    requestAnimationFrame( () => {
        searchBarInput.focus();
    })

}

submitSearchBtn.onclick = submitSearch;

searchBarInput.addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        submitSearch();
    }
})
async function submitSearch() {
    const res3 = await fetch(`https://dummyjson.com/products/search?q=${searchBarInput.value.replaceAll(' ', '%20')}`)
    let searchResults = await res3.json()
    //searchResults = searchResults.products;
    console.log(searchResults);
    renderSearchResults(searchResults);
    const crossPopup = document.querySelector(".fa-times-circle");
    crossPopup.onclick = closeMenu;
}

function renderSearchResults(searchResults) {
    if( menu.classList.contains("hidden") ) {
        menu.classList.remove("hidden");

        setTimeout( () => {
            menu.classList.remove("opacity-0");
        } , 10 )
    }

    let searchResultsProducts = searchResults.products;
    let searchProductSlides = "";

    searchResultsProducts.forEach( (product) => {
        //console.log(product);
        let favs = getFavs();
        let isRed = ( favs.includes( String(product.id)) ? "red-heart" : "" );
        searchProductSlides += `
                <div data-product-id="${product.id}" class="swiper-slide-two swiper-slide">
                  <div class="product-image" style="background-image:url(${product.thumbnail.replaceAll("'", "%27")})"></div>
                  <div class="product-details">
                    <div class="price-heart">
                      <span id="price">$${product.price}</span>
                      <i class="fas fa-heart ${isRed}"></i>
                    </div>
                    <span id="seller">${product.title}</span>
                  </div>
                </div>
        `
    });
    let searchSlider = `
        <div class="flex justify-between !pr-2">
            <h2 class='heading-product-slider !text-xl' id='category-name'>${searchResults.products.length} Result(s)</h2>
            <i class="fas fa-times-circle text-2xl hover:cursor-pointer"></i>
        </div>
        <section class="slidey !h-[33vh]">
            <div class="popup-swiper swiper !w-[100%] !h-[100%] !overflow-visible translate-y-[-2vh]">
              <div class="swiper-wrapper swiper-wrapper-two">
                ${searchProductSlides}
              </div>
        
                <div class="swiper-button-next product-swiper-button-next popup-swiper-button-next">
                    <svg id="next-svg" viewBox="0 0 38 38" fill="none">
                        <path d="M15.5117 6.65495L12.9883 9.17838C12.6749 9.49175 12.5182 9.86285 12.5182 10.2917C12.5182 10.7205 12.6749 11.0916 12.9883 11.4049L20.5833 19L12.9883 26.5951C12.6749 26.9084 12.5182 27.2795 12.5182 27.7083C12.5182 28.1372 12.6749 28.5082 12.9883 28.8216L15.5117 31.3451C15.8251 31.6584 16.1962 31.8151 16.625 31.8151C17.0538 31.8151 17.4249 31.6584 17.7383 31.3451L28.9701 20.1133C29.2834 19.7999 29.4401 19.4288 29.4401 19C29.4401 18.5712 29.2834 18.2001 28.9701 17.8867L17.7383 6.65495C17.4249 6.34158 17.0538 6.1849 16.625 6.1849C16.1962 6.1849 15.8251 6.34158 15.5117 6.65495ZM-9.53674e-07 19C-9.53674e-07 15.553 0.849391 12.3739 2.54818 9.46289C4.24696 6.55187 6.55187 4.24696 9.46289 2.54818C12.3739 0.849391 15.553 -9.53674e-07 19 -9.53674e-07C22.447 -9.53674e-07 25.6261 0.849391 28.5371 2.54818C31.4481 4.24696 33.753 6.55187 35.4518 9.46289C37.1506 12.3739 38 15.553 38 19C38 22.447 37.1506 25.6261 35.4518 28.5371C33.753 31.4481 31.4481 33.753 28.5371 35.4518C25.6261 37.1506 22.447 38 19 38C15.553 38 12.3739 37.1506 9.46289 35.4518C6.55187 33.753 4.24696 31.4481 2.54818 28.5371C0.849391 25.6261 -9.53674e-07 22.447 -9.53674e-07 19Z" fill="#3B3B3B"/>
                    </svg>
                </div>
        
                <div class="swiper-button-prev product-swiper-button-prev popup-swiper-button-prev">
                    <svg id="prev-svg" viewBox="0 0 28 28" fill="none">
                        <path d="M16.5703 23.0964L18.4297 21.237C18.6606 21.0061 18.776 20.7326 18.776 20.4167C18.776 20.1007 18.6606 19.8273 18.4297 19.5964L12.8333 14L18.4297 8.40365C18.6606 8.17274 18.776 7.89931 18.776 7.58333C18.776 7.26736 18.6606 6.99392 18.4297 6.76302L16.5703 4.90365C16.3394 4.67274 16.066 4.55729 15.75 4.55729C15.434 4.55729 15.1606 4.67274 14.9297 4.90365L6.65365 13.1797C6.42274 13.4106 6.30729 13.684 6.30729 14C6.30729 14.316 6.42274 14.5894 6.65365 14.8203L14.9297 23.0964C15.1606 23.3273 15.434 23.4427 15.75 23.4427C16.066 23.4427 16.3394 23.3273 16.5703 23.0964ZM28 14C28 16.5399 27.3741 18.8824 26.1224 21.0273C24.8707 23.1723 23.1723 24.8707 21.0273 26.1224C18.8824 27.3741 16.5399 28 14 28C11.4601 28 9.11762 27.3741 6.97266 26.1224C4.82769 24.8707 3.12934 23.1723 1.8776 21.0273C0.625868 18.8824 0 16.5399 0 14C0 11.4601 0.625868 9.11762 1.8776 6.97266C3.12934 4.82769 4.82769 3.12934 6.97266 1.8776C9.11762 0.625868 11.4601 0 14 0C16.5399 0 18.8824 0.625868 21.0273 1.8776C23.1723 3.12934 24.8707 4.82769 26.1224 6.97266C27.3741 9.11762 28 11.4601 28 14Z" fill="#3B3B3B"/>
                    </svg>
                </div>
        
            </div>
        </section>  
    `

    const searchPopupRenderParent = document.getElementById("popupRenderParent");
    searchPopupRenderParent.innerHTML = searchSlider;

    var swiper3 = new Swiper(".popup-swiper", {
        slidesPerView: 'auto',
        spaceBetween: 25,
        freeMode: true,
        navigation: {
            nextEl: ".popup-swiper-button-next",
            prevEl: ".popup-swiper-button-prev",
        },
    });
}

// ------------------ Cart Functionality -----------------------


function getFavs() {
    console.log("getting favs: ", JSON.parse( localStorage.getItem("favs") ))
    return JSON.parse( localStorage.getItem("favs") ) || [];
}

async function renderCart() {

    const favs = getFavs();
    let favProductSlides = "";
    for(const elem of favs) {
        const res4 = await fetch(`https://dummyjson.com/products/${elem}`);
        const product = await res4.json();
        favProductSlides += `
        <div data-product-id="${product.id}" class="swiper-slide-two swiper-slide">
          <div class="product-image" style="background-image:url(${product.thumbnail.replaceAll("'", "%27")})"></div>
          <div class="product-details">
            <div class="price-heart">
              <span id="price">$${product.price}</span>
              <i class="fas fa-heart red-heart"></i>
            </div>
            <span id="seller">${product.title}</span>
          </div>
        </div>
        `
    }
    let favSlider = `
        <div class="flex justify-between !pr-2">
            <h2 class='heading-product-slider !text-xl' id='category-name'>${favs.length} Favourite(s)</h2>
            <i class="fas fa-times-circle text-2xl hover:cursor-pointer"></i>
        </div>
        <section class="slidey !h-[33vh]">
            <div class="popup-swiper swiper !w-[100%] !h-[100%] !overflow-visible translate-y-[-2vh]">
              <div class="swiper-wrapper swiper-wrapper-two">
                ${favProductSlides}
              </div>
        
                <div class="swiper-button-next product-swiper-button-next popup-swiper-button-next">
                    <svg id="next-svg" viewBox="0 0 38 38" fill="none">
                        <path d="M15.5117 6.65495L12.9883 9.17838C12.6749 9.49175 12.5182 9.86285 12.5182 10.2917C12.5182 10.7205 12.6749 11.0916 12.9883 11.4049L20.5833 19L12.9883 26.5951C12.6749 26.9084 12.5182 27.2795 12.5182 27.7083C12.5182 28.1372 12.6749 28.5082 12.9883 28.8216L15.5117 31.3451C15.8251 31.6584 16.1962 31.8151 16.625 31.8151C17.0538 31.8151 17.4249 31.6584 17.7383 31.3451L28.9701 20.1133C29.2834 19.7999 29.4401 19.4288 29.4401 19C29.4401 18.5712 29.2834 18.2001 28.9701 17.8867L17.7383 6.65495C17.4249 6.34158 17.0538 6.1849 16.625 6.1849C16.1962 6.1849 15.8251 6.34158 15.5117 6.65495ZM-9.53674e-07 19C-9.53674e-07 15.553 0.849391 12.3739 2.54818 9.46289C4.24696 6.55187 6.55187 4.24696 9.46289 2.54818C12.3739 0.849391 15.553 -9.53674e-07 19 -9.53674e-07C22.447 -9.53674e-07 25.6261 0.849391 28.5371 2.54818C31.4481 4.24696 33.753 6.55187 35.4518 9.46289C37.1506 12.3739 38 15.553 38 19C38 22.447 37.1506 25.6261 35.4518 28.5371C33.753 31.4481 31.4481 33.753 28.5371 35.4518C25.6261 37.1506 22.447 38 19 38C15.553 38 12.3739 37.1506 9.46289 35.4518C6.55187 33.753 4.24696 31.4481 2.54818 28.5371C0.849391 25.6261 -9.53674e-07 22.447 -9.53674e-07 19Z" fill="#3B3B3B"/>
                    </svg>
                </div>
        
                <div class="swiper-button-prev product-swiper-button-prev popup-swiper-button-prev">
                    <svg id="prev-svg" viewBox="0 0 28 28" fill="none">
                        <path d="M16.5703 23.0964L18.4297 21.237C18.6606 21.0061 18.776 20.7326 18.776 20.4167C18.776 20.1007 18.6606 19.8273 18.4297 19.5964L12.8333 14L18.4297 8.40365C18.6606 8.17274 18.776 7.89931 18.776 7.58333C18.776 7.26736 18.6606 6.99392 18.4297 6.76302L16.5703 4.90365C16.3394 4.67274 16.066 4.55729 15.75 4.55729C15.434 4.55729 15.1606 4.67274 14.9297 4.90365L6.65365 13.1797C6.42274 13.4106 6.30729 13.684 6.30729 14C6.30729 14.316 6.42274 14.5894 6.65365 14.8203L14.9297 23.0964C15.1606 23.3273 15.434 23.4427 15.75 23.4427C16.066 23.4427 16.3394 23.3273 16.5703 23.0964ZM28 14C28 16.5399 27.3741 18.8824 26.1224 21.0273C24.8707 23.1723 23.1723 24.8707 21.0273 26.1224C18.8824 27.3741 16.5399 28 14 28C11.4601 28 9.11762 27.3741 6.97266 26.1224C4.82769 24.8707 3.12934 23.1723 1.8776 21.0273C0.625868 18.8824 0 16.5399 0 14C0 11.4601 0.625868 9.11762 1.8776 6.97266C3.12934 4.82769 4.82769 3.12934 6.97266 1.8776C9.11762 0.625868 11.4601 0 14 0C16.5399 0 18.8824 0.625868 21.0273 1.8776C23.1723 3.12934 24.8707 4.82769 26.1224 6.97266C27.3741 9.11762 28 11.4601 28 14Z" fill="#3B3B3B"/>
                    </svg>
                </div>
        
            </div>
        </section>  
    `
    const favPopupRenderParent = document.getElementById("popupRenderParent");
    favPopupRenderParent.innerHTML = favSlider;

    var swiper3 = new Swiper(".popup-swiper", {
        slidesPerView: 'auto',
        spaceBetween: 25,
        freeMode: true,
        navigation: {
            nextEl: ".popup-swiper-button-next",
            prevEl: ".popup-swiper-button-prev",
        },
    });
}