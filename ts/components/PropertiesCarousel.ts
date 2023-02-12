import Property from "../models/Property.js";

let propertiesArr: Property[];
let carouselDiv: HTMLElement | null;
let showIdx: number; //index(array) of the image that we display now
let animationStarted: number;
//this function will transfer data from homepage to this page
const initialPropertiesCarousel = (
  propertiesArrFromHomePage: Property[]
): void => {
  carouselDiv = document.getElementById("home-page-properties-carousel");
  initializeBtns();
  updatePropertiesCarousel(propertiesArrFromHomePage);
};

const updatePropertiesCarousel = (
  propertiesArrFromHomePage: Property[]
): void => {
  /*
    this function will get data from homepage and create new carousel.
    if the carousel already exists it will remove the old one and
    create new one
  */
  showIdx = 0;
  animationStarted = 0;
  propertiesArr = propertiesArrFromHomePage;
  createCarousel();
};

const initializeBtns = (): void => {
  let backCaruselBtn = document.getElementById("back-carusel-btn");
  if (!backCaruselBtn) {
    return;
  }
  backCaruselBtn.addEventListener("click", (): void => {
    if (animationStarted !== 0) {
      return;
    }
    animationStarted = 2;
    let prevIdx = showIdx - 1;
    if (prevIdx < 0) {
      prevIdx = propertiesArr.length - 1; //last image
    }
    let imgToHide = document.querySelector(
      `.img-container > img:nth-child(${showIdx + 1})`
    );
    if (!imgToHide) {
      return;
    }
    imgToHide.classList.add("fade-out");
    const hideImgAnim = (): void => {
      if (!imgToHide) {
        return;
      }
      imgToHide.removeEventListener("animationend", hideImgAnim); //remove event after executed
      imgToHide.classList.add("opacity-0");
      imgToHide.classList.remove("fade-out");
      animationStarted--;
    };
    imgToHide.addEventListener("animationend", hideImgAnim);
    let imgToShow = document.querySelector(
      `.img-container > img:nth-child(${prevIdx + 1})`
    );
    if (!imgToShow) {
      return;
    }
    imgToShow.classList.remove("opacity-0");
    imgToShow.classList.add("fade-in");
    imgToShow.addEventListener(
      "animationend",
      (): void => {
        if (!imgToShow) {
          return;
        }
        // imgToShow.classList.remove("opacity-0");
        imgToShow.classList.remove("fade-in");
        animationStarted--;
      },
      { once: true }
    );
    // showIdx++;
    // if (showIdx >= propertiesArr.length) {
    //   showIdx = 0;
    // }
    showIdx = prevIdx;
  });
  let nextCaruselBtn = document.getElementById("next-carusel-btn");
  if (!nextCaruselBtn) {
    return;
  }
  nextCaruselBtn.addEventListener("click", (): void => {
    if (animationStarted !== 0) {
      return;
    }
    animationStarted = 2;
    let nextIdx = showIdx + 1;
    //showIdx = index of image to hide
    //nextIdx = index of image to display
    if (nextIdx >= propertiesArr.length) {
      nextIdx = 0;
    }
    let imgToHide = document.querySelector(
      `.img-container > img:nth-child(${showIdx + 1})`
    );
    if (!imgToHide) {
      return;
    }
    imgToHide.classList.add("fade-out");
    const hideImgAnim = (): void => {
      if (!imgToHide) {
        return;
      }
      imgToHide.removeEventListener("animationend", hideImgAnim); //remove event after executed
      imgToHide.classList.add("opacity-0");
      imgToHide.classList.remove("fade-out");
      animationStarted--;
    };
    imgToHide.addEventListener("animationend", hideImgAnim);
    let imgToShow = document.querySelector(
      `.img-container > img:nth-child(${nextIdx + 1})`
    );
    if (!imgToShow) return;
    imgToShow.classList.remove("opacity-0");
    imgToShow.classList.add("fade-in");
    imgToShow.addEventListener(
      "animationend",
      (): void => {
        if (!imgToShow) return;
        // imgToShow.classList.remove("opacity-0");
        imgToShow.classList.remove("fade-in");
        animationStarted--;
      },
      { once: true }
    );
    // showIdx++;
    // if (showIdx >= propertiesArr.length) {
    //   showIdx = 0;
    // }
    showIdx = nextIdx;
  });
};

const createItem = (name: string, img: string): string => {
  //opacity-0 hide image
  return `
      <img src="${img}" alt="${name}" class="opacity-0" />
  `;
};

const createCarousel = (): void => {
  let innerStr = "";
  if (!carouselDiv) return;
  for (let property of propertiesArr) {
    innerStr += createItem(property.name, property.imgUrl);
  }
  carouselDiv.innerHTML = innerStr;
  //show the first img
  let imgContainer1 = document.querySelector(
    ".img-container > img:nth-child(1)"
  );
  if (!imgContainer1) {
    return;
  }
  imgContainer1.classList.remove("opacity-0");
};

export { initialPropertiesCarousel, updatePropertiesCarousel };
