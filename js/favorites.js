import { githubUser } from "./githubUser.js"

export class Favorites{
    constructor(root) {
        this.root = document.querySelector(".hero")
        
       this.tbody = this.root.querySelector("table tbody")


        this.load()
    }

    async add(username){
        try {

            const userExists = this.entries.find(entry => entry.login === username)


            if(userExists){
                throw new Error("Usuário já cadastrado")
            }

            const user = await githubUser.search(username)
            if(user.login === undefined) {
                throw new Error("Usuário não encontrado")
            }
            this.entries = [user, ...this.entries]
            this.update()
            this.save()
        } catch(error){
            alert(error.message)
        }
    }

    load(){
        const entries = JSON.parse(localStorage.getItem("@github-favorites:")) || []
        this.entries = entries
    }

    delete(user){
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
        this.entries = filteredEntries

        this.update()
        this.save()
    }
}

export class FavoritesView  extends Favorites{
    constructor(root) {
        super(root)

        this.update()
        this.onAdd()

     }

    onAdd(){
        const addButon = this.root.querySelector(".searchHero button")
        addButon.onclick = () => {
            const {value} = this.root.querySelector(".searchHero input")

            this.add(value)
        }
    }

    save(){
        localStorage.setItem("@github-favorites:", JSON.stringify(this.entries))
    }
    
    update() {
        this.removeAllTr()
        

        this.entries.forEach( user => {
            const row = this.createRow()

            row.querySelector(".heroUser img").src = `https://github.com/${user.login}.png`
            row.querySelector(".heroUser img").alt = `Imagem de ${user.name}`
            row.querySelector(".heroUser p").textContent = user.name
            row.querySelector(".heroUser a").href = `https://github.com/${user.login}`
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