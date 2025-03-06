import React, { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/contract";

const FundCampaign = ({ provider }) => {
  const [campaignId, setCampaignId] = useState("");
  const [amount, setAmount] = useState("");

  const fundCampaign = async () => {
    const signer = provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.fundCampaign(campaignId, { value: ethers.utils.parseEther(amount) });
      await tx.wait();
      alert("Wpłacono środki!");
    } catch (error) {
      console.error(error);
      alert("Błąd przy wpłacie.");
    }
  };

  return (
    <div>
      <h2>Wpłać na Kampanię</h2>
      <input type="text" placeholder="ID Kampanii" onChange={(e) => setCampaignId(e.target.value)} />
      <input type="text" placeholder="Kwota (ETH)" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={fundCampaign}>Wpłać</button>
    </div>
  );
};

export default FundCampaign;
