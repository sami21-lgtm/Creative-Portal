// Translation Dictionary
const langData = {
    en: { dash: "Dashboard", cal: "Calendar", course: "Courses", leader: "Leaderboard", notif: "Notifications", empty: "No notifications found" },
    bn: { dash: "ড্যাশবোর্ড", cal: "ক্যালেন্ডার", course: "কোর্সসমূহ", leader: "লিডারবোর্ড", notif: "নোটিফিকেশন", empty: "কোনো নতুন তথ্য নেই" },
    ar: { dash: "لوحة القيادة", cal: "التقويم", course: "الدورات", leader: "لوحة المتصدرين", notif: "إشعارات", empty: "لم يتم العثور على إخطارات" }
};

// 1. Navigation Controller
function navigate(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    document.getElementById('nav-' + id).classList.add('active');
}

// 2. Language Switcher
function changeLanguage() {
    const lang = document.getElementById('langSelector').value;
    const t = langData[lang];

    const navItems = ['dashboard', 'calendar', 'courses', 'leaderboard', 'notifications'];
    navItems.forEach(item => {
        document.querySelector(`#nav-${item} .nav-text`).innerText = t[item];
    });

    document.getElementById('txt-dash').innerText = t.dash + " Overview";
    document.getElementById('txt-cal').innerText = "Student Schedule " + t.cal;
    document.getElementById('txt-empty').innerText = t.empty;
}

// 3. Calendar Grid Builder
function loadCalendar() {
    const grid = document.getElementById('calGrid');
    const headers = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    headers.forEach(h => {
        let el = document.createElement('div');
        el.className = 'cal-cell cal-head';
        el.innerText = h;
        grid.appendChild(el);
    });

    for(let i=1; i<=30; i++) {
        let el = document.createElement('div');
        el.className = 'cal-cell';
        el.innerText = i;
        if(i === 2) el.classList.add('today'); // Highlighting April 2
        grid.appendChild(el);
    }
}

// 4. Chart Logic
function initCharts() {
    const options = { responsive: true, plugins: { legend: { position: 'bottom' } } };

    new Chart(document.getElementById('passChart'), {
        type: 'doughnut',
        data: { labels: ['Pass', 'Fail'], datasets: [{ data: [85, 15], backgroundColor: ['#22c55e', '#f1f5f9'] }] },
        options: options
    });

    new Chart(document.getElementById('diffChart'), {
        type: 'pie',
        data: { labels: ['Beg.', 'Int.', 'Adv.'], datasets: [{ data: [4, 3, 2], backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444'] }] },
        options: options
    });

    new Chart(document.getElementById('perfChart'), {
        type: 'bar',
        data: { labels: ['W1', 'W2', 'W3', 'W4'], datasets: [{ label: 'Performance', data: [70, 85, 80, 95], backgroundColor: '#6366f1' }] }
    });
}

// Initialization on Load
window.onload = () => {
    loadCalendar();
    initCharts();
};
