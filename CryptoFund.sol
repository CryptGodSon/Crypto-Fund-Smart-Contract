// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CryptoFund {
    struct Campaign {
        address payable owner;
        string title;
        string description;
        uint256 goal;
        uint256 deadline;
        uint256 amountRaised;
        bool withdrawn;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions;
    uint256 public campaignCount;

    event CampaignCreated(uint256 indexed id, address indexed owner, string title, uint256 goal, uint256 deadline);
    event Funded(uint256 indexed id, address indexed donor, uint256 amount);
    event Withdrawn(uint256 indexed id, address indexed owner, uint256 amount);
    event Refunded(uint256 indexed id, address indexed donor, uint256 amount);

    function createCampaign(string memory _title, string memory _description, uint256 _goal, uint256 _duration) external {
        require(_goal > 0, "Goal must be greater than zero");
        require(_duration > 0, "Duration must be greater than zero");
        
        uint256 deadline = block.timestamp + _duration;
        campaigns[campaignCount] = Campaign(payable(msg.sender), _title, _description, _goal, deadline, 0, false);
        
        emit CampaignCreated(campaignCount, msg.sender, _title, _goal, deadline);
        campaignCount++;
    }

    function contribute(uint256 _id) external payable {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(msg.value > 0, "Contribution must be greater than zero");
        
        campaign.amountRaised += msg.value;
        contributions[_id][msg.sender] += msg.value;
        
        emit Funded(_id, msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _id) external {
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.owner, "Only campaign owner can withdraw");
        require(block.timestamp >= campaign.deadline, "Campaign is still running");
        require(campaign.amountRaised >= campaign.goal, "Funding goal not reached");
        require(!campaign.withdrawn, "Funds already withdrawn");
        
        campaign.withdrawn = true;
        campaign.owner.transfer(campaign.amountRaised);
        
        emit Withdrawn(_id, msg.sender, campaign.amountRaised);
    }

    function refund(uint256 _id) external {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp >= campaign.deadline, "Campaign is still running");
        require(campaign.amountRaised < campaign.goal, "Funding goal reached, no refunds");
        
        uint256 contributed = contributions[_id][msg.sender];
        require(contributed > 0, "No contributions to refund");
        
        contributions[_id][msg.sender] = 0;
        payable(msg.sender).transfer(contributed);
        
        emit Refunded(_id, msg.sender, contributed);
    }
}
