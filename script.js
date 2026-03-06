/* --- STATE MANAGEMENT --- */
let currentDay = parseInt(localStorage.getItem('jlpt_day')) || 1;
let masteredList = JSON.parse(localStorage.getItem('jlpt_mastered')) || [];
// Daftar kata yang pernah diklik "ULANGI" (disimpan permanen untuk review)
let reviewPool = JSON.parse(localStorage.getItem('jlpt_review_pool')) || [];

let todayQueue = [];
let isReviewDay = currentDay % 7 === 0;

// Penentuan Isi Antrean (Queue)
if (isReviewDay) {
    // Hari ke-7, 14, dst: Ambil dari Review Pool
    todayQueue = vocabDatabase.filter(v => reviewPool.includes(v.id));
    if (todayQueue.length === 0) {
        // Jika tidak ada kata sulit, ambil 25 kata acak dari yang sudah dihafal
        todayQueue = vocabDatabase.filter(v => masteredList.includes(v.id)).slice(0, 25);
    }
} else {
    // Hari Biasa: Ambil 25 kata sesuai jadwal
    todayQueue = vocabDatabase.filter(v => v.day === currentDay);
}

let index = 0;

/* --- FLASHCARD LOGIC --- */
function flip() {
    document.getElementById('flashcard').classList.toggle('flipped');
    document.getElementById('vocab-controls').classList.add('visible');
}

function renderVocab() {
    if (todayQueue.length === 0) {
        document.getElementById('disp-kanji').innerText = "KOSONG";
        document.getElementById('disp-meaning').innerText = "Belum ada data untuk hari ini";
        return;
    }

    if (index >= todayQueue.length) {
        finishDay();
        return;
    }

    const data = todayQueue[index];
    document.getElementById('disp-kanji').innerText = data.kanji;
    document.getElementById('disp-reading').innerText = data.reading;
    document.getElementById('disp-meaning').innerText = data.meaning;
    
    // Label Header
    const modeText = isReviewDay ? "REVIU MINGGUAN" : `HARI ${currentDay}`;
    document.getElementById('val-day').innerText = modeText;
    document.getElementById('val-counter').innerText = `${index} / ${todayQueue.length}`;
    
    document.getElementById('flashcard').classList.remove('flipped');
    document.getElementById('vocab-controls').classList.remove('visible');
}

function submitResult(isGood) {
    const currentWord = todayQueue[index];

    if(isGood) {
        // Jika berhasil di hari biasa, masukkan ke daftar hafal
        if(!masteredList.includes(currentWord.id)) {
            masteredList.push(currentWord.id);
            localStorage.setItem('jlpt_mastered', JSON.stringify(masteredList));
        }
        // Jika berhasil di hari review, hapus dari pool review
        if(isReviewDay) {
            reviewPool = reviewPool.filter(id => id !== currentWord.id);
            localStorage.setItem('jlpt_review_pool', JSON.stringify(reviewPool));
        }
        index++;
    } else {
        // Jika Gagal, masukkan ke Pool Review Permanen
        if(!reviewPool.includes(currentWord.id)) {
            reviewPool.push(currentWord.id);
            localStorage.setItem('jlpt_review_pool', JSON.stringify(reviewPool));
        }
        // Re-queue untuk sesi sekarang
        const failed = todayQueue.splice(index, 1)[0];
        todayQueue.push(failed);
    }
    renderVocab();
}

function finishDay() {
    alert(isReviewDay ? "Review Mingguan Selesai! Otak Anda semakin tajam." : "Target 25 Kata Selesai!");
    currentDay++;
    localStorage.setItem('jlpt_day', currentDay);
    location.reload();
}

// Navigasi Tab (Tambahkan ke fungsi navTo yang sudah ada di index.html)
function navTo(page) {
    ['vocab', 'grammar', 'progress'].forEach(s => document.getElementById(`section-${s}`).classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`section-${page}`).classList.remove('hidden');
    document.getElementById(`n-${page}`).classList.add('active');
    document.getElementById('page-title').innerText = page;
    
    if(page === 'grammar') renderGrammar();
    if(page === 'progress') renderProgress();
}

// Panggil fungsi render awal
renderVocab();
