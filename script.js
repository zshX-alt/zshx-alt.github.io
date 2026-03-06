async function testAI() {
    const input = document.getElementById('test-input').value;
    const resArea = document.getElementById('test-result');
    
    // URL Pipedream Anda
    const PIPEDREAM_URL = "https://eo14sp07nc6dwfi.m.pipedream.net"; 

    resArea.innerText = "Neko-Sensei sedang mengetik... 🐾";

    try {
        const response = await fetch(PIPEDREAM_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input })
        });
        
        const data = await response.json();
        // Menampilkan jawaban dari ChatGPT lewat Pipedream
        resArea.innerText = data.choices[0].message.content;
    } catch (e) {
        resArea.innerText = "Koneksi Gagal! Pastikan Pipedream sudah di-DEPLOY.";
    }
}
