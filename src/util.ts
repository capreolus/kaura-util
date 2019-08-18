// Author: Kaura Peura

export async function sleep(milliseconds: number) {
    return new Promise((resolve) => { setTimeout(resolve, milliseconds); });
}
