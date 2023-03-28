const { SHOW_MESSAGE } = require("config");

export const logMessage = (...args) => SHOW_MESSAGE && console.log(...args)


export const getMatch = (arr = [], field = "", value = "") => {
  if(!arr.length || !field || !value) return
  // eslint-disable-next-line
  return arr?.find(item => item[field] == value)
}