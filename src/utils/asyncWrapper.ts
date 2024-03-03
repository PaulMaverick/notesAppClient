export async function asyncWrapper(fn: any) {
    try {
        return await fn();
    } catch (error) {
        console.log(error);
        return error;
    }
}