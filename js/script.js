$(document).ready(function(){

    // creiamo un oggetto moment sulla data di partenza 2018-01-01
    var dataCorrente = moment("2018-01-01");
    console.log(dataCorrente);
    $("h1.month").html(dataCorrente.format("MMMM") + " " + dataCorrente.format("YYYY"));
    var meseCorrente = dataCorrente.format("MMMM");
    var annoCorrente = dataCorrente.format("YYYY");

    // ciclo for per generare tutti i giorni dei mesi

    var gioDelMese = dataCorrente.daysInMonth();
    for(var i = 1; i<=gioDelMese; i++){
        // console.log(i);
        var source = document.getElementById("day-template").innerHTML;
        var template = Handlebars.compile(source);

        var context = {
            day: i,
            month: meseCorrente,
            completeDate: annoCorrente + "-" + meseCorrente + "-" + i,
        };
        var html = template(context);

        $(".month-list").append(html);
    }

    $.ajax(
        {
            url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
            method: "GET",
            success: function(risposta){
                console.log(risposta.response);
                for (var i = 0; i < risposta.response.length; i++){
                    var listItem = $('li[data-complete-date=' + '"' + risposta.response[i].date + '"' +']');
                    console.log(listItem);
                    listItem.append("-" + risposta.response[i].name) // {"name":"Capodanno",
                }
            }
    });

});
