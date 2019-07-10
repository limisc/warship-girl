import locales from 'locales';
const MAX = 20;
export const loadState = key => {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const saveState = (key, data) => {
  try {
    const state = JSON.stringify(data);
    localStorage.setItem(key, state);
  } catch (error) {
    console.log(error);
  }
};

export const removeState = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const scrollToComponent = component => {
  const { current } = component;
  if (current) {
    setTimeout(() => {
      window.scrollTo({
        top: current.offsetTop - 48,
        left: 0,
        behavior: 'smooth',
      });
    }, 0);
  }
};

export const translate = content => {
  return locales[content] || content;
};

export const getSackField = (weights, checked) => {
  const sack = [];
  const checkList = [];

  Object.keys(checked).forEach((v, i) => {
    if (checked[v] && weights[v] * 1 > 0) {
      sack.push(weights[v] * 1);
      checkList.push(i);
    }
  });

  return { sack, checkList };
};

export const calc = (sackField, state) => {
  const data = getData(state);
  const { filled, reverseSack } = getReverseSack(sackField, data);

  if (!filled) {
    return { result: filled, need: reverseSack };
  }

  const itemList = Object.keys(data);
  const length = itemList.length;
  // console.log(reverseSack);
  const dp = createArray([...reverseSack]);
  const path = createArray([length, ...reverseSack]);
  // console.log(dp.length, dp[0].length);
  // console.log(path.length, path[0].length, path[0][0].length);

  // TODO 2D
  const { checkList } = sackField;
  // console.log(checkList);
  for (let i = 1; i <= length; i++) {
    const id = itemList[i - 1];
    const item = data[id];
    // console.log(item);
    multiPack(reverseSack, checkList, dp, path, i, item);
  }

  // console.log(dp[reverseSack[0]][reverseSack[1]]);
  getPath(reverseSack, checkList, data, path);
  // console.log(data);

  return {
    result: true,
    data: clearData(data),
  };
};

const getData = state => {
  const { list, stats, values } = state;
  const ret = {};

  list.slice(0, 10).forEach(id => {
    let qty = stats[id].qty;

    if (qty !== '0' && qty !== 0) {
      if (qty === '') {
        qty = MAX;
      }

      qty = qty * 1 > MAX ? MAX : qty * 1;

      const item = {
        ...stats[id],
        qty,
        value: getValue(values, stats[id].value),
      };

      ret[id] = item;
    }
  });

  return ret;
};

const getValue = (values, value) => {
  let sum = 0;
  for (let i in value) {
    sum += values[i] * value[i];
  }

  return sum;
};

const getReverseSack = (sackField, data) => {
  // console.log(sackField, data);
  const { sack, checkList } = sackField;
  // TODO 2D
  const [a, b] = checkList;
  let w0 = 0;
  let w1 = 0;
  Object.keys(data).forEach(id => {
    const { weight, qty } = data[id];
    w0 += qty * weight[a];
    w1 += qty * weight[b];
  });

  const filled = w0 < sack[0] || w1 < sack[1] ? false : true;
  return { filled, reverseSack: [w0 - sack[0], w1 - sack[1]] };
};

const createArray = dimensions => {
  if (dimensions.length > 0) {
    const dim = dimensions[0];
    const res = dimensions.slice(1);
    const newArray = new Array(dim + 1);
    for (let i = 0; i <= dim; i++) {
      newArray[i] = createArray(res);
    }

    return newArray;
  }

  return 0;
};

const multiPack = (sack, checkList, dp, path, i, item) => {
  let n = 1;
  let { qty } = item;
  while (n < qty) {
    zeroOnePack(sack, checkList, dp, path, i, item, n);
    qty -= n;
    n *= 2;
  }
  zeroOnePack(sack, checkList, dp, path, i, item, qty);
};

const zeroOnePack = (sack, checkList, dp, path, i, item, qty = 1) => {
  const { weight, value } = item;
  // console.log(weight, value, qty, checkList);
  const [a, b] = checkList;
  const w0 = weight[a];
  const w1 = weight[b];
  // console.log(w0, w1);
  for (let j0 = sack[0]; j0 >= qty * w0; j0--) {
    for (let j1 = sack[1]; j1 >= qty * w1; j1--) {
      const val = dp[j0 - qty * w0][j1 - qty * w1] + qty * value;
      if (val > dp[j0][j1]) {
        dp[j0][j1] = val;
        path[i][j0][j1] = 1;
      }
    }
  }
};

const getPath = (sack, checkList, data, path) => {
  let [j0, j1] = sack;
  const itemList = Object.keys(data);
  let i = itemList.length;

  const [a, b] = checkList;
  while (i > 0 && j0 > 0 && j1 > 0) {
    const id = itemList[i - 1];
    const item = data[id];
    const { weight } = item;
    if (path[i][j0][j1] === 1 && item.qty) {
      j0 -= weight[a];
      j1 -= weight[b];
      item.qty -= 1;
    } else {
      i--;
    }
  }
};

const clearData = data => {
  const ret = {};

  Object.keys(data).forEach(id => {
    if (data[id].qty !== 0) {
      ret[id] = data[id];
    }
  });

  return ret;
};
