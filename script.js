async function send() {
    const input = document.getElementById("input");
    const message = input.value;

    if (!message) return;

    const messages = document.getElementById("messages");
    
    // Tampilkan pesan user di layar
    messages.innerHTML += `<p><b>You:</b> ${message}</p>`;

    try {
        // GANTI dengan URL Railway Anda + /ask
        const RAILWAY_URL = "https://zshx-altgithubio-production.up.railway.app/ask"; 

        const res = await fetch(RAILWAY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: message // Harus 'prompt' agar nyambung ke server.js
            })
        });

        const data = await res.json();

        // Railway mengirim balik data dalam format Groq (choices[0].message.content)
        if (data.choices && data.choices[0].message) {
            messages.innerHTML += `<p><b>AI:</b> ${data.choices[0].message.content}</p>`;
        } else {
            messages.innerHTML += `<p><b>AI:</b> Maaf, Neko-Sensei sedang bingung. 🐾</p>`;
        }

    } catch (error) {
        messages.innerHTML += `<p style="color:red"><b>Error:</b> Gagal terhubung ke server Railway! 🐾</p>`;
    }

    input.value = "";
    messages.scrollTop = messages.scrollHeight;
}
