import Property from "../models/Property.js";
import getNextId from "../utils/getNextId.js";

let selectedProperty: Property, editProperty: Function;
const editPropertiesPopupImgDisplay = document.getElementById(
  "editPropertiesPopupImgDisplay"
) as HTMLImageElement;
const editPropertiesPopupName = document.getElementById(
  "editPropertiesPopupName"
) as HTMLInputElement;
const editPropertiesPopupDescription = document.getElementById(
  "editPropertiesPopupDescription"
) as HTMLInputElement;
const editPropertiesPopupPrice = document.getElementById(
  "editPropertiesPopupPrice"
) as HTMLInputElement;
const editPropertiesPopupImg = document.getElementById(
  "editPropertiesPopupImg"
) as HTMLInputElement;
const editPropertiesPopup = document.getElementById(
  "editPropertiesPopup"
) as HTMLDivElement;

const initPopup = (
  selectedPropertyFromHomePage: Property,
  editPropertyFromHomePage: Function
): void => {
  /*
    set data from selectedProperty to html
    */
  if (selectedPropertyFromHomePage) {
    selectedProperty = selectedPropertyFromHomePage;
  } else {
    selectedProperty = new Property(getNextId(), "", 0, "", "");
  }
  if (
    !editPropertiesPopupImgDisplay ||
    !editPropertiesPopupName ||
    !editPropertiesPopupDescription ||
    !editPropertiesPopupPrice ||
    !editPropertiesPopupImg
  ) {
    return;
  }
  editProperty = editPropertyFromHomePage;
  editPropertiesPopupImgDisplay.src = selectedProperty.imgUrl;
  editPropertiesPopupName.value = selectedProperty.name;
  editPropertiesPopupDescription.value = selectedProperty.description;
  editPropertiesPopupPrice.value = selectedProperty.price + "";
  editPropertiesPopupImg.value = selectedProperty.imgUrl;
  showPopup();
};

const showPopup = (): void => {
  editPropertiesPopup.classList.remove("d-none");
};

const hidePopup = (): void => {
  editPropertiesPopup.classList.add("d-none");
};

window.addEventListener("load", (): void => {
  editPropertiesPopup.addEventListener("click", (ev): void => {
    if (!ev.target) {
      return;
    }
    let elm = ev.target as HTMLElement;
    if (
      elm.id !== "editPropertiesPopup" &&
      elm.id !== "editPropertiesPopupCancelBtn" &&
      elm.id !== "editPropertiesPopupCancelBtnIcon"
    ) {
      return;
    }
    hidePopup();
  });
  let editPropertiesPopupSaveBtn = document.getElementById(
    "editPropertiesPopupSaveBtn"
  );
  if (!editPropertiesPopupSaveBtn) {
    return;
  }
  editPropertiesPopupSaveBtn.addEventListener("click", (): void => {
    selectedProperty.name = editPropertiesPopupName.value;
    selectedProperty.description = editPropertiesPopupDescription.value;
    selectedProperty.price = +editPropertiesPopupPrice.value;
    selectedProperty.imgUrl = editPropertiesPopupImg.value;
    editProperty(selectedProperty);
    hidePopup();
  });
  editPropertiesPopupImg.addEventListener("input", (): void => {
    editPropertiesPopupImgDisplay.src = editPropertiesPopupImg.value;
  });
});

export { initPopup, showPopup, hidePopup };
