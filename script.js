// Login Logic
function handleLogin() {
    const user = document.getElementById('userInput').value;
    const pass = document.getElementById('passInput').value;
    if(user === "sami" && pass === "12345") {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('app-wrapper').style.display = 'block';
        initDashboard();
    } else {
        document.getElementById('err').style.display = 'block';
    }
}

// Navigation Function
function navigate(pageId, element) {
    // Toggle active class in sidebar
    document.querySelectorAll('.nav-menu li').forEach(li => li.classList.remove('active'));
    element.classList.add('active');

    // Show selected page
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');

    // Update Header Title
    document.getElementById('page-title').innerText = pageId.charAt(0).toUpperCase() + pageId.slice(1);
}

// Dynamic Calendar and Charts
function initDashboard() {
    // 1. Calendar Logic
    const grid = document.getElementById('calGrid');
    grid.innerHTML = "";
    const now = new Date();
    const currentDay = now.getDate();
    
    ['S','M','T','W','T','F','S'].forEach(h => grid.innerHTML += `<div class="cal-cell" style="font-weight:bold">${h}</div>`);
    for(let i=1; i<=30; i++) {
        let isToday = (i === currentDay) ? "today" : "";
        grid.innerHTML += `<div class="cal-cell ${isToday}">${i}</div>`;
    }

    // 2. Charts
    new Chart(document.getElementById('chart1'), {
        type: 'doughnut',
        data: { labels: ['Complete', 'Pending'], datasets: [{ data: [75, 25], backgroundColor: ['#1e4db7', '#e2e8f0'] }] }
    });
    new Chart(document.getElementById('chart2'), {
        type: 'bar',
        data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], datasets: [{ label: 'Users', data: [12, 19, 3, 5, 2], backgroundColor: '#1e4db7' }] }
    });
}

function logout() { location.reload(); }
