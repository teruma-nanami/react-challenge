// TypeScriptの基本の型

// Boolean 正誤
let bool: boolean = true;

// number 数字
let num: number = 0;

//string 文字
let str: string = 'A';


// Array 配列
let arr1: Array<number> = [0, 1, 2];
let arr2: number[] = [0, 1, 2];

// tuple
let tuple: [number, string] = [0, 'a']

// any
let any: any = false;

// void
const funcA = ():void => {
  const test = 'test'
}
// 関数に設定するが、自動補完してくれるので、あえて書かなくてもよい

// null
let null1: null = null;

// undefind
let undefind: undefined = undefined;

// object
let obj1: object = {};
let obj2: {id: number, name: string } = {id:0, name:'AAA'}


