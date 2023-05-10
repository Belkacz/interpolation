function wrotePolynomial(wielomian){
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
        let text = "dla x = " + x.toFixed(1) + " y = " + y.toFixed(4);
        console.log(text);
        listOfYvalues.push(text)
        rawYvalues.push(y)
    });

    return {rozniceDzielone, listOfYvalues, rawYvalues};
}


function aproximation(tabX, tabY, n){
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
    for (let i = -3; i <=4; i += 0.1 ){
        xListGen.push(i)
    }

    console.log("Łukasz Belka indeks 156162")
    console.log("Dane:")
    console.log("tablica X: " + tabX)
    console.log("tablica Y: " + tabY + "\n")

    let wielomian = aproximation(tabX, tabY, tabX.length)

    let {rozniceDzielone, listOfYvalues, rawYvalues} = interpolacjaNewtona(tabX, tabY, xListGen);
    //console.log(listOfYvalues)

    console.log('\n Wielomian interpolujący:');
    stringPolynomial = wrotePolynomial(wielomian)

    console.log("\n Tablica różnic dzielonych")
    console.log(rozniceDzielone)


    let wielomian2 = aproximation(tabX, tabY, 3)
    console.log('\n aproksymacja wielominu stopnia 2:');
    //console.log(wielomian2)
    stringPolynomial2 = wrotePolynomial(wielomian2)

    let wielomian1 = aproximation(tabX, tabY, 2)
    //console.log('')
    console.log('\n aproksymacja wielominu stopnia 1:');
    let stringPolynomial1 = wrotePolynomial(wielomian1)

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

        createData([ "Dane:", `tablica X: ${tabX}`, `tablica Y: ${tabY}`, listOfYvalues], 1);
        createData(["Wielomian interpolacja:", stringPolynomial, `Tablica różnic dzielonych`, rozniceDzielone.join(" , "), "aproksymacja wielominu stopnia 2:", stringPolynomial2, "aproksymacja wielominu stopnia 1:", stringPolynomial1], 2);
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
            //console.log(rawYvalues[idx].toFixed(4));
            let tempArray = [X, rawYvalues[idx], 'point { size: 18; shape-type: star; fill-color: #a52714; }']
            listForChart.push(tempArray)

        });

        function drawChart() {
            let data = new google.visualization.DataTable();
            data.addColumn('number', 'Wartość Osi X');
            data.addColumn('number', 'Wartość Osi Y');
            data.addColumn({type: 'string', role: 'style'}); // kolumna z typem string
        
            // dodaj punkty do tabeli, przypisując odpowiednie wartości liczbowe i styl punktu
            // let temp = 2.0000;
            // let ponit1ChangeFlag = false;
            // let ponit2ChangeFlag = false;
            listForChart.forEach(function(point, idx) {
                //console.log(point)
                //let pointY = point[1]
                //console.log(point[1].toFixed(4))
                //console.log(point[0]== 2 && point[1].toFixed(3) == 2)

                for(let i = 0; i <= tabX.length; i ++){
                    if(point[0].toFixed(4) == tabX[i]){
                        data.addRow([point[0], point[1], 'point { size: 8; shape-type: star; fill-color: #a52714;, curveType: none }'])
                    }
                    else {
                        data.addRow([point[0], point[1], null])
                    }
                }

                // if(point[0].toFixed(4) == -1.0000){
                //     data.addRow([-1, tabY[0], 'point { size: 6; shape-type: star; fill-color: #a52714;, curveType: none }'])
                // }
                // else if(point[0].toFixed(4) == 0.0000 ){
                //     data.addRow([0, tabY[1], 'point { size: 6; shape-type: star; fill-color: #a52714;, curveType: none }'])
                // }
                // else if(point[0].toFixed(4) == 1.0000 ){
                //     data.addRow([1, tabY[2], 'point { size: 6; shape-type: star; fill-color: #a52714;, curveType: none }'])
                // }
                // else if(point[0].toFixed(4) == 2.0000 ){
                //     data.addRow([2, tabY[3], 'point { size: 6; shape-type: star; fill-color: #a52714;, curveType: none }'])
                // }else {
                //     data.addRow([point[0], point[1], null])
                // }

                
                
            });
            //console.log(data)
        
            let options = {
                title: 'Wykres Funkcji ',
                curveType: 'function',
                chartArea: { left: '10%', width: '100%', top: '10%', height: '80%' },
                pointShape: 'circle',
                legend: { position: 'bottom' },
                explorer: { actions: ["dragToZoom", "rightClickToReset"]},
                axis: "horizontal",
                keepInBounds: true,
                maxZoomIn: 100.0,
                width: 600,
                height: 700,
                pointSize: 1,
                legend: { position: 'bottom' },
                series: {
                    0: { 
                        // lineWidth: 3, // opcje dla pierwszej serii danych
                        // lineDashStyle: [5, 2],
                        // pointShape: { type: 'star', sides: 5, dent: 2.05 },
                        label: 'Druga seria danych'
                    },
                },
                hAxis: {
                    //viewWindowMode: 'pretty',
                    title: 'Wartość Osi X',
                    //  minValue: 3,
                    maxValue: 1,
                    titleTextStyle: {
                      color: '#333',
                      fontSize: 14,
                      bold: true,
                      italic: false
                    },
                    textStyle: {
                        color: '#333',
                        fontSize: 12,
                        bold: false,
                        italic: false
                      },
                    },
                    vAxis: {
                        title: 'Wartość Osi Y',
                        titleTextStyle: {
                          color: '#333',
                          fontSize: 14,
                          bold: true,
                          italic: false
                        },
                        textStyle: {
                          color: '#333',
                          fontSize: 12,
                          bold: false,
                          italic: false
                        },
                      }
                
            };
            let chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
    }

    
}

function createData(text, contNum=1, array=null){
    //console.log(typeof(text[4]) )
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