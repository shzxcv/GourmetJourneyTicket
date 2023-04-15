import {
  contractAddress,
} from "../const/yourDetails";

export default async function createNFT(sdk, address) {
  const contract = await sdk.getContract(
    contractAddress // replace this with your contract address
  );
  const data = await contract.call("lazyMint", [1, "test", "test"])
  console.log("data", data);
}
