'use client'

import Script from 'next/script';
import React, { createContext, useState, useContext } from 'react';

declare global {
  let relayone: RelayOneInterface;
}

interface RelayOneInterface {
  authBeta: (withGrant?: boolean) => Promise<any>;
  isLinked: () => Promise<boolean>;
  getBalance2: () => Promise<any>
  requestIdentity: () => Promise<string>
}


interface RelayOneContextType {
  fetchRelayOneData: () => Promise<void>
  pubkey: string | undefined,
  handle: string | undefined,
  userBalance: string | undefined,
  paymail: string | undefined,
  isLinked: boolean | undefined,
}


export const RelayOneContext = createContext<RelayOneContextType | undefined>(undefined);

export const useRelayOne = () => {
    const context = useContext(RelayOneContext);
    if (!context) {
        throw new Error('useRelayOne must be used within a RelayOneProvider');
    }
    return context;
};

export const RelayOneContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [handle, setHandle] = useState<string | undefined>(undefined)
  const [userBalance, setUserBalance] = useState<string | undefined>(undefined)
  const [paymail, setPaymail] = useState<string | undefined>(undefined)
  const [pubkey, setPubkey] = useState<string | undefined>(undefined)
  const [isLinked, setIsLinked] = useState<boolean | undefined>(undefined)

  console.log("handle: ", handle, "balance: ", userBalance, "paymail: ", paymail, "pubkey: ", pubkey)

  const fetchRelayOneData = async () => {

    const isLinked = await relayone.isLinked()
    setIsLinked(isLinked)

    try {
      const token = await relayone.authBeta(false);
      const [payload, signature] = token.split(".");
      const data = JSON.parse(atob(payload));

      console.log("data", data)

      setPaymail(data.paymail);
      setHandle(data.paymail.substring(0, data.paymail.lastIndexOf("@")));
      setPubkey(data.pubkey);

      const balance = await relayone.getBalance2();
      setUserBalance((balance.satoshis / 100000000).toFixed(2).toString())
    } catch (e) {
      if (e instanceof Error) {
          console.log(e.message);
      } else {
          console.log(e);
          alert('An error occurred');
      }    
    }
  };

  return (
    <>
      <Script src="https://one.relayx.io/relayone.js" onLoad={() => fetchRelayOneData()} />   
      <RelayOneContext.Provider value={{ fetchRelayOneData, pubkey, handle, userBalance, paymail, isLinked }}>
        {children}
      </RelayOneContext.Provider>
    </>
  );
};

