// Penggunaan const untuk performa memori
const CONFIG = {
    targetPerDay: 25,
    totalTarget: 1500
};

let state = {
    currentDay: parseInt(localStorage.getItem('n4_day')) || 1,
    mastered: JSON.parse(localStorage.getItem('n4_mastered')) || [],
    pool: JSON.parse(localStorage.getItem('n4_pool')) || [],
    queue: [],
    index: 0,
    isReviewDay: false
};

const UI = {
    card: document.getElementById('card'),
    controls: document.getElementById('card-controls'),
    kanji: document.getElementById('d-kanji'),
    reading: document.getElementById('d-reading'),
    meaning: document.getElementById('d-meaning'),
    dayLabel: document.getElementById('label-day'),
    countLabel: document.getElementById('label-count')
};

function init() {
    state.isReviewDay = state.currentDay % 7 === 0;
    
    if (state.isReviewDay) {
        state.queue = vocabDatabase.filter(v => state.pool.includes(v.id));
        if (state.queue.length === 0) {
            state.queue = vocabDatabase.filter(v => state.mastered.includes(v.id)).slice(0, CONFIG.targetPerDay);
        }
    } else {
        state.queue = vocabDatabase.filter(v => v.day === state.currentDay);
    }
    
    render();
}

function flip() {
    UI.card.classList.toggle('flipped');
    UI.controls.classList.add('visible');
}

function render() {
    if (state.index >= state.queue.length) {
        finishSessi();
        return;
    }

    const item = state.queue[state.index];
    UI.kanji.innerText = item.kanji;
    UI.reading.innerText = item.reading;
    UI.meaning.innerText = item.meaning;
    
    UI.dayLabel.innerText = state.isReviewDay ? "REVIU MINGGUAN" : `HARI ${state.currentDay}`;
    UI.countLabel.innerText = `${state.index + 1} / ${state.queue.length}`;
    
    UI.card.classList.remove('flipped');
    UI.controls.classList.remove('visible');
}

function handleResult(isGood) {
    const item = state.queue[state.index];

    if (isGood) {
        if (!state.mastered.includes(item.id)) state.mastered.push(item.id);
        if (state.isReviewDay) state.pool = state.pool.filter(id => id !== item.id);
        state.index++;
    } else {
        if (!state.pool.includes(item.id)) state.pool.push(item.id);
        // Spaced Repetition Logic: Masukkan ke antrean akhir sesi ini
        const currentWord = state.queue.splice(state.index, 1)[0];
        state.queue.push(currentWord);
    }

    localStorage.setItem('n4_mastered', JSON.stringify(state.mastered));
    localStorage.setItem('n4_pool', JSON.stringify(state.pool));
    render();
}

function finishSessi() {
    alert("Sesi Selesai!");
    state.currentDay++;
    localStorage.setItem('n4_day', state.currentDay);
    location.reload();
}

function switchPage(p) {
    document.querySelectorAll('[id^="sec-"]').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(`sec-${p}`).classList.remove('hidden');
    document.getElementById(`n-${p}`).classList.add('active');
    UI.controls.classList.remove('visible');

    if (p === 'progress') {
        const perc = (state.mastered.length / CONFIG.totalTarget) * 100;
        document.getElementById('bar-v').style.width = `${perc}%`;
        document.getElementById('stat-v').innerText = `${state.mastered.length} / ${CONFIG.totalTarget} Kata`;
    }
}

init();
