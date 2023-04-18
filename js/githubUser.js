export class githubUser{
    static search (username){
        const endpoint = `https://api.github.com/users/${username}`
        
        return fetch(endpoint).then(data => data.json()).then(({login, name, publicRepos, followers}) => ({
            login,
            name,
            publicRepos,
            followers,

        }))
    
    }
}