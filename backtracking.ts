// 1. Generate Parentheses (Medium)
// Given an integer n, generate all combinations of well-formed parentheses with n pairs.
function generateParenthesis(n) {
  const result : string[] = [];
  if(n === 0){
    return [];
  }
  function generate(pairs : number, current: string){
    if(pairs === 0){
      result.push(current);
      return;
    }
    //generate(pairs - 1, [...current])
    //current.push("()");
    //for(const r of current){
    generate(pairs - 1, "(" + current + ")");
    generate(pairs - 1, current + "()");
    //}
  }
  
  generate(n - 1 ,"()");
  return result;
}
// Test Cases
console.log(generateParenthesis(3)); // Normal Case
console.log(generateParenthesis(0)); // Edge Case: No parentheses needed

// 2. Permutations (Medium)
// Given an array of distinct integers, return all possible permutations.
function permute(nums) {

  if(nums.length === 0){
    return [];
  }
  const result :number[][] = [];

  function generate(arr : number[], curr: number[]){
    if(arr.length === 0){
      result.push(curr);
      return;
    }

    for(let i = 0; i < arr.length; i++){
      generate([...arr.slice(0, i), ...arr.slice(i + 1, arr.length)], [...curr, arr[i]]);
    }
  }
  generate(nums, []);
  return result;
}
// Test Cases
console.log(permute([1, 2, 3])); // Normal Case
console.log(permute([])); // Edge Case: Empty array

// 3. Combination Sum (Medium)
// Given an array of integers and a target, return all unique combinations where numbers sum to target.
function combinationSum(candidates, target) {
  const result : number[][] = [];

  function generate(start: number, arr: number[]){
    let sum = 0;
    for(const n of arr){
      sum += n;
    }
    if(sum === target){
      result.push([...arr]);
      return;
    }

    if(start > candidates.length - 1){
      return;
    }

    generate(start + 1, arr);
    generate(start + 1, [...arr, candidates[start]]);
  }
  generate(0, []);
  return result;
}
// Test Cases
console.log(combinationSum([2, 3, 6, 7], 7)); // Normal Case
console.log(combinationSum([2, 4], 7)); // Edge Case: No valid combinations

// 4. Word Search (Medium)
// Given an m x n grid of letters and a word, check if the word exists in the grid using adjacent letters.
function exist(board, word) {
  let result = false;
  const w = board[0].length;
  const h = board.length;

  function generate(startx, starty, path : number[][], curr : string){
    if(result === true){
      return;
    }
    if(curr === word){
      result = true;
      return;
    }
    if(startx > w - 1){
      return;
    }

    if(startx < 0){
      return;
    }

    if(starty > h - 1){
      return;
    }

    if(starty < 0){
      return;
    }

    for(const p of path){
      if(startx === p[0] && starty === p[1]){
        return;
      }
    }

    generate(startx - 1, starty, [...path, [startx, starty]], curr + board[starty][startx]);
    generate(startx + 1, starty, [...path, [startx, starty]], curr + board[starty][startx]);
    generate(startx, starty + 1, [...path, [startx, starty]], curr + board[starty][startx]);
    generate(startx, starty - 1, [...path, [startx, starty]], curr + board[starty][startx]);
  }
  generate(0, 0, [], "");
  return result;
}
// Test Cases
console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
); // Normal Case
console.log(exist([["A"]], "B")); // Edge Case: Single letter grid with a different word
