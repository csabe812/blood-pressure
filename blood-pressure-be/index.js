const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const { parse } = require("csv-parse");
const moment = require("moment-timezone");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5194;

app.use("/", express.static(path.join(__dirname, "frontend-build", "browser")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

moment.tz("Hungary/Budapest").format();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/delete-data", (req, res, next) => {
  const db = new sqlite3.Database("./blood-pressure.db");
  db.serialize(() => {
    db.run("DROP TABLE IF EXISTS bloodpressure");
    db.close();
    res.status(200).send("Deleted");
  });
});

app.get("/import-data", (req, res, next) => {
  const db = new sqlite3.Database("./blood-pressure.db");
  db.serialize(() => {
    //db.run("DROP TABLE IF EXISTS bloodpressure");
    db.run(
      "CREATE TABLE IF NOT EXISTS bloodpressure([id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,[recorded] NVARCHAR(120), [sys] INT, [dia] INT, [pulse] INT, [other] NVARCHAR(200), [mood] NVARCHAR(200))"
    );
    let dataRows = [];
    fs.createReadStream("./blood-pressure-2023-11-12.csv")
      .pipe(parse({ delimiter: ";", from_line: 1 }))
      .on("data", function (row) {
        const splitted = row[1].split(" ");
        const timeArr = splitted[0].split(":");
        const dateTime = new Date(row[0]);
        dateTime.setHours(timeArr[0], timeArr[1]);
        const sql = `INSERT INTO bloodpressure (recorded,sys,dia, pulse, other, mood) VALUES  ('${moment(
          new Date(dateTime)
        ).format("YYYY-MM-DD HH:mm")}', ${+row[2]},${+row[3]},${+row[4]},'${
          row[5]
        }')`;
        db.run(sql);
        dataRows.push({
          date: moment(new Date(dateTime)).format("YYYY-MM-DD HH:mm"),
          sys: +row[2],
          dia: +row[3],
          pulse: +row[4],
          other: row[5],
          mood: row[6],
        });
      })
      .on("end", () => {
        //db.close();
        res.status(200).send(dataRows);
      });
  });
});

app.post("/add", (req, res, next) => {
  const db = new sqlite3.Database("./blood-pressure.db");
  db.serialize(() => {
    const date = moment(new Date(req.body.recorded)).format("YYYY-MM-DD HH:mm");
    const sys = req.body.sys;
    const dia = req.body.dia;
    const pulse = req.body.pulse;
    const other = req.body.other;
    const mood = req.body.mood;
    const sql = `INSERT INTO bloodpressure (recorded,sys,dia, pulse, other, mood) VALUES  ('${date}', ${sys},${dia},${pulse},'${other}','${mood}')`;
    db.run(sql, (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      db.get("SELECT last_insert_rowid() as id", (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const lastInsertedId = row.id;

        db.get(
          "SELECT * FROM bloodpressure WHERE id = ?",
          [lastInsertedId],
          (err, row) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            res.json(row); // Return the last inserted row's data
          }
        );
      });
    });
  });
});

app.patch("/update/:id", (req, res) => {
  const db = new sqlite3.Database("./blood-pressure.db");
  db.serialize(() => {
    const { id } = req.params;
    const { recorded, sys, dia, pulse, other, mood } = req.body;

    const sql =
      "UPDATE bloodpressure SET recorded = ?, sys = ?, dia = ?, pulse = ?, other = ?, mood = ? WHERE id = ?";

    db.run(sql, [recorded, sys, dia, pulse, other, mood, id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Bloodpressure updated successfully" });
    });
  });
});

