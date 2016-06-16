$(document).ready(function(){
    $('#ins').on("click",function(e){
        e.preventDefault();
        $('.info .show').removeClass("show");
        $('#_ins').addClass("show");
    });
    $('#abo').on("click",function(e){
        e.preventDefault();
        $('.info .show').removeClass("show");
        $('#_abo').addClass("show");
    });
    $('#pla').on("click",function(e){
        e.preventDefault();
        $('.info').fadeOut("fast",function(){
            $('.info .show').removeClass("show");
            $('#main').addClass("show");
            $('.top').addClass("show");
            $('.pandc').addClass("show");
        });
    });
});