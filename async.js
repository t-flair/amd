// let i = 1;
// async function continuePrintingLoopNumberUntilResultsAreReady() {
//     console.log('Start of async function');
//     const result = await new Promise(resolve => setTimeout(() => resolve('Resolved'), 5000));
    
//     intervalId =  setInterval(() => {
//         if (i<10) {
            
//             console.log(`Loop ${i}`);
//             i++;
//         };
//         if (result) clearInterval(intervalId);
        
//     }, 1000);
    
    
//      console.log(result)
    
//   };

  
//   continuePrintingLoopNumberUntilResultsAreReady();



loading_waiter = (emojiArray,func) => {
    async function continuePrintingLoopNumberUntilResultsAreReady() {
        let i = 0;
        const reactEmoji = emojiArray;
        intervalId = setInterval(() => {
            console.log(reactEmoji[i]);
            //AMD.sendMessage(from, { react: { text: react-emoji[i], key: m.key } })
            i++;
        }, 1000);
    await func()
    console.log('Working');
    }

    continuePrintingLoopNumberUntilResultsAreReady()
        .catch(error => console.error(error))
        .finally(() => clearInterval(intervalId));
};


 const wait = async () => await new Promise(resolve => setTimeout(() => resolve('Resolved'), 6000));
loading_waiter(['😊','📡','🇰🇪','👇','😍','❤️'],wait)