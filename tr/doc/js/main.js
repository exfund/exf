var copyLink=location.href;
var copyLinkElement = document.getElementById("copy-link");
var topButton = document.getElementById("toTopBtn");

if(typeof(copyLinkElement) != 'undefined' && copyLinkElement != null){
    document.getElementById("copy-link").addEventListener('click', function() { 
        console.log("Kopya linki fonksiyonu da var");
        try {
            navigator.clipboard.writeText(copyLink)
            .then(() => {
              $.toast({
                text: 'Link kopyalandı',
                position: 'top-right',
                stack: false
              });              
            });
          } catch(err) {
            $.toast({
                text: 'Hata. Link kopyalamanadı.',
                position: 'top-right',
                stack: false
              });              
          }        
     }, false);    
}

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

document.addEventListener("DOMContentLoaded", function () {
    
    highlightHeader();
    document.querySelectorAll('.sidebar .nav-link').forEach(function (element) {

        element.addEventListener('click', function (e) {

            let nextEl = element.nextElementSibling;
            let parentEl = element.parentElement;

            if (nextEl) {
                e.preventDefault();
                let mycollapse = new bootstrap.Collapse(nextEl);

                if (nextEl.classList.contains('show')) {
                    mycollapse.hide();
                } else {
                    mycollapse.show();
                    // find other submenus with class=show
                    var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                    // if it exists, then close all of them
                    if (opened_submenu) {
                        new bootstrap.Collapse(opened_submenu);
                    }
                }
            }
        }); // addEventListener
    }) // forEach
});

setInterval(() => {
    $("ul .nav-link").css("color", "#f5f5f5");
}, 0);

window.onscroll = function () { highlightHeader() };

function highlightHeader(){
    var windowIHeight=window.innerHeight;
    var middlePage=parseInt(windowIHeight/2);
    $('.highlight').each(function(i, element) {
        var rect = element.getBoundingClientRect();
        if(rect.top<=middlePage){
            $(".highlight-title").each(function(j, titleElement){
                $(titleElement).removeClass("highlight-side-header").removeClass("highlight-defalut");
                if(i==j){                    
                    copyLink=location.href;
                    $(titleElement).addClass("highlight-side-header");
                }else{
                    $(titleElement).addClass("highlight-defalut");
                }
            });
        }

    });    

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }    

}

function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

var isMenuOpen = false;

$(".getMenu").click(function () {
    if (isMenuOpen) return;
    else 
    {
        isMenuOpen = true;
        $(".getMenu").css("display", "none");
        $(".web-all .col-3").css("left", "-500px");
        $(".web-all .col-3").animate({ left: "0" }, 300);
    }
});

$(".closeBtn").click(function () {
    if (isMenuOpen) {
        isMenuOpen = false;
        $(".getMenu").css("display", "block");
        $(".web-all .col-3").animate({ left: "-500px" }, 300);
        setTimeout(() => {
            $(".web-all .col-3").css("left", "-999px");
        }, 300);
    }
    else return;
});