app.get("/average", (req, res, next) => {
  const db = new sqlite3.Database("./blood-pressure.db");
  db.serialize(() => {
    const sysArr = [];
    const diaArr = [];
    const pulseArr = [];
    let sys = 0;
    let dia = 0;
    let pulse = 0;
    db.each(
      "select * from bloodpressure",
      function (err, row) {
        if (err) {
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        sysArr.push(row.sys);
        diaArr.push(row.dia);
        pulseArr.push(row.pulse);
        sys += +row.sys;
        dia += row.dia;
        pulse += row.pulse;
      },
      function (err, counter) {
        const resp = {
          sysAvg: sys / sysArr.length,
          diaAvg: dia / diaArr.length,
          pulseAvg: pulse / pulseArr.length,
        };
        res.status(200).send(resp);
      }
    );
  });
});

app.get("/average/:id", (req, res, next) => {
  const year = req.params.id;
  const db = new sqlite3.Database("./blood-pressure.db");
  db.serialize(() => {
    let sys = 0;
    let dia = 0;
    let pulse = 0;
    db.each(
      `select * from bloodpressure where (lower(recorded) like '${year}%')`,
      function (err, row) {
        if (err) {
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        sys += +row.sys;
        dia += row.dia;
        pulse += row.pulse;
      },
      function (err, counter) {
        const resp = {
          sysAvg: sys / counter,
          diaAvg: dia / counter,
          pulseAvg: pulse / counter,
        };
        res.status(200).send(resp);
      }
    );
  });
});

app.get("/average-by-year", (req, res, next) => {
  const db = new sqlite3.Database("./blood-pressure.db");
  db.serialize(() => {
    const data = [];
    db.each(
      "select * from bloodpressure",
      function (err, row) {
        if (err) {
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        data.push(row);
      },
      function (err, counter) {
        let resp = [];
        let currentYear = data
          .map((m) => new Date(m.recorded))
          .sort((a, b) => b - a)
          .at(0)
          .getFullYear();
        let yearData = data.filter((f) =>
          f.recorded.startsWith("" + currentYear)
        );
        while (yearData && yearData.length > 0) {
          let sys = 0;
          let dia = 0;
          let pulse = 0;
          for (let i of yearData) {
            sys += i.sys;
            dia += i.dia;
            pulse += i.pulse;
          }
          resp.push({
            year: currentYear,
            sysAvg: sys / yearData.length,
            diaAvg: dia / yearData.length,
            pulseAvg: pulse / yearData.length,
          });
          currentYear -= 1;
          yearData = data.filter((f) =>
            f.recorded.startsWith("" + currentYear)
          );
        }
        res.status(200).send(resp);
      }
    );
  });
});

app.get("/all-by-year/:year", (req, res, next) => {
  const db = new sqlite3.Database("./blood-pressure.db");
  db.serialize(() => {
    const data = [];
    const sql = `select * from bloodpressure where recorded between "${req.params.year}-01-01" and "${req.params.year}-12-31"`;
    db.each(
      sql,
      function (err, row) {
        if (err) {
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        data.push(row);
      },
      function (err, counter) {
        res.status(200).send(data);
      }
    );
  });
});

app.get("/last-n-data/:n", (req, res, next) => {
  const db = new sqlite3.Database("./blood-pressure.db");
  db.serialize(() => {
    const data = [];
    db.each(
      `select * from bloodpressure order by id desc limit ${req.params.n}`,
      function (err, row) {
        if (err) {
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        data.push(row);
      },
      function (err, counter) {
        res.status(200).send(data);
        db.close();
      }
    );
  });
});

app.get("/years", (req, res, next) => {
  const db = new sqlite3.Database("./blood-pressure.db");
  db.serialize(() => {
    const data = [];
    db.each(
      `SELECT DISTINCT strftime('%Y', recorded) AS year FROM bloodpressure`,
      function (err, row) {
        if (err) {
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        data.push(+row.year);
      },
      function (err, counter) {
        res.status(200).send(data);
        db.close();
      }
    );
  });
});

app.get("/get-by-id/:id", (req, res, next) => {
  const db = new sqlite3.Database("./blood-pressure.db");
  db.serialize(() => {
    let data = {};
    db.each(
      `select * from bloodpressure where id = ${req.params.id}`,
      function (err, row) {
        if (err) {
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        data = { ...row };
      },
      function (err, counter) {
        res.status(200).send({ ...data });
        db.close();
      }
    );
  });
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "frontend-build", "browser", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
