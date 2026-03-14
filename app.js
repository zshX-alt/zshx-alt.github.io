function renderContent(data) {
    document.getElementById('title').innerText = data.title;
    document.getElementById('desc').innerText = data.description;

    let html = `<h2 style="color:#666; font-size:0.8rem; text-transform:uppercase; letter-spacing:2px; margin:30px 0 15px 5px;">Tata Bahasa</h2>`;

    data.bunpou.forEach(item => {
        html += `
            <div class="card">
                <div class="pola-title">${item.pola}</div>
                <div class="penjelasan-text">${item.penjelasan}</div>
                
                <div class="example-box">
                    <p style="margin:0; font-size:1.3rem; color:#fff; letter-spacing:1px;">${item.jp}</p>
                    <p style="margin:10px 0 5px 0; color:#555; font-size:0.85rem; font-family:monospace;">${item.ro}</p>
                    <p style="margin:0; color:#888; font-size:0.85rem; font-style:italic;">"${item.id}"</p>
                </div>
            </div>`;
    });
    
    document.getElementById('content').innerHTML = html;
}
