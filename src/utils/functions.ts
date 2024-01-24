export function assert(value: unknown): asserts value {
}

export const findAndAssert = (id: number | null, array: any) => {
    const item = array.find((item: { id: number | null; }) => item.id === id);
    assert(item);
    return item;
};