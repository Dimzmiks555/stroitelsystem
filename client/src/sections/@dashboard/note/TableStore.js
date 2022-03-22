import { makeAutoObservable } from 'mobx'


class TableStore {
    constructor() {
        makeAutoObservable(this)
    }

    counter = 1
    rows = [{id: 1}]

    setValue(index, name, value) {
        this.rows[index][name] = value
        console.log(this.rows)
    }

    addPosition() {
        this.rows.push({id: this.counter + 1})
        this.counter++
        console.log(this.rows)
    }

}

export default new TableStore()