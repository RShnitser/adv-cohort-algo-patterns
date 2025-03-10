// 1. Maximum Sum Subarray of Size K (Easy)
// Given an array of integers and an integer K, find the maximum sum of any contiguous subarray of size K.
function maxSumSubarray(arr, k) {
  if(k > arr.length){
    return null;
  }

  let largestSum = Number.NEGATIVE_INFINITY;
  let left = 0;
  let right = k - 1;
  for(let i = right; right < arr.length; right++, left++){
    let currSum = 0;
    for(let j = left; j <= right; j++){
      currSum += arr[j];
    }
  
    if (currSum > largestSum){
      largestSum = currSum;
    }
  }
  return largestSum;
}
// Test Cases
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // Normal Case
console.log(maxSumSubarray([1, 2], 3)); // Edge Case: k is greater than array length

// 2. Longest Substring Without Repeating Characters (Medium)
// Given a string, find the length of the longest substring without repeating characters.
function lengthOfLongestSubstring(s) {
  if(s.length === 0){
    return 0;
  }
  let length = 0;
  const letterSet = new Set();
  let left = 0;
  let right = 0;
  for(const l of s){
    if(letterSet.has(l)){
      while(s[left] != s[right]){
        letterSet.delete(l);
        left++;
      }
    }else{
      letterSet.add(l);
      right++;
    }
    const currLength = right - left;
    if(currLength > length){
      length = currLength;
    }
  }
  return length;
}
// Test Cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Normal Case
console.log(lengthOfLongestSubstring("")); // Edge Case: Empty string

// 3. Longest Repeating Character Replacement (Medium)
// Given a string and an integer K, find the longest substring that can be obtained by replacing at most K characters.
function characterReplacement(s, k) {
  if(s.length === 0){
    return 0;
  }

  if(k > s.length){
    return s.length;
  }

  let length = 0;
  const letterMap = new Map();
  let replacement = k;
  
  let left = 0;
  let right = 0;

  for(const l of s){
    let v = letterMap.get(l);

    if(v !== undefined){
     if(replacement > 0){
      replacement--;
      letterMap.set(l, v + 1);
      right++;
     }else{
      let looping = true;
      while(looping){
        let vl = letterMap.get(s[left]);
        if(vl != undefined){
          if(vl > 1){
            replacement++;
            looping = false;
            left++;
          }else{
            left++;
          }
        }
      }
     }
    }else{
      letterMap.set(l, 1);
      right++;
    }
    const currLength = right - left;
    if(currLength > length){
      length = currLength;
    }
  }
  return length;
}
// Test Cases
console.log(characterReplacement("AABABBA", 1)); // Normal Case
console.log(characterReplacement("A", 2)); // Edge Case: Single character string

// 4. Minimum Window Substring (Hard)
// Given a string S and a string T, find the minimum window in S which contains all characters of T.
function minWindow(s, t) {
  if(t.length > s.length){
    return null;
  }

  let left = 0;
  let right = 0;
  let looping = true;
  function contains(a : string, b: string){
    if(b.length > a.length){
      return false;
    }
    const aCount = new Map();
    const bCount = new Map();

    for(const l of b){
      const count = bCount.get(l);
      if(count !== undefined){
        bCount.set(l, count + 1);
      }else{
        bCount.set(l, 1);
      }
    }

    for(const l of a){
      const count = aCount.get(l);
      if(count !== undefined){
        aCount.set(l, count + 1);
      }else{
        aCount.set(l, 1);
      }
    }

    for(const [k, v] of bCount.entries()){
      const va = aCount.get(k);
      if(va === undefined){
        return false;
      }
      if(va < v){
        return false;
      }
    }

    return true;
  }
  while(looping){
    if(contains(s.slice(left, right + 1), t)){
      left++;
    }else{
      right++;
      if(right > s.length){
        looping = false;
      }
    }
  }
  return right - left;
}
// Test Cases
console.log(minWindow("ADOBECODEBANC", "ABC")); // Normal Case
console.log(minWindow("a", "aa")); // Edge Case: No valid substring
