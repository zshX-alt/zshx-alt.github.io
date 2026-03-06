let masteredItems = JSON.parse(localStorage.getItem('jlpt_n4_mastered')) || [];
let currentTab = 'kanji';

function switchTab(tab) {
    currentTab = tab;
    // Update tampilan tombol aktif
    document.getElementById('btn-kanji').classList.toggle('active', tab === 'kanji');
    document.getElementById('btn-vocab').classList.toggle('active', tab === 'vocabulary');
    renderList();
}

function toggleMastered(id) {
    const index = masteredItems.indexOf(id);
    if (index === -1) {
        masteredItems.push(id);
    } else {
        masteredItems.splice(index, 1);
    }
    
    localStorage.setItem('jlpt_n4_mastered', JSON.stringify(masteredItems));
    updateStats();
    renderList();
}

function updateStats() {
    const masteredKanji = n4Data.kanji.filter(k => masteredItems.includes(k.id)).length;
    const masteredVocab = n4Data.vocabulary.filter(v => masteredItems.includes(v.id)).length;

    // Tampilkan angka progres
    document.getElementById('kanji-count').innerText = masteredKanji;
    document.getElementById('goi-count').innerText = masteredVocab;

    // Update bar (Batas: Kanji 300, Vocab 1500)
    document.getElementById('kanji-progress').style.width = (masteredKanji / 300 * 100) + '%';
    document.getElementById('goi-progress').style.width = (masteredVocab / 1500 * 100) + '%';
}

function renderList() {
    const listContainer = document.getElementById('item-list');
    const data = currentTab === 'kanji' ? n4Data.kanji : n4Data.vocabulary;
    
    listContainer.innerHTML = data.map(item => `
        <div class="item-card ${masteredItems.includes(item.id) ? 'mastered' : ''}" 
             onclick="toggleMastered('${item.id}')">
            <div class="item-main">${item.char || item.word}</div>
            <div class="item-detail">
                <small>${item.reading}</small><br>
                <strong>${item.meaning}</strong>
            </div>
            <div>${masteredItems.includes(item.id) ? '✅' : '⚪'}</div>
        </div>
    `).join('');
}

function resetProgress() {
    if (confirm("Hapus semua progres belajar?")) {
        masteredItems = [];
        localStorage.removeItem('jlpt_n4_mastered');
        updateStats();
        renderList();
    }
}

// Jalankan saat pertama kali buka web
updateStats();
renderList();
