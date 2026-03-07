async function testAI() {
    const inputField = document.getElementById('test-input');
    const resArea = document.getElementById('test-result');
    
    // URL Pipedream Baru Anda
    const PIPEDREAM_URL = "https://eooov7kp4yqbi6h.m.pipedream.net"; 

    if(!inputField.value) {
        resArea.innerText = "Ketik kalimatnya dulu, Nyaa! 🐾";
        return;
    }

    resArea.innerHTML = "<em>Neko-Sensei sedang berpikir... 🐾</em>";

    try {
        const response = await fetch(PIPEDREAM_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: inputField.value })
        });
        
        const data = await response.json();
        
        // Membaca format jawaban Gemini: candidates[0].content.parts[0].text
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            resArea.innerHTML = data.candidates[0].content.parts[0].text;
        } else {
            resArea.innerText = "Hmm, Gemini tersambung tapi tidak ada jawaban. Cek Pipedream!";
        }
    } catch (e) {
        console.error(e);
        resArea.innerText = "Koneksi Gagal! Pastikan Pipedream sudah di-DEPLOY dan Model diatur ke Gemini 1.5 Flash.";
    }
}
