const email = function() {
    const emailFormId = "contactForm";

    var form_data = {
        "access_token": "q88xqoxd4wn2bwznczr0d5m2"
    }

    var emailSubmit = document.getElementById("emailSubmit");
    emailSubmit.onclick = emailSend;


    function onSuccess() {
        // do something
        console.log("success");
        emailSubmit.value = "Sent!";
    }

    function onError(err) {
        // do something
        console.log(err);
        emailSubmit.value = "Error!";
    }



    async function emailSend() {

        emailSubmit.innerHTML = 'Sending…';
        emailSubmit.disabled = true;

        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                onSuccess();
            } else {
                if (request.readyState == 4) {
                    onError();
                } else {
                    console.log(request.readyState);
                }
            }
        };
        let subjectValue = document.querySelector('#subject').value;
        let subject = "io-stack contact request: " + subjectValue;
        let message = buildEmail();

        form_data['subject'] = subject;
        form_data['text'] = message;

        let params = toParams(form_data);

        request.open("POST", "https://postmail.invotes.com/send", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.send(params);

        return false;
    }



    function toParams(form_data) {
        let data = [];
        for (let key in form_data) {
            data.push(encodeURIComponent(key) + '=' + encodeURIComponent(form_data[key]));
        }

        return data.join('&');
    }

    var form = document.getElementById(emailFormId);
    form.addEventListener("submit", function(event) {
        event.preventDefault();
    });

    function buildEmail() {
        console.log("buildEmail");
        let name = document.querySelector('#name').value;
        let email = document.querySelector('#email').value;
        let subject = document.querySelector('#subject').value;
        let messageValue = document.querySelector('#message').value;

        let message = `
        Contact request from: ${name}.
        Email: ${email}
        Subject: ${subject}
        Message: ${messageValue}
        `;

        return message;
    }
}

export default email;