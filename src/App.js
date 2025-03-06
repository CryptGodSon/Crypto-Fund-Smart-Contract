import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import CreateCampaign from "./components/CreateCampaign";
import CampaignList from "./components/CampaignList";
import FundCampaign from "./components/FundCampaign";

function App() {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(newProvider);
    } else {
      alert("Zainstaluj Metamask!");
    }
  }, []);

  return (
    <div>
      <h1>CryptoFund Crowdfunding</h1>
      {provider ? (
        <>
          <CreateCampaign provider={provider} />
          <FundCampaign provider={provider} />
          <CampaignList provider={provider} />
        </>
      ) : (
        <p>Łączenie z Metamask...</p>
      )}
    </div>
  );
}

export default App;
