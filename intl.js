// Internationalization

// 1. Number formatting

const price = 2000.00

const currencyFormatter = new Intl.NumberFormat('en', {style: 'currency', currency: 'gmb', });
const dalasi = currencyFormatter.format(price);
console.log(dalasi)

const meters = 20
const metricsFormatter = new Intl.NumberFormat('en', { style: "unit", unitDisplay: 'short', unit: 'meter'});
const formattedUnit = metricsFormatter.format(meters);
console.log(formattedUnit)

const countryName = new Intl.DisplayNames('en', {type: 'region', style:"short", })
console.log(countryName.of('GM'));

const language = new Intl.DisplayNames('en', {type: 'language'} )
console.log(language.of('en'))

const script = new Intl.DisplayNames('en', {type: 'script', style: 'long'});
console.log(script.of('Geor'));

const calendar = new Intl.DisplayNames('en', {type: 'calendar', style: 'long'});

// 2. Date formatting

const date = new Date();
const dateFormatter = new Intl.DateTimeFormat('en',
    {weekday: 'long', year: "numeric", month: 'long', day: 'numeric' });
const formattedDate = dateFormatter.format(date)
console.log(formattedDate)
// Relative Time

const rtf = new Intl.RelativeTimeFormat('en', {numeric: 'auto'});
const minutes = rtf.format(1, "day");
console.log(`${minutes}`);

let minute = 0;
//let intervalId = setInterval(setMinutes, 60000);

function setMinutes(){
    minute += 1;
    if(minutes >= 60) clearInterval(intervalId);
    
}
function getDate(){
    let date = new Date();
    let minutes = date.getMinutes();
    console.log(minutes)
    return new Intl.RelativeTimeFormat('en', {numeric: 'auto'}).format(-minute, 'minute')
}

let minutesPassed = minute < 1 ? 'now' : getDate();
console.log(minutesPassed);

// 4. Plural Rules

const pr = new Intl.PluralRules('en-US');
console.log(pr.select(1));
console.log(pr.select(2));

