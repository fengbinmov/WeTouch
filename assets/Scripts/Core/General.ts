
export class List<T> extends cc.ValueType{

    private item: T[] = null;
    private indexCount: number = 0;
    constructor() {

        super();
        this.item = [];
        this.indexCount = 0;
    }
    
    public get Count(): number { return this.indexCount; }

    //==
    public Add(value: T) {
        this.item[this.indexCount++] = value;
    }
    //==
    public Remove(value: T) {

        if (this.item == null || this.indexCount == 0 || !this.Contain(value)) return;

        let index = 0;

        for (index; index < this.indexCount; index++) {
            if (value == this.item[index])
                break;
        }

        this.RemoveItemUseIndex(index);
    }

    //==
    public RemoveAt(_index: number) {

        if (this.item == null || this.indexCount == 0 || _index < 0 || _index >= this.indexCount) return;

        this.RemoveItemUseIndex(_index);
    }

    //==
    private RemoveItemUseIndex(_index: number){

        for (_index; _index < this.indexCount - 1; _index++) {
            this.item[_index] = this.item[_index + 1];
        }
        this.item[_index] = null;
        this.indexCount--;
        this.item.length = this.indexCount
    }

    //==
    public Contain(value: T): boolean {


        if (this.item == null || this.indexCount == 0) return false;

        let index = this.ItemIndexOf(value);

        return index > -1;
    }

    //==
    public ItemIndexOf(value: T): number {

        let index = 0;

        for (index; index < this.indexCount; index++) {
            
            if (value.toString() == this.item[index].toString()){
                break;
            }
        }
        if (index < this.indexCount)
            return index;
        else
            return -1;
    }
    
    //==
    public Item(index: number): T {

        if (index >= 0 && index < this.indexCount)
            return this.item[index];
        else
            return null;
    }
    //==
    public SetItem(index: number, t: T): boolean {

        if (index >= 0 && index < this.indexCount)
            this.item[index] = t;
        else
            return false;
    }
    //==
    public Clear() {
        this.item = [];
        this.item.length = 0;
        this.indexCount = 0;
    }

    //==
    public ToArray() : T[]{
        return this.item;
    }
}

export class Dictionary<K, V>extends cc.ValueType{

    private itemKey: List<K>;
    private itemValue: List<V>;
    private indexCount: number = 0;

    constructor() {
        super();
        this.itemKey = new List<K>();
        this.itemValue = new List<V>();
        this.indexCount = 0;
    }

    public get Count(): number { return this.indexCount; }

    //==
    public Add(k: K, v: V): Boolean {

        if (!this.ContainKey(k)) {

            this.itemKey.Add(k);
            this.itemValue.Add(v);
            this.indexCount++;
            return true;
        }
        return false;
    }
    //==
    public Remove(k: K) {

        if (this.itemKey == null || this.indexCount == 0 || !this.ContainKey(k)) return;

        let index = this.itemKey.ItemIndexOf(k);

        if (index > -1 && index < this.indexCount) {

            this.itemKey.RemoveAt(index);
            this.itemValue.RemoveAt(index);
            this.indexCount--;
        }
    }
    //==
    public RemoveAt(_index: number) {

        if (this.itemKey == null || this.indexCount == 0 || _index >= this.indexCount || _index < 0 ) return;

        this.itemKey.RemoveAt(_index);
        this.itemValue.RemoveAt(_index);
        this.indexCount--;
    }
    //==
    public ContainKey(k: K): boolean {

        return this.itemKey.Contain(k);
    }
    //==
    public ContainValue(v: V): boolean {

        return this.itemValue.Contain(v);
    }
    //==
    public Item(k: K): V {

        if (this.itemKey == null || this.indexCount == 0 || !this.ContainKey(k)) return;

        let index = this.itemKey.ItemIndexOf(k);

        if (index > -1 && index < this.indexCount) {

            return this.itemValue.Item(index);
        } else {
            return null;
        }
    }
    //==
    public SetItem(k: K, v: V): boolean {

        if (this.itemKey == null || this.indexCount == 0 || !this.ContainKey(k)) return;

        let index = this.itemKey.ItemIndexOf(k);

        if (index > -1 && index < this.indexCount) {

            this.itemValue.SetItem(index, v);
            return true;
        } else {
            return false;
        }
    }
    
    //==
    public ItemKeyofIndex(index: number): K {

        return this.itemKey.Item(index);
    }
    
    //==
    public ItemValueofIndex(index: number): V {

        return this.itemValue.Item(index);
    }
    public Clear() {
        this.itemKey.Clear();
        this.itemValue.Clear();
        this.indexCount = 0;
    }
}

export class Stack<T>extends cc.ValueType{

    private item: T[];
    private indexCount: number = 0;

    constructor() {
        super();
        this.item = [];
        this.indexCount = length;
    }

    public get Count(): number { return this.indexCount; }

    //
    public Push(value: T) {
        this.item[this.indexCount++] = value;
    }
    //
    public Pop(): T {

        if (this.item == null || this.indexCount == 0) return null;

        let temp: T = this.Item[this.indexCount-1];

        this.Item[this.indexCount-1] = null;

        this.indexCount--;
        this.item.length = this.indexCount;

        return temp;
    }

    //
    public See(): T {

        if (this.item == null || this.indexCount == 0) return null;

        return this.item[this.item.length - 1];
    }

    //==
    public Contain(value: T): boolean {

        if (this.item == null || this.indexCount == 0) return false;

        let index = this.ItemIndexOf(value);

        return index > -1 && index < this.indexCount;
    }

    //==
    private ItemIndexOf(value: T): number {

        let index = 0;

        for (index; index < this.indexCount; index++) {
            if (value.toString() == this.item[index].toString())
                break;
        }
        if (index < this.indexCount)
            return index;
        else
            return -1;
    }

    public Item(index: number): T {

        if (index >= 0 && index < this.indexCount)
            return this.item[index];
        else
            return null;
    }

    //==
    public Clear() {
        this.item = [];
        this.item.length = 0;
        this.indexCount = 0;
    }
}

export class Queue<T>extends cc.ValueType{

    private item: T[];
    private indexCount: number = 0;

    constructor() {
        super();
        this.item = [];
        this.indexCount = length;
    }

    public get Count(): number { return this.indexCount; }

    //
    public Push(value: T) {
        this.item[this.indexCount++] = value;
    }

    //
    public Pop(): T {

        if (this.item == null || this.indexCount == 0) return null;

        let tempI = this.item[0];
        let index = 1;
        for (; index < this.indexCount; index++) {

            this.item[index - 1] = this.item[index];
        }

        this.item[this.indexCount - 1] = null;
        this.indexCount--;
        this.item.length = this.indexCount;

        return tempI;
    }

    //
    public See(): T {

        if (this.item == null || this.indexCount == 0) return null;

        return this.item[0];
    }

    //==
    public Contain(value: T): boolean {

        if (this.item == null || this.indexCount == 0) return false;

        let index = this.ItemIndexOf(value);

        return index > -1 && index < this.indexCount;
    }

    //==
    private ItemIndexOf(value: T): number {

        let index = 0;

        for (index; index < this.indexCount; index++) {
            if (value.toString() == this.item[index].toString())
                break;
        }
        if (index < this.indexCount)
            return index;
        else
            return -1;
    }

    public Item(index: number): T {

        if (index >= 0 && index < this.indexCount)
            return this.item[index];
        else
            return null;
    }

    //==
    public Clear() {
        this.item = [];
        this.item.length = 0;
        this.indexCount = 0;
    }
}
