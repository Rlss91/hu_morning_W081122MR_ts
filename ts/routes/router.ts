import PAGES from "../models/pageModel.js";

/* Out pages */
const HOMEPAGELINK = document.getElementById(PAGES.HOME) as HTMLDivElement;
const ABOUTUSPAGELINK = document.getElementById(PAGES.ABOUT) as HTMLDivElement;
const CONTACTUSPAGELINK = document.getElementById(
  PAGES.CONTACT
) as HTMLDivElement;
const LOGINTUSPAGELINK = document.getElementById(PAGES.LOGIN) as HTMLDivElement;
const REGISTERUSPAGELINK = document.getElementById(
  PAGES.REGISTER
) as HTMLDivElement;
const PROFILEPAGELINK = document.getElementById(
  PAGES.PROFILE
) as HTMLDivElement;
const PAGE404PAGELINK = document.getElementById(
  PAGES.PAGE404
) as HTMLDivElement;

function handlePageChange(pageToDisplay: string): void {
  /* hide all pages */
  HOMEPAGELINK.classList.remove("d-block");
  ABOUTUSPAGELINK.classList.remove("d-block");
  CONTACTUSPAGELINK.classList.remove("d-block");
  LOGINTUSPAGELINK.classList.remove("d-block");
  REGISTERUSPAGELINK.classList.remove("d-block");
  PROFILEPAGELINK.classList.remove("d-block");
  PAGE404PAGELINK.classList.remove("d-block");
  HOMEPAGELINK.classList.add("d-none");
  ABOUTUSPAGELINK.classList.add("d-none");
  CONTACTUSPAGELINK.classList.add("d-none");
  LOGINTUSPAGELINK.classList.add("d-none");
  REGISTERUSPAGELINK.classList.add("d-none");
  PROFILEPAGELINK.classList.add("d-none");
  PAGE404PAGELINK.classList.add("d-none");

  switch (pageToDisplay) {
    case PAGES.HOME:
      HOMEPAGELINK.classList.remove("d-none");
      HOMEPAGELINK.classList.add("d-block");
      break;
    case PAGES.ABOUT:
      ABOUTUSPAGELINK.classList.remove("d-none");
      ABOUTUSPAGELINK.classList.add("d-block");
      break;
    case PAGES.CONTACT:
      CONTACTUSPAGELINK.classList.remove("d-none");
      CONTACTUSPAGELINK.classList.add("d-block");
      break;
    case PAGES.LOGIN:
      LOGINTUSPAGELINK.classList.remove("d-none");
      LOGINTUSPAGELINK.classList.add("d-block");
      break;
    case PAGES.REGISTER:
      REGISTERUSPAGELINK.classList.remove("d-none");
      REGISTERUSPAGELINK.classList.add("d-block");
      break;
    case PAGES.PROFILE:
      PROFILEPAGELINK.classList.remove("d-none");
      PROFILEPAGELINK.classList.add("d-block");
      break;
    default:
      PAGE404PAGELINK.classList.remove("d-none");
      PAGE404PAGELINK.classList.add("d-block");
      break;
  }
}

function anotherFunction(): void {}

export { handlePageChange, anotherFunction };
