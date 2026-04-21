// Auth Config
const LOGIN_USER = "sami";
const LOGIN_PASS = "12345";

// 1. LOGIN LOGIC
function handleLogin() {
    const u = document.getElementById('userInput').value;
    const p = document.getElementById('passInput').value;
    const error = document.getElementById('error-txt');

    if (u === LOGIN_USER && p === LOGIN_PASS) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard-main').style.display = 'block';
        initApp(); // Start dynamic components
    } else {
        error.style.display = 'block';
    }
}

function logout() {
    location.reload();
}

// 2. NAVIGATION
function showPage(pageId) {
    document.querySelectorAll('.content-page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    // Sidebar active state logic
    const mapping = {'page-dash': 'nav-dash', 'page-cal': 'nav-cal', 'page-courses': 'nav-courses', 'page-notif': 'nav-notif'};
    document.getElementById(mapping[pageId]).classList.add('active');
}

// 3. LANGUAGE SWITCHER
const translations = {
    en: { dash: "Dashboard", cal: "Calendar", courses: "Courses", notif: "Notifications", empty: "No new notifications found." },
    bn: { dash: "ড্যাশবোর্ড", cal: "ক্যালেন্ডার", courses: "কোর্সসমূহ", notif: "নোটিফিকেশন", empty: "কোনো নতুন নোটিফিকেশন নেই।" }
};

function changeLanguage() {
    const l = document.getElementById('langSelector').value;
    const t = translations[l];

    document.getElementById('nav-dash').innerHTML = `<i class="fas fa-chart-pie"></i> ${t.dash}`;
    document.getElementById('nav-cal').innerHTML = `<i class="fas fa-calendar-days"></i> ${t.cal}`;
    document.getElementById('nav-courses').innerHTML = `<i class="fas fa-graduation-cap"></i> ${t.courses}`;
    document.getElementById('nav-notif').innerHTML = `<i class="fas fa-bell"></i> ${t.notif}`;

    document.getElementById('txt-dash-head').innerText = t.dash + " Overview";
    document.getElementById('txt-cal-head').innerText = "Schedule " + t.cal;
    document.getElementById('txt-empty').innerText = t.empty;
}

// 4. INIT APP COMPONENTS
function initApp() {
    // Generate Calendar
    const grid = document.getElementById('calendarBody');
    const headers = ['S','M','T','W','T','F','S'];
    headers.forEach(h => grid.innerHTML += `<div class="cal-cell cal-head">${h}</div>`);
    for(let i=1; i<=30; i++) {
        let todayClass = (i === 2) ? "today" : ""; // Assuming April 2nd is today as per image
        grid.innerHTML += `<div class="cal-cell ${todayClass}">${i}</div>`;
    }

    // Load Charts
    const opts = { responsive: true, plugins: { legend: { position: 'bottom' } } };
    new Chart(document.getElementById('passChart'), {
        type: 'doughnut',
        data: { labels: ['Pass', 'Fail'], datasets: [{ data: [85, 15], backgroundColor: ['#22c55e', '#f1f5f9'] }] },
        options: opts
    });
    new Chart(document.getElementById('levelChart'), {
        type: 'pie',
        data: { labels: ['Beg', 'Int', 'Adv'], datasets: [{ data: [4, 3, 2], backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444'] }] },
        options: opts
    });
    new Chart(document.getElementById('perfChart'), {
        type: 'bar',
        data: { labels: ['W1', 'W2', 'W3', 'W4'], datasets: [{ label: 'Performance', data: [70, 82, 80, 95], backgroundColor: '#6366f1' }] },
        options: opts
    });
}
