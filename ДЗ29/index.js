let fileInput = document.getElementById('file-input');
let convertButton = document.getElementById('convert-button');

const rates = {
    USD: 448.5,
    EUR: 493.5,
    RUB: 5.45,
};

let regex = /(\d+(\.\d{1,2})?)[\s]*(USD|€|₽|\$|EUR| руб|RUB)/gi;

convertButton.addEventListener('click', async () => {
    if (fileInput.files.length === 0) {
        alert('Выберите файл для конвертации');
        return;
    }

    let file = fileInput.files[0];
    let fileName = file.name.replace(/\.[^/.]+$/, '') + '_converted';
    let fileExtension = file.name.split('.').pop();
    let fileReader = new FileReader();

    fileReader.onload = async (event) => {
        let fileContent = event.target.result;
        fileContent = fileContent.replace(regex, (match, p1, p2, p3) => {
            let amount = parseFloat(p1);
            let currency = p3;

            if (currency === '€') currency = 'EUR';
            if (currency === '₽') currency = 'RUB';
            if (currency === '$') currency = 'USD';

            const convertedAmount = (amount * rates[currency]).toFixed(2);
            return `${convertedAmount} ₸`;
        });

        let blob = new Blob([fileContent], { type: file.type });
        let url = URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    fileReader.readAsText(file);
});