var mysql = require('mysql');
        var con = mysql.createConnection({
        host: "156.67.74.76",
        user: "u803143234_4FHPy",
        password: "Duvas@uos2014",
        database: "u803143234_gyTWV"
        });

        const haaji ="hello I am haaji 2";
        const wajdaan = "o Hello congrats baba tajurba kamyab rha ab ap jaldi room me ajao";
        const dn= "2021-12-11 23:56:25";
        const dng = "2021-12-12 23:56:25";


        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO wp_posts SET ?";
            var post = {post_title:haaji,post_date:dn,post_date_gmt:dng,post_author:1,post_content:wajdaan,post_type:"post", post_status:"publish"}
            con.query(sql,post, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            });
        });
