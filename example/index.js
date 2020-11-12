const sdk = new StakingSDK({id: 'staking-sdk'});

const openBtn = document.getElementById('open');
const pre = {
  stake: document.getElementById('stake'),
  unstake: document.getElementById('unstake'),
  claim: document.getElementById('claim')
}

openBtn.addEventListener('click', () => {
  sdk.open([
    {
      symbol: 'XTZ',
      address: 'tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM',
      balance: '1'
    }
  ])
})

sdk.on('stake', (data) => {
  setData(data, data.type);
})

sdk.on('unstake', (data) => {
  setData(data, data.type);
})

sdk.on('claim', (data) => {
  setData(data, data.type);
})

function setData(data, type) {
  pre[type].innerText = JSON.stringify(data, null, 2);
}
