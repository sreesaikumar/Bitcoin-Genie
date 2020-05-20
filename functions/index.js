'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
//const {Card, Suggestion} = require('dialogflow-fulfillment');

const { BasicCard, Button, Image, List, BrowseCarousel, BrowseCarouselItem, Carousel} = require('actions-on-google');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

const requestAPI = require('request-promise');



var admin = require("firebase-admin");
var serviceAccount = require("./config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bitcoin-genie-ybutso.firebaseio.com"
});



exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    const conv = agent.conv(); // Get Actions on Google library conv instance

    function welcome(agent) {
        agent.add(`Welcome to Bitcoin Genie.`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }
    
    
    if ( conv !== null && conv.data.bitcoinInvestment === undefined ) {
        conv.data.bitcoinInvestment = 10000;
        // let investmentMoney = agent.parameters['investmoney'];
        //     conv.data.bitcoinInvestment = investmentMoney.amount;
    }

    if ( conv !== null && conv.data.bitcoinPrices === undefined ) {
        conv.data.bitcoinPrices = [];
    }
    

    //Any request from google assistants will only be accepted but not from dialogflow chatbots
        // function checkIfGoogle(agent) {
        //     let isGoogle = true;
        //     if ( conv === null ) {
        //         agent.add(`Only requests from Google Assistant are supported.
        //         Find the XXX action on Google Assistant directory!`);
        //         isGoogle = false;
        //     }
        //     return isGoogle;
        // }

    //Checking for Screen Availability
        // const hasScreen = conv !== null &&
        //     conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
        
        // const hasAudio = conv !== null &&
        //     conv.surface.capabilities.has('actions.capability.AUDIO_OUTPUT');


    async function earnWithBitcoin() {
        let now = new Date();
        now.setDate(now.getDate() - 1); // Yesterday's Date
        let sellDate = formatDate(now); //Current Date

        // beginning of the month
        let dateToCalculate = new Date();
        dateToCalculate.setDate(1);
        let startOfMonth = formatDate(dateToCalculate);

        // beginning of the year
        dateToCalculate = new Date();
        dateToCalculate.setDate(1);
        dateToCalculate.setMonth(0);
        let startOfYear = formatDate(dateToCalculate);

        // one year ago
        dateToCalculate = new Date();
        dateToCalculate.setFullYear(now.getFullYear() - 1);
        let aYearAgo = formatDate(dateToCalculate);

        // two years ago
        dateToCalculate = new Date();
        dateToCalculate.setFullYear(now.getFullYear() - 2);
        let twoYearAgo = formatDate(dateToCalculate);

        // three years ago
        dateToCalculate = new Date();
        dateToCalculate.setFullYear(now.getFullYear() - 3);
        let threeYearAgo = formatDate(dateToCalculate);


        let investmentStartOfMonth = await calculateInvestment(startOfMonth, sellDate);
        let earnedStartOfMonth = formatMoney(investmentStartOfMonth.earned.toFixed(0));
        let priceStartOfMonth = formatMoney(investmentStartOfMonth.investPrice.toFixed(2));

        let investmentStartOfYear = await calculateInvestment(startOfYear, sellDate);
        let earnedStartOfYear = formatMoney(investmentStartOfYear.earned.toFixed(0));
        let priceStartOfYear  = formatMoney(investmentStartOfYear.investPrice.toFixed(2));

        let investmentAYearAgo = await calculateInvestment(aYearAgo, sellDate);
        let earnedAYearAgo = formatMoney(investmentAYearAgo.earned.toFixed(0));
        let priceAYearAgo = formatMoney(investmentAYearAgo.investPrice.toFixed(2));

        let investmentTwoYearAgo = await calculateInvestment(twoYearAgo, sellDate);
        let earnedTwoYearAgo = formatMoney(investmentTwoYearAgo.earned.toFixed(0));
        let priceTwoYearAgo = formatMoney(investmentTwoYearAgo.investPrice.toFixed(2));

        let investmentThreeYearAgo = await calculateInvestment(threeYearAgo, sellDate);
        let earnedThreeYearAgo = formatMoney(investmentThreeYearAgo.earned.toFixed(0));
        let priceThreeYearAgo = formatMoney(investmentThreeYearAgo.investPrice.toFixed(2));

        if (!conv.screen) {
            conv.ask(`This is how much you would have earned with bitcoin if you have invested ${formatMoney(conv.data.bitcoinInvestment)}`);
            return;
          }
          
          conv.ask(`This is how much you would have earned with bitcoin if you have invested ${formatMoney(conv.data.bitcoinInvestment)}`);
          // Create a carousel
          conv.ask(new Carousel({
            title: 'Bitcoin Prices',
            items: {
              // Add the first item to the carousel
              'SELECTION_KEY_ONE': {
                synonyms: [
                  'Beginning of this month',
                ],
                title: `Price: ${priceStartOfMonth}/- rupees`,
                description: `Beginning of this month`,
                image: new Image({
                  url: 'https://img.techpowerup.org/200518/carousel-img-1.jpg',
                  alt: `If you have invested at beginning of this month you might have earned ${earnedStartOfMonth} rupees`,
                }),
              },
              // Add the second item to the carousel
              'SELECTION_KEY_TWO': {
                synonyms: [
                  'Start of the year',
              ],
                title: `Price: ${priceStartOfYear}/- rupees`,
                description: `Start of the year`,
                image: new Image({
                  url: 'https://img.techpowerup.org/200518/carousel-img-2.jpg',
                  alt: `If you have invested at beginning of this year you might have earned ${earnedStartOfYear} rupees`,
                }),
              },
              // Add the third item to the carousel
              'SELECTION_KEY_THREE': {
                synonyms: [
                  'One year ago',
                ],
                title: `Price : ${priceAYearAgo} /- rupees`,
                description: `One year ago`,
                image: new Image({
                  url: 'https://img.techpowerup.org/200518/carousel-img-3.jpg',
                  alt: `If you have invested one year ago you might have earned ${earnedAYearAgo} rupees`,
                }),
              },
              // Add the fourth item to the carousel
              'SELECTION_KEY_FOUR': {
                synonyms: [
                  'Two year ago',
                ],
                title: `Price: ${priceTwoYearAgo}/- rupees`,
                description: `Two year ago`,
                image: new Image({
                  url: 'https://img.techpowerup.org/200518/carousel-img-4.jpg',
                  alt: `If you have invested two year ago you might have earned ${earnedTwoYearAgo} rupees`,
                }),
              },
              // Add the fifth item to the carousel
              'SELECTION_KEY_FIVE': {
                synonyms: [
                  'Three year ago',
                ],
                title: `Price: ${priceThreeYearAgo}/- rupees`,
                description: `Three year ago`,
                image: new Image({
                  url: 'https://img.techpowerup.org/200518/carousel-img-5.jpg',
                  alt: `If you have invested three year ago you might have earned ${earnedThreeYearAgo} rupees`,
                }),
              },
            },
          }));

        agent.add(conv);
    }

    async function earnWithBitcoinPeriod() {
        // If any period[day, month, year] is not provided by the user in the 'buyDate' paramenter then we throw an error message!
        if ( ! agent.parameters.hasOwnProperty('buyDate') ) {
            conv.ask('Please try again by providing the time of the bitcoin investment. Was it a year ago or two years ago or at the beginning of the year?');
            agent.add(conv);
            return;
        }

        // Storing user provided parameters i.e day, month or year in a variable otherwise set to false.
        let dateUnit = (agent.parameters['buyDate'].hasOwnProperty('date-unit')) ?
            agent.parameters['buyDate']['date-unit'] : false;                       

        // Storing user provided parameters i.e beginning or end in a variable otherwise set to false.
        let datePeriod = (agent.parameters['buyDate'].hasOwnProperty('date-period')) ?
            agent.parameters['buyDate']['date-period'] : false;                     

        // Storing user provided parameters i.e numbers[year in numbers-2014, 2015, 2016] in a variable otherwise set to zero-'0'.   
        let number = (agent.parameters['buyDate'].hasOwnProperty('number')) ?
            agent.parameters['buyDate']['number'] : 0;
        
        // If user say  a year ago / a month ago / a day ago here 'a' represents one i.e 
        // one year/month/day ago. So set number to '1'.
        if ( !datePeriod && number === 0 ) 
            number = 1;

        let now = new Date();
        let dateToCalculate = new Date();

        // What Parameter does user provided day / months / years
        switch (dateUnit) {
            case 'day':
                dateToCalculate.setDate(now.getDate() - number);
                break;
            case 'month':
                dateToCalculate.setMonth(now.getMonth() - number);
                if (datePeriod === 'end') {
                    dateToCalculate.setDate(new Date(now.getFullYear(), dateToCalculate.getMonth() + 1, 0).getDate());
                } else if (datePeriod === 'beginning') {
                    dateToCalculate.setDate(1);
                }

                break;
            case 'year':
                if (datePeriod === 'end') {
                    dateToCalculate.setDate(31);
                    dateToCalculate.setMonth(11);
                } else if (datePeriod === 'beginning') {
                    dateToCalculate.setDate(1);
                    dateToCalculate.setMonth(0);
                }

                if ( number > 2000 ) 
                    dateToCalculate.setFullYear(number);
                else if ( number < 20 ) {
                    dateToCalculate.setFullYear(now.getFullYear() - number);

                }
                break;
        }
        let investDate = formatDate(dateToCalculate);

        now.setDate(now.getDate() - 1); // Yesterday's Date
        let sellDate = formatDate(now); // Current Date

        let investment = await calculateInvestment(investDate, sellDate);

        let earned = formatMoney(investment.earned.toFixed(2));

        let response = 'Investment price on ' + dateToCalculate.toDateString() +
            ' was: ' + formatMoney(investment.investPrice.toFixed(2)) + '. ' +
            'With the investment of : ' + formatMoney(conv.data.bitcoinInvestment) + ' rupees ' +
            'you would buy ' + investment.startBitcoin.toFixed(2) + ' bitcoins. ' +
            'Selling price yesterday would be ' + formatMoney(investment.sellPrice.toFixed(2)) + ' rupees. ' +
            'If you sold your ' + investment.startBitcoin.toFixed(2) + ' of bitcoins' +
            ' you would have earned: ' + earned + ' rupees ';

        conv.ask(response);
        conv.ask(new BasicCard({
            text: `Bitcoin price on ${dateToCalculate.toDateString()}: ${formatMoney(investment.investPrice.toFixed(2))}.  \n
Investment: ${formatMoney(conv.data.bitcoinInvestment)} rupees.  \n  
Selling price yesterday: ${formatMoney(investment.sellPrice.toFixed(2))} rupees.  \n   
Revenue: ${earned} rupees.  \n`,
            subtitle: `Investment date: ${dateToCalculate.toDateString()}`,
            title: `Investment return: ${earned} rupees`,
            // buttons: new Button({
            //     title: 'Buy bitcoins now',
            //     url: 'https://bitcoins.now/',
            // }),
            image: new Image({
                url: 'https://img.techpowerup.org/200518/portrait892.png',
                alt: 'Bitcoin',
              }),
            display: 'CROPPED',
        }));
        agent.add(conv);
    }

    // function formatMoney(num) {
    //     return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // }

    function formatMoney(num) {
        num = num.toString();
        var afterPoint = '';
        if(num.indexOf('.') > 0)
           afterPoint = num.substring(num.indexOf('.'),num.length);
           num = Math.floor(num);
        num = num.toString();

        var lastThree = num.substring(num.length-3);
        var otherNumbers = num.substring(0,num.length-3);
        
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
            var result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
        
        return result;
        
    }

    function formatDate(date) {
        let month = date.getMonth() + 1;
        if ( month < 10 ) 
            month = '0' + month; // Adding zero-'0'. API will accept month in only two digit[02,05,07 etc,.] format.
        let day = date.getDate();
        if ( day < 10 ) 
            day = '0' + day; // Adding zero-'0'. API will accept day in only two digit[02,05,07 etc,.] format. 
        return date.getFullYear() + "-" + month + "-" + day; //Final format sent to API is "YYYY-MM-DD".
    }


    async function calculateInvestment(investDate, sellDate) {

        let investPrice = await getBitcoinPrice(investDate);
        let sellPrice = await getBitcoinPrice(sellDate);

        let startBitcoin = conv.data.bitcoinInvestment / investPrice;
        let earned = startBitcoin * sellPrice - conv.data.bitcoinInvestment;

        return {
            investPrice,
            sellPrice,
            startBitcoin,
            earned
        };
    }

    function getBitcoinPrice(dateToRead) {
        if ( conv.data.bitcoinPrices.hasOwnProperty(dateToRead) )  {
            return conv.data.bitcoinPrices[dateToRead];
        } else {
            return requestAPI('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + dateToRead+
                '&end=' + dateToRead + '&currency=inr')
                .then(function (data) { 
                    let bitcoinPrice = JSON.parse(data);
                    if (bitcoinPrice.hasOwnProperty('bpi') && bitcoinPrice['bpi'].hasOwnProperty(dateToRead)) {
                        return bitcoinPrice['bpi'][dateToRead];
                    }

                }).catch(function (err) {
                    console.log('No bitcoin data');
                    console.log(err);
                });
        }

    }

    function formatDate(date) {
        let month = date.getMonth() + 1;
        if ( month < 10 ) month = '0' + month;
        let day = date.getDate();
        if ( day < 10 ) day = '0' + day;
        return date.getFullYear() + "-" + month + "-" + day;
    }

//   Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('earn with bitcoin', earnWithBitcoin);
    intentMap.set('earn with bitcoin in specific period', earnWithBitcoinPeriod);

//   intentMap.set('your intent name here', yourFunctionHandler);
//   intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
});