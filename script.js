let currentMastery = parseInt(localStorage.getItem('neko_mastery')) || 0;
let vocabData = [];

async function init() {
    updateUI();
    try {
        const res = await fetch('kosakata.json');
        vocabData = await res.json();
        displayVocab();
    } catch (e) { console.error("Gagal memuat data."); }
}

function displayVocab() {
    const container = document.getElementById('vocab-grid');
    container.innerHTML = '';
    const start = Math.max(0, currentMastery - 25);
    const batch = vocabData.slice(start, currentMastery || 25);
    
    batch.forEach(item => {
        container.innerHTML += `
            <div class="kanji-card bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center group cursor-help">
                <div class="text-4xl font-bold mb-2 text-white">${item.word}</div>
                <div class="text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">${item.reading}</div>
                <div class="text-slate-500 text-xs uppercase mt-1">${item.meaning}</div>
            </div>`;
    });
}

function studyNextBatch() {
    currentMastery += 25;
    if(currentMastery > 1500) currentMastery = 1500;
    localStorage.setItem('neko_mastery', currentMastery);
    updateUI();
    displayVocab();
}

function updateUI() {
    document.getElementById('progress-bar').style.width = `${(currentMastery / 1500) * 100}%`;
    document.getElementById('progress-text').innerText = `${currentMastery} / 1500`;
}

async function analyzeSentence() {
    const input = document.getElementById('ai-input').value;
    const output = document.getElementById('ai-output');
    const key = localStorage.getItem('neko_api_key');

    if(!key) return alert("Masukkan API Key di Settings!");
    output.innerHTML = "Neko-Sensei sedang membedah logika... 🐾";

    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: "Kamu Neko-Sensei. Bedah kalimat dengan HTML: <span class='subject'>Subjek</span>, <span class='particle'>Partikel</span>, <span class='object'>Objek</span>, <span class='verb'>Kata Kerja</span>. Jelaskan logikanya tanpa suara." }, { role: "user", content: input }]
            })
        });
        const data = await res.json();
        output.innerHTML = data.choices[0].message.content;
    } catch (e) { output.innerHTML = "Error koneksi ke OpenAI."; }
}

function toggleSettings() { document.getElementById('settings-modal').classList.toggle('hidden'); }
function saveSettings() {
    localStorage.setItem('neko_api_key', document.getElementById('api-key-input').value);
    toggleSettings();
    alert("Key Disimpan!");
}

window.onload = init;
