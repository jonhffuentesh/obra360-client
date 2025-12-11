export const aplanar = (
    obj: any,
    parentKey = '',
    newObject: { [x: string]: any } = {},
    keysNoAplanar: string[] = []
) => {
    for (const key in obj) {
        const newKey = `${parentKey}${parentKey ? '.' : ''}${key}`;
        const value = obj[key];

        if (keysNoAplanar.length && keysNoAplanar.includes(key)) {
            newObject[newKey] = value;
        } else {
            if (
                typeof obj[key] === 'object' &&
                value !== null &&
                value instanceof Date === false
            ) {
                if (Array.isArray(value) && value.length !== 0) {
                    const newArray = value.map((element: any) => {
                        return aplanar(element);
                    });
                    newObject[newKey] = newArray;
                } else {
                    newObject[newKey] = value; // agrega el objeto sin aplanar
                    aplanar(value, newKey, newObject);
                }
            } else {
                newObject[newKey] = value;
            }
        }
    }
    return newObject;
};
