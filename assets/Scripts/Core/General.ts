
export class List<T>{
    private item : T[];
    private indexCount : number = 0;
    constructor(){
        this.item = [];
        this.indexCount = 0;
    }

    public Count():number{return this.indexCount;}

    //==
    public Add(value : T){
        this.item[this.indexCount++] = value;
    }
    //==
    public Remove(value : T){

        if(this.item == null || this.indexCount == 0 || !this.Contain(value)) return;

        let index = 0;
        let temp : T[] = [];

        for(index;index < this.indexCount;index++){
            if(value == this.item[index])
                break;
            else
                temp[index] = this.item[index];
        }
        for(index;index < this.item.length-1;index ++){
            temp[index] = this.item[index+1];
        }
        this.indexCount--;
        this.item = temp;
    }

    //==
    public RemoveAt(_index:number){
        
        let index = 0;
        let temp : T[] = [];

        for(index;index < this.indexCount;index++){
            if(_index == index)
                break;
            else
                temp[index] = this.item[index];
        }
        for(index;index < this.item.length-1;index ++){
            temp[index] = this.item[index+1];
        }
        if(index < this.item.length) {
            this.indexCount--;
            this.item = temp;
        }
    }

    //==
    public Contain(value : T):boolean{

        
        if(this.item == null || this.indexCount == 0) return false;

        let index = this.ItemIndexOf(value);

        return index > -1 && index < this.indexCount;
    }

    //==
    public ItemIndexOf(value :T):number{

        let index = 0;

        for(index;index < this.indexCount;index++){
            if(value == this.item[index])
                break;
        }
        if(index < this.indexCount)
            return index;
        else
            return -1;
    }

    //==
    public Item(index : number) : T{

        if(index >= 0 && index < this.indexCount)
            return this.item[index];
        else 
            return null;
    }

    //==
    public Clear(){
        this.item = [];
        this.indexCount = 0;
    }
}

export class Dictionary<K,V>{

    private itemKey :List<K>;
    private itemValue : List<V>;
    private indexCount : number = 0;
    constructor(){
        this.itemKey = new List<K>();
        this.itemValue = new List<V>();
        this.indexCount = 0;
    }
    public Count():number{return this.indexCount;}

    //==
    public Add(k : K,v : V):Boolean{

        if(!this.ContainKey(k)){

            this.itemKey.Add(k);
            this.itemValue.Add(v);
            this.indexCount++;
            return true;
        }
        return false;
    }
    //==
    public Remove(k : K){

        if(this.itemKey == null || this.indexCount == 0 || !this.ContainKey(k)) return;

        let index = this.itemKey.ItemIndexOf(k);

        if(index > -1 && index < this.itemKey.Count()){

            this.itemKey.RemoveAt(index);
            this.itemValue.RemoveAt(index);
            this.indexCount--;
        }
    }
    //==
    public RemoveAt(_index : number){

        if(this.itemKey.Item(_index) != null){

            this.itemKey.RemoveAt(_index);
            this.itemValue.RemoveAt(_index);
            this.indexCount--;
        }
    }
    //==
    public ContainKey(k : K):boolean{

        return this.itemKey.Contain(k);
    }
    //==
    public Item(k:K):V{

        if(this.itemKey == null || this.itemKey.Count() == 0 || !this.ContainKey(k)) return;

        let index = this.itemKey.ItemIndexOf(k);

        if(index > -1 && index < this.itemKey.Count()){

            return this.itemValue.Item(index);
        }else{
            return null;
        }
    }
    //
    // public ItemValueAt(index : number) : V{

    //     return this.itemValue.Item(index);
    // }
    //==
    public ItemKeyofIndex(index : number) : K{

        return this.itemKey.Item(index);
    }
    public Clear(){
        this.itemKey.Clear();
        this.itemValue.Clear();
        this.indexCount = 0;
    }
}
