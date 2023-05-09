function wypiszWielomian(wielomian){
    n = wielomian.length;1
    let result = "";
    wielomian.forEach((element, idx) => {
        
        result += String(element.toFixed(4))
        if((n-1 - idx)>1){ 
            result += "x^" + String(n-1 - idx);
        }else if((n-1 - idx) == 1){
            result += "x";
        }else{
            result += " ";
        }
        if(idx != n-1){
            result += " + "
        }
        
    });
    console.log(result)

    return (result)
}



function gauss(macierz, n, eps){
    // console.log('Gaus macierz')
    // console.log(macierz)
    for(let i=0; i< n; i++){
        if(Math.abs(macierz[i][i]) < eps){
            console.log('nie mozna dzielic przez 0, macierz nieoznaczona')
            alert('nie mozna dzielic przez 0, macierz nieoznaczona')
            return false
        }
    }
    for(let i=0; i < n-1; i++){
        for(let j=i+1; j< n; j++){
            let mnoznik = macierz[j][i]/macierz[i][i]
            for(let g=0; g < n+1; g++){
                macierz[j][g] -= macierz[i][g] * mnoznik
            }
        }
    }

    let result = [];

    for(let i=n-1; i >=0; i--){
        let suma = 0;
        for(let j = n-1; j >= i+1 ; j--){
            suma += macierz[i][j] * result[j];
        }
        if(Math.abs(macierz[i][i]) < eps){
            console.log('nie mozna dzielic przez 0, macierz nieoznaczona')
            alert('nie mozna dzielic przez 0, macierz nieoznaczona')
            return false
        }
        result[i] = (macierz[i][n] - suma) / macierz[i][i]
    }
    // console.log(result)

    // result.forEach((element, index )=> {
    //     console.log('X'+ parseInt(index+1) + '=' + element.toFixed(4))
    // });
    // console.log('Gaus result')
    //console.log(result)
    return result
}

function interpolacjaNewtona(tabX, tabY, xList) {
    //let xList = [2];
    let n = tabX.length;
 
    let rozniceDzielone = [];
    
    for (let i = 0; i < n; i++) {
        rozniceDzielone.push(tabY[i]);
    }

    for (let j = 1; j < n; j++) {
        for (let i = n - 1; i >= j; i--) {
            rozniceDzielone[i] = (rozniceDzielone[i] - rozniceDzielone[i - 1]) / (tabX[i] - tabX[i - j]);
        }
    }
    //console.log("rozniceDzielone")
    //console.log(rozniceDzielone)

    let listOfYvalues = [];
    let rawYvalues = []
    xList.forEach(x => {
        let y = rozniceDzielone.slice(-1);
        //console.log('rozniceDzielone.pop')
        //console.log(y)
        for(let i = n - 2; i >= 0; i--){
            y = rozniceDzielone[i] + (x - tabX[i]) * y;
            //console.log('y')
            //console.log(y)
        }
        let text = "dla x = " + x + " y = " + y.toFixed(4);
        console.log(text);
        listOfYvalues.push(text)
        rawYvalues.push(y)
    });

    return {rozniceDzielone, listOfYvalues, rawYvalues};
}


function aproksymacja(tabX, tabY, n){
    eps = 1e-12
    let macierz = new Array(n).fill(0).map(() => new Array(n+1).fill(0));

    for (let i = 0; i < n; i++) {
        let counter = i;
        let sum = 0;
        for (let j = 0; j < tabX.length; j++) {
            sum += Math.pow(tabX[j], counter) * tabY[j];
        }
        //console.log(macierz[n - (i+1)][n])

        //console.log(sum)
        macierz[n - (i+1)][n] = sum;
        for (let j = 0; j < n; j++) {
            let sum = 0;
            for (let l = 0; l < tabX.length; l++) {
                sum += Math.pow(tabX[l], counter);
            }
            //console.log(macierz[n-1 - i][n - j-1])
            macierz[n-1 - i][n - j-1] = sum;
            //console.log(macierz[n-1 - i][n - j-1])
            counter++;
        }
    }
    // console.log("console.log(macierz)")
    // console.log(macierz)

    // console.log("console.log(n)")
    // console.log(n)
    return gauss(macierz, n, eps);
}

