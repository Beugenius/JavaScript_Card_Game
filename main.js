document.querySelector('#startButton').addEventListener('click', makeReq)

async function makeReq() {
    const symbolNum = parseInt(document.getElementById('numSymbols').value);
    const res = await fetch('/api?symbolNums=${symbolNum}');
    const data = await res.json();
}