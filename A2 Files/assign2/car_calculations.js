var configurationPrice = new Array();
configurationPrice["manual"]=17790;
configurationPrice["automatic"]=18590;
configurationPrice["sManual"]=22455;
configurationPrice["sSportshift"]=23155;
var comboPrices = new Array();
comboPrices["comboOne"]=1235;
comboPrices["comboTwo"]=3354;
comboPrices["noCombo"]=0;

function calculateTotal() {
    var total = 0;
    for (var i = 0; i <4 ; i++) {
        if (document.getElementById("carForm").Configuration[i].checked ) {
            total += configurationPrice[document.getElementById("carForm").Configuration[i].value];
        }
    }
    for (var i = 0; i <3 ; i++) {
        if (document.getElementById("carForm").factoryOptions[i].checked ) {
            total += comboPrices[document.getElementById("carForm").factoryOptions[i].value];
        }
    }
    if (document.getElementById("Stereo").checked) 
        total += 550;
    if (document.getElementById("Security").checked) 
        total += 3990;
    if (document.getElementById("Mirror").checked) 
        total += 295;
    document.getElementById("total").value = total;
}

document.getElementById("totalButton").addEventListener("click",calculateTotal,false);

function changePhoto() {
    if (document.getElementById("red").selected ) {
        document.getElementById("photo").src =  'red.jpg';
    }  
    if (document.getElementById("blue").selected ) {
        document.getElementById("photo").src =  'blue.jpg';
    } 
    if (document.getElementById("silver").selected ) {
        document.getElementById("photo").src =  'silver.jpg';
    }  
    if (document.getElementById("white").selected ) {
        document.getElementById("photo").src =  'white.jpg';
    }  
    if (document.getElementById("black").selected ) {
        document.getElementById("photo").src =  'black.jpg';
    }  
}

document.getElementById("colorChoices").addEventListener("change",changePhoto,false);