export function assert(value: unknown): asserts value {
}

export const findAndAssert = (id: number | null, array: any) => {
    const item = array.find((item: { id: number | null; }) => item.id === id);
    assert(item);
    return item;
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const keyIsValid = () => {
    const date = Date.now();
    const now = new Date(date);

    const key_expiration = localStorage.getItem("ACCESS_EXP");

    if (key_expiration !== null) {
        const expiration = new Date(key_expiration);

        if (now > expiration) {
            localStorage.clear();
            const logoutBc = new BroadcastChannel("session");
            logoutBc.postMessage("key-expired");
            return false;
        }
    } else {
        localStorage.clear();
        const logoutBc = new BroadcastChannel("session");
        logoutBc.postMessage("key-expired");
        return false;
    }

    return true;
};