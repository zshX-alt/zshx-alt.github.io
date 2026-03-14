const JLPT_Data = {
    "JLPT N5": [
        { 
            jdl: "1. Sentence Structure", 
            pen: "<b>Konsep:</b> Subjek-Objek-Predikat (S-O-P). Kata kerja selalu di akhir.<br><b>Rumus:</b> [Subjek] wa [Objek] o [Kata Kerja].<br><b>Contoh:</b> Watashi wa gohan o tabemasu (Saya makan nasi)." 
        },
        { 
            jdl: "2. Particles", 
            pen: "<b>Fungsi:</b> Penanda peran kata.<br>• <b>Wa:</b> Topik utama.<br>• <b>O:</b> Objek langsung.<br>• <b>Ni/E:</b> Tujuan/Arah.<br>• <b>De:</b> Lokasi aksi.<br>• <b>No:</b> Kepemilikan (Watashi no hon = Buku saya)." 
        },
        { 
            jdl: "3. Verbs (Masu Form)", 
            pen: "Bentuk sopan (Formal).<br>• <b>~masu:</b> Positif (Sekarang/Mendatang).<br>• <b>~masen:</b> Negatif.<br>• <b>~mashita:</b> Lampau.<br><b>Contoh:</b> Ikimasu (Pergi), Ikimasen (Tidak pergi)." 
        },
        { 
            jdl: "4. Adjectives", 
            pen: "Ada dua jenis:<br>• <b>I-Adj:</b> Berakhiran -i. Contoh: <i>Samui</i> (Dingin). Negatif: <i>Samukunai</i>.<br>• <b>Na-Adj:</b> Butuh 'na' sebelum kata benda. Contoh: <i>Kirei na hana</i> (Bunga cantik)." 
        },
        { 
            jdl: "5. Question Sentences", 
            pen: "Gunakan partikel <b>'Ka'</b> di akhir kalimat. Tidak perlu tanda tanya.<br><b>Contoh:</b> Genki desu ka? (Apa kabar?).<br><b>Kata Tanya:</b> Nani (Apa), Dare (Siapa), Doko (Mana)." 
        },
        { 
            jdl: "6. Demonstratives", 
            pen: "<b>Kore/Sore/Are:</b> Ini/Itu/Itu jauh (Penunjuk benda).<br><b>Kono/Sono/Ano:</b> Harus diikuti kata benda (Kono hon = Buku ini).<br><b>Koko/Soko/Asoko:</b> Penunjuk tempat." 
        },
        { 
            jdl: "7. Basic Expressions", 
            pen: "Ekspresi harian wajib hafal:<br>• <b>Ohayou:</b> Pagi. <b>Konnichiwa:</b> Siang. <b>Konbanwa:</b> Malam.<br>• <b>Sumimasen:</b> Maaf/Permisi. <b>Arigatou:</b> Terima kasih." 
        },
        { 
            jdl: "8. Daily Conversation", 
            pen: "Pola sapaan:<br>• <i>O-genki desu ka?</i> (Apa kabar?).<br>• <i>Hai, genki desu.</i> (Ya, saya sehat).<br>• <i>Hajimemashite:</i> Salam kenal (Pertama kali bertemu)." 
        },
        { 
            jdl: "9. Basic Grammar Patterns", 
            pen: "<b>Pola Desu:</b> [A] wa [B] desu (A adalah B).<br><b>Negatif:</b> [A] wa [B] ja arimasen (A bukan B).<br><b>Contoh:</b> Watashi wa gakusei desu (Saya siswa)." 
        }
    ],
    "JLPT N4": [
        { 
            jdl: "1. Verb Conjugations", 
            pen: "<b>Grup 1:</b> Akhiran u -> i (Iku -> Ikimasu).<br><b>Grup 2:</b> Buang ru (Taberu -> Tabemasu).<br><b>Grup 3:</b> Suru -> Shimasu, Kuru -> Kimasu. Ini dasar untuk semua bentuk Te/Nai/Ta." 
        },
        { 
            jdl: "2. Te Form", 
            pen: "<b>Fungsi:</b> Menyambung kalimat atau minta tolong.<br><b>Rumus:</b> [Verb Te] + kudasai (Tolong...).<br><b>Contoh:</b> Matte kudasai (Tolong tunggu). Tabete imasu (Sedang makan)." 
        },
        { 
            jdl: "3. Plain Form", 
            pen: "Bentuk kasual (Bentuk Kamus). Digunakan untuk teman atau keluarga.<br><b>Contoh:</b> Iku (Pergi), Ikanai (Gak pergi), Itta (Sudah pergi)." 
        },
        { 
            jdl: "4. Potential Form", 
            pen: "Menunjukkan kemampuan (Bisa).<br>• Grup 1: u -> eru (Kaku -> Kakeru / Bisa nulis).<br>• Grup 2: ru -> rareru (Taberareru / Bisa makan).<br>• Grup 3: Dekiru (Bisa)." 
        },
        { 
            jdl: "5. Comparisons", 
            pen: "<b>Pola:</b> A wa B yori [Sifat] desu (A lebih ... dibanding B).<br><b>Contoh:</b> Kuruma wa jitensha yori hayai desu (Mobil lebih cepat dari sepeda)." 
        },
        { 
            jdl: "6. Conditional", 
            pen: "<b>~Tara:</b> Kalau/Setelah. <b>~Ba:</b> Jika (Syarat).<br><b>Contoh:</b> Ame ga futtara, ikimasen (Kalau hujan, saya gak pergi)." 
        },
        { 
            jdl: "7. Giving & Receiving", 
            pen: "• <b>Ageru:</b> Memberi.<br>• <b>Kureru:</b> Orang lain memberi ke saya.<br>• <b>Morau:</b> Menerima. (Sangat dipengaruhi oleh arah hubungan sosial)." 
        },
        { 
            jdl: "8. Reasons", 
            pen: "<b>Kara:</b> Sebab (Subjektif). <b>Node:</b> Sebab (Objektif/Sopan).<br><b>Contoh:</b> Atsui kara, mizu o nomimasu (Karena panas, saya minum air)." 
        },
        { 
            jdl: "9. Permission & Prohibition", 
            pen: "• <b>Izin:</b> ~te mo ii desu (Boleh).<br>• <b>Larangan:</b> ~te wa ikemasen (Tidak boleh).<br><b>Contoh:</b> Tabete wa ikemasen (Dilarang makan)." 
        },
        { 
            jdl: "10. Experience", 
            pen: "<b>Pola:</b> [Verb Ta] + koto ga arimasu (Pernah).<br><b>Contoh:</b> Nihon e itta koto ga arimasu (Pernah pergi ke Jepang)." 
        },
        { 
            jdl: "11. Guess & Probability", 
            pen: "• <b>~Sou:</b> Sepertinya (Visual).<br>• <b>~Deshou:</b> Mungkin (Prediksi).<br><b>Contoh:</b> Ame ga furisou desu (Sepertinya mau hujan)." 
        },
        { 
            jdl: "12. Adjective Transformation", 
            pen: "Menjadi...<br>• <b>I-Adj:</b> ~ku naru (Samuku naru = Menjadi dingin).<br>• <b>Na-Adj:</b> ~ni naru (Kirei ni naru = Menjadi cantik)." 
        },
        { 
            jdl: "13. Purpose & Intention", 
            pen: "• <b>Tame ni:</b> Demi tujuan.<br>• <b>Tsumori:</b> Niat/Rencana pribadi.<br><b>Contoh:</b> Nihon e iku tsumori desu (Berniat pergi ke Jepang)." 
        },
        { 
            jdl: "14. Sequence of Actions", 
            pen: "<b>~Te kara:</b> Setelah melakukan A, baru B.<br><b>Contoh:</b> Te o aratte kara, tabemasu (Setelah cuci tangan, baru makan)." 
        },
        { 
            jdl: "15. Keigo Basics", 
            pen: "Sopan tingkat tinggi.<br>• <b>Sonkeigo:</b> Hormat (Untuk orang lain).<br>• <b>Kenjougo:</b> Rendah diri (Untuk diri sendiri). Penting untuk dunia kerja." 
        }
    ],
    "Practice": [
        { 
            jdl: "Sentence Builder", 
            pen: "<b>Latihan Mandiri:</b> Ambil 1 kata benda, 1 partikel, dan 1 kata kerja. Susun menjadi kalimat utuh N5 atau N4 setiap hari. Fokus pada perubahan bentuk Te dan Ta." 
        },
        { 
            jdl: "Conversation Simulation", 
            pen: "<b>Latihan Mandiri:</b> Lakukan <i>Shadowing</i> (menirukan suara) dari dialog anime atau berita Jepang. Fokus pada intonasi dan kecepatan bicara tanpa melihat teks." 
        }
    ]
};
