"use strict";

const functions = require('firebase-functions');
const {
    dialogflow,
    BasicCard,
    Image,
    Button,
    Suggestions,
    LinkOutSuggestion,
    Carousel,
    Table,
    List
} = require("actions-on-google");

const requestAPI = require('request-promise');
const app = dialogflow({ debug: true });

let bitcoinInvestment; // If user does not specify any investment amount i.e [how much they would have invested in the past] then this is the default amount.
let currency;

let bitcoinPrices;
if ( bitcoinPrices === undefined ) {
  bitcoinPrices = [];
}

//Welcome Intent
app.intent("Default Welcome Intent", conv => {
    // For devices without screens i.e Google Home, Google Home Mini.
        if (!conv.screen) {
          conv.ask(`Welcome to Bitcoin Genie! You can ask questions like, what is the current price of bitcoin? or, would I be rich if I bought bitcoins? or you can ask, how much I would have earned if I bought bitcoins a year ago?`);
        }

        // For devices with screens i.e Google Nest Hub Max, Google Nest Hub, Mobile Phones.
        conv.ask(`Welcome to Bitcoin Genie! You can ask questions like, what is the current price of bitcoin? or, would I be rich if I bought bitcoins? or you can ask, how much I would have earned if I bought bitcoins a year ago?`);
        
        conv.ask(new BasicCard({
          title: `Welcome to Bitcoin Genie.`,
          subtitle: `1.What is the current price of bitcoin?  \n2.Would I be rich if I bought bitcoins?  \n3.How much I would have earned if I bought bitcoins a year ago?`,
          image: new Image({
              url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/Logo_Small.png',
              alt: 'Bitcoin',
            }),
          display: 'CROPPED',
      }));
});

//Fallback Intent
app.intent("Default Fallback Intent", conv => {
  // For devices without screens i.e Google Home, Google Home Mini.
      if (!conv.screen) {
        conv.ask(`Oh! Sorry, I didn't get You.`);
      }

      // For devices with screens i.e Google Nest Hub Max, Google Nest Hub, Mobile Phones.
      conv.ask(`Oh! Sorry, I didn't get You. You can say, What is the current price of bitcoin? or you can say, Would I be rich if I bought bitcoins? or you can also say, How much I would have earned if I bought bitcoins a year ago?`);
      
      conv.ask(new BasicCard({
        title: `Oh! Sorry, I didn't get You`,
        subtitle: `1.What is the current price of bitcoin?  \n2.Would I be rich if I bought bitcoins?  \n3. how much I would have earned if I bought bitcoins a year ago?`,
        image: new Image({
            url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/Logo_Small.png',
            alt: 'Bitcoin',
          }),
        display: 'CROPPED',
    }));
});

//About Bitcoin
app.intent("Bitcoin", conv => {
    // For devices without screens i.e Google Home, Google Home Mini.
        if (!conv.screen) {
          conv.ask(`Bitcoin is a digital currency created in January 2009 following the housing market crash. It follows the ideas set out in a whitepaper by the mysterious and pseudonymous Satoshi Nakamoto. The identity of the person or persons who created the technology is still a mystery. Bitcoin offers the promise of lower transaction fees than traditional online payment mechanisms and is operated by a decentralized authority, unlike government-issued currencies. There are no physical bitcoins, only balances kept on a public ledger than everyone has transparent access to, that – along with all Bitcoin transactions – is verified by a massive amount of computing power. Bitcoins are not issued or backed by any banks or governments, nor are individual bitcoins valuable as a commodity. Despite it not being legal tender, Bitcoin charts high on popularity, and has triggered the launch of hundreds of other virtual currencies collectively referred to as Altcoins.`);
        }

        // For devices with screens i.e Google Nest Hub Max, Google Nest Hub, Mobile Phones.
        conv.ask(`Bitcoin is a digital currency created in January 2009 following the housing market crash. It follows the ideas set out in a whitepaper by the mysterious and pseudonymous Satoshi Nakamoto. The identity of the person or persons who created the technology is still a mystery. Bitcoin offers the promise of lower transaction fees than traditional online payment mechanisms and is operated by a decentralized authority, unlike government-issued currencies. There are no physical bitcoins, only balances kept on a public ledger than everyone has transparent access to, that – along with all Bitcoin transactions – is verified by a massive amount of computing power. Bitcoins are not issued or backed by any banks or governments, nor are individual bitcoins valuable as a commodity. Despite it not being legal tender, Bitcoin charts high on popularity, and has triggered the launch of hundreds of other virtual currencies collectively referred to as Altcoins.`);
        
        conv.ask(new BasicCard({
          title: `Bitcoin`,
          subtitle: `Bitcoin is a digital currency created in January 2009 following the housing market crash. It follows the ideas set out in a whitepaper by the mysterious and pseudonymous Satoshi Nakamoto. The identity of the person or persons who created the technology is still a mystery. Bitcoin offers the promise of lower transaction fees than traditional online payment mechanisms and is operated by a decentralized authority, unlike government-issued currencies. There are no physical bitcoins, only balances kept on a public ledger than everyone has transparent access to, that along with all Bitcoin transactions is verified by a massive amount of computing power. Bitcoins are not issued or backed by any banks or governments, nor are individual bitcoins valuable as a commodity. Despite it not being legal tender, Bitcoin charts high on popularity, and has triggered the launch of hundreds of other virtual currencies collectively referred to as Altcoins.`,
          image: new Image({
              url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/Logo_Small.png',
              alt: 'Bitcoin',
            }),
          display: 'CROPPED',
      }));
});

//Understand What Bitcoin Is
app.intent("Bitcoin Technology", conv => {
    // For devices without screens i.e Google Home, Google Home Mini.
        if (!conv.screen) {
          conv.ask(`Bitcoin is a collection of computers, or nodes, that all run Bitcoin's code and store its blockchain. A blockchain can be thought of as a collection of blocks. In each block is a collection of transactions. Because all these computers running the blockchain have the same list of blocks and transactions and can transparently see these new blocks being filled with new Bitcoin transactions, no one can cheat the system. Anyone, whether they run a Bitcoin "node" or not, can see these transactions occurring live. In order to achieve a nefarious act, a bad actor would need to operate 51% of the computing power that makes up Bitcoin. Bitcoin currently has over 10,000 nodes and this number is growing, making such an attack quite unlikely. In the event that an attack was to happen, the Bitcoin nodes, or the people who take part in the Bitcoin network with their computer, would likely fork to a new blockchain making the effort the bad actor put forth to achieve the attack a waste. Bitcoin is a type of cryptocurrency. Balances of Bitcoin tokens are kept using public and private "keys," which are long strings of numbers and letters linked through the mathematical encryption algorithm that was used to create them. The public key, which is comparable to a bank account number serves as the address which is published to the world and to which others may send bitcoins. The private key, which is comparable to an ATM PIN is meant to be a guarded secret and only used to authorize Bitcoin transmissions. Bitcoin keys should not be confused with a Bitcoin wallet, which is a physical or digital device which facilitates the trading of Bitcoin and allows users to track ownership of coins. The term "wallet" is a bit misleading, as Bitcoin's decentralized nature means that it is never stored in a wallet, but rather decentrally on a blockchain.`);
        }

        // For devices with screens i.e Google Nest Hub Max, Google Nest Hub, Mobile Phones.
        conv.ask(`Bitcoin is a collection of computers, or nodes, that all run Bitcoin's code and store its blockchain. A blockchain can be thought of as a collection of blocks. In each block is a collection of transactions. Because all these computers running the blockchain have the same list of blocks and transactions and can transparently see these new blocks being filled with new Bitcoin transactions, no one can cheat the system. Anyone, whether they run a Bitcoin "node" or not, can see these transactions occurring live. In order to achieve a nefarious act, a bad actor would need to operate 51% of the computing power that makes up Bitcoin. Bitcoin currently has over 10,000 nodes and this number is growing, making such an attack quite unlikely. In the event that an attack was to happen, the Bitcoin nodes, or the people who take part in the Bitcoin network with their computer, would likely fork to a new blockchain making the effort the bad actor put forth to achieve the attack a waste. Bitcoin is a type of cryptocurrency. Balances of Bitcoin tokens are kept using public and private "keys," which are long strings of numbers and letters linked through the mathematical encryption algorithm that was used to create them. The public key, which is comparable to a bank account number serves as the address which is published to the world and to which others may send bitcoins. The private key, which is comparable to an ATM PIN is meant to be a guarded secret and only used to authorize Bitcoin transmissions. Bitcoin keys should not be confused with a Bitcoin wallet, which is a physical or digital device which facilitates the trading of Bitcoin and allows users to track ownership of coins. The term "wallet" is a bit misleading, as Bitcoin's decentralized nature means that it is never stored in a wallet, but rather decentrally on a blockchain.`);
        
        conv.ask(new BasicCard({
          title: `Bitcoin Technology`,
          subtitle: `Bitcoin is a collection of computers, or nodes, that all run Bitcoin's code and store its blockchain. A blockchain can be thought of as a collection of blocks. In each block is a collection of transactions. Because all these computers running the blockchain have the same list of blocks and transactions and can transparently see these new blocks being filled with new Bitcoin transactions, no one can cheat the system. Anyone, whether they run a Bitcoin "node" or not, can see these transactions occurring live. In order to achieve a nefarious act, a bad actor would need to operate 51% of the computing power that makes up Bitcoin. Bitcoin currently has over 10,000 nodes and this number is growing, making such an attack quite unlikely. In the event that an attack was to happen, the Bitcoin nodes, or the people who take part in the Bitcoin network with their computer, would likely fork to a new blockchain making the effort the bad actor put forth to achieve the attack a waste. Bitcoin is a type of cryptocurrency. Balances of Bitcoin tokens are kept using public and private "keys," which are long strings of numbers and letters linked through the mathematical encryption algorithm that was used to create them. The public key, which is comparable to a bank account number serves as the address which is published to the world and to which others may send bitcoins. The private key, which is comparable to an ATM PIN is meant to be a guarded secret and only used to authorize Bitcoin transmissions. Bitcoin keys should not be confused with a Bitcoin wallet, which is a physical or digital device which facilitates the trading of Bitcoin and allows users to track ownership of coins. The term "wallet" is a bit misleading, as Bitcoin's decentralized nature means that it is never stored in a wallet, but rather decentrally on a blockchain.`,
          image: new Image({
              url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/Logo_Small.png',
              alt: 'Bitcoin',
            }),
          display: 'CROPPED',
      }));
});

//How Bitcoin Works
app.intent("Working Of Bitcoin", conv => {
    // For devices without screens i.e Google Home, Google Home Mini.
        if (!conv.screen) {
          conv.ask(`Bitcoin is one of the first digital currencies to use peer-to-peer technology to facilitate instant payments. The independent individuals and companies who own the governing computing power and participate in the Bitcoin network, are comprised of nodes or miners. "Miners," or the people who process the transactions on the blockchain, are motivated by rewards which the release of new bitcoin and transaction fees paid in bitcoin. These miners can be thought of as the decentralized authority enforcing the credibility of the Bitcoin network. New bitcoin is being released to the miners at a fixed, but periodically declining rate, such that the total supply of bitcoins approaches 21 million. Currently, there are roughly 3 million bitcoins which have yet to be mined. In this way, Bitcoin operates differently from fiat currency; in centralized banking systems, currency is released at a rate matching the growth in goods in an attempt to maintain price stability, while a decentralized system like Bitcoin sets the release rate ahead of time and according to an algorithm. Bitcoin mining is the process by which bitcoins are released into circulation. Generally, mining requires the solving of computationally difficult puzzles in order to discover a new block, which is added to the blockchain. In contributing to the blockchain, mining adds and verifies transaction records across the network. For adding blocks to the blockchain, miners receive a reward in the form of a few bitcoins; the reward is halved every 210,000 blocks. The block reward was 50 new bitcoins in 2009 and is currently 12.5. By around May 11th, 2020 the next halving will occur, bringing the reward for each block discovery down to 6.25 bitcoins. A variety of hardware can be used to mine bitcoin but some yield higher rewards than others. Certain computer chips called Application-Specific Integrated Circuits and more advanced processing units like Graphic Processing Units (GPUs) can achieve more rewards. These elaborate mining processors are known as "mining rigs." One bitcoin is divisible to eight decimal places (100 millionths of one bitcoin), and this smallest unit is referred to as a Satoshi. If necessary, and if the participating miners accept the change, Bitcoin could eventually be made divisible to even more decimal places.`);
        }

        // For devices with screens i.e Google Nest Hub Max, Google Nest Hub, Mobile Phones.
        conv.ask(`Bitcoin is one of the first digital currencies to use peer-to-peer technology to facilitate instant payments. The independent individuals and companies who own the governing computing power and participate in the Bitcoin network, are comprised of nodes or miners. "Miners," or the people who process the transactions on the blockchain, are motivated by rewards which the release of new bitcoin and transaction fees paid in bitcoin. These miners can be thought of as the decentralized authority enforcing the credibility of the Bitcoin network. New bitcoin is being released to the miners at a fixed, but periodically declining rate, such that the total supply of bitcoins approaches 21 million. Currently, there are roughly 3 million bitcoins which have yet to be mined. In this way, Bitcoin operates differently from fiat currency; in centralized banking systems, currency is released at a rate matching the growth in goods in an attempt to maintain price stability, while a decentralized system like Bitcoin sets the release rate ahead of time and according to an algorithm. Bitcoin mining is the process by which bitcoins are released into circulation. Generally, mining requires the solving of computationally difficult puzzles in order to discover a new block, which is added to the blockchain. In contributing to the blockchain, mining adds and verifies transaction records across the network. For adding blocks to the blockchain, miners receive a reward in the form of a few bitcoins; the reward is halved every 210,000 blocks. The block reward was 50 new bitcoins in 2009 and is currently 12.5. By around May 11th, 2020 the next halving will occur, bringing the reward for each block discovery down to 6.25 bitcoins. A variety of hardware can be used to mine bitcoin but some yield higher rewards than others. Certain computer chips called Application-Specific Integrated Circuits and more advanced processing units like Graphic Processing Units (GPUs) can achieve more rewards. These elaborate mining processors are known as "mining rigs." One bitcoin is divisible to eight decimal places (100 millionths of one bitcoin), and this smallest unit is referred to as a Satoshi. If necessary, and if the participating miners accept the change, Bitcoin could eventually be made divisible to even more decimal places.`);
        
        conv.ask(new BasicCard({
          title: `How Bitcoin Works`,
          subtitle: `Bitcoin is one of the first digital currencies to use peer-to-peer technology to facilitate instant payments. The independent individuals and companies who own the governing computing power and participate in the Bitcoin network, are comprised of nodes or miners. "Miners," or the people who process the transactions on the blockchain, are motivated by rewards which the release of new bitcoin and transaction fees paid in bitcoin. These miners can be thought of as the decentralized authority enforcing the credibility of the Bitcoin network. New bitcoin is being released to the miners at a fixed, but periodically declining rate, such that the total supply of bitcoins approaches 21 million. Currently, there are roughly 3 million bitcoins which have yet to be mined. In this way, Bitcoin operates differently from fiat currency; in centralized banking systems, currency is released at a rate matching the growth in goods in an attempt to maintain price stability, while a decentralized system like Bitcoin sets the release rate ahead of time and according to an algorithm. Bitcoin mining is the process by which bitcoins are released into circulation. Generally, mining requires the solving of computationally difficult puzzles in order to discover a new block, which is added to the blockchain. In contributing to the blockchain, mining adds and verifies transaction records across the network. For adding blocks to the blockchain, miners receive a reward in the form of a few bitcoins; the reward is halved every 210,000 blocks. The block reward was 50 new bitcoins in 2009 and is currently 12.5. By around May 11th, 2020 the next halving will occur, bringing the reward for each block discovery down to 6.25 bitcoins. A variety of hardware can be used to mine bitcoin but some yield higher rewards than others. Certain computer chips called Application-Specific Integrated Circuits and more advanced processing units like Graphic Processing Units (GPUs) can achieve more rewards. These elaborate mining processors are known as "mining rigs." One bitcoin is divisible to eight decimal places (100 millionths of one bitcoin), and this smallest unit is referred to as a Satoshi. If necessary, and if the participating miners accept the change, Bitcoin could eventually be made divisible to even more decimal places.`,
          image: new Image({
              url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/Logo_Small.png',
              alt: 'Bitcoin',
            }),
          display: 'CROPPED',
      }));
});

