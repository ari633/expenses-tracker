export async function NewFetcher(url: string, method: string, body = {}): Promise<object>  {

  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === 'POST') {
    options = {
      ...options,
      ...{
        body: JSON.stringify(body)
      }
    }
  }

  const response = await fetch(url, options)
  return response.json();
}