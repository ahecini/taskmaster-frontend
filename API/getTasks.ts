export default async function api<T>(): Promise<T> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSERVICE_URL}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    //    And can also be used here ↴
    return await response.json() as T;
}