//Current Bitcoin Price Intent
app.intent("Bitcoin Price", async (conv) => {
    
    bitcoinInvestment = 100000; // If user does not specify any investment amount i.e [how much they would have invested in the past] then this is the default amount.

    if ( ! conv.parameters.currencyName ) {
        currency = 'INR'; // Default Currency
      }
      else {
        currency = conv.parameters.currencyName; // User Provided Currency
      }

    let now = new Date();
    now.setDate(now.getDate() - 1); // Yesterday's Date
    let sellDate = formatDate(now); //Current Date

    // Current Bitcoin Price
    let dateToCalculate = new Date();
    dateToCalculate.setDate(now.getDate());
    let aDayAgo = formatDate(dateToCalculate);

    // one year ago
    dateToCalculate = new Date();
    dateToCalculate.setFullYear(now.getFullYear() - 1);
    let aYearAgo = formatDate(dateToCalculate);

    let investmentADayAgo = await calculateInvestment(aDayAgo, sellDate);
    let earnedADayAgo = formatMoney(investmentADayAgo.earned.toFixed(0));
    let priceADayAgo = formatMoney(investmentADayAgo.investPrice.toFixed(2));

    let investmentAYearAgo = await calculateInvestment(aYearAgo, sellDate);
    let earnedAYearAgo = formatMoney(investmentAYearAgo.earned.toFixed(0));
    let priceAYearAgo = formatMoney(investmentAYearAgo.investPrice.toFixed(2));
    
    //Calculating the difference in Bitcoin Price since a year
    let difference =  (investmentADayAgo.investPrice.toFixed(2)) - (investmentAYearAgo.investPrice.toFixed(2));
    let result =  formatMoney(difference.toFixed(2));
    
    // Price raised or dropped
    if(priceAYearAgo < priceADayAgo)
      var raisedordropped = `raised`;
    else
    raisedordropped = `dropped`;

    if (!conv.screen) {
        conv.ask(`<speak>Latest Bitcoin Price is ${priceADayAgo}. A year ago bitcoin price is ${priceAYearAgo} and it ${raisedordropped} ${result}  since last year.</speak>`);
    }
      
      conv.ask(`<speak>Latest Bitcoin Price is ${priceADayAgo}. A year ago bitcoin price is ${priceAYearAgo} and it ${raisedordropped} ${result}  since last year.</speak>`);
      
      conv.ask(new BasicCard({
        title: `Bitcoin Price:  \n ${priceADayAgo}`,
        subtitle: `A year ago bitcoin price is ${priceAYearAgo} and it ${raisedordropped} ${result}  since last year`,
        image: new Image({
            url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/portrait.png',
            alt: 'Bitcoin',
          }),
        display: 'CROPPED',
    }));
});

// Earnings with Bitcoin Intent
app.intent("Bitcoin Pricing History", async (conv) => {

    bitcoinInvestment = 100000; // If user does not specify any investment amount i.e [how much they would have invested in the past] then this is the default amount.
    
    if ( ! conv.parameters.pricingCurrencyName ) {
        currency = 'INR'; // Default Currency
      }
      else {
          currency = conv.parameters.pricingCurrencyName; // User Provided Currency
      }

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

    // For devices without screens i.e Google Home, Google Home Mini.
    if (!conv.screen) {
      conv.ask(`<speak>If you have invested ${formatMoney(bitcoinInvestment)}. A year ago the price of bitcoin is ${priceAYearAgo}. So, you might have earned ${earnedAYearAgo} . Two years ago the price of bitcoin is ${priceTwoYearAgo}. So, you might have earned ${earnedTwoYearAgo}  and three years ago the price of bitcoin is ${priceThreeYearAgo}. So, you might have earned ${earnedThreeYearAgo} .</speak>`);
      }
      
      // For devices with screens i.e Google Nest Hub Max, Google Nest Hub, Mobile Phones.
      conv.ask(`<speak>In past few years, the price of bitcoins changed drastically. This is how much you would have earned with bitcoin if you have invested ${formatMoney(bitcoinInvestment)}.</speak>`);
      
      // Creates a carousel
      conv.ask(new Carousel({
        title: 'Bitcoin Prices',
        items: {
          // Adding the first item to the carousel
          'SELECTION_KEY_ONE': {
            synonyms: [
              'Beginning of this month',
            ],
            title: `Price: ${priceStartOfMonth}`,
            description: `Beginning of this month`,
            image: new Image({
              url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/Carousel_Img-1.jpg',
              alt: `If you have invested at beginning of this month you might have earned ${earnedStartOfMonth} `,
            }),
          },
          // Adding the second item to the carousel
          'SELECTION_KEY_TWO': {
            synonyms: [
              'Beginning of this year',
          ],
            title: `Price: ${priceStartOfYear}`,
            description: `Beginning of this year`,
            image: new Image({
              url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/Carousel_Img-2.jpg',
              alt: `If you have invested at beginning of this year you might have earned ${earnedStartOfYear} `,
            }),
          },
          // Adding the third item to the carousel
          'SELECTION_KEY_THREE': {
            synonyms: [
              'One year ago',
            ],
            title: `Price : ${priceAYearAgo}`,
            description: `One year ago`,
            image: new Image({
              url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/Carousel_Img-3.jpg',
              alt: `If you have invested one year ago you might have earned ${earnedAYearAgo} `,
            }),
          },
          // Adding the fourth item to the carousel
          'SELECTION_KEY_FOUR': {
            synonyms: [
              'Two year ago',
            ],
            title: `Price: ${priceTwoYearAgo}`,
            description: `Two year ago`,
            image: new Image({
              url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/Carousel_Img-4.jpg',
              alt: `If you have invested two year ago you might have earned ${earnedTwoYearAgo} `,
            }),
          },
          // Adding the fifth item to the carousel
          'SELECTION_KEY_FIVE': {
            synonyms: [
              'Three year ago',
            ],
            title: `Price: ${priceThreeYearAgo}`,
            description: `Three year ago`,
            image: new Image({
              url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/Carousel_Img-5.jpg',
              alt: `If you have invested three year ago you might have earned ${earnedThreeYearAgo} `,
            }),
          },
        },
      }));
});

