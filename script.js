async function testAI() {
    const input = document.getElementById('test-input').value;
    const resArea = document.getElementById('test-result');
    
    // URL Pipedream kamu (Pastikan ini yang di-Deploy)
    const PIPEDREAM_URL = "https://eo14sp07nc6dwfi.m.pipedream.net"; 

    if(!input) return alert("Ketik sesuatu dulu, Nyaa!");

    resArea.innerText = "Neko-Sensei sedang berpikir... 🐾";

    try {
        const response = await fetch(PIPEDREAM_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input })
        });
        
        const data = await response.json();
        
        // Ambil hasil dari OpenAI
        if (data.choices && data.choices[0]) {
            resArea.innerText = data.choices[0].message.content;
        } else {
            resArea.innerText = "Data diterima tapi format salah. Cek Pipedream!";
        }
    } catch (e) {
        resArea.innerText = "Error: " + e.message + "\nCek apakah Pipedream sudah di-Deploy!";
    }
}
