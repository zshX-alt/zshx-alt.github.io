let masteredItems = JSON.parse(localStorage.getItem('jlpt_n4_mastered')) || [];
let currentMode = 'vocab';
let currentBab = 1;
let studyQueue = [];
let currentIndex = 0;

const babNames = {
    1: "Keinginan & Niat", 2: "Memberi & Menerima", 3: "Saran & Keharusan",
    4: "Sebab & Akibat", 5: "Perubahan & Usaha", 6: "Dugaan & Tampaknya",
    7: "Pengandaian", 8: "Kemampuan", 9: "Urutan Kejadian",
    10: "Penjelasan", 11: "Pasif & Kausatif", 12: "Larangan", 13: "Keigo Dasar"
};

// Inisialisasi Tombol Bab
function initBabMenu() {
    const container = document.getElementById('bab-list');
    for (let i = 1; i <= 13; i++) {
        const btn = document.createElement('button');
        btn.className = `btn-bab ${i === 1 ? 'active' : ''}`;
        btn.innerText = `Bab ${i}`;
        btn.onclick = () => filterByBab(i);
        container.appendChild(btn);
    }
}

function changeMode(mode) {
    currentMode = mode;
    document.getElementById('mode-vocab').classList.toggle('active', mode === 'vocab');
    document.getElementById('mode-grammar').classList.toggle('active', mode === 'grammar');
    document.getElementById('grammar-menu').style.display = mode === 'grammar' ? 'block' : 'none';
    
    refreshQueue();
}

function filterByBab(num) {
    currentBab = num;
    document.querySelectorAll('.btn-bab').forEach((b, i) => b.classList.toggle('active', i+1 === num));
    document.getElementById('current-bab-name').innerText = babNames[num];
    refreshQueue();
}

function refreshQueue() {
    if (currentMode === 'vocab') {
        // Ambil 20 kata yang belum hafal untuk sesi ini
        studyQueue = n4Data.vocabulary.filter(v => !masteredItems.includes(v.id)).slice(0, 20);
    } else {
        studyQueue = n4Data.grammar.filter(g => g.bab === currentBab && !masteredItems.includes(g.id));
    }
    currentIndex = 0;
    showCard();
    updateStats();
}

function showCard() {
    const card = studyQueue[currentIndex];
    const cardElement = document.getElementById('main-card');
    cardElement.classList.remove('is-flipped');

    if (!card) {
        document.getElementById('card-kanji').innerText = "Selesai! 🎉";
        return;
    }

    document.getElementById('card-kanji').innerText = card.word || card.pattern;
    const backContent = document.getElementById('card-content-back');

    if (currentMode === 'vocab') {
        backContent.innerHTML = `
            <h1 style="color:var(--accent); font-size:2.5rem;">${card.reading}</h1>
            <h2 style="font-size:1.5rem;">${card.meaning}</h2>
        `;
    } else {
        backContent.innerHTML = `
            <h2 style="color:var(--accent)">${card.usage}</h2>
            <div class="grammar-formula">Rumus: ${card.formula}</div>
            <p class="grammar-example">${card.example}</p>
        `;
    }
}

function handleAnswer(isKnown) {
    if (studyQueue.length === 0) return;
    const card = studyQueue[currentIndex];

    if (isKnown) {
        masteredItems.push(card.id);
        localStorage.setItem('jlpt_n4_mastered', JSON.stringify(masteredItems));
        studyQueue.splice(currentIndex, 1);
    } else {
        // Pindahkan ke paling belakang
        const missed = studyQueue.splice(currentIndex, 1)[0];
        studyQueue.push(missed);
    }

    updateStats();
    if (studyQueue.length > 0) {
        if (currentIndex >= studyQueue.length) currentIndex = 0;
        showCard();
    } else {
        showCard();
    }
}

function updateStats() {
    const totalVocab = n4Data.vocabulary.length || 1500;
    const masteredCount = masteredItems.filter(id => id.startsWith('v')).length;
    const percent = Math.floor((masteredCount / totalVocab) * 100);

    document.getElementById('vocab-count').innerText = `${masteredCount} / ${totalVocab}`;
    document.getElementById('progress-percent').innerText = `${percent}%`;
    document.getElementById('main-progress').style.width = `${percent}%`;
}

document.getElementById('main-card').onclick = function() { this.classList.toggle('is-flipped'); };

function resetProgress() {
    if(confirm("Hapus semua progres belajar?")) {
        localStorage.removeItem('jlpt_n4_mastered');
        masteredItems = [];
        location.reload();
    }
}

// Start
initBabMenu();
refreshQueue();
