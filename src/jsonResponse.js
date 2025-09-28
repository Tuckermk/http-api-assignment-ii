const users = {};

function respondJSON(request, response, status, object) {
  const content = JSON.stringify(object);
  //   console.log(content);

  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  if (request.method !== 'HEAD' && status !== 204) {
    response.write(content);
  }
  response.end();
}

function getUsers(request, response) {
  return respondJSON(request, response, 200, users);
}

function addUsers(request, response) {
  const responseJSON = {
    message: 'Name and age are both required.',
  };
  const { name, age } = request.body;
  if (!name || !age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }
  let responseCode = 204;
  if (!users[name]) {
    responseCode = 201;
    users[name] = {
      name,
    };
  }
  users[name].age = age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSON(request, response, responseCode, {});
}

function notReal(request, response) { // error 404
  const responseJSON = {
    message: 'does not exist',
    id: '404',
  };
  return respondJSON(request, response, 404, responseJSON);
}

module.exports = {
  getUsers,
  addUsers,
  notReal,
};
