var scrypt  = require('scryptsy');
var crypto = require('crypto');
var sha3 = require('ethereumjs-util').sha3;
var Wallet = function(priv, pub, path, hwType, hwTransport) {
    if (typeof priv != "undefined") {
        this.privKey = priv.length == 32 ? priv : Buffer(priv, 'hex')
    }
    this.pubKey = pub;
    this.path = path;
    this.hwType = hwType;
    this.hwTransport = hwTransport;
    this.type = "default";
}

function decipherBuffer(decipher, data) {
    return Buffer.concat([decipher.update(data), decipher.final()])
}


function lowerJSONKey(jsonObj){  
    for (var key in jsonObj){  
        jsonObj[ key.toLowerCase() ]  = jsonObj[key];  
        delete(jsonObj[key]);  
    }  
    return jsonObj;  
}  



function fromV3(input, password, nonStrict) {

    if(input.Crypto){
        input = input.Crypto.toLowerCase()   
    }
    var json = (typeof input === 'object') ? input : JSON.parse(nonStrict ? input : input)

    if (json.version !== 3) {
        console.log('Not a V3 wallet')
    }
    var derivedKey
    var kdfparams
    if (json.crypto.kdf === 'scrypt') {
        kdfparams = json.crypto.kdfparams
        
        derivedKey = scrypt(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen)

        console.log('derivedKey=',derivedKey)

    } else if (json.crypto.kdf === 'pbkdf2') {
        kdfparams = json.crypto.kdfparams
        if (kdfparams.prf !== 'hmac-sha256') {
            console.log('Unsupported parameters to PBKDF2')
        }
        derivedKey = crypto.pbkdf2Sync(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256')
    } else {
        console.log('Unsupported key derivation scheme')
    }
    var ciphertext = new Buffer(json.crypto.ciphertext, 'hex')
    var mac = sha3(Buffer.concat([derivedKey.slice(16, 32), ciphertext]))
    if (mac.toString('hex') !== json.crypto.mac) {
        console.log('Key derivation failed - possibly wrong passphrase')
    }
    var decipher = crypto.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), new Buffer(json.crypto.cipherparams.iv, 'hex'))
    var seed = decipherBuffer(decipher, ciphertext, 'hex')
    while (seed.length < 32) {
        var nullBuff = new Buffer([0x00]);
        seed = Buffer.concat([nullBuff, seed]);
    }
    return new Wallet(seed)
}


export { fromV3 }