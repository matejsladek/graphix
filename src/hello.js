function helloJavascript(){
  return 'world';
}

function helloCpp(){
  const binding = require('./binding');
  const helloCppImpl = binding.hello;
  return helloCppImpl();
}

function hello(){
  return new Promise((resolve) => {
    let result;
    try{
      result = helloCpp();
    } catch(err){
      result = helloJavascript();
    }
    resolve(result);
  });
}

export default hello;
