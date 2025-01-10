
const btn: HTMLButtonElement = document.getElementById("nav-btn-function") as HTMLButtonElement;
btn?.addEventListener("click", () => {  
    let x: HTMLDivElement = document.getElementById("navLinks") as HTMLDivElement;
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  })