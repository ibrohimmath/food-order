function convertNumber(alphaNum) {
  alphaNum = alphaNum.split("");
  let i = 0;
  while (
    i < alphaNum.length &&
    (Number.isNaN(+alphaNum[i]) || alphaNum[i] === " ")
  )
    i++;
  return Number.parseFloat(alphaNum.slice(i).join(""));
}

function getBase64(file, cb) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

export { convertNumber, getBase64 };
