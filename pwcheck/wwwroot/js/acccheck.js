$(window).on("load", () => {

    var accinput, includeUnverified;
    var resultsDiv = $("#resultsContent");
    var detailsDiv = $("#detailsContent");

    $("#sendButton").on("click", () => {

        if (accinput !== $("#accinput").val() || includeUnverified !== $("#includeUnverified").prop('checked')) {

            accinput = $("#accinput").val();
            includeUnverified = $("#includeUnverified").prop('checked');
            detailsDiv.empty();

            if (accinput) {
                resultsDiv.empty().hide();
                $.ajax("https://haveibeenpwned.com/api/v2/breachedaccount/" + accinput + "?truncateResponse=true" + (includeUnverified ? "?includeUnverified=true" : ""))
                    .done((data, text, xhr) => {

                        $("#resultsHeading").removeAttr("Hidden");
                        $("#detailsHeading").removeAttr("Hidden");

                        if (xhr.status === 200) {
                            $.each(data, (index, value) => {
                                resultsDiv.append(
                                    $("<div />").prop({ class: "row align-items-center" }).append(
                                        $("<div />").prop({ class: "col-sm" }).append(value.Name))
                                        .append(
                                            $("<div />").prop({ class: "col-sm" }).append(
                                                $("<button />").prop({ id: value.Name + "Button", type: "button", value: value.Name, class: "detailsButton btn btn-outline-dark my-1" }).text("Details")))

                                );
                            });
                            $(".detailsButton").on("click", (event) => {
                                getBreachDetails($(event.target).attr("value"), detailsDiv);

                            });
                        }
                    })
                    .fail((xhr, text, error) => {

                        $("#resultsHeading").attr("Hidden", "");
                        $("#detailsHeading").attr("Hidden", "");

                        var msg;
                        if (xhr.status === 404) {
                            msg = "Dieser Anmeldename ist in keinem bekannten gestohlenen Datensatz enthalten!";
                        } else {
                            msg = "Fehler beim Abfragen der Daten.";
                        }
                        resultsDiv.append(
                            $('<div />').append(msg));
                    })
                    .always(function () {
                        resultsDiv.fadeIn("fast");
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

function getBreachDetails(breachName, targetDiv) {

    $.ajax("https://haveibeenpwned.com/api/v2/breach/" + breachName)
        .done((data) => {

            targetDiv.empty();

            var dottedPwnCount = numberWithCommas(data.PwnCount);
            var formattedDate = new Date(data.BreachDate).toLocaleDateString();

            targetDiv.append(
                getBreachLogo(data.Name, data.LogoType),
                getBreachDetailRow("Name:", data.Name),
                getBreachDetailRow("Datum:", formattedDate),
                getBreachDetailRow("Anzahl betroffener Nutzer:", dottedPwnCount),
                getBreachDetailRow("Betroffene Daten:", data.DataClasses.join(", ")),
                getBreachDetailRow("Bestätigter Hack:", data.IsVerified ? "Ja" : "Nein")
            );
        })
        .fail(() => {
            targetDiv.append(
                $('<div />').append("Fehler beim Abfragen der Details."));
        });
}

function getBreachLogo(name, logoType) {
    return (
        $("<div />").prop({ class: "row justify-content-center bg-dark rounded breach-logo" })
            .append(
                $("<img />").prop({ src: "https://haveibeenpwned.com/Content/Images/PwnedLogos/" + name + "." + logoType, class: "m-2" }))
    );
}

function getBreachDetailRow(description, data) {
    return (
        $("<div />").prop({ class: "row justify-content-center" })
            .append(
                $("<div />").prop({ class: "col col-sm text-right" }).text(description))
            .append(
                $("<div />").prop({ class: "col col-sm text-left" }).text(data))
    );
}