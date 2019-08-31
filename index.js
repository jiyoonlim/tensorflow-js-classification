let net;

async function loadModel() {
    console.log('Loading mobilenet..');

    // Load the model.
    net = await mobilenet.load();
    console.log('Sucessfully loaded model');
}

loadModel();

async function predict() {
    console.log("Starting to predict..")

    // Make a prediction through the model on our image.
    const imgEl = document.getElementById('img');
    const result = await net.classify(imgEl);
    console.log(result);

    text = "";
    for (i = 0; i < result.length; i++) { 
        text += "No." + (i + 1) + ": " + result[i].className + "(probability:" + result[i].probability + ")\n";
    }

    window.confirm(text);
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#imgInp").change(function () {
    readURL(this);
    predict()
});
