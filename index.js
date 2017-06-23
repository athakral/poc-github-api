'use strict';
const GitHub = require('github-api');

const auth = {
    username: 'testuser-aman',
    password: 'testuser-aman1'
};

const gh = new GitHub(auth);

const me = gh.getUser();

const delay = timeInMs => {
    return new Promise(function(resolve) {
        setTimeout(resolve, timeInMs);
    });
}

const repoName = "test-repo";

me.createRepo({
        name: repoName,
        description: "test description",
    })
    .then(response => {
        //console.log(response.data);
        console.log('Repo created!!');
        //delay is required since, sometime github accepts the request but the creation is delayed
        return delay(5000);
    })
    .then(() => {
        const repo = gh.getRepo(auth.username, repoName);
        return repo.deleteRepo();
    })
    .then(response => {
        console.log('Repo Deleted !');
        // console.log(response.data);
    })
    .catch(err => console.log(err));

//const