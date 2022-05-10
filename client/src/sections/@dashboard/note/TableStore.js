import { makeAutoObservable, toJS } from 'mobx'


class TableStore {
    constructor() {
        makeAutoObservable(this)
    }

    counter = 1
    rows = [{price: 0, summ: 0, amount: 0}]

    setValue(index, name, value) {
        this.rows[index][name] = value
        console.log(this.rows)
    }

    setRows(rows) {
        this.rows = rows
    }

    addPosition() {
        const gFilter = toJS(this.rows)
        gFilter.push({price: 0, summ: 0, amount: 0})
        this.rows = gFilter
        this.counter++
        console.log(this.rows)
    }
    reset() {
        this.rows = [{price: 0, summ: 0, amount: 0}]
        this.counter = 1
    }

    delete(indexItem) {

        const gFilter = toJS(this.rows)

        gFilter = gFilter.filter((row, index) => indexItem != index)

        this.rows.replace(gFilter)

        console.log(gFilter)

    }

}

export default new TableStore()