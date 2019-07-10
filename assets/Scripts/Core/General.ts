
export class List<T extends Object> extends cc.ValueType{

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

        if (this.indexCount == 0) throw new Error('collection is not element');

        let index = this.ItemIndexOf(value);

        if (index == -1 )  throw new Error('not this element ');

        this.RemoveItemUseIndex(index);
    }

    //==
    public RemoveAt(_index: number) {

        if (this.indexCount == 0 || _index < 0 || _index >= this.indexCount) throw new Error('Beyond the index '+ _index);

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

        return this.indexCount > 0 && this.ItemIndexOf(value) > -1;
    }

    //==
    public ItemIndexOf(value: T): number {

        let index = 0;

        for (index; index < this.indexCount; index++) {
            
            if (value == this.item[index]){
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
            throw new Error('Beyond the index '+ index);
    }
    //==
    public SetItem(index: number, t: T) {

        if (index >= 0 && index < this.indexCount)
            this.item[index] = t;
        else
            throw new Error('Beyond the index '+ index);
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

export class Dictionary<K extends Object, V extends Object>extends cc.ValueType{

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
    public Add(k: K, v: V) {

        if (this.ContainKey(k)) 
            throw new Error("contain this key");
        else{
            this.itemKey.Add(k);
            this.itemValue.Add(v);
            this.indexCount++;
        }
            
    }
    //==
    public Remove(k: K) {

        if (this.indexCount == 0) throw new Error("collection not element");

        let index = this.itemKey.ItemIndexOf(k);

        if(index == -1) throw new Error("not this key value");

        this.itemKey.RemoveAt(index);
        this.itemValue.RemoveAt(index);
        this.indexCount--;
    }
    //==
    public RemoveAt(_index: number) {

        if (this.indexCount == 0 || _index >= this.indexCount || _index < 0 ) throw new Error("Beyond the index "+_index);

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

        if (this.indexCount == 0) throw new Error("collection not element");

        let index = this.itemKey.ItemIndexOf(k);

        if (index == -1) throw new Error("not this key");

        return this.itemValue.Item(index);
    }
    //==
    public SetItem(k: K, v: V) {

        if (this.indexCount == 0) throw new Error("collection not element");

        let index = this.itemKey.ItemIndexOf(k);

        if (index == -1) throw new Error("not this key");
        
        this.itemValue.SetItem(index, v);
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

export class Stack<T extends Object>extends cc.ValueType{

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

        if (this.indexCount == 0) throw new Error('collection not element');

        let temp: T = this.item[this.indexCount-1];

        this.indexCount--;
        this.item.length = this.indexCount;

        return temp;
    }

    //
    public See(): T {

        if (this.indexCount == 0) throw new Error('collection not element');

        return this.item[this.item.length - 1];
    }

    //==
    public Contain(value: T): boolean {

        return this.ItemIndexOf(value) > -1;
    }

    //==
    private ItemIndexOf(value: T): number {

        let index = 0;
        for (index; index < this.indexCount; index++) {
            if (value == this.item[index])
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
            throw new Error("Beyond the index "+index);
    }

    //==
    public Clear() {
        this.item = [];
        this.item.length = 0;
        this.indexCount = 0;
    }
}

export class Queue<T extends Object>extends cc.ValueType{

    private item: T[];
    private indexCount: number = 0;
    public name : string;

    constructor() {
        super();
        this.item = [];
        this.indexCount = 0;
    }

    public get Count(): number { return this.indexCount; }

    //
    public Push(value: T) {
        this.item[this.indexCount++] = value;
    }

    //
    public Pop(): T {

        if (this.indexCount == 0) throw new Error('collection not element');

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

    public PopLast(): T {

        if (this.indexCount == 0) throw new Error('collection not element');

        let temp: T = this.item[this.indexCount-1];

        this.indexCount--;
        this.item.length = this.indexCount;

        return temp;
    }
    //
    public See(): T {

        if (this.indexCount == 0) throw new Error('collection not element');

        return this.item[0];
    }
    //
    public SeeLast(): T {

        if (this.indexCount == 0) throw new Error('collection not element');

        return this.item[this.indexCount-1];
    }

    //==
    public Contain(value: T): boolean {

        if (this.indexCount == 0) throw new Error('collection not element');

        return this.ItemIndexOf(value) > -1;
    }

    //==
    private ItemIndexOf(value: T): number {

        let index = 0;

        for (index; index < this.indexCount; index++) {
            if (value == this.item[index])
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
            throw new Error("Beyond the index "+index);
    }

    //==
    public Clear() {
        this.item = [];
        this.item.length = 0;
        this.indexCount = 0;
    }
}

export class Random extends cc.ValueType{

    seed : number = 0;

    public constructor(_seed : number = 0){
        super();
        this.seed = _seed;
    }

    public Range(min : number ,max : number){

        return this.rnd() * (max - min) + min;
    }

    public RangeInt(min : number ,max : number){

        return Math.round(this.rnd() * (max - min - 1) + min);
    }
    
    private rnd() : number{
        this.seed = ( this.seed * 9301 + 49297 ) % 233280;
        return this.seed / ( 233280.0 );
    }
}

export class Test<T extends Object> extends cc.ValueType{

    private temp : T[];
    private length : number;
    
    constructor(){
        super();
        this.temp = [];
        this.length = 0;
    }
    public get Count(){
        return this.length;
    }

    public Add(value : T){
        this.temp[this.length++] = value;
    }

    public Contion(value : T) : number{
        for (let x = 0; x < this.length; x++) {
            if(this.temp[x] == value)
                return x;
        }
        return -1;
    }
}
