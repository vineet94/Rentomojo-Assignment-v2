if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}

//mongodb+srv://rentomojoUser:mydobis94!@cluster0-bne80.mongodb.net/rentomojo?retryWrites=true&w=majority
//775450660707-eq06dl67m09rim7ue29bnrhlr0vkb5gf.apps.googleusercontent.com
//o-aVafUPZU9bzsByNl9mhzEw