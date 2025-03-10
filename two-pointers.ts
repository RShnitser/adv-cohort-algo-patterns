// 1. Remove Duplicates from Sorted Array (Easy)
// Given a sorted array, remove the duplicates in-place such that each element appears only once.
// Return the new length of the array.
function removeDuplicates(nums) {
  if(nums.length === 0){
    return 0;
  }

  if(nums.length === 1){
    return 1;
  }
  let left = 0;
  let right = 0;
  let result = 1;
 
  while(right < nums.length){
    if(nums[left] === nums[right]){
      right++;
    }else{
      result++;
      while(left < right){
        left++;
      }
    }
  }
  
  return result;
}
// Test Cases
console.log(removeDuplicates([1, 1, 2, 3, 3, 4])); // Normal Case: [1, 2, 3, 4]
console.log(removeDuplicates([])); // Edge Case: Empty array

// 2. Two Sum II - Input Array is Sorted (Easy)
// Given a sorted array and a target number, return indices of the two numbers that add up to target.
function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while(left < right){
    const sum = nums[left] + nums[right];
    if(sum === target){
      return [left, right];
    }else if(sum > target){
      right--;
    }else if(sum < target){
      left++;
    }
  }
  return null;
}
// Test Cases
console.log(twoSumSorted([2, 7, 11, 15], 9)); // Normal Case: [0, 1]
console.log(twoSumSorted([1, 2, 3, 4], 10)); // Edge Case: No valid pairs

// 3. Container With Most Water (Medium)
// Given an array representing heights of vertical lines, find two lines that together with the x-axis form a container that holds the most water.
function maxArea(height) {
  let i = 0;
  let j = height.length - 1;
  let area = 0;

  while(i < j){
      let l = height[i];
      let r = height[j];

      let v = 0;
      if(l > r){
          j--;
          v = r;
      }else{
          v = l;
          i++;
      }
      let a = v * (j - i + 1);
      if(a > area){
          area = a;
      }
  }

  return area
}
// Test Cases
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // Normal Case
console.log(maxArea([1, 1])); // Edge Case: Minimal height difference

// 4. Three Sum (Medium)
// Given an integer array, return all unique triplets that sum up to zero.
function threeSum(nums) {
  let left = 0;
  let right = 0;
  let numSet = new Set<number>();
  let result :number[][] = [];
  let sum = 0;
  while(right < nums.length){
    if(!numSet.has(nums[right])){
      numSet.add(nums[right]);
      sum += nums[right];
      if(numSet.size === 3 && sum === 0){
        result.push(Array.from(numSet));
      }
      if(numSet.size > 3){
        numSet.delete(nums[left]);
        left++;
        sum -= nums[left];
      }
    }
    right++;
  }
  return result;
}
// Test Cases
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // Normal Case
console.log(threeSum([0, 0, 0, 0])); // Edge Case: All elements are the same
