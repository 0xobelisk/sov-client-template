import React from 'react';
// import {Ed25519Keypair} from "@0xobelisk/sov-client"

const Wasm = () => {
  
    const create_token = async () =>{
    try {
      const wasm = await import('@0xobelisk/sov-wasm'); // 加载 WebAssembly 模块

    //   const test_private_key = new Uint8Array([
    //     117, 251, 248, 217, 135, 70, 194, 105, 46, 80, 41, 66, 185, 56, 200, 35,
    //     121, 253, 9, 234, 159, 91, 96, 212, 211, 158, 135, 225, 180, 36, 104,
    //     253,
    //   ]);

    //   const keypair = Ed25519Keypair.fromSecretKey(test_private_key, {
    //     skipValidation: true,
    //   });

      const runtime_call = {
        bank: {
          CreateToken: {
            salt: 11,
            token_name: 'sov-test-token',
            initial_balance: 1000000,
            mint_to_address: 'sov15vspj48hpttzyvxu8kzq5klhvaczcpyxn6z6k0hwpwtzs4a6wkvqwr57gc',
            authorized_minters: [
              'sov1l6n2cku82yfqld30lanm2nfw43n2auc8clw7r5u5m6s7p8jrm4zqrr8r94',
              'sov15vspj48hpttzyvxu8kzq5klhvaczcpyxn6z6k0hwpwtzs4a6wkvqwr57gc',
            ],
          },
        },
      };

      const runtime_msg = Array.from(wasm.serialize_call(runtime_call));
      console.log("runtime_msg", runtime_msg);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <div>
    <button onClick={create_token}>
        111
    </button>
    My WebAssembly Component
    </div>;
};

export default Wasm;