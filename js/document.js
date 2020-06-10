$(document).ready(function () {
    init();
    $(document).on("click", "#callBtn", function () {
        var addr = $(`input[id="callAddress"]`).val();
        call(addr);
    });
    $(document).on("deny", "#callBtn", function () {
        $('#income').empty();
        $('#cameraScreen').empty();
    });
    
})  