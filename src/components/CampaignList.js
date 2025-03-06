import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";

const CampaignList = ({ provider }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const contract = getContract(provider);
      const count = await contract.campaignCount();
      const allCampaigns = [];

      for (let i = 0; i < count; i++) {
        const campaign = await contract.campaigns(i);
        allCampaigns.push({
          owner: campaign.owner,
          goal: campaign.goal.toString(),
          raised: campaign.raised.toString(),
          deadline: campaign.deadline.toString(),
        });
      }

      setCampaigns(allCampaigns);
    };

    fetchCampaigns();
  }, [provider]);

  return (
    <div>
      <h2>Lista Kampanii</h2>
      {campaigns.map((c, index) => (
        <div key={index}>
          <p><strong>Właściciel:</strong> {c.owner}</p>
          <p><strong>Cel:</strong> {c.goal} ETH</p>
          <p><strong>Zebrano:</strong> {c.raised} ETH</p>
          <p><strong>Deadline:</strong> {new Date(c.deadline * 1000).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
