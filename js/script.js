
const equation = document.querySelector(".equation");
const result = document.querySelector(".result");

function insertToken(token) {
    result.textContent += token;
}

document.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if(button === null) return;
    if(button.closest(".buttons-ui") !== null){
        return insertToken(button.textContent);
    }
});