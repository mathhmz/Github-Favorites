export class Favorites{
    constructor(root) {
        this.root = document.querySelector(".hero")
        
       this.tbody = this.root.querySelector("table tbody")


        this.load()
    }

    load(){
        this.entries =  [{
            login: `maykbrito`,
            name: `Mayk Brito`,
            publicRepos: `76`,
            followers: `120000`
        },

        {
            login: `diego3g`,
            name: `Diego Fernandes`,
            publicRepos: `76`,
            followers: `120000`
        },

    ]
    }

    delete(user){
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
        this.entries = filteredEntries
    }
}

export class FavoritesView  extends Favorites{
    constructor(root) {
        super(root)

        this.update()

     }

    update() {
        this.removeAllTr()
        

        this.entries.forEach( user => {
            const row = this.createRow()

            row.querySelector(".heroUser img").src = `https://github.com/${user.login}.png`
            row.querySelector(".heroUser img").alt = `Imagem de ${user.name}`
            row.querySelector(".heroUser p").textContent = user.name
            row.querySelector(".heroUser span").textContent = user.login
            row.querySelector(".heroRepo").textContent = user.publicRepos
            row.querySelector(".heroFollow").textContent = user.followers

            row.querySelector(".heroRemove").onclick = () => {
                const isOk = confirm("Tem certeza que deseja deletar essa linha?")
                if (isOk) {
                    this.delete(user)
                }
            }


            this.tbody.append(row)
        })

    }

    createRow(){
        const tr = document.createElement("tr")
        const innerContent = `
            <td class="heroUser">
                    <img src="https://github.com/maykbrito.png" alt="">
                    <a href="https://github.com/maykbrito" target="_blank">
                        <p>Mayk Brito</p>
                        <span>maykbrito</span>
                    </a>
                </td>
                <td class="heroRepo">
                    76
                </td>
                <td class="heroFollow">
                    9589
                </td>
                <td>
                    <button class="heroRemove">&times;</button>
            </td>
    `

        tr.innerHTML = innerContent

        return tr
    }

    removeAllTr(){

        this.tbody.querySelectorAll("tr").forEach((tr) => {
            tr.remove()
            
        });
    }

}