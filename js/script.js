$(document).ready(function(){

    // creiamo un oggetto moment sulla data di partenza 2018-01-01
    var dataCorrente = moment($('h1.month').attr('data-this-date'));
    console.log(dataCorrente);

    inserisciDate(dataCorrente); // richiamo la funzione inserisciDate
    inserisciFestivo(dataCorrente); // richiamo la funzione inserisciFestivo

    $("button#next").click(function(){
        next(dataCorrente);
    });

    $("button#prev").click(function(){
        prev(dataCorrente);
    })

    // ciclo for per generare tutti i giorni dei mesi

function inserisciDate(data){
    $('ul.month-list').empty(); // svuoto l'elenco con empty()
    var meseCorrente = data.format("MMMM");
    var annoCorrente = data.format("YYYY");

    $("h1.month").html(data.format("MMMM") + " " + data.format("YYYY"));

    var gioDelMese = data.daysInMonth();
    for(var i = 1; i<=gioDelMese; i++){
        // console.log(i);
        var source = document.getElementById("day-template").innerHTML;
        var template = Handlebars.compile(source);

        var context = {
            day: addZero(i),
            month: meseCorrente,
            completeDate: annoCorrente + "-" + data.format("MM") + "-" + addZero(i),
        };
        var html = template(context);

        $(".month-list").append(html);
    }
}

function inserisciFestivo(data){
    $.ajax(
        {
            url: "https://flynn.boolean.careers/exercises/api/holidays",
            method: "GET",
            data:{
                year: data.year(),
                month: data.month(),
            },
            success: function(risposta){
                console.log(risposta.response);
                for (var i = 0; i < risposta.response.length; i++){
                    var listItem = $('li[data-complete-date="' +
                    risposta.response[i].date + '"]');
                    listItem.addClass("festa");
                    listItem.append('-' + risposta.response[i].name);
                    console.log(listItem);
                }
            },
            error: function (){
                alert("Attenzione! Si è veriricato un errore");
            }
    });

    }

    function addZero(n){
        if(n < 10){
            return "0" +n;
        }
        return n;
    }

    function next(data){
        if(data.month() == 11){
            alert("non puoi andare avanti!");
        } else {
            data.add(1, "month")
            inserisciDate(data);
            inserisciFestivo(data);
        }
    }

    function prev(data){
        if(data.month() == 0){
            alert("non puoi tornare indietro");
        } else {
            data.subtract(1, "month");
            inserisciDate(data);
            inserisciFestivo(data);
        }
    }

});
