$(document).ready(function () {
    let numInputs = $('.question-input').length;

    $('.question-input').on('input', function () {
        let filledInputs = 0;

        $('.question-input').each(function () {
            if ($(this).val() !== '') {
                filledInputs++;
            }
        });

        let percentFilled = (filledInputs / numInputs) * 100;
        $('.progress-bar-fill').css('width', percentFilled + '%');
        $('.percentage').text(percentFilled + '%');

        if (percentFilled === 100) {
            $('.progress-bar-fill').addClass('filled');
            $('.percentage').addClass('filled');
        } else {
            $('.progress-bar-fill').removeClass('filled');
            $('.percentage').removeClass('filled');
        }
    });

    $('#submit-button').click(function (event) {
        event.preventDefault();

        let isFormValid = true;
        $('.question-input').each(function () {
            if ($(this).val() === '') {
                isFormValid = false;
                return false;
            }
        });

        if (isFormValid) {
            alert('Анкета отправлена!');
        } else {
            alert('Пожалуйста, заполните все поля анкеты.');
        }
    });
});

