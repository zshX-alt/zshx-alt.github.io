/**
 * NIHONGO PRO - LOGIC ENGINE
 * Sistem otomatis render konten 50 Bab Minna no Nihongo
 */

// 1. Ambil ID Bab dari URL (Contoh: template.html?bab=1)
const params = new URLSearchParams(window.location.search);
const babId = parseInt(params.get('bab')) || 1;

// 2. Update Progress Bar di bagian atas
const progressBar = document.getElementById('progress');
if (progressBar) {
    progressBar.style.width = `${(babId / 50) * 100}%`;
}

// 3. Load Data Bab secara Dinamis dari folder /data
import(`./data/bab${babId}.js`)
    .then(module => {
        const data = module.default;
        renderContent(data);
        setupNavigation();
    })
    .catch(err => {
        console.error("Gagal memuat data bab:", err);
        document.getElementById('title').innerText = "Segera Hadir!";
        document.getElementById('desc').innerText = "Sabar ya Bos, konten bab ini lagi diproses sama admin.";
    });

// 4. Fungsi Utama nempelin data ke HTML
function renderContent(data) {
    // Update Judul di Tab Browser dan Header
    document.title = `${data.title} - Nihongo Pro`;
    document.getElementById('title').innerText = data.title;
    document.getElementById('desc').innerText = data.description;

    let html = `<h2>Tata Bahasa (文法)</h2>`;

    // Loop setiap pola kalimat (Bunpou)
    data.bunpou.forEach(item => {
        html += `
            <div class="card">
                <h3 style="color:var(--accent); margin:0 0 10px 0;">${item.pola}</h3>
                <p style="font-size:0.95rem; line-height:1.5; margin-bottom:15px;">${item.penjelasan}</p>
                
                <div class="example-box">
                    <p style="margin:0; font-size:1.2rem; letter-spacing:1px; line-height:1.8;">${item.jp}</p>
                    
                    <p style="margin:8px 0; color:var(--accent); font-size:0.9rem; font-family:monospace; font-weight:bold;">
                        ${item.ro}
                    </p>
                    
                    <p style="margin:0; color:var(--text-dim); font-size:0.85rem; font-style:italic;">
                        "${item.id}"
                    </p>
                </div>
            </div>`;
    });

    // 5. Tambahin Bagian Tips Pro (Kalau ada di file data)
    if (data.tips) {
        html += `
            <div class="card" style="border-left: 4px solid #ffca28; background: rgba(255, 202, 40, 0.05); margin-top: 30px;">
                <h3 style="color:#ffca28; margin:0 0 8px 0; display:flex; align-items:center; gap:8px;">
                    <span>💡</span> Tips Pro:
                </h3>
                <p style="font-size:0.92rem; margin:0; line-height:1.5; color:#e0e0e0;">${data.tips}</p>
            </div>`;
    }

    document.getElementById('content').innerHTML = html;
}

// 6. Fungsi Tombol Next & Prev
function setupNavigation() {
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');

    // Tombol Next: Kalau bab 50, balik ke menu
    if (babId < 50) {
        nextBtn.onclick = () => window.location.href = `template.html?bab=${babId + 1}`;
    } else {
        nextBtn.innerText = "🎉 Tamat! Ke Menu Utama";
        nextBtn.onclick = () => window.location.href = 'index.html';
    }

    // Tombol Prev: Muncul cuma kalau bab > 1
    if (babId > 1) {
        if (prevBtn) {
            prevBtn.style.display = "block";
            prevBtn.onclick = () => window.location.href = `template.html?bab=${babId - 1}`;
        }
    }
}
