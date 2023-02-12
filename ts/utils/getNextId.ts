const getNextId = ():number => {
  let nextIdStr = localStorage.getItem("nextid");
  let nextId:number;
  if (!nextIdStr) {
    nextId = 1;
    return nextId;
  }
  nextId = +nextIdStr;
  if (isNaN(nextId)) {
    nextId = 1;
  }
  return nextId;
};

export default getNextId;
