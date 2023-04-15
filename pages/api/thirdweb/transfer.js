import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { contractAddress } from "../../../const/yourDetails";

const Transfer = async (req, res) => {
  const { to, tokenId, seats } = req.body;
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY,
    "mumbai"
  );
  const contract = await sdk.getContract(contractAddress);

  const result = await contract.erc1155.transfer(to, tokenId, seats);
  console.log(result);
  return res.status(200).json({ success: true });
};

export default Transfer;
