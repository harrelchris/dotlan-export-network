function addButton() {
  const h2 = document.querySelector('#jb_network > h2');
  const button = createButton();
  h2.appendChild(button);
}

function createButton() {
  const button = document.createElement('button');
  button.setAttribute("id", "copy-network");
  const classList = [
    "btn",
    "ui-button",
    "ui-state-default",
    "ui-corner-all"
  ];
  button.classList.add(...classList);
  button.innerText = "Copy Network";
  button.onclick = copyNetwork;
  return button;
}

function copyNetwork() {
  const jumpBridges = parseJumpBridges();
  const output = formatJumpBridges(jumpBridges);

  navigator.clipboard.writeText(output).then(() => {
    const button = document.getElementById("copy-network");
    button.innerText = "Copied to clipboard";
  }, (error) => {
    console.error(error);
    document.getElementById("copy-network").innerText = "Error - try again";
  });
}

function parseJumpBridges() {
  const rows = document.querySelectorAll('tbody:nth-child(2) > tr');

  const jumpBridges = [];

  for (let row of rows) {
    const cells = row.getElementsByTagName('td');
    const jumpBridge = {
      from: cells[0].innerText,
      to: cells[4].innerText
    }
    jumpBridges.push(jumpBridge);
  }

  return jumpBridges;
}

function formatJumpBridges(jumpBridges) {
  // TODO: support other formats - currently only SMT supported
  const outputStrings = [];

  for (const jumpBridge of jumpBridges) {
    outputStrings.push(`0 ${jumpBridge.from} --> ${jumpBridge.to}`);
  }

  return outputStrings.join("\n");
}

addButton();
