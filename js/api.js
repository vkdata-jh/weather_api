document.addEventListener("DOMContentLoaded",()=>{


let header = document.createElement("header");
document.body.appendChild(header);
let btnH=document.createElement("button");
btnH.type="submit";
btnH.id="hourly";
btnH.classList="btn btn-primary mx-3";
btnH.innerText="hourly";
header.appendChild(btnH);

let btnD=document.createElement("button");
btnD.type="submit";
btnD.id="daily";
btnD.classList="btn btn-primary";
btnD.innerText="daily";
header.appendChild(btnD);

let tbl=document.createElement("table");
tbl.classList="table table-bordered table-hover";

document.getElementById("container").appendChild(tbl);

document.getElementById("hourly").addEventListener("click",()=>{
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=49.14&longitude=15.00&hourly=temperature_2m,precipitation,weathercode`)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        let forecasts=data;
        console.log(forecasts);
        let hour= forecasts.hourly.time;
        let tr=document.createElement("tr");
        tr.classList="row";            
            let th1= document.createElement("th");
            th1.innerText="čas";
            th1.className="col";
            let th2= document.createElement("th")
            th2.innerText="teplota";
            th2.className="col";
            let th3= document.createElement("th")
            th3.innerText="počasí";
            th3.className="col";
            let th4= document.createElement("th")
            th4.innerText="srážky";
            th4.className="col";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tbl.appendChild(tr);
        
        for (let i=0;i<hour.length;i++){
            
            let td1=document.createElement("td");
            td1.classList="col";
            const dayTime= new Date(forecasts.hourly.time[i]);
            td1.innerText=String(dayTime.getDate()+"."+(dayTime.getMonth()+1)+" "+dayTime.getHours()+":00 hod.");
            let td2=document.createElement("td");
            td2.classList="col";
            td2.innerText=String(forecasts.hourly.temperature_2m[i]+" °C"); 
            let td3=document.createElement("td");
            td3.classList="col";
            td3.appendChild(createCell(forecasts.hourly.weathercode[i]));            
            let td4=document.createElement("td");
            td4.classList="col";
            td4.innerText=String(forecasts.hourly.precipitation[i]+" mm");            
            
            let tr1=document.createElement("tr");  
            tr1.classList="row"        
            tr1.appendChild(td1);
            tr1.appendChild(td2);
            tr1.appendChild(td3);
            tr1.appendChild(td4);
            tbl.appendChild(tr1);
        };

    });
})

document.getElementById("daily").addEventListener("click",()=>{
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=49.14&longitude=15.00&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,sunrise,sunset&timezone=auto`)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        let forecasts=data;
        console.log(forecasts);
        
        let tr=document.createElement("tr");
tr.classList="row";
            
            let th1= document.createElement("th");
            th1.innerText="den";
            th1.className="col";
            let th2= document.createElement("th")
            th2.innerText="teplota";
            th2.className="col";
            let th3= document.createElement("th")
            th3.innerText="počasí";
            th3.className="col";
            let th4= document.createElement("th")
            th4.innerText="srážky";
            th4.className="col";
            let th5= document.createElement("th")
            th5.innerText="slunce";
            th5.className="col";
            
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tbl.appendChild(tr);
        
        for (let i=0;i<forecasts.daily.time.length;i++){
            let tr1=document.createElement("tr");  
            tr1.classList="row" 
            let td1=document.createElement("td");
            td1.classList="col";
            const dayTime= new Date(forecasts.daily.time[i]);
            td1.innerText=String(dayTime.getDate()+"."+(dayTime.getMonth()+1)+"."+dayTime.getFullYear());
            let td2=document.createElement("td");
            td2.classList="col";
            td2.innerText=String(forecasts.daily.temperature_2m_min[i]+" °C"+"/"+forecasts.daily.temperature_2m_max[i]+" °C");  
            let td3=document.createElement("td");
            td3.classList="col";
            td3.appendChild(createCell(forecasts.daily.weathercode[i])); 
            let td4=document.createElement("td");
            td4.classList="col";
            td4.innerText=String(forecasts.daily.precipitation_sum[i]+" mm"); 
            let td5=document.createElement("td");
            td5.classList="col";
            let timeRise=new Date(forecasts.daily.sunrise[i]);
            let timeSet=new Date(forecasts.daily.sunset[i]);
            sunrise=document.createElement("i");
            sunrise.className="bi bi-sunrise";            
            const sunset=document.createElement("i");
            sunset.className="bi bi-sunset";
            td5.innerHTML=sunrise;
            td5.innerText=String(+timeRise.getHours()+":"+ timeRise.getMinutes() +" / "+ timeSet.getHours()+":"+timeSet.getMinutes());
            
            td5.appendChild(sunset);

                   
            tr1.appendChild(td1);
            tr1.appendChild(td2);
            tr1.appendChild(td3);
            tr1.appendChild(td4);
            tr1.appendChild(td5);            
            tbl.appendChild(tr1);
        };

    });
})

function weather(weather) { 
    code=Number(weather);
    if (code==0) return "bi bi-sun";    
    if (code>=1 && code<=3) return "bi bi-cloud-sun";    
    if (code>=45&code<=48) return "bi bi-cloud-fog2";
    if (code>=51&code<=57) return "bi bi-cloud-drizzle"; 
    if (code>=61&code<=67) return "bi bi-cloud-rain-heavy"; 
    if (code>=71&code<=77||code>=85&code<=86 ) return "bi bi-cloud-snow";
    if (code>=80&code<=82) return "bi bi-cloud-rain";    
    if (code>=95&code<=99) return "bi bi-cloud-lightning-rain";  
    }


function createCell(code){
    console.log(code);
    let cell=document.createElement("i");
    cell.classList=weather(code);
    console.log(cell);
    return cell;
    

}
})
