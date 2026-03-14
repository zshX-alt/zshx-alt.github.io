/**
 * NIHONGO PRO - LOGIC ENGINE
 * Optimasi: Romaji Gray Mode & Responsive Navigation
 */

// 1. Ambil ID Bab dari URL
const params = new URLSearchParams(window.location.search);
const babId = parseInt(params.get('bab')) || 1;

// 2. Update Progress Bar
const progressBar = document.getElementById('progress');
if (progressBar) {
    progressBar.style.width = `${(babId / 50) * 100}%`;
}

// 3. Load Data Bab secara Dinamis
import(`./data/bab${babId}.js`)
    .then(module => {
        const data = module.default;
        renderContent(data);
        setupNavigation();
    })
    .catch(err => {
        console.error("Gagal memuat data bab:", err);
        document.getElementById('title').innerText = "Konten Belum Tersedia";
        document.getElementById('desc').innerText = "Sabar ya Bos, Bab ini masih dalam proses penyusunan.";
    });

// 4. Fungsi Utama Render
function renderContent(data) {
    document.title = `${data.title} - Belajar Bahasa Jepang`;
    document.getElementById('title').innerText = data.title;
    document.getElementById('desc').innerText = data.description;

    let html = `<h2>Tata Bahasa (文法)</h2>`;

    data.bunpou.forEach(item => {
        html += `
            <div class="card">
                <h3 style="color:var(--accent); margin:0 0 10px 0;">${item.pola}</h3>
                <p style="font-size:0.95rem; line-height:1.6; margin-bottom:15px;">${item.penjelasan}</p>
                
                <div class="example-box" style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 15px;">
                    <p style="margin:0; font-size:1.25rem; letter-spacing:1px; line-height:1.8;">${item.jp}</p>
                    
                    <p style="margin:8px 0; color:#b0b0b0; font-size:0.9rem; font-family: 'Courier New', Courier, monospace; font-weight: 500;">
                        ${item.ro}
                    </p>
                    
                    <p style="margin:0; color:var(--text-dim); font-size:0.85rem; font-style:italic; opacity: 0.8;">
                        "${item.id}"
                    </p>
                </div>
            </div>`;
    });

    // 5. Bagian Tips Pro (Highlight Kuning Soft)
    if (data.tips) {
        html += `
            <div class="card" style="border-left: 4px solid #ffca28; background: rgba(255, 202, 40, 0.07); margin-top: 35px;">
                <h3 style="color:#ffca28; margin:0 0 8px 0; display:flex; align-items:center; gap:10px;">
                    <span>💡</span> Tips Pro
                </h3>
                <p style="font-size:0.92rem; margin:0; line-height:1.5; color:#e0e0e0;">${data.tips}</p>
            </div>`;
    }

    document.getElementById('content').innerHTML = html;
}

// 6. Navigasi Tombol
function setupNavigation() {
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');

    if (nextBtn) {
        if (babId < 50) {
            nextBtn.onclick = () => window.location.href = `template.html?bab=${babId + 1}`;
        } else {
            nextBtn.innerText = "Selesai!";
            nextBtn.style.opacity = "0.5";
        }
    }

    if (prevBtn) {
        if (babId > 1) {
            prevBtn.style.display = "block";
            prevBtn.onclick = () => window.location.href = `template.html?bab=${babId - 1}`;
        } else {
            prevBtn.style.display = "none";
        }
    }
}
