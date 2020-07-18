export const newElementHandler = (idx, add = false) => {
  const updatedMethod = { ...method }

  const modifyArray = (array, idx, add, toAdd = null) => {
    if (add) {
      array.splice(idx, 0, toAdd)
    } else {
      array.splice(idx, 1)
    }
  }

  // This next bit looks through the method object for arrays
  // the same length as the list of elements, which we can then
  // lengthen or shorten to add an element.
  const keys = Object.keys(method);
  const startingElements = method.elements.length

  // Loop through each key of the method object.
  for (const key of keys) {
    // Check if it's an array.
    if (Array.isArray(method[key])) {
      // If it's an array and not the calStandards array..
      if (method[key].length === startingElements && key !== 'calStandards') {
        // Add or remove a value using this function.
        modifyArray(updatedMethod[key], idx, add, '')

      }
      // If the key holds an object and it has a name key...
      else if (typeof method[key] === 'object' && method[key][0].name) {
        // Cycle through the list looking at each sub-object.
        for (let i = 0; i < method[key].length; i++) {

          const nestedKeys = Object.keys(method[key][i]);
          for (const nestedKey of nestedKeys) {
            const thisItem = method[key][i][nestedKey];
            // If the key holds an array of the right length,
            // we'll add or remove an item in the right spot.
            if (Array.isArray(thisItem) && thisItem.length === startingElements) {
              modifyArray(thisItem, idx, add, null)
            }
          }
        }
      }
    }
  }

  return updatedMethod
}