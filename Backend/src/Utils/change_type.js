// export function changeTypes(obj: Object, type?: string) {

/**
 * changes the type of all the properties of an object in to a single type
 * @param {Object} obj
 * @param {String} type
 * @returns {Object} newObject
 */
export default function changeTypes<INewObject>(obj: Object, type?: string) {
  const keys = Object.keys(obj);

  const newObject = obj; //new Object();
  switch (type.toLowerCase()) {
    case "number":
      keys.forEach((k) => {
        newObject[k] = parseFloat(obj[k]) as number;
      });
      break;

    case "string":
      keys.forEach((k) => {
        newObject[k] = obj[k].toString() as string;
      });
      break;

    default:
      keys.forEach((k) => {
        newObject[k] = obj[k];
      });
      break;
  }

  console.log(newObject);
  return newObject as INewObject;
}

type Obj = {
  name: string;
  age: number;
};

const obj: Obj = {
  name: "23s45d",
  age: 20
};

changeTypes(obj, "number");
