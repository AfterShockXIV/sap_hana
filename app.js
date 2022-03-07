const hana = require("@sap/hana-client")
const express = require("express")
const app = express()
const bodyParser = require("body-parser") ; 
const conn = hana.createConnection();
const mandt = 500 ; 

// DEV ===================
const conn_params = {
    serverNode : "192.168.24.30:33015",
    uid:"SAPABAP1",
    pwd:"Venine@2020",
}

// conn.disconnect(function(err) {
//     if (err) throw err;
//     console.log('Disconnected');
//   });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin" , "*");
    next();
});


app.listen(7010,() => {
    console.log("Start server is running  Port 7010.")
})


app.get("/", (req,res) => {
    res.send("Server Start Prot 7001");
})

app.get("/apis/tableEBAN", async (req,res) =>{
   await conn.connect(conn_params, async function (err) {
     // if (err) throw err;
     await conn.exec(
        "SELECT DISTINCT B.AUFNR,A.BANFN FROM EBAN AS A INNER JOIN EBKN AS B ON A.BANFN = B.BANFN AND A.BNFPO = B.BNFPO LEFT JOIN AUFK AS C ON B.AUFNR = C.AUFNR WHERE A.ZZPROJECT != '' ORDER BY A.BANFN DESC",
        function (err, result) {
        //  if (err) throw err;
        console.log(result.length)
          res.send({data:result});
          conn.disconnect();
        }
      );
    });
  });
  

