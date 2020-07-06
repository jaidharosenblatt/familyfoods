//Shift order over by one
const rotateOrder = (order) => {
  var rotatedArray = [...order];
  const x = order[order.length - 1];

  for (let i = order.length - 1; i > 0; i--) {
    rotatedArray[i] = rotatedArray[i - 1];
  }

  rotatedArray[0] = x;
  return rotatedArray;
};

export default rotateOrder;
