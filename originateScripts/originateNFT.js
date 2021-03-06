
import {TezosToolkit, TezosOperationError} from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer'
import oracleCodeJSON from '../Contracts/NFTAddress/code.js';
import oracleStorageJSON from '../Contracts/NFTAddress/storage';
import conf from '../conf/conf.js';

const Tezos = new TezosToolkit('https://delphinet-tezos.giganode.io');
const util = require("util");

Tezos.setSignerProvider(new InMemorySigner(conf.adminSecretKey));

export async function originateOracle(){
    try{
        console.log("Begin originating NFT contract");

        const originate_op = await Tezos.contract.originate({
            code: oracleCodeJSON,
            init: oracleStorageJSON,
        });

        const originated_oracle = await originate_op.contract();

        console.log("New contract address: " + originated_oracle.address);
        console.log("NFT Contract successfully originated");
        return originated_oracle.address;
    } catch (e) {
        if (e instanceof TezosOperationError){
            console.log(util.inspect(e.errors, false, null, true));
        } else {
            console.log("Error ", e);
        }
    }
}

originateOracle();
