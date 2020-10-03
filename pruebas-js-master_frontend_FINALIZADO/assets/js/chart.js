var Chart = {
 init:function(){
    this.actions();
    this.InitChar("charCardOne","card_one");
 },
 actions: function(){
    let _this = this;
    $("body").on("click",".btnCardPrev", function(){
        let id        = $(this).data("id");
        let classname = $(this).data("classname");
        _this.InitChar(classname,"card_two");
    });


    $("body").on("click",".btnCardNumber", function(){
        let id        = $(this).data("id");
        let classname = $(this).data("classname");
        _this.InitChar(classname,id);
    });


 },

 InitChar: function(className, cardClass){
    // window.onload = function () {

        var options = {
            animationEnabled: true,  
            title:{
                text: "PRUEBA CHART"
            },
            axisX: {
                valueFormatString: "MMM"
            },
            axisY: {
                title: "ventas",
                prefix: "$",
                includeZero: false
            },
            data: [{
                yValueFormatString: "$#,###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: [
                    { x: new Date(2017, 0), y: 25060 },
                    { x: new Date(2017, 1), y: 27980 },
                    { x: new Date(2017, 2), y: 33800 },
                    { x: new Date(2017, 3), y: 49400 },
                    { x: new Date(2017, 4), y: 40260 },
                    { x: new Date(2017, 5), y: 33900 },
                    { x: new Date(2017, 6), y: 48000 },
                    { x: new Date(2017, 7), y: 31500 },
                    { x: new Date(2017, 8), y: 32300 },
                    { x: new Date(2017, 9), y: 42000 },
                    { x: new Date(2017, 10), y: 52160 },
                    { x: new Date(2017, 11), y: 49400 }
                ]
            }]
        };
        $("."+className).CanvasJSChart(options);
        $(".card").css("display","none");
        $("."+cardClass).css("display","block");

    // }
 },
}
$(document).ready(function(){
    Chart.init();
});