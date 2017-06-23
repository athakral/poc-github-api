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

async function main() {
    try {
        await me.createRepo({ name: repoName, description: "test description" });
        console.log('Repo created!!');
        //delay is required, since sometime github takes time to do this.
        await delay(5000);
        const repo = gh.getRepo(auth.username, repoName);
        await repo.deleteRepo();
        console.log('Repo Deleted !');
    } catch (err) {
        console.log(err)
    }
}

main();
//const