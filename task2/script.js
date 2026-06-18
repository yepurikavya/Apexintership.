document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const msgArea = document.getElementById('userMessage');
    const countDisplay = document.getElementById('currentCount');

    msgArea.addEventListener('input', () => {
        const length = msgArea.value.length;
        countDisplay.textContent = length;
        if (length > 250) {
            countDisplay.style.color = 'red';
        } else {
            countDisplay.style.color = '#94a3b8';
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameVal = document.getElementById('userName').value.trim();
        const emailVal = document.getElementById('userEmail').value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        let isValid = true;

        if (nameVal === "") {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('nameError').style.display = 'none';
        }

        if (!emailPattern.test(emailVal)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('emailError').style.display = 'none';
        }

        if (isValid) {
            alert("Form processed successfully! Our team will contact you soon.");
            contactForm.reset();
            countDisplay.textContent = "0";
        }
    });

    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('mainTaskList');
    const totalCount = document.getElementById('totalTasks');
    const clearBtn = document.getElementById('clearBtn');

    let count = 0;

    function createNewTask() {
        const val = taskInput.value.trim();
        if (val === "") return;

        count++;
        totalCount.textContent = count;

        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `
            <span>${val}</span>
            <div class="item-btns">
                <button class="done-btn" title="Complete">✔</button>
                <button class="del-btn" title="Delete">✖</button>
            </div>
        `;

        li.querySelector('.done-btn').addEventListener('click', () => {
            li.classList.toggle('done');
        });

        li.querySelector('.del-btn').addEventListener('click', () => {
            li.remove();
            count--;
            totalCount.textContent = count;
        });

        taskList.appendChild(li);
        taskInput.value = "";
        taskInput.focus();
    }
    addTaskBtn.addEventListener('click', createNewTask);

    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') createNewTask();
    });

    
    clearBtn.addEventListener('click', () => {
        const completedItems = document.querySelectorAll('.list-item.done');
        completedItems.forEach(item => {
            item.remove();
            count--;
        });
        totalCount.textContent = count;
    });
});