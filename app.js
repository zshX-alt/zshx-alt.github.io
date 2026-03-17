const params = new URLSearchParams(window.location.search);
const babId = parseInt(params.get('bab')) || 1;

async function loadData() {
    const content = document.getElementById('content');
    try {
        const module = await import(`./data/bab${babId}.js`);
        const data = module.default;
        document.getElementById('title').innerText = data.title;
        document.getElementById('desc').innerText = data.description;

        // MODE 1: Kalau ada data Vocabulary (Tabel Kanji)
        if (data.vocabulary) {
            let html = '<div class="vocab-grid">';
            html += data.vocabulary.map(v => `
                <div class="vocab-item">
                    <span class="vocab-hira">${v.hira}</span>
                    <span class="vocab-kanji">${v.kanji}</span>
                    <span class="vocab-indo">${v.id}</span>
                </div>
            `).join('');
            content.innerHTML = html + '</div>';
        } 
        // MODE 2: Materi Biasa (Bunpou)
        else if (data.bunpou) {
            content.innerHTML = data.bunpou.map(item => `
                <div class="card">
                    <span class="pola-title">${item.pola}</span>
                    <p class="jp">${item.jp}</p>
                    <p class="id">${item.id}</p>
                </div>
            `).join('');
        }

        document.getElementById('next').onclick = () => {
            window.location.href = `template.html?bab=${babId + 1}`;
        };
    } catch (e) {
        content.innerHTML = `<div class="card">Materi belum diupload, Bro!</div>`;
    }
}
loadData();
