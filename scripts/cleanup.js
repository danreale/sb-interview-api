require("dotenv").config();

const createClient = require("@supabase/supabase-js").createClient;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanData() {
  try {
    const { data, error } = await supabase
      .from("issues")
      .delete()
      .gt("inserted_at", "2021-08-02");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

cleanData();
