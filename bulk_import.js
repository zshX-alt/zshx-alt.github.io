const { createClient } = require('@supabase/supabase-client');
const vocabData = require('./kosakata.json');

const supabase = createClient('YOUR_URL', 'YOUR_SERVICE_KEY');

async function pushData() {
  const { error } = await supabase.from('kanji_library').insert(vocabData);
  if (!error) console.log("Data berhasil diimport!");
}

pushData();
