import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { contractAddress } from "../../../const/yourDetails";
import { getUser } from "../../../auth.config";

const LazyMint = async (req, res) => {
  const { name, seats, date } = req.body;
  const user = await getUser(req);
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY,
    "mumbai"
  );
  const contract = await sdk.getContract(contractAddress);

  for (let i=1; i<=seats; i++) {
    // Lazy Mint
    const tokenName = `${name}_${date}_${i}`
    const metadatas = [{
      name: tokenName,
      description: tokenName,
      image: "https://picsum.photos/200",
      properties: [
        {
          name: tokenName,
          seats: seats,
          date: date,
        }
      ],
    }];
    const mintResults = await contract.erc721.lazyMint(metadatas);
    const tokenId = mintResults[0].id;
    console.log(tokenId);

    // Claim NFTs to a specific Wallet
    const data = await contract.erc721.claimTo(user.address, 1);
    console.log(data);
  }
  return res.status(200).json({ success: true });
};

export default LazyMint;
