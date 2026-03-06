-- Tabel Perpustakaan Kanji
CREATE TABLE kanji_library (
  id SERIAL PRIMARY KEY,
  word TEXT NOT NULL,
  reading TEXT,
  meaning TEXT,
  logic_visual TEXT,
  level TEXT DEFAULT 'N5'
);

-- Tabel Progres User
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  vocab_id INT REFERENCES kanji_library(id),
  last_review TIMESTAMP DEFAULT NOW(),
  next_review TIMESTAMP DEFAULT NOW(),
  repetition_level INT DEFAULT 0
);
