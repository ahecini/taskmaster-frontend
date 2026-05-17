// Send a DELETE request to delete a task, which takes an `id` number
// as the parameter and returns a void promise (since we won't be using the result)
export default async function deleteTask(id: String): Promise<void> {
  // Since this request will send JSON data in the body,
  // we need to set the `Content-Type` header to `application/json`
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  // We also need to set the `Accept` header to `application/json`
  // to tell the server that we expect JSON in response
  headers.set('Accept', 'application/json')
  console.log(id);
  const request: RequestInfo = new Request(`${process.env.NEXT_PUBLIC_WEBSERVICE_URL}/${id}`, {
    // We need to set the `method` to `DELETE` and assign the headers
    method: 'DELETE',
    headers: headers,
    // Convert the task object to JSON and pass it as the body
    body: JSON.stringify({})
  })
  // Send the request and print the response
  return fetch(request)
    .then(res => {
      console.log("got response:", res)
    })
}