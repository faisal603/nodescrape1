const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Moda = require('./model/Moda')


async function mongo(){
    await mongoose.connect("mongodb+srv://craigsuser:nokia5130@haaji.x0wcj.mongodb.net/craigs?retryWrites=true&w=majority",
    {useNewUrlParser:true}
    );
    console.log('I am connected bro')
}

async function scraplistings(page){
    await page.goto("https://denver.craigslist.org/search/npo");
    const html = await page.content();
    const $ = cheerio.load(html);
    const listings = $('.result-info').map(
        (index, element)=>{
            const titleElement = $(element).find('.result-heading>a');
            const timeElement = $(element).find('.result-date');
            const cityElement = $(element).find('.result-hood');
            const title = $(titleElement).text();
            const url = $(titleElement).attr('href');
            const posttime = new Date($(timeElement).attr('datetime'));
            const city = $(cityElement).text().trim().replace("(","").replace(")","");

           return {title, url, posttime, city}
        }
    ).get();

    return listings;
}

async function scrapfull(page, listings){

    for(let i=0; i<listings.length; i++){
        await sleep(3);
        await page.goto(listings[i].url);
        const html = await page.content();
        const $ = cheerio.load(html);
        const jobdesc= $('#postingbody').text();
        const comp= $('.attrgroup>span:first').text();
        listings[i].jobdesc= jobdesc;
        listings[i].comp= comp;
      //  const finalround = new Moda(listings[i]);
      //  await finalround.save();

        //MYSQL dealing

        var mysql = require('mysql');
        var con = mysql.createConnection({
        host: "156.67.74.76",
        user: "u803143234_4FHPy",
        password: "Duvas@uos2014",
        database: "u803143234_gyTWV"
        });

        const haaji =listings[i].title;
        const wajdaan = listings[i].jobdesc; 
        const pname = listings[i].url;
        const ppname= pname.replace("https://denver.craigslist.org/npo/d/","").replace("/","").replace(".html","");      
        const dn= "2021-12-23 21:23:25";
        const dng = "2021-12-23 23:23:25";


        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO wp_posts SET ?";
            var post = {post_title:haaji,post_name:ppname,post_date:dn,post_date_gmt:dng,post_author:1,post_content:wajdaan,post_type:"post", post_status:"publish"}
            con.query(sql,post, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            });
        });

    }
    
}

async function sleep(sec){
   return new Promise(resolve => setTimeout(resolve,sec*1000))
}


async function main(){
    await mongo()
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const listings =await scraplistings(page);
    const fulldata = await scrapfull(page, listings);
    //console.log(listings)
}



main();
