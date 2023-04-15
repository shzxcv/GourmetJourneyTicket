import prisma from "../../../util/prisma";
import lighthouse from '@lighthouse-web3/sdk'

const NewShop = async (req, res) => {
  const shop = await prisma.shops.create({
    data: {
      ...req.body,
    },
  })
  
  const fs = require("fs");
  const fileName = "tmp/shop_"+String(shop.id)+".json";

  // 書き込み
  fs.writeFile(fileName, JSON.stringify(shop), (err) => {
    if (err) throw err;
    console.log('Writing completed successfully.');
  });

  // アップロード
  const apiKey = '72bb2268.eef2446e0936421eb9a81240bb878157';
  const uploadResponse = await lighthouse.upload(fileName, apiKey);
  console.log(uploadResponse);

  return res.json(shop);
};

export default NewShop;
