$(document).ready(function(){

    // creiamo un oggetto moment sulla data di partenza 2018-01-01
    var dataCorrente = moment("2018-01-01");
    console.log(dataCorrente);
    $("h1.month").html(dataCorrente.format("MMMM") + " " + dataCorrente.format("YYYY"));
    var meseCorrente = dataCorrente.format("MMMM");

    // ciclo for per generare tutti i giorni dei mesi

    var gioDelMese = dataCorrente.daysInMonth();
    for(var i = 1; i<=gioDelMese; i++){
        // console.log(i);
        var source = document.getElementById("day-template").innerHTML;
        var template = Handlebars.compile(source);

        var context = {
            day: i,
            month: meseCorrente,
        };
        var html = template(context);

        $(".month-list").append(html);


    }

});
