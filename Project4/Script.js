// Get the DOM element
const baseCurrency = document.getElementById('base-currency');
const targetCurrency = document.getElementById('target-currency');
const baseAmount = document.getElementById('base-amount');
const targetAmount = document.getElementById('target-amount');
const flipbtn = document.getElementById('flip');
const exchangeRate = document.getElementById('xrate');

//Function to fetch exchange rates from API and update DOM
function calculate() {
    //Get the currency code for base and target currencies
    const baseCode = baseCurrency.value;
    const targetCode = targetCurrency.value;
    //Execute Fetch API
    fetch(`https://v6.exchangerate-api.com/v6/b958a982026c70d1c3a873c5/latest/${baseCode}`)
    .then( res => res.json() )
    .then( data => {
        //Get the excange rate for base currency to target currency
        const rate = data.conversion_rates[targetCode];
        //Update DOM with the exchange rate
        exchangeRate.innerHTML = `1 ${baseCode} = ${rate} ${targetCode}`;
        //Calculate the amount of target currency based on exchange rate
        targetAmount.value =( baseAmount.value * rate).toFixed(2);
        
    })
};

//Event Listeners
//1. Listen for change to base currency select box
baseCurrency.addEventListener('change', calculate);
//2. Listen for input in base amount input field
baseAmount.addEventListener('input', calculate);
//3. Listen for change to target currency select box
targetCurrency.addEventListener('change', calculate);
//4. Listen for input in target amount input field
targetAmount.addEventListener('input', calculate);
//5. listen for click on flip button
flipbtn.addEventListener('click', () => {
    //Save the value of base currency in a temp variable
    const tempCurreny = baseCurrency.value;
    //Re-assign base currency using target currency
    baseCurrency.value = targetCurrency.value;
    //Re-assign targey currency using the original base currency
    targetCurrency.value = tempCurreny;
    //Recalculate the exchange rate and update the DOM
    calculate();
} )


//Initial calculation 
calculate();