function mian () {
    let tabX = [-1, 0, 1, 2]
    let tabY = [6, 1, 6, 2]

    let xList = [-3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]
    let xListGen = []
    for (let i = -3; i <=4; i += 0.5 ){
        xListGen.push(i)
    }



    console.log("Łukasz Belka indeks 156162")
    console.log("Dane:")
    console.log("tablica X: " + tabX)
    console.log("tablica Y: " + tabY + "\n")

    let wielomian = aproksymacja(tabX, tabY, 4)

    let {rozniceDzielone, listOfYvalues, rawYvalues} = interpolacjaNewtona(tabX, tabY, xListGen);
    //console.log(listOfYvalues)

    console.log('\n Wielomian interpolujący:');
    stringWielomian = wypiszWielomian(wielomian)

    console.log("\n Tablica różnic dzielonych")
    console.log(rozniceDzielone)


    let wielomian2 = aproksymacja(tabX, tabY, 3)
    console.log('\n aproksymacja wielominu stopania 2:');
    //console.log(wielomian2)
    stringWielomian2 = wypiszWielomian(wielomian2)

    let wielomian1 = aproksymacja(tabX, tabY, 2)
    //console.log('')
    console.log('\n aproksymacja wielominu stopania 1:');
    let stringWielomian1 = wypiszWielomian(wielomian1)

    //console.log(newton)

    if (typeof window !== 'undefined'){
        const container = document.getElementById('maincontainer2');
        // const text = document.createElement('p');
        // text.textContent += 'Dane wejsciowe'
        // tabX.forEach(element => {
        //     const text = document.createElement('p');
        //     text.textContent += 'Dane wejsciowe'
        //     container.appendChild(text);
        // });

        createData(["Łukasz Belka indeks 156162", "Dane:", `tablica X: ${tabX}`, `tablica Y: ${tabY}`, listOfYvalues], 1);
        createData(["Wielomian interpolujący:", stringWielomian, `Tablica różnic dzielonych`, rozniceDzielone.join(" , "), "aproksymacja wielominu stopania 2:", stringWielomian2, "aproksymacja wielominu stopania 1:", stringWielomian1], 2);
        // wykres dostepny: https://www.geogebra.org/calculator/tzj6qnrs
        let linkGeo = document.createElement("a");
        linkGeo.href = "https://www.geogebra.org/calculator/tzj6qnrs";
        linkGeo.target = "_blank";
        linkGeo.textContent = "Link do wykresu w GeoGebra"
        container.appendChild(linkGeo)


        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        let listForChart = []
        xListGen.forEach((X, idx)  => {
            let tempArray = [X, rawYvalues[idx]]
            listForChart.push(tempArray)

        });

        function drawChart() {
            let data = new google.visualization.DataTable();
            data.addColumn('number', 'Wartość Osi X');
            data.addColumn('number', 'warość Osi Y');
            data.addRows(listForChart);

            let options = {
            title: 'Wykres Funkcji ',
            curveType: 'function',
            pointShape: 'circle',
            legend: { position: 'bottom' },
            //chartArea: {left: "5%", width: "60%", top: "15%",bottom: "15%", height: "100%"},
            explorer: { actions: ["dragToZoom", "rightClickToReset"]},
            axis: "horizontal",
            keepInBounds: true,
            maxZoomIn: 20.0,
            width: 700,
            height: 500,
        
            };
            let chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(data, options);

        }


    }

    
}

function createData(text, contNum=1, array=null){
    console.log(typeof(text[4]) )
    text.forEach(element => {
        if(typeof(element) == "string"){
        const container = document.getElementById('maincontainer' + contNum);
        const text = document.createElement('p');
        text.textContent += element;
        container.appendChild(text);
        
        } else {
            element.forEach(elementArray => {
                const container = document.getElementById('maincontainer' + contNum);
                const text = document.createElement('p');
                text.textContent += elementArray;
                container.appendChild(text);
            });

        }
    });

}

mian()