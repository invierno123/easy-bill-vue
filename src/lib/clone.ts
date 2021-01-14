function clone(data: never) {
  return JSON.parse(JSON.stringify(data));
}

export default clone;

