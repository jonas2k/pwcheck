window.addEventListener('load', () => {

    var timeoutput = (time, input) => {
        if (time) {
            time = "Benötigte Zeit zum Knacken des Passworts: " + time;
        } else {
            time = "";
        }
        $("#hsimptime").html(time);
    };

    var checksoutput = (checks, input) => {
        $("#hsimpchecks").html("");

        $.each(checks, (index, value) => {
            $("#hsimpchecks").append(
                $("<div />").prop({ class: value.level + "Badge" }).append(
                    $("<p />").append(

                        $("<div />").prop({ class: "lead" }).append(value.name)
                    ).append(
                        $("<div />").append(value.message)
                    )
                ));
        });
    };

    hsimp({
        options: {
            calculationsPerSecond: 1e10,
            good: 31557600e3,
            ok: 31557600
        },
        outputTime: timeoutput,
        outputChecks: checksoutput
    }, $("#pwinput")[0]);
});