// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mesajınız gönderildi!');
    contactForm.reset();
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Sensör verileri için grafik oluşturma
const createChart = (canvasId, label, color) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: label,
                data: [],
                borderColor: color,
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 0
            }
        }
    });
};

// Grafikleri oluştur
const temperatureChart = createChart('temperatureChart', 'Sıcaklık (°C)', '#FF6B6B');
const tdsChart = createChart('tdsChart', 'TDS (ppm)', '#4ECDC4');
const turbidityChart = createChart('turbidityChart', 'Bulanıklık (NTU)', '#45B7D1');
const conductivityChart = createChart('conductivityChart', 'İletkenlik (µS/cm)', '#96CEB4');

// Sensör verilerini güncelleme fonksiyonu
function updateSensorData() {
    // Simüle edilmiş sensör verileri (gerçek verilerle değiştirilecek)
    const now = new Date();
    const time = now.toLocaleTimeString();
    
    // Rastgele değerler üret (gerçek sensör verileriyle değiştirilecek)
    const temperature = (20 + Math.random() * 5).toFixed(1);
    const tds = Math.floor(500 + Math.random() * 200);
    const turbidity = (2 + Math.random() * 3).toFixed(1);
    const conductivity = Math.floor(1000 + Math.random() * 500);

    // Değerleri güncelle
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('tds').textContent = `${tds} ppm`;
    document.getElementById('turbidity').textContent = `${turbidity} NTU`;
    document.getElementById('conductivity').textContent = `${conductivity} µS/cm`;
    document.getElementById('lastUpdate').textContent = time;
    document.getElementById('location').textContent = 'Ana Ölçüm Noktası';

    // Grafikleri güncelle
    updateChart(temperatureChart, temperature);
    updateChart(tdsChart, tds);
    updateChart(turbidityChart, turbidity);
    updateChart(conductivityChart, conductivity);
}

// Grafik güncelleme fonksiyonu
function updateChart(chart, value) {
    const now = new Date();
    const time = now.toLocaleTimeString();
    
    chart.data.labels.push(time);
    chart.data.datasets[0].data.push(value);
    
    // Son 10 veriyi göster
    if (chart.data.labels.length > 10) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    
    chart.update();
}

// Her 5 saniyede bir verileri güncelle
setInterval(updateSensorData, 5000);

// Sayfa yüklendiğinde ilk verileri göster
updateSensorData();