$(window).on("load", () => {

    var accinput, includeUnverified;
    var resultsDiv = $("#results");
    var detailsDiv = $("#details");

    $("#sendButton").on("click", () => {

        if (accinput !== $("#accinput").val() || includeUnverified !== $("#includeUnverified").prop('checked')) {

            accinput = $("#accinput").val();
            includeUnverified = $("#includeUnverified").prop('checked');

            resultsDiv.empty();
            detailsDiv.empty();

            if (accinput) {
                resultsDiv.empty().hide();

                $.ajax(
                    {
                        url: "AccountCheck/CheckAccount",
                        method: "POST",
                        data: { input: accinput, includeUnverified: includeUnverified }
                    })
                    .done((data, text, xhr) => {
                        if (xhr.status === 200) {
                            resultsDiv.html(data);
                        }
                    })
                    .fail(() => {
                        resultsDiv.html("Kann nicht mit dem Webserver kommunizieren.");
                    })
                    .always(() => {
                        resultsDiv.fadeIn("fast");
                        $(".detailsButton").on("click", (event) => {
                            var requestedBreach = $(event.target).attr("value");
                            getBreachDetails(requestedBreach, detailsDiv);
                        });
                    });
            }
        }
    });


    $("#accinput").keydown((event) => {
        if (event.keyCode === 13) {
            $("#sendButton").click();
        }
    });
});

function getBreachDetails(breachName, detailsDiv) {

    if (detailsDivDoesNotContainRequestedItem(breachName, detailsDiv)) {
        $.ajax(
            {
                url: "AccountCheck/GetBreachDetails",
                method: "POST",
                data: { breachName: breachName }
            })
            .done((data, text, xhr) => {
                if (xhr.status === 200) {
                    detailsDiv.html(data);
                }
            })
            .fail(() => {
                detailsDiv.html("Kann nicht mit dem Webserver kommunizieren.");
            })
            .always(() => {
                detailsDiv.fadeIn("fast");
            });
    }
}

function detailsDivDoesNotContainRequestedItem(requestedItem, detailsDiv) {
    return detailsDiv.find('.col').filter(":contains('" + requestedItem + "')").length === 0;
}