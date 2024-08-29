"use client";
import React from "react";
import { Button } from "@ui/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@ui/components/ui/dropdown-menu";
import {Ed25519Keypair, getFullnodeUrl, SovereignClient} from "@0xobelisk/sov-client"

function LogInIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  )
}

export default function Page() {


  const create_token = async () =>{
    try {
      const test_private_key = new Uint8Array([
        117, 251, 248, 217, 135, 70, 194, 105, 46, 80, 41, 66, 185, 56, 200, 35,
        121, 253, 9, 234, 159, 91, 96, 212, 211, 158, 135, 225, 180, 36, 104,
        253,
      ]);
      const keypair = Ed25519Keypair.fromSecretKey(test_private_key, {
        skipValidation: true,
      });
      console.log(keypair.toAddress());
      console.log('sov1l6n2cku82yfqld30lanm2nfw43n2auc8clw7r5u5m6s7p8jrm4zqrr8r94');
      const callPayload = {
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
      const nodeApi = getFullnodeUrl('localnet');
      const client = new SovereignClient(nodeApi);
      const res = await client.signAndExecuteBatchTransaction({
        callPayload,
        signer: keypair,
      });
      console.log(res);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const bank_balanceOf = async () => {
    const client = new SovereignClient({
      rest:"http://localhost:12346",
      rpc:"/sov-rpc"
    });
    const params = {
    	user_address:
    		'sov15vspj48hpttzyvxu8kzq5klhvaczcpyxn6z6k0hwpwtzs4a6wkvqwr57gc',
    	token_id:
    		'token_1zdwj8thgev2u3yyrrlekmvtsz4av4tp3m7dm5mx5peejnesga27ss0lusz',
    };
    const balance = await client.query('bank_balanceOf', params);
    console.log(balance);
  }


  const state_balanceOf = async () => {
    const client = new SovereignClient({
      rest:"http://localhost:12346",
      rpc:"/sov-rpc"
    });
    const params = {
    	token_name: "sov-test-token", 
      sender: "sov1l6n2cku82yfqld30lanm2nfw43n2auc8clw7r5u5m6s7p8jrm4zqrr8r94",
      salt:11
    };
    const token_Id = await client.query('bank_tokenId', params);
     // token_1zdwj8thgev2u3yyrrlekmvtsz4av4tp3m7dm5mx5peejnesga27ss0lusz
    console.log(token_Id);

  }
  



  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50">
      <header className="flex items-center justify-between w-full px-4 py-4 border-b md:px-6">
        <div className="flex items-center space-x-2">
          <LogInIcon className="w-8 h-8" />
          <h1 className="text-2xl font-bold">FHE Rollup</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={create_token} variant="secondary">Create Token</Button>
          <Button>Transfer Token</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Choose Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Account 1</DropdownMenuItem>
              <DropdownMenuItem>Account 2</DropdownMenuItem>
              <DropdownMenuItem>Account 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-col items-center flex-1 w-full px-4 py-8 text-center md:px-6">
        <h2 className="text-3xl font-bold">FHE Bank Test |</h2>
        <p className="mt-4 text-lg">This is simple fhe Coprocessor Rollup Example !</p>
        <Button onClick={bank_balanceOf} variant="outline" className="mt-4">
          Check Encrypted Account Balance
        </Button>
        <div className="mt-8 text-xl font-bold">1zdwj8thgev2u3yyrrlekmvtsz4av4tp3m7dm5mx5peejnesga27ss0lusz</div>
        <Button onClick={state_balanceOf} variant="outline" className="mt-4">
          Check Decrypted Account Balance
        </Button>
        <div className="mt-8 text-6xl font-bold">1,699,000</div>
      </main>
      {/* <Wasm/> */}
    </div>
  );
}







