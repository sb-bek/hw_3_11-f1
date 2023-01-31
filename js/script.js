const rateEl = document.getElementById("rate"); 
const swapEl = document.getElementById("swap"); 
const currencyOneEl = document.getElementById('currency-one'); 
const currencyTwoEl = document.getElementById('currency-two'); 
const amountOneEl = document.getElementById("amount-one"); 
const amountTwoEl = document.getElementById("amount-two"); 
 
let dataFromBack = {};

const exchangeRates = () => {
    const currencyOne = currencyOneEl.value;
    const currencyTwo = currencyTwoEl.value;

    fetch(
        `https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}`
    )
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

    const { conversion_rates } = data;
    const strgJson = JSON.stringify(conversion_rates);
    dataFromBack = JSON.parse(strgJson);
    calculateRates(currencyTwo, dataFromBack)
    });
};

const calculateRates = (currencyTwo, data) => {
    const rates = data[currencyTwo];
    amountTwoEl.value = (+amountOneEl.value * rates).toFixed(2); 
}

const runCalculate = () => {
    calculateRates(currencyTwoEl.value, dataFromBack)
}

exchangeRates();

currencyOneEl.addEventListener("change", exchangeRates);
currencyTwoEl.addEventListener("change", runCalculate);
amountOneEl.addEventListener("input", runCalculate);

swapEl.addEventListener("click", () => {
    let changeCorrents = currencyOneEl.value;
    currencyOneEl.value = currencyTwoEl.value;
    currencyTwoEl.value = changeCorrents;
    exchangeRates();
})