In the typical request-response cycle of a RESTful
API, what is the correct flow?

--Client -> Server -> Route -> Controller -> Model -> Controller -> Client 

Explanation--In a RESTful API, the flow of a request starts from the client to the server. The server then
directs the request to the appropriate route. The route invokes the appropriate controller
function, which may interact with the model to fetch or manipulate data. The controller then
sends a response back to the client.