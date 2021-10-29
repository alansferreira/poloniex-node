export class CacheMap<T> {
    _map: Map<string, T> = new Map()
    constructor(
        private keyName: keyof T
    ) {}
    get map() {
        return this._map
    }

    put (item: T) {
        this._map.set(item[this.keyName.toString()], item)
    }
    
    all() {
        return Array.from(this._map.values())
    }
}

export abstract class CacheReMap<I, M> {
    _map: Map<string, M> = new Map()
    
    remap(item: I): [key: string, remapped: M]{
        if(item) throw new Error("Method not implemented.")
        return ['', null]
    }

    put (item: I) {
        const [key, remmaped] = this.remap(item)
        this._map.set(key, remmaped)
    }
    
    all() {
        return Array.from(this._map.values())
    }

}