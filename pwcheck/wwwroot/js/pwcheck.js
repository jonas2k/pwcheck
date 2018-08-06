window.addEventListener('load', () => {

    var checkDelay = 1000;
    var pwinput = $("#pwinput");
    var isInProgress = false;
    var lastCheckedPassword = "";
    var timer = 0;

    $("#results").on("isLoading", () => {

        $("#results").empty().append(
            $("<span />").prop({ class: "row justify-content-center" }).append(
                $("<div />").prop({ class: "spinner" })
                    .append($("<div />").prop({ class: "spin1" }))
                    .append($("<div />").prop({ class: "spin2" }))
                    .append($("<div />").prop({ class: "spin3" })))
                .append($("<div />").text("Prüfvorgang läuft.")));
    });

    pwinput.on("keyup input", () => {

        clearTimeout(timer);

        var pwplain = pwinput.val();

        if (!isInProgress && pwplain && pwplain !== lastCheckedPassword) {

            $("#results").trigger("isLoading");

            timer = setTimeout(() => {
                isInProgress = true;
                var pwsha1 = SHA1(pwplain).toUpperCase();
                var pwsha1FirstPart = pwsha1.substring(0, 5);
                var pwsha1LastPart = pwsha1.substring(5);

                var jqXHR = $.ajax("https://api.pwnedpasswords.com/range/" + pwsha1FirstPart)
                    .done((data) => {

                        lastCheckedPassword = pwplain;

                        if (data.includes(pwsha1LastPart)) {
                            var responseList = data.split("\n");
                            var matches = 0;

                            for (i = 0; i < responseList.length; i++) {
                                if (pwsha1LastPart === responseList[i].split(":")[0]) {
                                    matches = responseList[i].split(":")[1];
                                }
                            }
                            $("#results").html("Das Passwort ist in " + numberWithCommas(matches) + " Datenleaks enthalten.");
                        } else {
                            $("#results").html("Das Passwort ist in keinen bekannten Datenleaks enthalten.");
                        }
                    })
                    .fail(() => {
                        $("#results").html("Fehler beim Abfragen.");
                    })
                    .always(() => {
                        isInProgress = false;
                    });
            }, checkDelay);


        } else if (pwplain === "") {
            $("#results").html("");
        }
    });
});