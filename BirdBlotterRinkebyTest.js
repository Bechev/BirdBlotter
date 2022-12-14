require('dotenv').config()

const wallets = require('./wallets.json')
var contract = artifacts.require("MoonbirdTest");
//////////////// PROD VARIABLES ///////////////////
// var contract_address = process.env.DEV_CONTRACT_ADDRESS;
var moonbirdTest_contract_address = process.env.DEV_MONBIRD_CONTRACT_ADDRESS
// const royalties_recipient_address = process.env.ROYALTIES_RECIPIENT_ADDRESS;
// const airdropAddresses = AirdropData.addresses;
// const airdropQuantities = AirdropData.amounts;
///////////////////////////////////////////////////

//////////////// DEV VARIABLES ///////////////////
// var contract_address = process.env.DEV_CONTRACT_ADDRESS;
// const WLaddresses = WL.test;
// const royalties_recipient_address = "0xba45e32c3D74d8db4981271542892a425CFC4a69";
///////////////////////////////////////////////////

module.exports = async () => {
    const MBT = await contract.at(moonbirdTest_contract_address);
    console.log(wallets.pubkeys)
    let idCounter = 10000
    try{
        for (i =0; i< wallets.pubkeys.length; i++){
            for(j = 1 ; j <= 10; j++){
                await MBT.publicMint(wallets.pubkeys[i], idCounter);
                idCounter -= 1;
            }
        }
    }catch(err){
        console.log(err)
    }
    // console.log(MBT)
    // console.log(airdropAddresses)
    // console.log(airdropQuantities)
    // try{
    //     let res =  await BH.airdrop(airdropAddresses, airdropQuantities)
    //     console.log('Successfully airdroped BH to dream holders')
    // }catch(err){console.log(err)}

    // const uri = URIS.link
    
    // const royaltiesAmount = 10; //In %
            
        // //     Setting up the URI
        // console.log('Setting up the URI')
        // try{
        //     console.log(uri)
        //     let res = await UNITY.setURI(uri);
        //     console.log('Successfully set the URI')
        //     console.log(res)
        //     console.log('/////////////////////////')
        // }catch(err){console.log(err)}

        //     Load the WL
            // console.log('Loading the WL')
            // try{
            //     console.log(WLaddresses)
            //     let res = await UNITY.loadWL(WLaddresses);
            //     console.log('Successfully loaded the WL')
            //     console.log(res)
            //     console.log('/////////////////////////')
            // }catch(err){console.log(err)}

            // try{
            //     console.log('fetching addresses mint')
            //     console.log(WLaddresses)
            //     for(i=0;i<WLaddresses.length;i++){
            //         let addressBal = await UNITY.balanceOf(WLaddresses[i],1)
            //         let addressTokens = addressBal.toNumber()
            //         console.log(`${WLaddresses[i]} ${addressTokens}`)
            //     }
            // }catch(err){ console.log(err)}
    
        //     Set royalties info
            // console.log('Setting royalties info')
            // try{
            //     let res = await UNITY.setRoyalties(royalties_recipient_address, royaltiesAmount);
            //     console.log('Successfully set Royalties info')
            //     console.log(res)
            //     console.log('/////////////////////////')
            // }catch(err){console.log(err)}
    // }
        console.log('program done executing - please terminate')
}