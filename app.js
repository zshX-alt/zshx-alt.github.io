const params = new URLSearchParams(window.location.search);
const babId = parseInt(params.get('bab')) || 1;

async function loadData() {
    try {
        // Pake path absolut /data/ biar ga bingung lokasinya
        const module = await import(`/data/bab${babId}.js`);
        const data = module.default;
        
        document.getElementById('title').innerText = data.title;
        document.getElementById('desc').innerText = data.description;

        const content = document.getElementById('content');
        content.innerHTML = data.bunpou.map(item => `
            <div class="card">
                <div class="pola-title">${item.pola}</div>
                <div class="example-box">
                    <p class="jp">${item.jp}</p>
                    <p class="ro">${item.ro}</p>
                    <p class="id">"${item.id}"</p>
                </div>
            </div>
        `).join('');

        if (data.tips && data.tips.length > 0) {
            content.innerHTML += `
                <div class="card" style="border-left: 4px solid #f1c40f;">
                    <h3 style="color: #f1c40f; margin-top: 0;">Tips Pro buat Firman:</h3>
                    <ul>${data.tips.map(t => `<li style="margin-bottom: 8px;">${t}</li>`).join('')}</ul>
                </div>
            `;
        }

        const nextBtn = document.getElementById('next');
        if (nextBtn) {
            if (babId >= 50) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.onclick = () => window.location.href = `template.html?bab=${babId + 1}`;
            }
        }
    } catch (error) {
        document.getElementById('title').innerText = "Data Belum Tersedia";
        document.getElementById('content').innerHTML = `<div class="card"><p>File bab${babId}.js tidak ditemukan di folder /data/. Cek nama filenya, Bro!</p></div>`;
        console.error("Error:", error);
    }
}

loadData();