// Earnings With Bitcoin At Specific Period Intent
app.intent("Bitcoins Investment", async (conv) => {
   
    let buyDateParameter = conv.parameters.buyDate;

    // if ( ! conv.parameters.investmoney ) {
    //     currency = 'INR'; // Default Currency
    // }
    // else {
    //     bitcoinInvestment = conv.parameters.investmoney.amount; // User Provided Bitcoin Investment
    //     currency = conv.parameters.investmoney.currency; //User Provided Currency
    // }

    if ( ! conv.parameters.investmentCurrencyName ) {
        currency = 'INR'; // Default Currency
    }
    else {
        bitcoinInvestment = conv.parameters.investmentAmount; // User Provided Bitcoin Investment
        currency = conv.parameters.investmentCurrencyName; //User Provided Currency
    }
    
      // If any period[day, month, year] is not provided by the user in the 'buyDate' paramenter then we throw an error message!
      if ( ! buyDateParameter ) {
          conv.ask('Please try again by providing the time of the bitcoin investment. Was it a year ago or two years ago or at the beginning of the year 2015?');
      }

      // Storing user provided parameters i.e day, month or year in a variable, otherwise set to false.
      let dateUnit = (conv.parameters.buyDate.hasOwnProperty('date-unit')) ? conv.parameters['buyDate']['date-unit'] : false;                  

      // Storing user provided parameters i.e beginning or end in a variable, otherwise set to false.
      let datePeriod = (conv.parameters.buyDate.hasOwnProperty('date-period')) ? conv.parameters['buyDate']['date-period'] : false;
      
      // Storing user provided parameters i.e numbers[year in numbers-2014, 2015, 2016] in a variable, otherwise set to zero-'0'.   
      let number = (conv.parameters.buyDate.hasOwnProperty('number')) ? conv.parameters['buyDate']['number'] : 0;
      
      let now = new Date();
      let dateToCalculate = new Date();
      let currentMonth = dateToCalculate.getMonth(); // Month starts from Zero 0->Jab, 1-> Feb, 2->Mar, etc.
      let currentYear = dateToCalculate.getFullYear();

      // If user say  a year ago / a month ago / a day ago here 'a' represents one i.e 
      // one year/month/day ago. So set number to '1'.
      if ( !datePeriod && number === 0 ) {
        number = 1;
      }
      else if (datePeriod && number > 32 || !datePeriod && number > 32) {
        dateUnit = 'year';
      }
      else if (datePeriod === 'beginning' && dateUnit === 'month' || datePeriod === 'end' && dateUnit === 'month') {
        dateUnit = 'month';
        number = currentMonth;
      }
      else if (datePeriod === 'beginning' && dateUnit === 'year' || datePeriod === 'end' && dateUnit === 'year') {
        dateUnit = 'year';
        number = currentYear;
      }

      // What Parameter does user provided day / months / years
      switch (dateUnit) {
          case 'day':
              
            dateToCalculate.setDate(now.getDate() - number);
            break;
          
          case 'month':
            
            dateToCalculate.setMonth(now.getMonth() - number);
              if ( datePeriod === 'end' && number >= currentMonth ) {
              
              conv.ask('Sorry, I can\'t Provide you the future predictions. You can say, how much I would have earned if I bought bitcoins a month ago?');
              return;
              }
              else if (datePeriod === 'end') {
                dateToCalculate.setDate(new Date(now.getFullYear(), dateToCalculate.getMonth() + 1, 0).getDate());
              }
              else if ((datePeriod === 'beginning' && number === currentMonth) || (datePeriod === 'beginning' && number === currentMonth)) {
                dateToCalculate.setMonth(now.getMonth(), 1);  
              }
              else if (datePeriod === 'beginning') {
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

              if ( datePeriod === 'end' && number >= currentYear) {
                conv.ask('Sorry, I can\'t Provide you the future predictions. You can say, any past year like a year ago or at the end of the 2019 or at the beginning of the year 2015?');
                return;
              }
              else if( datePeriod === 'beginning' && number > 2011 || datePeriod === 'beginning' && number <= currentYear){
                dateToCalculate.setFullYear(number);
              }
              else if ( number > 2011 && number <= currentYear) 
                  dateToCalculate.setFullYear(number);
              else if ( number > 0 && number < 9 ) {
                  dateToCalculate.setFullYear(now.getFullYear() - number);
              }
              else if ( number < 2011 || number > 9) {
                conv.ask('Investing in bitcoin was not started in that year. Please try again by saying, how much I would have earned if I bought bitcoins a year ago?');
                return;
              }
              break;
      }
      let investDate = formatDate(dateToCalculate);

      now.setDate(now.getDate() - 1); // Yesterday's Date
      let sellDate = formatDate(now); // Current Date

      let investment = await calculateInvestment(investDate, sellDate);
      let investmentAmount = formatMoney(investment.investPrice.toFixed(2));

      let earned = formatMoney(investment.earned.toFixed(2));
      
      // let apiError = 'Sorry, but your specified end date is before your start date.  Please check and try again.';
      // if( bitcoinPrice['bpi'][dateToRead] === apiError || bitcoinPrice[dateToRead] === apiError )
      //   conv.ask('Please try again by providing the valid time period of your bitcoin investment. You can say, how much I would have earned if I bought bitcoins a year ago?');
      
        // For devices without screens i.e Google Home, Google Home Mini.
      // This Response will be displayed on mobile phone along with Basic Card.
   
      conv.ask(`<speak>Investment price on ${dateToCalculate.toDateString()} was: ${investmentAmount}. With an investment of : ${formatMoney(bitcoinInvestment)} you would buy ${investment.startBitcoin.toFixed(2)} bitcoins. Latest selling price of bitcoin is ${formatMoney(investment.sellPrice.toFixed(2))}. If you sell your ${investment.startBitcoin.toFixed(2)} of bitcoins you would have earned: ${earned}</speak>`);

      // For devices with screens i.e Google Nest Hub Max, Google Nest Hub, Mobile Phones.
      conv.ask(new BasicCard({
        title: `Investment return: ${earned}`,
        subtitle: `Investment date: ${dateToCalculate.toDateString()}`,
        text: `Bitcoin price on ${dateToCalculate.toDateString()} is: ${investmentAmount}.  \n
Investment: ${formatMoney(bitcoinInvestment)}.  \n  
Earned Bitcoins: ${investment.startBitcoin.toFixed(2)} btc.  \n  
Latest Price Of Bitcoin: ${formatMoney(investment.sellPrice.toFixed(2))}.  \n   
Sold Bitcoins: ${investment.startBitcoin.toFixed(2)} btc.  \n   
Revenue: ${earned}.  \n`,
          image: new Image({
              url: 'https://raw.githubusercontent.com/sreesaikumar/Bitcoin-Genie/master/images/Carousel/portrait.png',
              alt: 'Bitcoin',
            }),
          display: 'CROPPED',
      }));
});


// function formatMoney(num) {
//     num = num.toString();
//     var afterPoint = '';
//     if(num.indexOf('.') > 0)
//        afterPoint = num.substring(num.indexOf('.'),num.length);
//        num = Math.floor(num);
//     num = num.toString();

//     var lastThree = num.substring(num.length-3);
//     var otherNumbers = num.substring(0,num.length-3);
    
//     if(otherNumbers != '')
//         lastThree = ',' + lastThree;
//         var result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    
//     return result;
    
// }

function formatMoney(num) {
  const money = num;
  var result;
  
  if (currency === 'AED' || currency === 'United Arab Emirates') //United Arab Emirates: AE	Dirham: AED
      result = new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }).format(money);

  else if (currency === 'AFN') //Afghanistan: AF	Afghani: AFN
      result = new Intl.NumberFormat('en-AF', { style: 'currency', currency: 'AFN' }).format(money);

  else if (currency === 'ALL') //Albania: AL	Lek: ALL
      result = new Intl.NumberFormat('en-AL', { style: 'currency', currency: 'ALL' }).format(money);

  else if (currency === 'AMD') //Armenia: AM	Dram: AMD
      result = new Intl.NumberFormat('en-AM', { style: 'currency', currency: 'AMD' }).format(money);

  else if (currency === 'ANG') //Saint Martin (French part): MF	Netherlands Antillean guilder: ANG
      result = new Intl.NumberFormat('en-MF', { style: 'currency', currency: 'ANG' }).format(money);

  else if (currency === 'AOA') //Angola: AO	Angolan kwanza: AOA
      result = new Intl.NumberFormat('en-AO', { style: 'currency', currency: 'AOA' }).format(money);

  else if (currency === 'ARS') //Argentina: AR	Peso: ARS
      result = new Intl.NumberFormat('en-AR', { style: 'currency', currency: 'ARS' }).format(money);

  else if (currency === 'AUD') //Australian: AU	Australian Dollars: AUD
      result = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(money);

  else if (currency === 'AWG') //Aruba: AW   Aruban florin: AWG
      result = new Intl.NumberFormat('en-AW', { style: 'currency', currency: 'AUD' }).format(money);

  else if (currency === 'AZN') //Azerbaijan: AZ	Manat: AZN
      result = new Intl.NumberFormat('en-AZ', { style: 'currency', currency: 'AZN' }).format(money);

  else if (currency === 'BAM') //Bosnia and Herzegovina: BA	Bosnia and Herzegovina convertible mark: BAM
      result = new Intl.NumberFormat('en-BA', { style: 'currency', currency: 'BAM' }).format(money);

  else if (currency === 'BBD') //Barbados: BB	Barbadian Dollar: BBD
      result = new Intl.NumberFormat('en-BB', { style: 'currency', currency: 'BBD' }).format(money);

  else if (currency === 'BDT') //Bangladesh: BD	Taka: BDT
      result = new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(money);

  else if (currency === 'BGN') //Bulgaria: BG	Lev: BGN
      result = new Intl.NumberFormat('en-BG', { style: 'currency', currency: 'BGN' }).format(money);

  else if (currency === 'BHD') //Bahrain: BH	Bahraini Dinar: BHD
      result = new Intl.NumberFormat('en-BH', { style: 'currency', currency: 'BHD' }).format(money);

  else if (currency === 'BIF') //Burundi: BI	Burundi Franc: BIF
      result = new Intl.NumberFormat('en-BI', { style: 'currency', currency: 'BIF' }).format(money);

  else if (currency === 'BMD') //Bermuda: BM	Bermudian Dollar: BMD
      result = new Intl.NumberFormat('en-BM', { style: 'currency', currency: 'BMD' }).format(money);

  else if (currency === 'BND') //Brunei Darussalam: BN	Bruneian Dollar: BND
      result = new Intl.NumberFormat('en-BN', { style: 'currency', currency: 'BND' }).format(money);

  else if (currency === 'BOB') //Bolivia: BO	Boliviano: BOB
      result = new Intl.NumberFormat('en-BO', { style: 'currency', currency: 'BOB' }).format(money);

  else if (currency === 'BRL') //Brazil: BR	Brazil: BRL
      result = new Intl.NumberFormat('en-BR', { style: 'currency', currency: 'BRL' }).format(money);

  else if (currency === 'BSD') //Bahamas: BS	Bahamian Dollar: BSD
      result = new Intl.NumberFormat('en-BS', { style: 'currency', currency: 'BSD' }).format(money);

  else if (currency === 'BTC') // Bitcoin: BTC
      result = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BTC' }).format(money);

  else if (currency === 'BTN') //Bhutan: BT Bhutanese Ngultrum: BTN/Indian Rupees: INR
      result = new Intl.NumberFormat('en-BT', { style: 'currency', currency: 'BTN' }).format(money);

  else if (currency === 'BWP') //Botswana: BW	Pula: BWP
      result = new Intl.NumberFormat('en-BW', { style: 'currency', currency: 'BWP' }).format(money);

  else if (currency === 'BYR') //Belarus: BY	Belarus Ruble: BYR
      result = new Intl.NumberFormat('en-BY', { style: 'currency', currency: 'BYR' }).format(money);

  else if (currency === 'BZD') //Belize: BZ	Belizean Dollar: BZD
      result = new Intl.NumberFormat('en-BZ', { style: 'currency', currency: 'BZD' }).format(money);

  else if (currency === 'CAD') //Canada: CA	Canadian Dollar: CAD
      result = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(money);

  else if (currency === 'CDF') //Congo (Kinshasa): CD	Congolese Frank: CDF
      result = new Intl.NumberFormat('en-CD', { style: 'currency', currency: 'CDF' }).format(money);

  else if (currency === 'CHF') //Switzerland: CH	Swiss Franc: CHF
      result = new Intl.NumberFormat('en-CH', { style: 'currency', currency: 'CHF' }).format(money);

  else if (currency === 'CLF') //CHILE: CL	Unidad de Fomento/Chilean unit of account: CLF
      result = new Intl.NumberFormat('en-CL', { style: 'currency', currency: 'CLF' }).format(money);

  else if (currency === 'CLP') //Chile: CL	Chilean Peso: CLP
      result = new Intl.NumberFormat('en-CL', { style: 'currency', currency: 'CLP' }).format(money);

  else if (currency === 'CNY') //China: CN	Yuan Renminbi: CNY
      result = new Intl.NumberFormat('en-CN', { style: 'currency', currency: 'CNY' }).format(money);

  else if (currency === 'COP') //Colombia: CO	Peso: COP
      result = new Intl.NumberFormat('en-CO', { style: 'currency', currency: 'COP' }).format(money);

  else if (currency === 'CRC') //Costa Rica: CR	Costa Rican Colon: CRC
      result = new Intl.NumberFormat('en-CR', { style: 'currency', currency: 'CRC' }).format(money);

  else if (currency === 'CUP') //Cuba: CU	Cuban Peso: CUP
      result = new Intl.NumberFormat('en-CU', { style: 'currency', currency: 'CUP' }).format(money);

  else if (currency === 'CVE') //Cape Verde: CV	Escudo: CVE
      result = new Intl.NumberFormat('en-CV', { style: 'currency', currency: 'CVE' }).format(money);

  else if (currency === 'CZK') //Czech Republic: CZ	Koruna: CZK
      result = new Intl.NumberFormat('en-CZ', { style: 'currency', currency: 'CZK' }).format(money);

  else if (currency === 'DJF') //Djibouti: DJ	Djiboutian Franc: DJF
      result = new Intl.NumberFormat('en-DJ', { style: 'currency', currency: 'DJF' }).format(money);

  else if (currency === 'DKK') //Denmark: DK	Danish Krone: DKK
      result = new Intl.NumberFormat('en-DK', { style: 'currency', currency: 'DKK' }).format(money);

  else if (currency === 'DOP') //Dominican Republic: DO	Dominican Peso: DOP
      result = new Intl.NumberFormat('en-DO', { style: 'currency', currency: 'DOP' }).format(money);

  else if (currency === 'DZD') //Algeria: DZ	Algerian Dinar: DZD
      result = new Intl.NumberFormat('en-DZ', { style: 'currency', currency: 'DZD' }).format(money);

  else if (currency === 'EEK') //Estonia: EE	Estonian Kroon: EEK
      result = new Intl.NumberFormat('en-EE', { style: 'currency', currency: 'EEK' }).format(money);

  else if (currency === 'EGP') //Egypt: EG	Egyptian Pound: EGP
      result = new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(money);

  else if (currency === 'ERN') //Eritrea: ER  Eritrean Nnakfa: ERN
      result = new Intl.NumberFormat('en-ER', { style: 'currency', currency: 'ERN' }).format(money);

  else if (currency === 'ETB') //Ethiopia: ET	Ethiopian Birr: ETB
      result = new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB' }).format(money);

  else if (currency === 'EUR') //Germany: DE	Euros: EUR
      result = new Intl.NumberFormat('en-DE', { style: 'currency', currency: 'EUR' }).format(money);

  else if (currency === 'FJD') //Fiji: FJ	Fijian Dollar: FJD
      result = new Intl.NumberFormat('en-FJ', { style: 'currency', currency: 'FJD' }).format(money);

  else if (currency === 'FKP') //Falkland Islands (Malvinas): FK	Falkland Pound: FKP
      result = new Intl.NumberFormat('en-FK', { style: 'currency', currency: 'FKP' }).format(money);

  else if (currency === 'GBP') //United Kingdom: GB	Sterling: GBP
      result = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(money);

  else if (currency === 'GEL') //Georgia: GE	Lari: GEL
      result = new Intl.NumberFormat('en-GE', { style: 'currency', currency: 'GEL' }).format(money);

  else if (currency === 'GHS') //Ghana: GH	Ghana cedi: GHS
      result = new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(money);

  else if (currency === 'GIP') //Gibraltar: GI	Gibraltar Pound: GIP
      result = new Intl.NumberFormat('en-GI', { style: 'currency', currency: 'GIP' }).format(money);

  else if (currency === 'GMD') //Gambia: GM	Dalasi: GMD
      result = new Intl.NumberFormat('en-GM', { style: 'currency', currency: 'GMD' }).format(money);

  else if (currency === 'GNF') //Guinea: GN	Guinean Franc: GNF
      result = new Intl.NumberFormat('en-GN', { style: 'currency', currency: 'GNF' }).format(money);

  else if (currency === 'GTQ') //Guatemala: GT	Quetzal: GTQ
      result = new Intl.NumberFormat('en-GT', { style: 'currency', currency: 'GTQ' }).format(money);

  else if (currency === 'GYD') //Guyana: GY	Guyanaese Dollar: GYD
      result = new Intl.NumberFormat('en-GY', { style: 'currency', currency: 'GYD' }).format(money);

  else if (currency === 'HKD') //Hong Kong: HK	HKD: HKD
      result = new Intl.NumberFormat('en-HK', { style: 'currency', currency: 'HKD' }).format(money);

  else if (currency === 'HNL') //Honduras: HN	Lempira: HNL
      result = new Intl.NumberFormat('en-HN', { style: 'currency', currency: 'HNL' }).format(money);

  else if (currency === 'HRK') //Croatia (Hrvatska): HR	Croatian Dinar: HRK
      result = new Intl.NumberFormat('en-HR', { style: 'currency', currency: 'HRK' }).format(money);

  else if (currency === 'HTG') //Haiti: HT	Gourde: HTG
      result = new Intl.NumberFormat('en-HT', { style: 'currency', currency: 'HTG' }).format(money);

  else if (currency === 'HUF') //Hungary: HU	Forint: HUF
      result = new Intl.NumberFormat('en-HU', { style: 'currency', currency: 'HUF' }).format(money);

  else if (currency === 'IDR') //Indonesia: ID	Indonesian Rupiah: IDR
      result = new Intl.NumberFormat('en-ID', { style: 'currency', currency: 'IDR' }).format(money);

  else if (currency === 'ILS') //Israel: IL	Shekel: ILS
      result = new Intl.NumberFormat('en-IL', { style: 'currency', currency: 'ILS' }).format(money);

  else if (currency === 'IQD') //Iraq: IQ	Iraqi Dinar: IQD
      result = new Intl.NumberFormat('en-IQ', { style: 'currency', currency: 'IQD' }).format(money);

  else if (currency === 'IRR') //Iran (Islamic Republic of): IR	Iranian Rial: IRR
      result = new Intl.NumberFormat('en-IR', { style: 'currency', currency: 'IRR' }).format(money);

  else if (currency === 'ISK') //Iceland: IS	Icelandic Krona: ISK
      result = new Intl.NumberFormat('en-IS', { style: 'currency', currency: 'ISK' }).format(money);

  else if (currency === 'JEP') //Jersey: JE Jersey Pound: JEP
      result = new Intl.NumberFormat('en-JE', { style: 'currency', currency: 'JEP' }).format(money);

  else if (currency === 'JMD') //Jamaica: JM	Jamaican Dollar: JMD
      result = new Intl.NumberFormat('en-JM', { style: 'currency', currency: 'JMD' }).format(money);

  else if (currency === 'JOD') //Jordan: JO	Jordanian Dinar: JOD
      result = new Intl.NumberFormat('en-JO', { style: 'currency', currency: 'JOD' }).format(money);

  else if (currency === 'JPY') //Japan: JP	Japanese Yen: JPY
      result = new Intl.NumberFormat('en-JP', { style: 'currency', currency: 'JPY' }).format(money);

  else if (currency === 'KES') //Kenya: KE	Kenyan Shilling: KES
      result = new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(money);

  else if (currency === 'KGS') //Kyrgyzstan: KG	Som: KGS
      result = new Intl.NumberFormat('en-KG', { style: 'currency', currency: 'KGS' }).format(money);

  else if (currency === 'KHR') //Cambodia: KH	  Riel: KHR
      result = new Intl.NumberFormat('en-KH', { style: 'currency', currency: 'KHR' }).format(money);

  else if (currency === 'KMF') //Comoros: KM	Comoran Franc: KMF
      result = new Intl.NumberFormat('en-KM', { style: 'currency', currency: 'KMF' }).format(money);

  else if (currency === 'KPW') //Korea North: KP	Won: KPW
      result = new Intl.NumberFormat('en-KP', { style: 'currency', currency: 'KPW' }).format(money);

  else if (currency === 'KRW') //Korea South: KR	Won: KRW
      result = new Intl.NumberFormat('en-KR', { style: 'currency', currency: 'KRW' }).format(money);

  else if (currency === 'KWD') //Kuwait: KW	Kuwaiti Dinar: KWD
      result = new Intl.NumberFormat('en-KW', { style: 'currency', currency: 'KWD' }).format(money);

  else if (currency === 'KYD') //Cayman Islands: KY	Caymanian Dollar: KYD
      result = new Intl.NumberFormat('en-KY', { style: 'currency', currency: 'KYD' }).format(money);

  else if (currency === 'KZT') //Kazakhstan: KZ	Tenge: KZT
      result = new Intl.NumberFormat('en-KZ', { style: 'currency', currency: 'KZT' }).format(money);

  else if (currency === 'LAK') //Lao PeopleÕs Democratic Republic: LA   Kip: LAK
      result = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LAK' }).format(money);

  else if (currency === 'LBP') //Lebanon: LB	Lebanese Pound: LBP
      result = new Intl.NumberFormat('en-LB', { style: 'currency', currency: 'LBP' }).format(money);

  else if (currency === 'LKR') //Sri Lanka: LK	Rupee: LKR
      result = new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(money);

  else if (currency === 'LRD') //Liberia: LR	Liberian Dollar: LRD
      result = new Intl.NumberFormat('en-LR', { style: 'currency', currency: 'LRD' }).format(money);

  else if (currency === 'LSL') //Lesotho: LS	Loti: LSL
      result = new Intl.NumberFormat('en-LS', { style: 'currency', currency: 'LSL' }).format(money);

  else if (currency === 'LTL') //Lithuania: LT	Lita: LTL
      result = new Intl.NumberFormat('en-LT', { style: 'currency', currency: 'LTL' }).format(money);

  else if (currency === 'LVL') //Latvia: LV	Lat: LVL
      result = new Intl.NumberFormat('en-LV', { style: 'currency', currency: 'LVL' }).format(money);

  else if (currency === 'LYD') //Libyan Arab Jamahiriya: LY	Libyan Dinar: LYD
      result = new Intl.NumberFormat('en-LY', { style: 'currency', currency: 'LYD' }).format(money);

  else if (currency === 'MAD') //Morocco: MA	Dirham: MAD
      result = new Intl.NumberFormat('en-MA', { style: 'currency', currency: 'MAD' }).format(money);

  else if (currency === 'MDL') //Moldova Republic of: MD	Leu: MDL
      result = new Intl.NumberFormat('en-MD', { style: 'currency', currency: 'MDL' }).format(money);

  else if (currency === 'MGA') //Madagascar: MG	Malagasy Franc: MGA
      result = new Intl.NumberFormat('en-MG', { style: 'currency', currency: 'MGA' }).format(money);

  else if (currency === 'MKD') //Macedonia: MK	Denar: MKD
      result = new Intl.NumberFormat('en-MK', { style: 'currency', currency: 'MKD' }).format(money);

  else if (currency === 'MMK') //Myanmar: MM	Kyat: MMK
      result = new Intl.NumberFormat('en-MM', { style: 'currency', currency: 'MMK' }).format(money);

  else if (currency === 'MNT') //Mongolia: MN	Tugrik: MNT
      result = new Intl.NumberFormat('en-MN', { style: 'currency', currency: 'MNT' }).format(money);

  else if (currency === 'MOP') //Macao S.A.R.: MO	Macanese pataca: MOP
      result = new Intl.NumberFormat('en-MO', { style: 'currency', currency: 'MOP' }).format(money);

  else if (currency === 'MRO') //Mauritania: MR	Ouguiya: MRO
      result = new Intl.NumberFormat('en-MR', { style: 'currency', currency: 'MRO' }).format(money);

  else if (currency === 'MTL') //Malta: MT	Maltese Lira: MTL
      result = new Intl.NumberFormat('en-MT', { style: 'currency', currency: 'MTL' }).format(money);

  else if (currency === 'MUR') //Mauritius: MU	Mauritian Rupee: MUR
      result = new Intl.NumberFormat('en-MU', { style: 'currency', currency: 'MUR' }).format(money);

  else if (currency === 'MVR') //Maldives: MV	  Rufiyaa: MVR
      result = new Intl.NumberFormat('en-MV', { style: 'currency', currency: 'MVR' }).format(money);

  else if (currency === 'MWK') //Malawi: MW	Malawian Kwacha: MWK
      result = new Intl.NumberFormat('en-MW', { style: 'currency', currency: 'MWK' }).format(money);

  else if (currency === 'MXN') //Mexico: MX	Peso: MXN
      result = new Intl.NumberFormat('en-MX', { style: 'currency', currency: 'MXN' }).format(money);

  else if (currency === 'MYR') //Malaysia: MY	  Ringgit: MYR
      result = new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(money);

  else if (currency === 'MZN') //Mozambique: MZ	Metical: MZN
      result = new Intl.NumberFormat('en-MZ', { style: 'currency', currency: 'MZN' }).format(money);

  else if (currency === 'NAD') //Namibia: NA	Dollar: NAD
      result = new Intl.NumberFormat('en-NA', { style: 'currency', currency: 'NAD' }).format(money);

  else if (currency === 'NGN') //Nigeria: NG	Naira: NGN
      result = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(money);

  else if (currency === 'NIO') //Nicaragua: NI	Cordoba Oro: NIO
      result = new Intl.NumberFormat('en-NI', { style: 'currency', currency: 'NIO' }).format(money);

  else if (currency === 'NOK') //Norway: NO	Norwegian Krone: NOK
      result = new Intl.NumberFormat('en-NO', { style: 'currency', currency: 'NOK' }).format(money);

  else if (currency === 'NPR') //Nepal: NP	Nepalese Rupee: NPR
      result = new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR' }).format(money);

  else if (currency === 'NZD') //New Zealand: NZ	 New Zealand Dollars: NZD
      result = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' }).format(money);

  else if (currency === 'OMR') //Oman: OM	  Sul Rial: OMR
      result = new Intl.NumberFormat('en-OM', { style: 'currency', currency: 'OMR' }).format(money);

  else if (currency === 'PAB') //Panama: PA	Balboa: PAB
      result = new Intl.NumberFormat('en-PA', { style: 'currency', currency: 'PAB' }).format(money);

  else if (currency === 'PEN') //Peru: PE	  Nuevo Sol: PEN
      result = new Intl.NumberFormat('en-PE', { style: 'currency', currency: 'PEN' }).format(money);

  else if (currency === 'PGK') //Papua New Guinea: PG	  Kina: PGK
      result = new Intl.NumberFormat('en-PG', { style: 'currency', currency: 'PGK' }).format(money);

  else if (currency === 'PHP') //Philippines: PH 	 Peso: PHP
      result = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(money);

  else if (currency === 'PKR') //Pakistan: PK	  Rupee: PKR
      result = new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' }).format(money);

  else if (currency === 'PLN') //Poland: PL	Zloty: PLN
      result = new Intl.NumberFormat('en-PL', { style: 'currency', currency: 'PLN' }).format(money);

  else if (currency === 'PYG') //Paraguay: PY	  Guarani: PYG
      result = new Intl.NumberFormat('en-PY', { style: 'currency', currency: 'PYG' }).format(money);

  else if (currency === 'QAR') //Qatar: QA	Rial: QAR
      result = new Intl.NumberFormat('en-QA', { style: 'currency', currency: 'QAR' }).format(money);

  else if (currency === 'RON') //Romania: RO	Leu: RON
      result = new Intl.NumberFormat('en-RO', { style: 'currency', currency: 'RON' }).format(money);

  else if (currency === 'RSD') //Serbia: RS	Serbian dinar: RSD
      result = new Intl.NumberFormat('en-RS', { style: 'currency', currency: 'RSD' }).format(money);

  else if (currency === 'RUB') //Russian Federation: RU	Ruble: RUB
      result = new Intl.NumberFormat('en-RU', { style: 'currency', currency: 'RUB' }).format(money);

  else if (currency === 'RWF') //Rwanda: RW	Rwanda Franc: RWF
      result = new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(money);

  else if (currency === 'SAR') //Saudi Arabia: SA	  Riyal: SAR
      result = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(money);

  else if (currency === 'SBD') //Solomon Islands: SB	 Solomon Islands Dollar: SBD
      result = new Intl.NumberFormat('en-SB', { style: 'currency', currency: 'SBD' }).format(money);

  else if (currency === 'SCR') //Seychelles: SC	Rupee: SCR
      result = new Intl.NumberFormat('en-SC', { style: 'currency', currency: 'SCR' }).format(money);

  else if (currency === 'SDG') //Sudan: SD	Dinar: SDG
      result = new Intl.NumberFormat('en-SD', { style: 'currency', currency: 'SDG' }).format(money);

  else if (currency === 'SEK') //Sweden: SE	Krona: SEK
      result = new Intl.NumberFormat('en-SE', { style: 'currency', currency: 'SEK' }).format(money);

  else if (currency === 'SGD') //Singapore: SG	Dollar: SGD
      result = new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(money);

  else if (currency === 'SHP') // Saint Helena: SH   Saint Helena Pound: SHP
      result = new Intl.NumberFormat('en-SH', { style: 'currency', currency: 'SHP' }).format(money);

  else if (currency === 'SLL') //Sierra Leone: SL	  Leone: SLL
      result = new Intl.NumberFormat('en-SL', { style: 'currency', currency: 'SLL' }).format(money);

  else if (currency === 'SOS') //Somalia: SO	Shilling: SOS
      result = new Intl.NumberFormat('en-SO', { style: 'currency', currency: 'SOS' }).format(money);

  else if (currency === 'SRD') //Suriname: SR	  Surinamese Guilder: SRD
      result = new Intl.NumberFormat('en-SR', { style: 'currency', currency: 'SRD' }).format(money);

  else if (currency === 'STD') //Sao Tome and Principe: ST	Dobra: STD
      result = new Intl.NumberFormat('en-ST', { style: 'currency', currency: 'STD' }).format(money);

  else if (currency === 'SVC') //El Salvador: SV	Salvadoran Colon: SVC
      result = new Intl.NumberFormat('en-SV', { style: 'currency', currency: 'SVC' }).format(money);

  else if (currency === 'SYP') //Syrian Arab Republic: SY	  Syrian Pound: SYP
      result = new Intl.NumberFormat('en-SY', { style: 'currency', currency: 'SYP' }).format(money);

  else if (currency === 'SZL') //Swaziland: SZ	Lilangeni: SZL
      result = new Intl.NumberFormat('en-SZ', { style: 'currency', currency: 'SZL' }).format(money);

  else if (currency === 'THB') //Thailand: TH	  Baht: THB
      result = new Intl.NumberFormat('en-TH', { style: 'currency', currency: 'THB' }).format(money);

  else if (currency === 'TJS') //Tajikistan: TJ	Tajikistan Ruble: TJS
      result = new Intl.NumberFormat('en-TJ', { style: 'currency', currency: 'TJS' }).format(money);

  else if (currency === 'TMT') //Turkmenistan: TM	  Manat: TMT
      result = new Intl.NumberFormat('en-TM', { style: 'currency', currency: 'TMT' }).format(money);

  else if (currency === 'TND') //Tunisia: TN	 Tunisian Dinar: TND
      result = new Intl.NumberFormat('en-TN', { style: 'currency', currency: 'TND' }).format(money);

  else if (currency === 'TOP') //Tonga: TO	PaÕanga: TOP
      result = new Intl.NumberFormat('en-TO', { style: 'currency', currency: 'TOP' }).format(money);

  else if (currency === 'TRY') //Turkey: TR	Lira: TRY
      result = new Intl.NumberFormat('en-TR', { style: 'currency', currency: 'TRY' }).format(money);

  else if (currency === 'TTD') //Trinidad and Tobago: TT	Trinidad and Tobago Dollar: TTD
      result = new Intl.NumberFormat('en-TT', { style: 'currency', currency: 'TTD' }).format(money);

  else if (currency === 'TWD') //Taiwan: TW	Dollar: TWD
      result = new Intl.NumberFormat('en-TW', { style: 'currency', currency: 'TWD' }).format(money);

  else if (currency === 'TZS') //Tanzania: TZ	  Shilling: TZS
      result = new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS' }).format(money);

  else if (currency === 'UAH') //Ukraine: UA	Hryvnia: UAH
      result = new Intl.NumberFormat('en-UA', { style: 'currency', currency: 'UAH' }).format(money);

  else if (currency === 'UGX') //Uganda: UG	Shilling: UGX
      result = new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(money);

  else if (currency === 'USD') //United States: US	USD: USD
      result = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(money);

  else if (currency === 'UYU') //Uruguay: UY	Peso: UYU
      result = new Intl.NumberFormat('en-UY', { style: 'currency', currency: 'UYU' }).format(money);

  else if (currency === 'UZS') //Uzbekistan:: UZ	Som: UZS
      result = new Intl.NumberFormat('en-UZ', { style: 'currency', currency: 'UZS' }).format(money);

  else if (currency === 'VEF') //Venezuela: VE	Bolivar: VEF
      result = new Intl.NumberFormat('en-VE', { style: 'currency', currency: 'VEF' }).format(money);

  else if (currency === 'VND') //Vietnam: VN	Dong: VND
      result = new Intl.NumberFormat('en-VN', { style: 'currency', currency: 'VND' }).format(money);

  else if (currency === 'VUV') //Vanuatu: VU	Vatu: VUV
      result = new Intl.NumberFormat('en-VU', { style: 'currency', currency: 'VUV' }).format(money);

  else if (currency === 'WST') //Samoan:WS Samoan Tala: WST
      result = new Intl.NumberFormat('en-WS', { style: 'currency', currency: 'WST' }).format(money);

  else if (currency === 'XAF') //Central African Republic: CF	CFA Franc BEAC: XAF
      result = new Intl.NumberFormat('en-CF', { style: 'currency', currency: 'XAF' }).format(money);

  else if (currency === 'XAG') //Philadelphia Silver Index: (Considering as US)  Silver (troy ounce): XAG
      result = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'XAG' }).format(money);

  else if (currency === 'XAU') //Philadelphia Gold Index: (Considering as US)  Gold (troy ounce): XAU
      result = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'XAU' }).format(money);

  else if (currency === 'XBT') // Bitcoin: XBT
      result = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'XBT' }).format(money);

  else if (currency === 'XCD') //Anguilla: AI	East Caribbean Dollar: XCD
      result = new Intl.NumberFormat('en-AI', { style: 'currency', currency: 'XCD' }).format(money);

  else if (currency === 'XDR') //(Considering as US) Special Drawing Rights: XDR
      result = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'XDR' }).format(money);

  else if (currency === 'XOF') //Benin: BJ	CFA Franc BCEAO: XOF
      result = new Intl.NumberFormat('en-BJ', { style: 'currency', currency: 'XOF' }).format(money);

  else if (currency === 'XPF') //New Caledonia: NC	CFP Franc: XPF
      result = new Intl.NumberFormat('en-NC', { style: 'currency', currency: 'XPF' }).format(money);

  else if (currency === 'YER') //Yemen: YE	  Rial: YER
      result = new Intl.NumberFormat('en-YE', { style: 'currency', currency: 'YER' }).format(money);

  else if (currency === 'ZAR') //South Africa: ZA	  Rand: ZAR
      result = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(money);

  else if (currency === 'ZMK') //Zambia: ZM	Zambian Kwacha(pre-2013): ZMK
      result = new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMK' }).format(money);

  else if (currency === 'ZMW') //Zambia: ZM	Zambian Kwacha: ZMW
      result = new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMW' }).format(money);

  else if (currency === 'ZWL') //Zimbabwe: ZW   Zimbabwean Dollar: ZWL
      result = new Intl.NumberFormat('en-ZW', { style: 'currency', currency: 'ZWL' }).format(money);
    
  else if (currency === 'INR') //India	IN	Indian Rupee	INR
      result = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(money);
  
  if(result === undefined) {
    currency = 'INR';
    formatMoney();
  }

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
    if( bitcoinInvestment === undefined ) {
    bitcoinInvestment = 200000;
    }

    let startBitcoin = bitcoinInvestment / investPrice;
    let earned = startBitcoin * sellPrice - bitcoinInvestment;

    return {
        investPrice,
        sellPrice,
        startBitcoin,
        earned
    };
}

