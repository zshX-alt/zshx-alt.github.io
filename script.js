async function testAI() {
    const input = document.getElementById('user-input').value;
    const display = document.getElementById('result');
    
    // Alamat domain sesuai Screenshot 45
    const RAILWAY_URL = "https://zshx-altgithubio-production.up.railway.app/ask"; 

    if(!input) return alert("Ketik dulu kalimatnya, Nyaa! 🐾");
    display.innerHTML = "<em>Neko-Sensei sedang membedah... 🐾</em>";

    try {
        const response = await fetch(RAILWAY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input })
        });
        
        const data = await response.json();
        
        if (data.choices && data.choices[0].message) {
            display.innerText = data.choices[0].message.content;
        } else {
            display.innerText = "Koneksi sukses, tapi Groq belum menjawab. Cek API Key di Railway!";
        }
    } catch (e) {
        display.innerText = "Gagal terhubung ke Railway! Pastikan statusnya ACTIVE.";
    }
}
