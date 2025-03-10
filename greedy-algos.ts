// 1. Assign Cookies (Easy)
// Problem Prompt:
// Given an array `g` representing the greed factor of each child and an array `s` representing the size of each cookie,
// return the maximum number of children who can be content.
// A child will be content if they receive a cookie with a size greater than or equal to their greed factor.
// You can assign at most one cookie per child using a greedy approach.

function findContentChildren(g, s) {
  let result = 0;

  if(g.length === 0){
    return 0;
  }

  g.sort().reverse();
  s.sort().reverse();

  let i = 0;
  let j = 0;
  while(i < g.length && j < s.length){
    if(g[i] > s[i]){
      i++;
      continue;
    }

    result++;
    i++;
    j++;
  }

  return result;
}

// Test Cases
console.log(findContentChildren([1, 2, 3], [1, 1])); // Normal Case
console.log(findContentChildren([], [1, 2, 3])); // Edge Case: No children

// 2. Jump Game (Medium)
// Problem Prompt:
// You are given an array `nums` where each element represents the maximum jump length at that position.
// Determine if you can reach the last index starting from index 0.
// Use a greedy approach to maximize the reach.

function canJump(nums) {
  let result = false;

  let currInx = 0;
  let jumping = true;
  while(jumping){
    if(nums[currInx] === 0){
      jumping = false;
      break;
    }
    if(currInx + nums[currInx] >= nums.length - 1){
      jumping = false;
      result = true;
      break;
    }

    currInx += nums[currInx];
  }

  return result;
}

// Test Cases
console.log(canJump([2, 3, 1, 1, 4])); // Normal Case: Can reach the last index
console.log(canJump([3, 2, 1, 0, 4])); // Edge Case: Cannot reach last index

// 3. Task Scheduler (Medium)
// Problem Prompt:
// Given a list of tasks represented by characters and an integer `n` representing the cooling period,
// return the least number of units of time required to complete all tasks.
// The same task can only be scheduled again after `n` units of time.
// Use a greedy approach to minimize idle time.

function leastInterval(tasks, n) {
  if(n === 0){
    return 0;
  }

  let result = 0;
  const completed = new Set();
  while(completed.size < tasks.length){

    const scheduled = new Set();
    for(let i = 0; i < tasks.length; i++){
      if(!completed.has(i) && !scheduled.has(tasks[i])){
        completed.add(i);
        scheduled.add(tasks[i]);
      }
    }
    result += n;
  }

  return result;
}

// Test Cases
console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2)); // Normal Case
console.log(leastInterval(["A", "B", "C", "D"], 0)); // Edge Case: No cooldown period

// 4. Gas Station (Medium)
// Problem Prompt:
// Given two integer arrays `gas` and `cost`, where `gas[i]` is the gas available at station `i`
// and `cost[i]` is the cost to travel from station `i` to the next station,
// return the starting gas station index if you can travel around the circuit once.
// If it's not possible, return -1. Use a greedy approach to find the optimal starting station.

function canCompleteCircuit(gas, cost) {
  let start = 0;
  
  let startCost = Number.MIN_SAFE_INTEGER;
  for(let i = 0; i < gas.length; i++){
    const currCost = gas[i] - cost[i];
 
    if(currCost > startCost){
      start = i;
      startCost = currCost;
    }
  }

  let next = start;
  let availableGas = 0;
  let driving = true;
  while(driving){
    availableGas = availableGas + gas[next];
    availableGas = availableGas - cost[next];
    if(availableGas < 0){
      return -1;
    }
    next++;
    if(next > gas.length - 1){
      next = 0;
    }

    if(next === start){
      driving = false;
    }
  }

  return start;
}

// Test Cases
console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); // Normal Case: Possible circuit
console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3])); // Edge Case: No possible circuit