function getBitcoinPrice(dateToRead) {

  if ( bitcoinPrices.hasOwnProperty(dateToRead) )  {
      return bitcoinPrices[dateToRead];
  } 
  else {
    var currencyCheck = currency;
    var allCurrencies = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EEK", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MTL", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBT", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMK", "ZMW", "ZWL", "aed", "afn", "all", "amd", "ang", "aoa", "ars", "aud", "awg", "azn", "bam", "bbd", "bdt", "bgn", "bhd", "bif", "bmd", "bnd", "bob", "brl", "bsd", "btc", "btn", "bwp", "byr", "bzd", "cad", "cdf", "chf", "clf", "clp", "cny", "cop", "crc", "cup", "cve", "czk", "djf", "dkk", "dop", "dzd", "eek", "egp", "ern", "etb", "eur", "fjd", "fkp", "gbp", "gel", "ghs", "gip", "gmd", "gnf", "gtq", "gyd", "hkd", "hnl", "hrk", "htg", "huf", "idr", "ils", "inr", "iqd", "irr", "isk", "jep", "jmd", "jod", "jpy", "kes", "kgs", "khr", "kmf", "kpw", "krw", "kwd", "kyd", "kzt", "lak", "lbp", "lkr", "lrd", "lsl", "ltl", "lvl", "lyd", "mad", "mdl", "mga", "mkd", "mmk", "mnt", "mop", "mro", "mtl", "mur", "mvr", "mwk", "mxn", "myr", "mzn", "nad", "ngn", "nio", "nok", "npr", "nzd", "omr", "pab", "pen", "pgk", "php", "pkr", "pln", "pyg", "qar", "ron", "rsd", "rub", "rwf", "sar", "sbd", "scr", "sdg", "sek", "sgd", "shp", "sll", "sos", "srd", "std", "svc", "syp", "szl", "thb", "tjs", "tmt", "tnd", "top", "try", "ttd", "twd", "tzs", "uah", "ugx", "usd", "uyu", "uzs", "vef", "vnd", "vuv", "wst", "xaf", "xag", "xau", "xbt", "xcd", "xdr", "xof", "xpf", "yer", "zar", "zmk", "zmw", "zwl"];
    if ( ! allCurrencies.includes(currencyCheck) )
        currency = "INR";

    // var convertCurrency = currency
    // currency = convertCurrency.toUpperCase();

    // if (currency === 'AED' || currency === 'DIRHAM' || currency === 'DIRHAMS' || currency === 'UNITED ARAB EMIRATES' || currency === 'UNITED ARAB EMIRATES DIRHAM' || currency === 'UNITED ARAB EMIRATES DIRHAMS' || currency === 'UAE DIRHAM' || currency === 'UAE DIRHAMS') //United Arab Emirates: AE	Dirham: AED
    // currency = 'AED';
    // else if (currency === 'AFN' || currency === 'AFGHANI' || currency === 'AFGHANIS' || currency === 'AFGHANISTAN' || currency === 'AFGHANISTAN AFGHANI' || currency === 'AFGHANISTAN AFGHANIS') //Afghanistan: AF	Afghani: AFN
    // currency = 'AFN';
    // else if (currency === 'ALL' || currency === 'LEK' || currency === 'LEKS' || currency === 'ALBANIAN' || currency === 'ALBANIAN LEK' || currency === 'ALBANIAN LEKS') //Albania: AL	Lek: ALL
    // currency = 'ALL';
    // else if (currency === 'AMD' || currency === 'DRAM' || currency === 'DRAMS' || currency === 'ARMENIAN' || currency === 'ARMENIAN DRAM' || currency === 'ARMENIAN DRAMS') //Armenia: AM	Dram: AMD
    // currency = 'AMD';
    // else if (currency === 'ANG' || currency === 'NETHERLANDS ANTILLEAN GUILDER' || currency === 'NETHERLANDS ANTILLEAN GUILDERS' || currency === 'SAINT MARTIN' || currency === 'SAINT MARTINS' || currency === ' GUILDER' || currency === ' GUILDERS') //Saint Martin (French part): MF	Netherlands Antillean guilder: ANG
    // currency = 'ANG';
    // else if (currency === 'AOA' || currency === 'ANGOLAN KWANZA' || currency === 'ANGOLAN KWANZAS' || currency === 'ANGOLAN' || currency === 'ANGOLA' || currency === 'ANGOLAS') //Angola: AO	Angolan kwanza: AOA
    // currency = 'AOA';
    // else if (currency === 'ARS' || currency === 'PESO' || currency === 'PESOS' || currency === 'ARGENTINA' || currency === 'ARGENTINAS' || currency === 'ARGENTINA PESOS') //Argentina: AR	Peso: ARS
    // currency = 'ARS';
    // else if (currency === 'AUD' || currency === 'AUSTRALIAN DOLLAR' || currency === 'AUSTRALIAN DOLLARS' || currency === 'AUSTRALIAN MONEY' || currency === 'AUSTRALIAN') //Australian: AU	Australian Dollars: AUD
    // currency = 'AUD';
    // else if (currency === 'AWG' || currency === 'ARUBAN FLORIN' || currency === 'ARUBAN FLORINS' || currency === 'ARUBA' || currency === 'FLORIN' || currency === 'FLORINS') //Aruba: AW   Aruban florin: AWG
    // currency = 'AUD';
    // else if (currency === 'AZN' || currency === 'MANAT' || currency === 'MANATS' || currency === 'AZERBAIJANI' || currency === 'AZERBAIJANI MANAT' || currency === 'AZERBAIJANI MANATS') //Azerbaijan: AZ	Manat: AZN
    // currency = 'AZN';
    // else if (currency === 'BAM' || currency === 'BOSNIA HERZEGOVINA CONVERTIBLE MARK' || currency === 'BOSNIA HERZEGOVINA CONVERTIBLE MARKS' || currency === 'BOSNIA HERZEGOVINA' || currency === 'BOSNIA HERZEGOVINA CONVERTIBLE MARK' || currency === 'BOSNIAS') //Bosnia and Herzegovina: BA	Bosnia and Herzegovina convertible mark: BAM
    // currency = 'BAM';
    // else if (currency === 'BBD' || currency === 'BARBADIAN DOLLAR' || currency === 'BARBADIAN DOLLARS' || currency === 'BARBADIAN' || currency === 'BARBADIANS' || currency === 'BARBADOS DOLLAR') //Barbados: BB	Barbadian Dollar: BBD
    // currency = 'BBD';
    // else if (currency === 'BDT' || currency === 'TAKA' || currency === 'TAKAS' || currency === 'BANGLADESHI' || currency === 'BANGLADESHI TAKA' || currency === 'BANGLADESHI TAKAS') //Bangladesh: BD	Taka: BDT
    // currency = 'BDT';
    // else if (currency === 'BGN' || currency === 'LEV' || currency === 'LEVS' || currency === 'BULGARIAN' || currency === 'BULGARIAN LEV' || currency === 'BULGARIAN LEVS') //Bulgaria: BG	Lev: BGN
    // currency = 'BGN';
    // else if (currency === 'BHD' || currency === 'DINAR' || currency === 'DINARS' || currency === 'BAHRAINIS' || currency === 'BAHRAINI DINAR' || currency === 'BAHRAINI DINARS') //Bahrain: BH	Bahraini Dinar: BHD
    // currency = 'BHD';
    // else if (currency === 'BIF' || currency === 'BURUNDI FRANC' || currency === 'BURUNDI FRANCS' || currency === 'BURUNDI' || currency === 'BURUNDIS') //Burundi: BI	Burundi Franc: BIF
    // currency = 'BIF';
    // else if (currency === 'BMD' || currency === 'BERMUDAN DOLLAR' || currency === 'BERMUDAN DOLLARS' || currency === 'BERMUDAN' || currency === 'BERMUDANS' || currency === 'BERMUDANS DOLLARS') //Bermuda: BM	Bermudian Dollar: BMD
    // currency = 'BMD';
    // else if (currency === 'BND' || currency === 'BRUNEIAN DOLLAR' || currency === 'BRUNEIAN DOLLARS' || currency === 'BRUNEIAN' || currency === 'BRUNEI DARUSSALAM DOLLAR' || currency === 'BRUNEI DARUSSALAM DOLLARS') //Brunei Darussalam: BN	Bruneian Dollar: BND
    // currency = 'BND';
    // else if (currency === 'BOB' || currency === 'BOLIVIANO' || currency === 'BOLIVIANOS' || currency === 'BOLIVIA' || currency === 'BOLIVIA BOLIVIANO' || currency === 'BOLIVIA BOLIVIANOS') //Bolivia: BO	Boliviano: BOB
    // currency = 'BOB';
    // else if (currency === 'BRL' || currency === 'REAL' || currency === 'REALS' || currency === 'BRAZIL' || currency === 'BRAZILIAN REAL' || currency === 'BRAZILIAN REALS') //Brazil: BR	Brazil: BRL
    // currency = 'BRL';
    // else if (currency === 'BSD' || currency === 'BAHAMIAN DOLLAR' || currency === 'BAHAMIAN DOLLARS' || currency === 'BAHAMIAN' || currency === 'BAHAMIANS') //Bahamas: BS	Bahamian Dollar: BSD
    // currency = 'BSD';
    // else if (currency === 'BTC' || currency === 'BITCOIN' || currency === 'BITCOINS' || currency === 'BITCOIN MONEY' || currency === 'BITCOIN CURRENCY' || currency === 'BITCOIN CURRENCIES') // Bitcoin: BTC
    // currency = 'BTC';
    // else if (currency === 'BTN' || currency === 'BHUTANESE NGULTRUM' || currency === 'BHUTANESE NGULTRUMS' || currency === 'BHUTAN' || currency === 'BHUTANS') //Bhutan: BT Bhutanese Ngultrum: BTN/Indian Rupees: INR
    // currency = 'BTN';
    // else if (currency === 'BWP' || currency === 'PULA' || currency === 'PULAS' || currency === 'BOTSWANA' || currency === 'BOTSWANAN PULA' || currency === 'BOTSWANAN PULAS') //Botswana: BW	Pula: BWP
    // currency = 'BWP';
    // else if (currency === 'BYR' || currency === 'BELARUS RUBLE' || currency === 'BELARUS RUBLES' || currency === 'BELARUS' || currency === 'BELARUSIAN RUBLE' || currency === 'BELARUSIAN RUBLES') //Belarus: BY	Belarus Ruble: BYR
    // currency = 'BYR';
    // else if (currency === 'BZD' || currency === 'BELIZE DOLLAR' || currency === 'BELIZE DOLLARS' || currency === 'BELIZE' || currency === 'BELIZEAN DOLLAR' || currency === 'BELIZEAN DOLLARS') //Belize: BZ	Belizean Dollar: BZD
    // currency = 'BZD';
    // else if (currency === 'CAD' || currency === 'CANADIAN DOLLAR' || currency === 'CANADIAN DOLLARS' || currency === 'CANADA' || currency === 'CANADIAN' || currency === 'CANADIANS') //Canada: CA	Canadian Dollar: CAD
    // currency = 'CAD';
    // else if (currency === 'CDF' || currency === 'CONGOLESE FRANC' || currency === 'CONGOLESE FRANCS' || currency === 'CONGO' || currency === 'CONGO FRANC' || currency === 'CONGO FRANCS') //Congo (Kinshasa): CD	Congolese Frank: CDF
    // currency = 'CDF';
    // else if (currency === 'CHF' || currency === 'SWISS FRANC' || currency === 'SWISS FRANCS' || currency === 'SWITZERLAND' || currency === 'SWITZERLAND FRANC' || currency === 'SWITZERLAND FRANCS') //Switzerland: CH	Swiss Franc: CHF
    // currency = 'CHF';
    // else if (currency === 'CLF' || currency === 'CHILEAN UNIT OF ACCOUNT' || currency === 'UNIDADS' || currency === 'UNIDAD DE FOMENTO' || currency === 'UNIDAD DE FOMENTOS') //CHILE: CL	Unidad de Fomento/Chilean unit of account: CLF
    // currency = 'CLF';
    // else if (currency === 'CLP' || currency === 'CHILEAN PESO' || currency === 'CHILEAN PESOS' || currency === 'CHILE' || currency === 'CHILEAN' || currency === 'CHILEANS') //Chile: CL	Chilean Peso: CLP
    // currency = 'CLP';
    // else if (currency === 'CNY' || currency === 'YUAN' || currency === 'YUANS' || currency === 'CHINESE' || currency === 'CHINESE YUAN' || currency === 'CHINESE YUANS') //China: CN	Yuan Renminbi: CNY
    // currency = 'CNY';
    // else if (currency === 'COP' || currency === 'COLOMBIAN PESO' || currency === 'COLOMBIAN PESOS' || currency === 'COLOMBIA' || currency === 'COLOMBIAN' || currency === 'COLOMBIAN CURRENCY') //Colombia: CO	Peso: COP
    // currency = 'COP';
    // else if (currency === 'CRC' || currency === 'COSTA RICAN COLON' || currency === 'COSTA RICAN COLONS' || currency === 'COSTA RICAN' || currency === 'COSTA RICANS' || currency === 'COLON' || currency === 'COLONS') //Costa Rica: CR	Costa Rican Colon: CRC
    // currency = 'CRC';
    // else if (currency === 'CUP' || currency === 'CUBAN PESO' || currency === 'CUBAN PESOS' || currency === 'CUBA' || currency === 'CUBAN' || currency === 'CUBANS') //Cuba: CU	Cuban Peso: CUP
    // currency = 'CUP';
    // else if (currency === 'CVE' || currency === 'ESCUDO' || currency === 'ESCUDOS' || currency === 'CAPE VERDEAN' || currency === 'CAPE VERDEAN ESCUDO' || currency === 'CAPE VERDEAN ESCUDOS') //Cape Verde: CV	  Escudo: CVE
    // currency = 'CVE';
    // else if (currency === 'CZK' || currency === 'KORUNA' || currency === 'KORUNAS' || currency === 'CZECH REPUBLIC' || currency === 'CZECH REPUBLIC KORUNA' || currency === 'CZECH REPUBLIC KORUNAS') //Czech Republic: CZ	Koruna: CZK
    // currency = 'CZK';
    // else if (currency === 'DJF' || currency === 'DJIBOUTIAN FRANC' || currency === 'DJIBOUTIAN FRANCS' || currency === 'DJIBOUTI' || currency === 'DJIBOUTIAN' || currency === 'DJIBOUTIANS') //Djibouti: DJ	Djiboutian Franc: DJF
    // currency = 'DJF';
    // else if (currency === 'DKK' || currency === 'DANISH KRONE' || currency === 'DANISH KRONES' || currency === 'DENMARK' || currency === 'DEMARK DANISH KRONE' || currency === 'DENMARK DANISH KRONES' || currency === 'DENMARK KRONE' || currency === 'DENMARK KRONES' || currency === 'DENMARK DANISH' || currency === 'DENMARK DANISHES') //Denmark: DK	Danish Krone: DKK
    // currency = 'DKK';
    // else if (currency === 'DOP' || currency === 'DOMINICAN PESO' || currency === 'DOMINICAN PESOS' || currency === 'DOMINICAN REPUBLIC' || currency === 'DOMINICAN REPUBLIC PESO' || currency === 'DOMINICAN REPUBLIC PESOS') //Dominican Republic: DO	Dominican Peso: DOP
    // currency = 'DOP';
    // else if (currency === 'DZD' || currency === 'ALGERIAN DINAR' || currency === 'ALGERIAN DINARS' || currency === 'ALGERIAN' || currency === 'ALGERIANS' || currency === 'ALGERIAN CURRENCY') //Algeria: DZ	Algerian Dinar: DZD
    // currency = 'DZD';
    // else if (currency === 'EEK' || currency === 'ESTONIAN KROON' || currency === 'ESTONIAN KROONS' || currency === 'ESTONIA' || currency === 'ESTONIANS' || currency === 'KROONS') //Estonia: EE	Estonian Kroon: EEK
    // currency = 'EEK';
    // else if (currency === 'EGP' || currency === 'EGYPTIAN POUND' || currency === 'EGYPTIAN POUNDS' || currency === 'EGYPT' || currency === 'EGYPTIANS' || currency === 'EGYPT CURRENCY') //Egypt: EG	Egyptian Pound: EGP
    // currency = 'EGP';
    // else if (currency === 'ERN' || currency === 'ERITREAN NNAKFA' || currency === 'ERITREAN NNAKFAS' || currency === 'ERITREA' || currency === 'ERITREA' || currency === 'ERITREANS' || currency === 'NNAKFA' || currency === 'NNAKFAS') //Eritrea: ER  Eritrean Nnakfa: ERN
    // currency = 'ERN';
    // else if (currency === 'ETB' || currency === 'ETHIOPIAN BIRR' || currency === 'ETHIOPIAN BIRRS' || currency === 'ETHIOPIA' || currency === 'BIRR' || currency === 'BIRRS') //Ethiopia: ET	Ethiopian Birr: ETB
    // currency = 'ETB';
    // else if (currency === 'EUR' || currency === 'EURO' || currency === 'EUROS' || currency === 'GERMANY' || currency === 'GERMANY CURRENCY' || currency === 'GERMAN CURRENCY') //Germany: DE	Euros: EUR
    // currency = 'EUR';
    // else if (currency === 'FJD' || currency === 'FIJIAN DOLLAR' || currency === 'FIJIAN DOLLARS' || currency === 'FIJI' || currency === 'FIJIAN' || currency === 'FIJIANS') //Fiji: FJ	Fijian Dollar: FJD
    // currency = 'FJD';
    // else if (currency === 'FKP' || currency === 'FALKLAND POUND' || currency === 'FALKLAND POUNDS' || currency === 'FALKLAND ISLAND' || currency === 'FALKLAND ISLANDS POUND' || currency === 'FALKLAND ISLANDS POUNDS') //Falkland Islands (Malvinas): FK	Falkland Pound: FKP
    // currency = 'FKP';
    // else if (currency === 'GBP' || currency === 'STERLING' || currency === 'STERLINGS' || currency === 'BRITISH POUND' || currency === 'BRITISH POUNDS' || currency === 'BRITISH POUND STERLING' || currency === 'BRITISH POUND STERLINGS' || currency === 'POUND STERLING' || currency === 'POUND STERLINGS' || currency === 'STERLING POUND' || currency === 'STERLING POUNDS') //United Kingdom: GB	Sterling: GBP
    // currency = 'GBP';
    // else if (currency === 'GEL' || currency === 'LARI' || currency === 'LARIS' || currency === 'GEORGIA' || currency === 'GEORGIAN LARI' || currency === 'GEORGIAN LARIS' || currency === 'GEORGIAN' || currency === 'GEORGIANS') //Georgia: GE	Lari: GEL
    // currency = 'GEL';
    // else if (currency === 'GHS' || currency === 'GHANAIAN CEDI' || currency === 'GHANAIAN CEDIS' || currency === 'GHANA CEDI' || currency === 'GHANA CEDIS' || currency === 'CEDI' || currency === 'CEDIS' || currency === 'GHANA') //Ghana: GH	Ghana cedi: GHS
    // currency = 'GHS';
    // else if (currency === 'GIP' || currency === 'GIBRALTAR POUND' || currency === 'GIBRALTAR POUNDS' || currency === 'GIBRALTAR' || currency === 'GIBRALTARS' || currency === 'GIBRALTAR CURRENCY') //Gibraltar: GI	Gibraltar Pound: GIP
    // currency = 'GIP';
    // else if (currency === 'GMD' || currency === 'DALASI' || currency === 'DALASIS' || currency === 'GAMBIAN DALASI' || currency === 'GAMBIAN DALASIS' || currency === 'GAMBIAN' || currency === 'GAMBIANS' || currency === 'GAMBIA') //Gambia: GM	Dalasi: GMD
    // currency = 'GMD';
    // else if (currency === 'GNF' || currency === 'GUINEAN FRANC' || currency === 'GUINEAN FRANCS' || currency === 'GUINEAN' || currency === 'GUINEANS' || currency === 'GUINEAN CURRENCY') //Guinea: GN	Guinean Franc: GNF
    // currency = 'GNF';
    // else if (currency === 'GTQ' || currency === 'QUETZAL' || currency === 'QUETZALS' || currency === 'GUATEMALA' || currency === 'GUATEMALAN QUETZAL' || currency === 'GUATEMALAN QUETZALS') //Guatemala: GT	Quetzal: GTQ
    // currency = 'GTQ';
    // else if (currency === 'GYD' || currency === 'GUYANAESE DOLLAR' || currency === 'GUYANAESE DOLLARS' || currency === 'GUYANA' || currency === 'GUYANAS' || currency === 'GUYANAESE DOLLAR CURRENCY') //Guyana: GY	Guyanaese Dollar: GYD
    // currency = 'GYD';
    // else if (currency === 'HKD' || currency === 'HONG KONG DOLLAR' || currency === 'HONG KONG DOLLARS' || currency === 'HONG KONG' || currency === 'HONGKONG' || currency === 'HONG KONG CURRENCY') //Hong Kong: HK	HKD: HKD
    // currency = 'HKD';
    // else if (currency === 'HNL' || currency === 'LEMPIRA' || currency === 'LEMPIRAS' || currency === 'HONDURAN LEMPIRA' || currency === 'HONDURAN LEMPIRAS' || currency === 'HONDURAS') //Honduras: HN	Lempira: HNL
    // currency = 'HNL';
    // else if (currency === 'HRK' || currency === 'CROATIAN KUNA' || currency === 'CROATIAN KUNAS' || currency === 'CROATIAN DINAR' || currency === 'CROATIAN DINARS' || currency === 'CROATIA' || currency === 'CROATIAS' || currency === 'HRVATSKA' || currency === 'HRVATSKAS') //Croatia (Hrvatska): HR	Croatian Dinar: HRK
    // currency = 'HRK';
    // else if (currency === 'HTG' || currency === 'GOURDE' || currency === 'GOURDES' || currency === 'HAITIAN GOURDE' || currency === 'HAITIAN GOURDES' || currency === 'HAITI' || currency === 'HAITIAN' || currency === 'HAITIANS' || currency === 'HAITIAN CURRENCY') //Haiti: HT	Gourde: HTG
    // currency = 'HTG';
    // else if (currency === 'HUF' || currency === 'FORINT' || currency === 'FORINTS' || currency === 'HUNGARIAN FORINT' || currency === 'HUNGARIAN FORINTS' || currency === 'HUNGARY' || currency === 'HUNGARIAN' || currency === 'HUNGARIANS') //Hungary: HU	Forint: HUF
    // currency = 'HUF';
    // else if (currency === 'IDR' || currency === 'INDONESIAN RUPIAH' || currency === 'INDONESIAN RUPIAHS' || currency === 'INDONESIA' || currency === 'INDONESIAN' || currency === 'INDONESIANS') //Indonesia: ID	Indonesian Rupiah: IDR
    // currency = 'IDR';
    // else if (currency === 'ILS' || currency === 'SHEQEL' || currency === 'SHEQELS' || currency === 'ISRAELI' || currency === 'ISRAELIS' || currency === 'ISRAELI NEW SHEQEL' || currency === 'ISRAELI NEW SHEQELS') //Israel: IL	Shekel: ILS
    // currency = 'ILS';
    // else if (currency === 'IQD' || currency === 'IRAQI DINAR' || currency === 'IRAQI DINARS' || currency === 'IRAQI' || currency === 'IRAQIS' || currency === 'IRAQ CURENCY') //Iraq: IQ	Iraqi Dinar: IQD
    // currency = 'IQD';
    // else if (currency === 'IRR' || currency === 'IRANIAN RIAL' || currency === 'IRANIAN RIALS' || currency === 'IRAN' || currency === 'IRANIAN' || currency === 'IRAN CURRENCY') //Iran (Islamic Republic of): IR	Iranian Rial: IRR
    // currency = 'IRR';
    // else if (currency === 'ISK' || currency === 'ICELANDIC KRONA' || currency === 'ICELANDIC KRONAS' || currency === 'ICELAND' || currency === 'ICELANDIC CURRENCY' || currency === 'ICELANDIC KRÓNA') //Iceland: IS	Icelandic Krona: ISK
    // currency = 'ISK';
    // else if (currency === 'JEP' || currency === 'JERSEY POUND' || currency === 'JERSEY POUNDS' || currency === 'JERSEY' || currency === 'JERSEYS' || currency === 'JERSEY CURRENCY') //Jersey: JE Jersey Pound: JEP
    // currency = 'JEP';
    // else if (currency === 'JMD' || currency === 'JAMAICAN DOLLAR' || currency === 'JAMAICAN DOLLARS' || currency === 'JAMAICA' || currency === 'JAMAICAN' || currency === 'JAMAICANS') //Jamaica: JM	Jamaican Dollar: JMD
    // currency = 'JMD';
    // else if (currency === 'JOD' || currency === 'JORDANIAN DINAR' || currency === 'JORDANIAN DINARS' || currency === 'JORDAN' || currency === 'JORDANIAN' || currency === 'JORDANIANS') //Jordan: JO	Jordanian Dinar: JOD
    // currency = 'JOD';
    // else if (currency === 'JPY' || currency === 'JAPANESE YEN' || currency === 'JAPANESE YENS' || currency === 'YEN' || currency === 'YENS' || currency === 'JAPAN' || currency === 'JAPANESE' || currency === 'JAPANESES') //Japan: JP	Japanese Yen: JPY
    // currency = 'JPY';
    // else if (currency === 'KES' || currency === 'KENYAN SHILLING' || currency === 'KENYAN SHILLINGS' || currency === 'KENYA' || currency === 'KENYAN' || currency === 'SHILLING' || currency === 'SHILLINGS') //Kenya: KE	Kenyan Shilling: KES
    // currency = 'KES';
    // else if (currency === 'KGS' || currency === 'KYRGYSTANI SOM' || currency === 'KYRGYSTANI SOMS' || currency === 'SOM' || currency === 'SOMS' || currency === 'KYRGYSTANI' || currency === 'KYRGYSTANIS') //Kyrgyzstan: KG	Som: KGS
    // currency = 'KGS';
    // else if (currency === 'KHR' || currency === 'CAMBODIAN RIEL' || currency === 'CAMBODIAN RIELS' || currency === 'RIEL' || currency === 'RIELS' || currency === 'CAMBODIAN') //Cambodia: KH	  Riel: KHR
    // currency = 'KHR';
    // else if (currency === 'KMF' || currency === 'COMORIAN FRANC' || currency === 'COMORIAN FRANCS' || currency === 'COMORIAN FRANC' || currency === 'COMOROS') //Comoros: KM	Comoran Franc: KMF
    // currency = 'KMF';
    // else if (currency === 'KPW' || currency === 'WON' || currency === 'WONS' || currency === 'NORTH KOREAN WON' || currency === 'NORTH KOREAN WONS' || currency === 'KOREAN NORTH') //Korea North: KP	Won: KPW
    // currency = 'KPW';
    // else if (currency === 'KRW' || currency === 'SOUTH KOREAN WON' || currency === 'SOUTH KOREAN WONS' || currency === 'SOUTH KOREAN' || currency === 'SOUTH KOREANS') //Korea South: KR	Won: KRW
    // currency = 'KRW';
    // else if (currency === 'KWD' || currency === 'KUWAITI DINAR' || currency === 'KUWAITI DINARS' || currency === 'KUWAITI' || currency === 'KUWAITIS') //Kuwait: KW	Kuwaiti Dinar: KWD
    // currency = 'KWD';
    // else if (currency === 'KYD' || currency === 'CAYMAN ISLANDS DOLLAR' || currency === 'CAYMAN ISLANDS DOLLARS' || currency === 'CAYMANIAN DOLLAR' || currency === 'CAYMANIAN DOLLARS' || currency === 'CAYMAN ISLANDS') //Cayman Islands: KY	Caymanian Dollar: KYD
    // currency = 'KYD';
    // else if (currency === 'KZT' || currency === 'TENGE' || currency === 'TENGES' || currency === 'KAZAKHSTANI' || currency === 'KAZAKHSTANIS' || currency === 'KAZAKHSTANI TENGE' || currency === 'KAZAKHSTANI TENGES') //Kazakhstan: KZ	Tenge: KZT
    // currency = 'KZT';
    // else if (currency === 'LAK' || currency === 'KIP' || currency === 'KIPS' || currency === 'LAOTIAN KIP' || currency === 'LAOTIAN KIPS' || currency === 'LAO CURRENCY') //Lao PeopleÕs Democratic Republic: LA   Kip: LAK
    // currency = 'LAK';
    // else if (currency === 'LBP' || currency === 'LEBANESE POUND' || currency === 'LEBANESE POUNDS' || currency === 'LEBANESE' || currency === 'LEBANESES' || currency === 'LEBANON') //Lebanon: LB	Lebanese Pound: LBP
    // currency = 'LBP';
    // else if (currency === 'LKR' || currency === 'SRI LANKAN RUPEE' || currency === 'SRI LANKAN RUPEES' || currency === 'LANKAN RUPEE' || currency === 'LANKAN RUPEES' || currency === 'LANKANS CURRENCY') //Sri Lanka: LK	Rupee: LKR
    // currency = 'LKR';
    // else if (currency === 'LRD' || currency === 'LIBERIAN DOLLAR' || currency === 'LIBERIAN DOLLARS' || currency === 'LIBERIA' || currency === 'LIBERIAN') //Liberia: LR	Liberian Dollar: LRD
    // currency = 'LRD';
    // else if (currency === 'LSL' || currency === 'LOTI' || currency === 'LOTIS' || currency === 'LESOTHO' || currency === 'LESOTHO LOTI' || currency === 'LESOTHO LOTIS') //Lesotho: LS	Loti: LSL
    // currency = 'LSL';
    // else if (currency === 'LTL' || currency === 'LITA' || currency === 'LITAS' || currency === 'LITHUANIA' || currency === 'LITHUANIAN LITA' || currency === 'LITHUANIAN LITAS') //Lithuania: LT	Lita: LTL
    // currency = 'LTL';
    // else if (currency === 'LVL' || currency === 'LATS' || currency === 'LATS' || currency === 'LATVIA' || currency === 'LATVIAN LAT' || currency === 'LATVIAN LATS') //Latvia: LV	Lat: LVL
    // currency = 'LVL';
    // else if (currency === 'LYD' || currency === 'LIBYAN DINAR' || currency === 'LIBYAN DINARS' || currency === 'LIBYA' || currency === 'LIBYAN') //Libyan Arab Jamahiriya: LY	Libyan Dinar: LYD
    // currency = 'LYD';
    // else if (currency === 'MAD' || currency === 'MOROCCAN DIRHAM' || currency === 'MOROCCAN DIRHAMS' || currency === 'MOROCCO') //Morocco: MA	Dirham: MAD
    // currency = 'MAD';
    // else if (currency === 'MDL' || currency === 'MOLDOVAN LEU' || currency === 'MOLDOVAN LEU' || currency === 'MOLDOVAN' || currency === 'MOLDOVA') //Moldova Republic of: MD	Leu: MDL
    // currency = 'MDL';
    // else if (currency === 'MGA' || currency === 'ARIARY' || currency === 'ARIARYS' || currency === 'MALAGASY' || currency === 'MADAGASCAR' || currency === 'MALAGASY ARIARY' || currency === 'MALAGASY ARIARYS') //Madagascar: MG	Malagasy Franc: MGA
    // currency = 'MGA';
    // else if (currency === 'MKD' || currency === 'DENAR' || currency === 'DENARS' || currency === 'MACEDONIA' || currency === 'MACEDONIAN DENAR' || currency === 'MACEDONIAN DENARS') //Macedonia: MK	Denar: MKD
    // currency = 'MKD';
    // else if (currency === 'MMK' || currency === 'KYAT' || currency === 'KYATS' || currency === 'MYANMAR' || currency === 'MYANMA KYAT' || currency === 'MYANMA KYATS') //Myanmar: MM	Kyat: MMK
    // currency = 'MMK';
    // else if (currency === 'MNT' || currency === 'TUGRIK' || currency === 'TUGRIKS' || currency === 'MONGOLIA' || currency === 'MONGOLIAN TUGRIK' || currency === 'MONGOLIAN TUGRIKS') //Mongolia: MN	Tugrik: MNT
    // currency = 'MNT';
    // else if (currency === 'MOP' || currency === 'PATACA' || currency === 'PATACAS' || currency === 'MACAO' || currency === 'MACANESE PATACA' || currency === 'MACANESE PATACAS') //Macao S.A.R.: MO	Macanese pataca: MOP
    // currency = 'MOP';
    // else if (currency === 'MRO' || currency === 'OUGUIYA' || currency === 'OUGUIYAS' || currency === 'MAURITANIA' || currency === 'MAURITANIAN OUGUIYA' || currency === 'MAURITANIAN OUGUIYAS') //Mauritania: MR	Ouguiya: MRO
    // currency = 'MRO';
    // else if (currency === 'MTL' || currency === 'MALTESE LIRA' || currency === 'MALTESE LIRAS' || currency === 'MALTA' || currency === 'MT LIRA' || currency === 'MT LIRAS') //Malta: MT	Maltese Lira: MTL
    // currency = 'MTL';
    // else if (currency === 'MUR' || currency === 'MAURITIAN RUPEE' || currency === 'MAURITIAN RUPEES' || currency === 'MAURITIA' || currency === 'MAURITIUS') //Mauritius: MU	Mauritian Rupee: MUR
    // currency = 'MUR';
    // else if (currency === 'MVR' || currency === 'RUFIYAA' || currency === 'RUFIYAAS' || currency === 'MALDIVES' || currency === 'MALDIVIAN RUFIYAA' || currency === 'MALDIVIAN RUFIYAAS') //Maldives: MV	  Rufiyaa: MVR
    // currency = 'MVR';
    // else if (currency === 'MWK' || currency === 'MALAWIAN KWACHA' || currency === 'MALAWIAN KWACHAS' || currency === 'MALAWI') //Malawi: MW	Malawian Kwacha: MWK
    // currency = 'MWK';
    // else if (currency === 'MXN' || currency === 'MEXICAN PESO' || currency === 'MEXICAN PESOS' || currency === 'MEXICA') //Mexico: MX	Peso: MXN
    // currency = 'MXN';
    // else if (currency === 'MYR' || currency === 'RINGGIT' || currency === 'RINGGITS' || currency === 'MALAYSIA' || currency === 'MALAYSIAN RINGGIT' || currency === 'MALAYSIAN RINGGITS') //Malaysia: MY	  Ringgit: MYR
    // currency = 'MYR';
    // else if (currency === 'MZN' || currency === 'METICAL' || currency === 'METICALS' || currency === 'MOZAMBIQUE' || currency === 'MOZAMBICAN METICAL' || currency === 'MOZAMBICAN METICALS') //Mozambique: MZ	Metical: MZN
    // currency = 'MZN';
    // else if (currency === 'NAD' || currency === 'NAMIBIAN DOLLAR' || currency === 'NAMIBIAN DOLLARS' || currency === 'NAMIBIA') //Namibia: NA	Dollar: NAD
    // currency = 'NAD';
    // else if (currency === 'NGN' || currency === 'NAIRA' || currency === 'NAIRAS' || currency === 'NIGERIA' || currency === 'NIGERIAN NAIRA' || currency === 'NIGERIAN NAIRAS') //Nigeria: NG	Naira: NGN
    // currency = 'NGN';
    // else if (currency === 'NIO' || currency === 'CÓRDOBA' || currency === 'CÓRDOBAS' || currency === 'NICARAGUA' || currency === 'NICARAGUAN CÓRDOBA' || currency === 'NICARAGUAN CÓRDOBAS') //Nicaragua: NI	Cordoba Oro: NIO
    // currency = 'NIO';
    // else if (currency === 'NOK' || currency === 'NORWEGIAN KRONE' || currency === 'NORWEGIAN KRONES' || currency === 'NORWAY' || currency === 'NORWEGIAN') //Norway: NO	Norwegian Krone: NOK
    // currency = 'NOK';
    // else if (currency === 'NPR' || currency === 'NEPALESE RUPEE' || currency === 'NEPALESE RUPEES' || currency === 'NEPAL') //Nepal: NP	Nepalese Rupee: NPR
    // currency = 'NPR';
    // else if (currency === 'NZD' || currency === 'NEW ZEALAND DOLLAR' || currency === 'NEW ZEALAND DOLLARS' || currency === 'NEW ZEALAND') //New Zealand: NZ	 New Zealand Dollars: NZD
    // currency = 'NZD';
    // else if (currency === 'OMR' || currency === 'OMANI RIAL' || currency === 'OMANI RIALS' || currency === 'OMAN') //Oman: OM	  Sul Rial: OMR
    // currency = 'OMR';
    // else if (currency === 'PAB' || currency === 'BALBOA' || currency === 'BALBOAS' || currency === 'PANAMA' || currency === 'PANAMANIAN BALBOA' || currency === 'PANAMANIAN BALBOAS') //Panama: PA	Balboa: PAB
    // currency = 'PAB';
    // else if (currency === 'PEN' || currency === 'NUEVO SOL' || currency === 'NUEVO SOLS' || currency === 'PERU' || currency === 'PERUVIAN NUEVO SOL' || currency === 'PERUVIAN NUEVO SOLS') //Peru: PE	  Nuevo Sol: PEN
    // currency = 'PEN';
    // else if (currency === 'PGK' || currency === 'KINA' || currency === 'KINAS' || currency === 'PAPUA NEW GUINEA' || currency === 'PAPUA NEW GUINEAN KINA' || currency === 'PAPUA NEW GUINEAN KINAS') //Papua New Guinea: PG	  Kina: PGK
    // currency = 'PGK';
    // else if (currency === 'PHP' || currency === 'PHILIPPINE PESO' || currency === 'PHILIPPINE PESOS' || currency === 'PHILIPPINE') //Philippines: PH 	 Peso: PHP
    // currency = 'PHP';
    // else if (currency === 'PKR' || currency === 'PAKISTANI RUPEE' || currency === 'PAKISTANI RUPEES' || currency === 'PAKISTAN') //Pakistan: PK	  Rupee: PKR
    // currency = 'PKR';
    // else if (currency === 'PLN' || currency === 'ZLOTY' || currency === 'ZLOTYS' || currency === 'POLAND' || currency === 'POLISH ZLOTY' || currency === 'POLISH ZLOTYS') //Poland: PL	Zloty: PLN
    // currency = 'PLN';
    // else if (currency === 'PYG' || currency === 'GUARANI' || currency === 'GUARANIS' || currency === 'PARAGUAYA' || currency === 'PARAGUAYAN GUARANI' || currency === 'PARAGUAYAN GUARANIS') //Paraguay: PY	  Guarani: PYG
    // currency = 'PYG';
    // else if (currency === 'QAR' || currency === 'QATARI RIAL' || currency === 'QATARI RIALS' || currency === 'QATAR') //Qatar: QA	Rial: QAR
    // currency = 'QAR';
    // else if (currency === 'RON' || currency === 'LEU' || currency === 'LEUS' || currency === 'ROMANIA' || currency === 'ROMANIAN LEU' || currency === 'ROMANIAN LEUS') //Romania: RO	Leu: RON
    // currency = 'RON';
    // else if (currency === 'RSD' || currency === 'SERBIAN DINAR' || currency === 'SERBIAN DINARS' || currency === 'SERBIA') //Serbia: RS	Serbian dinar: RSD
    // currency = 'RSD';
    // else if (currency === 'RUB' || currency === 'RUSSIAN RUBLE' || currency === 'RUSSIAN RUBLES' || currency === 'RUSSIA') //Russian Federation: RU	Ruble: RUB
    // currency = 'RUB';
    // else if (currency === 'RWF' || currency === 'RWANDAN FRANC' || currency === 'RWANDAN FRANCS' || currency === 'RWANDA') //Rwanda: RW	Rwanda Franc: RWF
    // currency = 'RWF';
    // else if (currency === 'SAR' || currency === 'RIYAL' || currency === 'RIYALS' || currency === 'SAUDI ARAB' || currency === 'SAUDI' || currency === 'SAUDI RIYAL' || currency === 'SAUDI RIYALS') //Saudi Arabia: SA	  Riyal: SAR
    // currency = 'SAR';
    // else if (currency === 'SBD' || currency === 'SOLOMON ISLANDS DOLLAR' || currency === 'SOLOMON ISLANDS DOLLARS' || currency === 'SOLOMON ISLANDS') //Solomon Islands: SB	 Solomon Islands Dollar: SBD
    // currency = 'SBD';
    // else if (currency === 'SCR' || currency === 'SEYCHELLOIS RUPEE' || currency === 'SEYCHELLOIS RUPEES' || currency === 'SEYCHELLES') //Seychelles: SC	Rupee: SCR
    // currency = 'SCR';
    // else if (currency === 'SDG' || currency === 'SUDANESE POUND' || currency === 'SUDANESE POUNDS' || currency === 'SUDANESE POUND' || currency === 'SUDAN') //Sudan: SD	Dinar: SDG
    // currency = 'SDG';
    // else if (currency === 'SEK' || currency === 'SWEDISH KRONA' || currency === 'SWEDISH KRONAS' || currency === 'SWEDAN') //Sweden: SE	Krona: SEK
    // currency = 'SEK';
    // else if (currency === 'SGD' || currency === 'SINGAPORE DOLLAR' || currency === 'SINGAPORE DOLLARS' || currency === 'SINGAPORE') //Singapore: SG	Dollar: SGD
    // currency = 'SGD';
    // else if (currency === 'SHP' || currency === 'SAINT HELENA POUND' || currency === 'SAINT HELENA POUNDS' || currency === 'SAINT HELENA') // Saint Helena: SH   Saint Helena Pound: SHP
    // currency = 'SHP';
    // else if (currency === 'SLL' || currency === 'LEONE' || currency === 'LEONES' || currency === 'SIERRA LEONE' || currency === 'SIERRA LEONEAN LEONE' || currency === 'SIERRA LEONEAN LEONES') //Sierra Leone: SL	  Leone: SLL
    // currency = 'SLL';
    // else if (currency === 'SOS' || currency === 'SOMALI SHILLING' || currency === 'SOMALI SHILLINGS' || currency === 'SOMALIA') //Somalia: SO	Shilling: SOS
    // currency = 'SOS';
    // else if (currency === 'SRD' || currency === 'SURINAMESE DOLLAR' || currency === 'SURINAMESE DOLLARS' || currency === 'SURINAME') //Suriname: SR	  Surinamese Guilder: SRD
    // currency = 'SRD';
    // else if (currency === 'STD' || currency === 'DOBRA' || currency === 'DOBRAS' || currency === 'SÃO TOMÉ AND PRÍNCIPE' || currency === 'SÃO TOMÉ AND PRÍNCIPE DOBRA' || currency === 'SÃO TOMÉ AND PRÍNCIPE DOBRAS') //Sao Tome and Principe: ST	Dobra: STD
    // currency = 'STD';
    // else if (currency === 'SVC' || currency === 'SALVADORAN COLÓN' || currency === 'SALVADORAN COLÓN' || currency === 'SALVADOR') //El Salvador: SV	Salvadoran Colon: SVC
    // currency = 'SVC';
    // else if (currency === 'SYP' || currency === 'SYRIAN POUND' || currency === 'SYRIAN POUNDS' || currency === 'SYRIAN ARAB') //Syrian Arab Republic: SY	  Syrian Pound: SYP
    // currency = 'SYP';
    // else if (currency === 'SZL' || currency === 'LILANGENI' || currency === 'LILANGENIS' || currency === 'SWAZILAND' || currency === 'SWAZI LILANGENI' || currency === 'SWAZI LILANGENIS') //Swaziland: SZ	Lilangeni: SZL
    // currency = 'SZL';
    // else if (currency === 'THB' || currency === 'BAHT' || currency === 'BAHTS' || currency === 'THAILAND' || currency === 'THAI BAHT' || currency === 'THAI BAHTS') //Thailand: TH	  Baht: THB
    // currency = 'THB';
    // else if (currency === 'TJS' || currency === 'SOMONI' || currency === 'SOMONIS' || currency === 'TAJIKISTAN' || currency === 'TAJIKISTANI SOMONI' || currency === 'TAJIKISTANI SOMONIS') //Tajikistan: TJ	Tajikistan Ruble: TJS
    // currency = 'TJS';
    // else if (currency === 'TMT' || currency === 'TURKMENISTANI MANAT' || currency === 'TURKMENISTANI MANATS' || currency === 'TURKMENISTAN') //Turkmenistan: TM	  Manat: TMT
    // currency = 'TMT';
    // else if (currency === 'TND' || currency === 'TUNISIAN DINAR' || currency === 'TUNISIAN DINARS' || currency === 'TUNISIA') //Tunisia: TN	 Tunisian Dinar: TND
    // currency = 'TND';
    // else if (currency === 'TOP'|| currency === 'TONGAN PAOANGA' || currency === 'TONGAN PAOANGAS' || currency === 'PAOANGA'  || currency === 'TONGAN PAÕANGA' || currency === 'TONGAN PAÕANGAS' || currency === 'PAÕANGA' || currency === 'PAÕANGAS' || currency === 'TONGA' || currency === 'TONGAN' || currency === 'TONGANS') //Tonga: TO	PaÕanga: TOP
    // currency = 'TOP';
    // else if (currency === 'TRY' || currency === 'TURKISH LIRA' || currency === 'TURKISH LIRAS' || currency === 'TURKEY') //Turkey: TR	Lira: TRY
    // currency = 'TRY';
    // else if (currency === 'TTD' || currency === 'TRINIDAD AND TOBAGO DOLLAR' || currency === 'TRINIDAD AND TOBAGO DOLLARS' || currency === 'TRINIDAD AND TOBAGO') //Trinidad and Tobago: TT	Trinidad and Tobago Dollar: TTD
    // currency = 'TTD';
    // else if (currency === 'TWD' || currency === 'NEW TAIWAN DOLLAR' || currency === 'NEW TAIWAN DOLLARS' || currency === 'NEW TAIWAN') //Taiwan: TW	Dollar: TWD
    // currency = 'TWD';
    // else if (currency === 'TZS' || currency === 'TANZANIAN SHILLING' || currency === 'TANZANIAN SHILLINGS' || currency === 'TANZANIA') //Tanzania: TZ	  Shilling: TZS
    // currency = 'TZS';
    // else if (currency === 'UAH' || currency === 'HRYVNIA' || currency === 'HRYVNIAS' || currency === 'UKRAINE' || currency === 'UKRAINIAN HRYVNIA' || currency === 'UKRAINIAN HRYVNIAS') //Ukraine: UA	Hryvnia: UAH
    // currency = 'UAH';
    // else if (currency === 'UGX' || currency === 'UGANDAN SHILLING' || currency === 'UGANDAN SHILLINGS' || currency === 'UGANDA') //Uganda: UG	Shilling: UGX
    // currency = 'UGX';
    // else if (currency === 'USD' || currency === 'DOLLAR' || currency === 'DOLLARS' || currency === 'UNITED STATES' || currency === 'UNITED STATES DOLLAR' || currency === 'UNITED STATES DOLLARS' || currency === 'AMERICAN DOLLAR' || currency === 'AMERICAN DOLLARS') //United States: US	USD: USD
    // currency = 'USD';
    // else if (currency === 'UYU' || currency === 'URUGUAYAN PESO' || currency === 'URUGUAYAN PESOS' || currency === 'URUGUAY') //Uruguay: UY	Peso: UYU
    // currency = 'UYU';
    // else if (currency === 'UZS' || currency === 'UZBEKISTAN SOM' || currency === 'UZBEKISTAN SOMS' || currency === 'UZBEKISTAN') //Uzbekistan:: UZ	Som: UZS
    // currency = 'UZS';
    // else if (currency === 'VEF' || currency === 'BOLIVAR FUERTE' || currency === 'BOLIVAR FUERTES' || currency === 'VENEZUELA' || currency === 'VENEZUELAN BOLIVAR FUERTE' || currency === 'VENEZUELAN BOLIVAR FUERTES' || currency === 'BOLÍVAR FUERTE' || currency === 'BOLÍVAR FUERTES' || currency === 'VENEZUELA' || currency === 'VENEZUELAN BOLÍVAR FUERTE' || currency === 'VENEZUELAN BOLÍVAR FUERTES') //Venezuela: VE	Bolivar: VEF
    // currency = 'VEF';
    // else if (currency === 'VND' || currency === 'DONG' || currency === 'DONGS' || currency === 'VIETNAM' || currency === 'VIETNAMESE DONG' || currency === 'VIETNAMESE DONGS') //Vietnam: VN	Dong: VND
    // currency = 'VND';
    // else if (currency === 'VUV' || currency === 'VATU' || currency === 'VATUS' || currency === 'VANUATU' || currency === 'VANUATU VATU' || currency === 'VANUATU VATUS') //Vanuatu: VU	Vatu: VUV
    // currency = 'VUV';
    // else if (currency === 'WST' || currency === 'TALA' || currency === 'TALAS' || currency === 'SAMOAN' || currency === 'SAMOAN TALA' || currency === 'SAMOAN TALAS') //Samoan:WS Samoan Tala: WST
    // currency = 'WST';
    // else if (currency === 'XAF' || currency === 'CFA FRANC BEAC' || currency === 'CFA FRANC BEACS' || currency === 'CFA') //Central African Republic: CF	CFA Franc BEAC: XAF
    // currency = 'XAF';
    // else if (currency === 'XAG' || currency === 'SILVER' || currency === 'SILVER TROY OUNCE' || currency === 'SILVER OUNCE' || currency === 'SILVER TROY' || currency === 'PHILADELPHIA SILVER INDEX' || currency === 'PHILADELPHIA SILVER') //Philadelphia Silver Index: (Considering as US)  Silver (troy ounce): XAG
    // currency = 'XAG';
    // else if (currency === 'XAU' || currency === 'GOLD' || currency === 'GOLD TROY OUNCE' || currency === 'GOLD OUNCE' || currency === 'GOLD TROY' || currency === 'PHILADELPHIA GOLD INDEX' || currency === 'PHILADELPHIA GOLD') //Philadelphia Gold Index: (Considering as US)  Gold (troy ounce): XAU
    // currency = 'XAU';
    // else if (currency === 'XBT' || currency === 'BITCOIN' || currency === 'BITCOINS') // Bitcoin: XBT
    // currency = 'XBT';
    // else if (currency === 'XCD' || currency === 'EAST CARIBBEAN DOLLAR' || currency === 'EAST CARIBBEAN DOLLARS' || currency === 'EAST CARIBBEAN' || currency === 'ANGUILLA' || currency === 'ANGUILLA EAST CARIBBEAN DOLLAR' || currency === 'ANGUILLA EAST CARIBBEAN DOLLARS') //Anguilla: AI	East Caribbean Dollar: XCD
    // currency = 'XCD';
    // else if (currency === 'XDR' || currency === 'SPECIAL DRAWING RIGHT' || currency === 'SPECIAL DRAWING RIGHTS' || currency === 'DRAWING RIGHTS' || currency === 'SPECIAL RIGHTS') //(Considering as US) Special Drawing Rights: XDR
    // currency = 'XDR';
    // else if (currency === 'XOF' || currency === 'CFA FRANC BCEAO' || currency === 'CFA FRANC BCEAOS' || currency === 'FRANC BCEAO' || currency === 'FRANC BCEAOS' || currency === 'BCEAOS' || currency === 'BCEAO' || currency === 'BENIN' || currency === 'BENIN CURRENCY') //Benin: BJ	CFA Franc BCEAO: XOF
    // currency = 'XOF';
    // else if (currency === 'XPF' || currency === 'CFP FRANC' || currency === 'CFP FRANCS' || currency === 'NEW CALEDONIA' || currency === 'NEW CALEDONIA CURRENCY') //New Caledonia: NC	CFP Franc: XPF
    // currency = 'XPF';
    // else if (currency === 'YER' || currency === 'YEMENI RIAL' || currency === 'YEMENI RIALS' || currency === 'YEMEN') //Yemen: YE	  Rial: YER
    // currency = 'YER';
    // else if (currency === 'ZAR' || currency === 'RAND' || currency === 'RANDS' || currency === 'SOUTH AFRICA' || currency === 'SOUTH AFRICAN RAND' || currency === 'SOUTH AFRICAN RANDS') //South Africa: ZA	  Rand: ZAR
    // currency = 'ZAR';
    // else if (currency === 'ZMK' || currency === 'ZAMBIAN KWACHA PRE 2013' || currency === 'ZAMBIAN KWACHA PRE-2013') //Zambia: ZM	Zambian Kwacha(pre-2013): ZMK
    // currency = 'ZMK';
    // else if (currency === 'ZMW' || currency === 'ZAMBIAN KWACHA' || currency === 'ZAMBIAN KWACHAS' || currency === 'ZAMBIA') //Zambia: ZM	Zambian Kwacha: ZMW
    // currency = 'ZMW';
    // else if (currency === 'ZWL' || currency === 'ZIMBABWEAN DOLLAR' || currency === 'ZIMBABWEAN DOLLARS' || currency === 'ZIMBABWE') //Zimbabwe: ZW   Zimbabwean Dollar: ZWL
    // currency = 'ZWL';
    // else if (currency === 'INR' || currency === 'RUPEE' || currency === 'RUPEES' || currency === 'INDIA' || currency === 'INDIAN RUPEE' || currency === 'INDIAN RUPEES' || currency === 'INDIAN' || currency === 'INDIAN CURRENCY') //India	IN	Indian Rupee	INR
    // currency = 'INR';

    

    console.log('Data fetching API url: https://api.coindesk.com/v1/bpi/historical/close.json?start=' + dateToRead+
    '&end=' + dateToRead + '&currency=' + currency);
    return requestAPI('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + dateToRead+
        '&end=' + dateToRead + '&currency=' + currency)
        .then(function (data) { 
            let bitcoinPrice = JSON.parse(data);
            if (bitcoinPrice.hasOwnProperty('bpi') && bitcoinPrice['bpi'].hasOwnProperty(dateToRead)) {
            console.log(`Fetched data from API: ${bitcoinPrice['bpi'][dateToRead]}`);
                return bitcoinPrice['bpi'][dateToRead];
            }

        }).catch(function (err) {
            console.log('No bitcoin data');
            console.log(err);
        });
  }
}


exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);