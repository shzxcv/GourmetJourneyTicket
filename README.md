# NFTDineReserve

## Development

- Create `.env` file.
  - Follow this procedure to generate and enter a key.
    - https://p2p-all.com/metamask-secretkey/
```
THIRDWEB_AUTH_PRIVATE_KEY=xxxx
DATABASE_URL=mysql://root:password@localhost:3306/database
```

- Install packages
```
yarn install
```

- Start the docker database.
```
docker-compose up -d
```

- Start
```
yarn dev
```

- DB Migration
```
npx prisma migrate dev --name init
```

- Deploy to the graph
```
$ graph codegen && graph buil
$ graph deploy --product hosted-service shzxcv/ethglobalproduction
```

## Tools
- Next.js
- [thirdweb](https://thirdweb.com)
- [thirdweb-example/nft-gated-website](https://github.com/thirdweb-example/nft-gated-website)
- [UI Components Ant Design](https://ant.design/components)

## Test Network
- Polygon Mumbai
- [Polygon Faucet](https://faucet.polygon.technology)

## NFT
- [OpenSea Testnet](https://testnets.opensea.io/ja)
