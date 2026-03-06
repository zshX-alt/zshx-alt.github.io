function renderList() {
    const listContainer = document.getElementById('item-list');
    const data = currentTab === 'kanji' ? n4Data.kanji : n4Data.vocabulary;
    
    listContainer.innerHTML = data.map(item => {
        const isMastered = masteredItems.includes(item.id);
        return `
            <div class="item-card ${isMastered ? 'mastered' : ''}">
                <div class="item-main">${item.char || item.word}</div>
                <div class="item-detail">
                    <small>${item.reading}</small>
                    <strong>${item.meaning}</strong>
                </div>
                <div class="action-btns">
                    <button class="btn-check ${isMastered ? 'active' : ''}" 
                            onclick="toggleMastered('${item.id}')">
                        ${isMastered ? 'Hafal ✅' : 'Hafal?'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}
