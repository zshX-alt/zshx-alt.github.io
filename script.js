let appState = {
    day: parseInt(localStorage.getItem('jlpt_n4_day')) || 1,
    mastered: JSON.parse(localStorage.getItem('jlpt_n4_mastered')) || [],
    pool: JSON.parse(localStorage.getItem('jlpt_n4_pool')) || [], // Kata sulit
    queue: [],
    idx: 0
};

function initApp() {
    // Mode Review setiap hari ke-7
    const isReview = appState.day % 7 === 0;
    if (isReview) {
        appState.queue = vocabDatabase.filter(v => appState.pool.includes(v.id));
        if (appState.queue.length === 0) appState.queue = vocabDatabase.filter(v => v.day === appState.day - 1);
    } else {
        appState.queue = vocabDatabase.filter(v => v.day === appState.day);
    }
    updateDisplay();
}

function flipCard() {
    document.getElementById('card').classList.toggle('flipped');
    if(document.getElementById('card').classList.contains('flipped')) {
        document.getElementById('card-controls').classList.add('visible');
    }
}

function updateDisplay() {
    if (appState.idx >= appState.queue.length) {
        alert("Target hari ini tercapai!");
        appState.day++;
        localStorage.setItem('jlpt_n4_day', appState.day);
        location.reload();
        return;
    }

    const data = appState.queue[appState.idx];
    document.getElementById('v-kanji').innerText = data.kanji;
    document.getElementById('v-reading').innerText = data.reading;
    document.getElementById('v-meaning').innerText = data.meaning;
    document.getElementById('label-day').innerText = `DAY ${appState.day}`;
    document.getElementById('label-count').innerText = `${appState.idx + 1} / ${appState.queue.length}`;
    
    document.getElementById('card').classList.remove('flipped');
    document.getElementById('card-controls').classList.remove('visible');
}

function handleResult(good) {
    const item = appState.queue[appState.idx];
    if (good) {
        if (!appState.mastered.includes(item.id)) appState.mastered.push(item.id);
        appState.pool = appState.pool.filter(id => id !== item.id);
        appState.idx++;
    } else {
        if (!appState.pool.includes(item.id)) appState.pool.push(item.id);
        // Loop back: pindahkan ke akhir antrean hari ini
        const current = appState.queue.splice(appState.idx, 1)[0];
        appState.queue.push(current);
    }
    localStorage.setItem('jlpt_n4_mastered', JSON.stringify(appState.mastered));
    localStorage.setItem('jlpt_n4_pool', JSON.stringify(appState.pool));
    updateDisplay();
}

function switchTab(tab) {
    ['vocab', 'grammar', 'stats'].forEach(t => {
        document.getElementById(`sec-${t}`).classList.toggle('hidden', t !== tab);
        document.getElementById(`n-${t}`).classList.toggle('active', t === tab);
    });
    document.getElementById('h-title').innerText = tab.toUpperCase();
    document.getElementById('card-controls').classList.remove('visible');

    if (tab === 'grammar') {
        document.getElementById('grammar-list').innerHTML = grammarDatabase.map(g => `
            <div class="grammar-box">
                <div style="color:var(--blue); font-weight:bold; font-size:15px;">${g.pattern}</div>
                <div style="font-size:14px; margin:6px 0;">${g.meaning}</div>
                <div style="font-size:12px; color:var(--dim);">Contoh: ${g.example}</div>
            </div>
        `).join('');
    }
    if (tab === 'stats') {
        const p = (appState.mastered.length / 1500) * 100;
        document.getElementById('p-bar').style.width = p + "%";
        document.getElementById('p-text').innerText = `${appState.mastered.length} / 1500 WORDS`;
    }
}

initApp();
