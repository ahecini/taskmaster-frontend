// Send a POST request to create a new task, which takes a `task` object
// as the parameter and returns a void promise (since we won't be using the result)
export default async function createTask(task: Object): Promise<void> {
  // Since this request will send JSON data in the body,
  // we need to set the `Content-Type` header to `application/json`
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  // We also need to set the `Accept` header to `application/json`
  // to tell the server that we expect JSON in response
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request('/tasks', {
    // We need to set the `method` to `POST` and assign the headers
    method: 'POST',
    headers: headers,
    // Convert the task object to JSON and pass it as the body
    body: JSON.stringify(task)
  })

  // Send the request and print the response
  return fetch(request)
    .then(res => {
      console.log("got response:", res)
    })
}