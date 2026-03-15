const params = new URLSearchParams(window.location.search);
const babId = parseInt(params.get('bab')) || 1;

async function loadData() {
    try {
        const module = await import(`./data/bab${babId}.js`);
        const data = module.default;
        
        document.getElementById('title').innerText = data.title;
        document.getElementById('desc').innerText = data.description;

        document.getElementById('content').innerHTML = data.bunpou.map(item => `
            <div class="card">
                <div class="pola-title">${item.pola}</div>
                <div class="example-box">
                    <p class="jp">${item.jp}</p>
                    <p class="ro">${item.ro}</p>
                    <p class="id">"${item.id}"</p>
                </div>
            </div>
        `).join('');

        // Progress Tracking
        localStorage.setItem(`bab-${babId}-done`, 'true');

        // Navigation
        const nextBtn = document.getElementById('next');
        if (babId >= 50) nextBtn.style.display = 'none';
        else nextBtn.onclick = () => window.location.href = `template.html?bab=${babId + 1}`;
    } catch (e) {
        document.getElementById('title').innerText = "Data Belum Tersedia";
        document.getElementById('content').innerHTML = `<p>Bab ${babId} masih dalam proses penyusunan, Bro!</p>`;
    }
}
loadData();
