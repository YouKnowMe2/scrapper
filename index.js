import express from 'express';
import cors from 'cors'
import $ from "jquery";
//import a from './views/urlScraper.js'
import fetch from 'node-fetch';
import {
    load
} from 'cheerio';
const PORT = 3000;

const app = express();
app.use(cors())

import SerpApi from 'google-search-results-nodejs';
const search = new SerpApi.GoogleSearch("c32fa7752f0dc3005ea7df3fe9531327e5f4e0e5e7e0226a3589ff8e1e08d8f5");

app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}))



app.get('/', (req, res) => {
    res.render('pages/index', {
        gData:"",
        url:"",
        warning:""
    });
})





let allData = [];

app.post('/abc', (req, res) => {
    let data = req.body.urlName
    allData= [];
    let data2 = "https://firstsiteguide.com/best-blogging-platforms/";


    async function callAll(a) {
        let heading = [];
        let heading2 = [];
        let heading3 = [];
        let heading4 = [];
        let heading5 = [];
        let heading6 = [];

        const url = `${a}`;
        //console.log(b)
        const response = await fetch(url);
        const body = await response.text();



        let $ = load(body);



        $('h1,h2,h3,h4,h5,h6').each((i, el) => {

            allData.push($(el));


        })
        // let tag=['h1','h2','h3','h4','h5','h6']
        // for(let i=0;i<tag.length;i++){
        //     let b = $(tag[i])
        //     b.each((i,e) => {
        //         allData.push($(e))
        //
        //     });
        // }


        // let k = $('h1')
            // k.each((i,e) => {
            //     heading.push($(e).text())
            // });
            //
            // let b = $('h2')
            // b.each((i,e) => {
            //
            //     heading2.push($(e).text())
            //
            // });
            //
            //
            // let c = $('h3')
            // c.each((i,e) => {
            //     heading3.push($(e).text())
            //
            // });
            //
            //
            // let d = $('h4')
            // d.each((i,e) => {
            //     heading4.push($(e).text())
            //
            // });
            //
            //
            // let e = $('h5')
            // e.each((i,e) => {
            //     heading5.push($(e).text())
            //
            // });


            // let f = $('h6')
            // f.each((i,e) => {
            //     heading6.push($(e).text())
            //
            // });

        // allData.push("title")
        // allData.push(url)
        // allData.push(heading)
        // allData.push(heading2)
        // allData.push(heading3)
        // allData.push(heading4)
        // allData.push(heading5)
        // allData.push(heading6)




        //console.log(z)


        //
        // res.render('pages/index',{
        //     gData:allData,
        //     url: data,
        //     warning:""
        // })
        //console.log(allData)

    }

    if(data!=""){


        // callAll(data)


        const params = {
            engine: "google",
            q: data,
            "hl": "en",
            location: "Bangladesh",
            safe: "active",
            "gl": "bd",
            num: "6",
        };
        const callback = async function(value) {
            for( let i=0;i<value["organic_results"].length;i++){

                // allData.push("<h1>"+value["organic_results"][i]["title"]+"</h1>")
                allData.push("<h1> <a href= "+value["organic_results"][i].link+">"+value["organic_results"][i]["title"]+"</a></h1>")
                await callAll(value["organic_results"][i].link)
                console.log(value["organic_results"][i].link)

            }

            res.render('pages/index',{
                gData:allData,
                url: data,
                warning:""
            })


        };
        search.json(params, callback);



    }
    else{
        res.render('pages/index',{
            gData :"",
            url:"Search",
            warning:"Please Provide URL"

        })

    }




})




app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
})