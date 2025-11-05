// TypeScriptの基本の型

// Boolean 正誤
const bool: boolean = true;

// number 数字
const num: number = 0;

//string 文字
const str: string = "A";

// Array 配列
const arr1: Array<number> = [0, 1, 2];
const arr2: number[] = [0, 1, 2];

// tuple
const tuple: [number, string] = [0, "a"];

// any
const any: any = false;

// void
const funcA = (): void => {
  const test = "test";
  console.log(test);
};
// 関数に設定するが、自動補完してくれるので、あえて書かなくてもよい

// null
const null1: null = null;

// undefind
const undefind: undefined = undefined;

// object
const obj1: object = {};
const obj2: { id: number; name: string } = { id: 0, name: "AAA" };

console.log(
  bool,
  num,
  str,
  arr1,
  arr2,
  tuple,
  any,
  funcA,
  null1,
  undefind,
  obj1,
  obj2
);
