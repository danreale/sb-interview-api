require("dotenv").config();
const express = require("express");

const createClient = require("@supabase/supabase-js").createClient;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let port = process.env.PORT || 3000;

app.get("/api/v1/health", (req, res) =>
  res.send({ message: "API Is Running" })
);

app.get("/api/v1/issues", async (req, res) => {
  if (req.query.category == undefined && req.query.status == undefined) {
    await getAllIssuesNoFilter(res);
  } else {
    if (req.query.status == undefined) {
      await getAllIssuesByCategory(req, res);
    } else if (req.query.category == undefined) {
      await getAllIssuesByStatus(req, res);
    } else {
      await getAllIssuesByStatusAndCategory(req, res);
    }
  }
});
app.get("/api/v1/issues/:id", async (req, res) => {
  try {
    let { data: issues, error } = await supabase
      .from("issues")
      .select("*")
      .eq("id", req.params.id);
    if (error) {
      res.send(error);
    } else {
      if (issues.length == 0) {
        res.send({ message: "No Matching Issues" });
      } else {
        res.send(issues);
      }
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.post("/api/v1/issues", async (req, res) => {
  try {
    const { data, error } = await supabase.from("issues").insert([
      {
        snowids: req.body.snowids,
        date_reported: req.body.date_reported,
        status: req.body.status,
        category: req.body.category,
        description: req.body.description,
        date_resolved: req.body.date_resolved,
        provider_types: req.body.provider_types,
      },
    ]);
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.put("/api/v1/issues/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("issues")
      .update({
        snowids: req.body.snowids,
        date_reported: req.body.date_reported,
        status: req.body.status,
        category: req.body.category,
        description: req.body.description,
        date_resolved: req.body.date_resolved,
        provider_types: req.body.provider_types,
      })
      .eq("id", req.params.id);
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(port, function () {
  console.log("Running API on Port " + port);
});

module.exports = app; // for testing

async function getAllIssuesNoFilter(res) {
  try {
    let { data: issues, error } = await supabase.from("issues").select("*");
    if (error) {
      res.send(error);
    } else {
      if (issues.length == 0) {
        res.send({ message: "No Matching Issues" });
      } else {
        res.send(issues);
      }
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
async function getAllIssuesByStatus(req, res) {
  try {
    let { data: issues, error } = await supabase
      .from("issues")
      .select("*")
      .eq("status", req.query.status);
    if (error) {
      res.send(error);
    } else {
      if (issues.length == 0) {
        res.send({ message: "No Matching Issues" });
      } else {
        res.send(issues);
      }
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
async function getAllIssuesByCategory(req, res) {
  try {
    let { data: issues, error } = await supabase
      .from("issues")
      .select("*")
      .eq("category", req.query.category);
    if (error) {
      res.send(error);
    } else {
      if (issues.length == 0) {
        res.send({ message: "No Matching Issues" });
      } else {
        res.send(issues);
      }
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
async function getAllIssuesByStatusAndCategory(req, res) {
  try {
    let { data: issues, error } = await supabase
      .from("issues")
      .select("*")
      .eq("status", req.query.status)
      .eq("category", req.query.category);
    if (error) {
      res.send(error);
    } else {
      if (issues.length == 0) {
        res.send({ message: "No Matching Issues" });
      } else {
        res.send(issues);
      }
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
