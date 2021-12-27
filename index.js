const request = require('request-promise');
const cheerio = require('cheerio');


let abc =[];
async function main(){

    const html = await request.get("https://salonlady.net/my-salon-pricing/");

    const $ = await cheerio.load(html);
    const rows=[];
    $('table > tbody > tr').each((index, element)=>{
        const inner = $(element).find("td");
        const FirstName = $(inner[0]).text();
        const MidName = $(inner[1]).text();
        const LastName = $(inner[2]).text();
        let row = {FirstName, MidName, LastName};
        rows.push(row);
    });

   // console.log(rows)
    return rows;
}

async function second(){
    let vv= await main()
    console.log(vv)
}

second();




