function fn1(){
    var str=document.getElementById("text1").value;
    var start_date=document.getElementById("text2").value;
    var end_date=document.getElementById("text3").value;
    fetch("https://api.polygon.io/v2/aggs/ticker/"+str+"/range/1/month/"+start_date+"/"+end_date+"?adjusted=true&sort=asc&limit=120&apiKey=uI2QR1IpsgmdSfoYrAHgMKXCIPEhS4DI")
    .then(function (response){
        if(response.status==200){
            return response.json();
        }
        else{
            console.log("Problem, Bad request!!");
        }
    })
    .then(function (jsonData){
        // // var close=jsonData.close;
        // var closingValue=document.createElement("h2");
        // closingValue.innerHTML=close;
        console.log(jsonData);
        // console.log(close);
        // document.body.appendChild(closingValue);
        let closing=[],opening=[];
        for(items in jsonData.results){
            closing.push({x:items,y:jsonData.results[items].c});
            opening.push({x:items,y:jsonData.results[items].o});
        };
        JSC.Chart('chartDiv', {
            title_label_text:'Stock Prices(in $) of your share for your given range',
            annotations: [{
                label_text: 'Source: Polygon Stocks API',
                position: 'bottom left'
            }],
            series: [
                {name:'Opening',points:opening},
                {name:'Closing',points:closing}
            ]
         });
        
        console.log([closing,opening]);
    })
}

