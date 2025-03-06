import React, { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/contract";

const CreateCampaign = ({ provider }) => {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");

  const createCampaign = async () => {
    const signer = provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.createCampaign(ethers.utils.parseEther(goal), deadline);
      await tx.wait();
      alert("Kampania utworzona!");
    } catch (error) {
      console.error(error);
      alert("Błąd przy tworzeniu kampanii.");
    }
  };

  return (
    <div>
      <h2>Utwórz Kampanię</h2>
      <input type="text" placeholder="Cel (ETH)" onChange={(e) => setGoal(e.target.value)} />
      <input type="number" placeholder="Deadline (timestamp)" onChange={(e) => setDeadline(e.target.value)} />
      <button onClick={createCampaign}>Utwórz</button>
    </div>
  );
};

export default CreateCampaign;
