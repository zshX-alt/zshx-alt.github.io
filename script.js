async function testAI() {
    const input = document.getElementById('user-input').value;
    const display = document.getElementById('result');
    
    // URL Pipedream Baru Anda
    const URL = "https://eoycyw34pqnq7sw.m.pipedream.net"; 

    if(!input) return alert("Ketik kalimatnya dulu, Nyaa! 🐾");
    display.innerHTML = "<em>Neko-Sensei (Groq) sedang beraksi... 🐾</em>";

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input })
        });
        
        const data = await response.json();
        
        // Membaca format jawaban Groq
        if (data.choices && data.choices[0].message) {
            display.innerText = data.choices[0].message.content;
        } else {
            display.innerText = "Berhasil kirim, tapi Groq belum merespons. Cek tombol DEPLOY di Pipedream!";
        }
    } catch (e) {
        display.innerText = "Koneksi Gagal! Pastikan link Pipedream sudah benar dan di-Deploy.";
    }
}
