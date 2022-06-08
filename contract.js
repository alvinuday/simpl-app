const MoodContractAddress = "0x30c08a6C615C267Ade82c6233b71842eD824ECED";
const MoodContractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
let MoodContract;
let signer;
//Ether Provider -> Ropsten
const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");

//Request to User's Metamask Wallet
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    );
  });
});

//async functions to call smart contract functions
async function getMood() {
  const getMoodPromise = MoodContract.getMood();
  const Mood = await getMoodPromise;
  console.log(Mood);
  document.getElementById("moodSpan").innerText = Mood;
}

async function setMood() {
  const mood = document.getElementById("mood").value;
  const setMoodPromise = MoodContract.setMood(mood);
  await setMoodPromise;
  alert("Your Mood has been set");
  setTimeout(() => {
    getMood();
  }, 5000);
}
