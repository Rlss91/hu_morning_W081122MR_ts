const toast = document.getElementById("toast") as HTMLElement;
let id = 1;
const showToast = (msg: string, success = true): void => {
  let thisId = id++;
  toast.innerHTML += `<div id="toastMsg-${thisId}" class="${
    success ? "success" : "error"
  }">${msg}
  <div class="toast-timer"></div>
  </div>`;
  setTimeout((): void => {
    let elm = document.getElementById(`toastMsg-${thisId}`) as HTMLElement;
    if (!elm) {
      (elm as HTMLElement).remove();
    }
    // (document.getElementById(`toastMsg-${thisId}`) as HTMLElement).remove();
  }, 3000);
};

export default showToast;
