import { CREATE_ACCOUNT,SUCCESS_INSTER_DATA } from '../constants/createAccountConstant'
const bip39 = require('bip39')
const hdkey = require('ethereumjs-wallet/hdkey')
const util = require('ethereumjs-util')
const randomBytes = require('randombytes')

const initState = {
	isLoading: true,
  accountUserName: '',
}

export default function createAccountReducer(state = initState,action){
	switch(action.type){
		case 'CREATE_ACCOUNT':
			return onCreate(state,action)
			break

		default:
			return state
			break
	}
}



const onCreate = (state,action) => {
    let selected = 0 
	  const { userNameVal, psdVal, promptVal, } = action.payload
	  let mnemonic = bip39.generateMnemonic();
    console.log('创建时生成的mnemonicfffffffffffff==',mnemonic)
    
    let seed = bip39.mnemonicToSeed(mnemonic)
    // console.log('seed==',seed)
    let hdWallet = hdkey.fromMasterSeed(seed)
    // console.log('hdWallet==',hdWallet)

    // var key1 = hdWallet.derivePath("m/44'/60'/0'/0/0")

    // console.log("明文私钥:", key1._hdkey._privateKey.toString('hex'))


    let w = hdWallet.getWallet()
    let keyStore = w.toV3(psdVal,{c:8192,n:8192})

    console.log('keyStore111111111111111111==',keyStore)

    if(!db){  
        db = sqLite.open();  
    }  
      
      

    db.transaction((tx)=>{  
      tx.executeSql("select * from account", [],(tx,results)=>{  
          console.log('有表')
      });  
    },(error)=>{
      console.log('无表')
      sqLite.createTable()
      selected = 1
    }); 

    let userData = [],  
        user = {};  
    user.mnemonic = mnemonic;
    user.account_name = userNameVal;  
    user.backup_status = 0;  
    user.assets_total = '0';
    user.is_selected = selected;
    user.address = keyStore.address;  
    user.kid = keyStore.id;  
    user.version = keyStore.version;  
    user.cipher = keyStore.crypto.cipher;  
    user.ciphertext = keyStore.crypto.ciphertext;  
    user.kdf = keyStore.crypto.kdf;  
    user.mac = keyStore.crypto.mac;  
    user.dklen = keyStore.crypto.kdfparams.dklen;  
    user.salt = keyStore.crypto.kdfparams.salt;  
    user.n = keyStore.crypto.kdfparams.n;  
    user.r = keyStore.crypto.kdfparams.r;  
    user.p = keyStore.crypto.kdfparams.p;  
    user.iv = keyStore.crypto.cipherparams.iv;  
    userData.push(user); 
   // insert 
      setTimeout(() => {
          sqLite.insertUserData(userData)
      },100)
    // //query
    // db.transaction((tx)=>{  
    //   tx.executeSql("select * from account", [],(tx,results)=>{  

    //     var len = results.rows.length;  

    //     for(let i=0; i<len; i++){  
    //       var u = results.rows.item(i);
    //       console.log('iuuuuuuuuuuuuu',u)  
    //     }  
    //   });  
    // },(error)=>{
    //   console.log(error);  
    // }); 

  // let key1 = hdWallet.derivePath("m/44'/60'/0'/0/0")

  // let pKey = key1._hdkey._privateKey.toString('hex')
  // console.log("私钥:", pKey)

  // let address1 = util.pubToAddress(key1._hdkey._publicKey, true)

  // address1 = util.toChecksumAddress(address1.toString('hex'))

  // console.log('地址',address1);

	return {
		...state,
		isLoading: false,
    accountUserName: userNameVal
	}
}