export const replaceMongoIdInArray = (array) => {
  return array.map((item) => {
    const { _id, ...rest } = item; // Destructure _id and the rest of the item
    return { id: _id.toString(), ...rest }; // Replace _id with id and keep the rest
  });
};

export const replaceMongoIdInObject = (obj) => {
  const { _id, ...rest } = obj; // Destructure _id and the rest of the object
  return { id: _id.toString(), ...rest }; // Return a new object with id and the rest
};
