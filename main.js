/**
 * NIHONGO PRO - LOGIC ENGINE
 * Handle dynamic data import & rendering
 */

const params = new URLSearchParams(window.location.search);
const babId = parseInt(params.get('bab')) || 1;

async function loadData() {
    const titleEl = document.getElementById('title');
    const descEl = document.getElementById('desc');
    const contentEl = document.getElementById('content');
    const nextBtn = document.getElementById('next');

    try {
        // 1. Import module secara dinamis dari folder /data/
        const module = await import(`./data/bab${babId}.js`);
        const data = module.default;
        
        // 2. Render Header
        titleEl.innerText = data.title;
        descEl.innerText = data.description;

        // 3. Render Bunpou (Tata Bahasa)
        contentEl.innerHTML = data.bunpou.map(item => `
            <div class="card">
                <span class="pola-title">${item.pola}</span>
                <div class="example-box">
                    <p class="jp">${item.jp}</p>
                    <p class="ro">${item.ro}</p>
                    <p class="id">"${item.id}"</p>
                </div>
            </div>
        `).join('');

        // 4. Render Tips Pro buat Firman (Jika ada)
        if (data.tips && data.tips.length > 0) {
            contentEl.innerHTML += `
                <div class="card" style="border-left: 5px solid var(--gold);">
                    <span class="pola-title" style="color: var(--gold);">💡 Tips Pro buat Firman:</span>
                    <ul style="color: var(--text-gray); padding-left: 20px; margin-top: 10px; font-size: 0.9rem;">
                        ${data.tips.map(t => `<li style="margin-bottom: 8px;">${t}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // 5. Handle Navigasi Tombol Next
        if (babId >= 51) {
            nextBtn.innerText = "SELESAI! KEMBALI KE MENU 🏆";
            nextBtn.style.background = "var(--success)";
            nextBtn.onclick = () => window.location.href = 'index.html';
        } else {
            nextBtn.onclick = () => {
                window.location.href = `template.html?bab=${babId + 1}`;
                window.scrollTo(0, 0); // Balik ke atas pas ganti bab
            };
        }

    } catch (error) {
        // Handle jika file bab belum dibuat
        titleEl.innerText = "Data Belum Tersedia";
        descEl.innerText = `File bab${babId}.js tidak ditemukan.`;
        contentEl.innerHTML = `
            <div class="card" style="text-align: center; padding: 40px 20px;">
                <p style="color: var(--text-gray);">Belum ada materi buat Bab ${babId}, Bro Firman. Cek folder <b>/data/</b> lo!</p>
                <a href="index.html" class="nav-btn" style="display: inline-block; text-decoration: none; margin-top: 20px;">Balik ke Dashboard</a>
            </div>
        `;
        nextBtn.style.display = "none";
        console.error("Error loading data:", error);
    }
}

// Jalankan fungsi
loadData();
