export const web3ConnectionOptions = {
    timeout: 30000,
    clientConfig: {
      keepalive: true,
      keepaliveInterval: -1,
      maxReceivedFrameSize: 100000000,
      maxReceivedMessageSize: 100000000,
    },
    reconnect: { auto: true, delay: 1000, maxAttempts: 10, onTimeout: false },
  };

export const swapEvent = {
    EventArray: [
        { "indexed": true, "name": "sender", "type": "address" },
        { "indexed": false, "name": "amount0In", "type": "uint256" },
        { "indexed": false, "name": "amount1In", "type": "uint256" },
        { "indexed": false, "name": "amount0Out", "type": "uint256" },
        { "indexed": false, "name": "amount1Out", "type": "uint256" },
        { "indexed": true, "name": "to", "type": "address" }
    ],
    EventSignature: "Swap(address,uint256,uint256,uint256,uint256,address)"
}