let n;
let gridArr;
let filledNodes = 0;
let isCalculateActive = false;
const nodeRegex = "[0|1]{1}";
let grid;
function openGridLayout() {
  n = document.getElementById("gridInput").value;
  if(n) {
    var body = document.getElementById("tableContainer");
    if(grid) {
     grid.parentNode.removeChild(grid);
    }
    grid = document.createElement("table");
    grid.setAttribute("id","grid");
    grid.style.marginTop = "20px";
    var gridBody = document.createElement('tbody');
    for(var i=0;i<n;i++) {
      var gridRow = document.createElement("tr");
      for(var j=0;j<n;j++) {
        var gridNode = document.createElement("td");
        gridNode.setAttribute('class','gridNode');
        var input = document.createElement("input");
        input.setAttribute("type","number");
        input.setAttribute("type","text");
        input.setAttribute("id",`${i}_${j}`);
        input.addEventListener("input",inputNode);
        gridNode.appendChild(input);
        gridRow.appendChild(gridNode);
      }
      gridBody.append(gridRow);
    }
    grid.appendChild(gridBody);
    body.appendChild(grid);
    gridArr = new Array(n);
    for(let i=0;i<n;i++) {
      gridArr[i] = new Array(parseInt(n)).fill(0);
    }
  }
  else {
    alert("Please add the number of nodes");
  }
}

function inputNode(event) {
  let arrDimens = event.currentTarget.id.split("_");
  let x = arrDimens[0], y = arrDimens[1];
  let gridField = document.getElementById(`${x}_${y}`);
  if(!gridField.value.match("^([0-1]){1}$") || x==y) {
    gridField.value = "";
  }
  else {
    if(gridArr) {
      gridArr[x][y] = gridField.value;
      filledNodes++;
      document.getElementById(`${y}_${x}`).value = gridArr[x][y];
      gridArr[y][x] = gridArr[x][y];
      console.log(`Input into ${x}${y}`);
    }
  }
}

function calculate() {
  console.log("Grid : ",gridArr);
  let maxRow = 0, maxCount = 0;
  let mandatoryGridIndices=[], nonMandatoryGridIndices = [];
  gridArr.forEach((row, index) => {
    let rowCount = row.filter((item,index)=>
    {
      return item == "1";
    }).length;
    if(maxCount < rowCount) {
      maxCount = rowCount;
      maxRow = index;
    }
  });

  gridArr[maxRow].forEach((grid,index) => {
    if(grid == 1) {
      mandatoryGridIndices.push(index);
    }
    else {
      nonMandatoryGridIndices.push(index);
    }
  });

  console.log("Mandatory cols : ",mandatoryGridIndices," : ",nonMandatoryGridIndices," : ",maxCount);

  nonMandatoryGridIndices.forEach((nonMandatoryIndex) => {
    let nonSimilarityCount = 0;
    mandatoryGridIndices.forEach((mandatoryIndex) => {
      if(!checkIfColsSimilar(mandatoryIndex, nonMandatoryIndex)) {
        nonSimilarityCount++;
        return false;
      }
    });
    if(nonSimilarityCount === 0) {
      maxCount+=1;
    }
  });

  function checkIfColsSimilar(mandatoryIndex, nonMandatoryIndex) {
    let isSimilar = false;
    for(let i=0;i<n;i++)
    {
      let nonMandatoryValue = gridArr[i][nonMandatoryIndex];
      let mandatoryValue = gridArr[i][mandatoryIndex];
      if(nonMandatoryValue === "1") {
        if(mandatoryValue === "1") {
          isSimilar = true;
          break;
        }
      }
    }
    return isSimilar;
  }



  console.log("Mandatory grid : ", mandatoryGridIndices);



  let result = document.getElementById("result");
  result.innerHTML = `Number of Colors : ${maxCount}`;
}







