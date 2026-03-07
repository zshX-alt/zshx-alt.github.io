const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// AMAN: Mengambil key dari brankas Railway, bukan teks GitHub
const GROQ_API_KEY = process.env.GROQ_API_KEY; 

app.post('/ask', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama-3.3-70b-versatile",
            messages: [
                { 
                    role: "system", 
                    content: "Kamu adalah Neko-Sensei, guru bahasa Jepang yang lucu dan membantu. Gunakan emoji kucing." 
                },
                { role: "user", content: `Bedah kalimat ini: ${prompt}` }
            ]
        }, {
            headers: { 
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json' 
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error Detail:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Neko-Sensei sedang tidur, coba lagi nanti!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Neko-Sensei aktif!`));
