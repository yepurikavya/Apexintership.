document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.view-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const recipeName = button.parentElement.querySelector('h3').innerText;
            alert(`Opening ingredients for: ${recipeName}. Happy Cooking!`);
        });
    });
});