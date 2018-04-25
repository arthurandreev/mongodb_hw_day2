const Request = function(url) {
  this.url = url;
}

//request.get activates on complete of
Request.prototype.get = function(onComplete){
  const request = new XMLHttpRequest();
  request.open('GET', this.url);

  request.addEventListener('load', function () {
    //if statement for error handling
    if (request.status !== 200) return;

    //request is in JSON format that is parsed in JS
    const response = JSON.parse( request.responseText );

    onComplete( response );
  });

  request.send();
}

//payload as the name of this parameter needs to be kept generic
Request.prototype.post = function(onComplete, payload){
  const request = new XMLHttpRequest();
  request.open('POST', this.url);

  //setRequestHeader is a built in method on request object
  request.setRequestHeader('Content-Type', 'application/json');

  request.addEventListener('load', function () {
    if (request.status !== 201) return;

    const response = JSON.parse(request.responseText);

    onComplete( response );
  });
  const jsonPayload = JSON.stringify(payload);
  request.send( jsonPayload );
}

//last step
Request.prototype.deleteAll = function(onComplete){
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function () {
    if (request.status !== 200) return;

    onComplete();
  });
  request.send();
}


module.exports = Request;
