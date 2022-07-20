var exfSlider = document.getElementById("exf_slider");
var buyingAmount = document.getElementById("buying_amount");
var factor = document.getElementById("factor");
var totalAmount = document.getElementById("total_amount");
var availableExfTitle = document.getElementById("available_exf");
var calculateExfTitle = document.getElementById("calculate_exf");
var bAmount=0.0;
var minAmount=50;
var startupExf=250000000;
var availableExf=250000000;
var topButton = document.getElementById("toTopBtn");

var sList=[];

exfSlider.value=availableExf;
availableExfTitle.innerHTML=availableExf.format(2, 3, '.', ',')+" EXF";

function exfCheckBuyingAmount(){
    $("#buying_amount").removeClass("is-invalid");
    bAmount=parseFloat(buyingAmount.value);
    if(bAmount<minAmount || bAmount%minAmount!=0 || bAmount>availableExf){
        $("#buying_amount").addClass("is-invalid");
        totalAmount.innerHTML="0 EXF";
        if(bAmount>availableExf){
            buyingAmount.value=availableExf;
            bAmount=availableExf;
            calculate();
        }else if(bAmount<0){
            buyingAmount.value=minAmount;
            bAmount=minAmount;
            $("#buying_amount").removeClass("is-invalid");            
            calculate();
        }
        return false;
    }else{
        return true;
    }    
}
function calculate(){ 
    var difference=parseFloat(startupExf-availableExf);
    var max=25000;
    if(difference>2500000){
        var segment=parseInt(difference/2500000);
        for(var i=0;i<segment;i++){
            max+=1200+(i*16.18);
        }
    }
    var cfactor=parseFloat(10*bAmount/max);
    if(cfactor<3) cfactor=3;
    if(cfactor>10) cfactor=10;
    factor.value=cfactor.toFixed(2);
    totalAmount.innerHTML=(parseFloat(bAmount*cfactor)).format(2, 3, '.', ',')+" EXF";
}
function calculateTotal(tiggerControl){
    switch(tiggerControl){
        case "exf_slider":
            availableExf=parseFloat(exfSlider.value);
            calculateExfTitle.innerHTML=availableExf.format(2, 3, '.', ',')+" EXF";
            break;
        case "buying_amount":
            if(parseFloat(buyingAmount.value)<minAmount && parseFloat(buyingAmount.value)>startupExf){
                exfSlider.setAttribute("min", minAmount);
                return false;
            }else{
                var newMin=parseFloat(buyingAmount.value);
                if(newMin<minAmount) newMin=minAmount;
                exfSlider.setAttribute("min",newMin);
                if(parseFloat(exfSlider.value)<newMin){
                    exfSlider.value=newMin;
                }
            }
            break;
    }
    if(exfCheckBuyingAmount()){
        calculate();
    }
}

$(window).scroll(function () {
    /*
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    if (scrolled > 9) {
        $("#nav-id").css("transition", "all ease 0.3s");
        $("#nav-id").css("background", "rgba(14, 13, 45,0.9)");
    } else {
        $("#nav-id").css("transition", "all ease 0.3s");
        $("#nav-id").css("background", "rgba(0, 0, 0, 0)");
    }
    */
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }    
});

if(navigator.share !== undefined) {
    var shareLinkElement = document.getElementById("share-link");
    if(typeof(shareLinkElement) != 'undefined' && shareLinkElement != null){
        document.addEventListener('DOMContentLoaded', e => {
            shareLinkElement.addEventListener('click', clickEvent => {
              clickEvent.preventDefault();
              navigator.share({title: document.title, text: window.location.href, url: window.location.href})
                .then(() => console.log('Successful share'),
                 error => console.log('Error sharing:', error));
            });
          });            
    }        
}

function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
