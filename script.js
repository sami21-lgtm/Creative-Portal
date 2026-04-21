// Translation Data
const langData = {
    en: { dashboard: "Dashboard", calendar: "Calendar", courses: "Courses", leaderboard: "Leaderboard", notifications: "Notifications", empty: "No notifications found" },
    bn: { dashboard: "ড্যাশবোর্ড", calendar: "ক্যালেন্ডার", courses: "কোর্সসমূহ", leaderboard: "লিডারবোর্ড", notifications: "নোটিফিকেশন", empty: "কোনো তথ্য পাওয়া যায়নি" },
    ar: { dashboard: "لوحة القيادة", calendar: "التقويم", courses: "الدورات", leaderboard: "لوحة المتصدرين", notifications: "إشعارات", empty: "لم يتم العثور على إخطارات" }
};

// Navigate between pages
function navigate(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    document.getElementById('nav-' + id).classList.add('active');
}

// Change Language Logic
function changeLanguage() {
    const lang = document.getElementById('langSelector').value;
    
    document.getElementById('nav-dashboard').innerText = langData[lang].dashboard;
    document.getElementById('nav-calendar').innerText = langData[lang].calendar;
    document.getElementById('nav-courses').innerText = langData[lang].courses;
    document.getElementById('nav-leaderboard').innerText = langData[lang].leaderboard;
    document.getElementById('nav-notifications').innerText = langData[lang].notifications;

    document.getElementById('title-dashboard').innerText = langData[lang].dashboard;
    document.getElementById('empty-msg').innerText = langData[lang].empty;
}

// Init Charts
function loadCharts() {
    new Chart(document.getElementById('passChart'), {
        type: 'doughnut',
        data: { labels: ['Pass', 'Fail'], datasets: [{ data: [85, 15], backgroundColor: ['#22c55e', '#f1f5f9'] }] }
    });
    new Chart(document.getElementById('pieChart'), {
        type: 'pie',
        data: { labels: ['Beg.', 'Int.', 'Adv.'], datasets: [{ data: [5, 3, 2], backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444'] }] }
    });
    new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: { labels: ['W1', 'W2', 'W3', 'W4'], datasets: [{ label: 'Performance', data: [65, 80, 85, 90], backgroundColor: '#6366f1' }] }
    });
}

// Init Calendar
function loadCalendar() {
    const grid = document.getElementById('calGrid');
    const heads = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    heads.forEach(h => {
        let div = document.createElement('div');
        div.className = 'cal-cell cal-head';
        div.innerText = h;
        grid.appendChild(div);
    });
    for(let i=1; i<=30; i++) {
        let div = document.createElement('div');
        div.className = 'cal-cell';
        div.innerText = i;
        if(i === 2) div.style.background = '#eff6ff';
        grid.appendChild(div);
    }
}

window.onload = () => {
    loadCharts();
    loadCalendar();
};
