import { useState, useEffect } from "react";

// ─── NeetCode 250 — all 250 problems, Medium/Hard first per category ───────────
// Sourced from neetcode.io/practice/practice/neetcode250
// day = offset from May 22, 2026 (0–100); 2–3 problems/day
const PROBLEMS = [
  {id:1,t:"Group Anagrams",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/group-anagrams/",day:0},
  {id:2,t:"Sort an Array",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/sort-an-array/",day:0},
  {id:3,t:"Sort Colors",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/sort-colors/",day:1},
  {id:4,t:"Top K Frequent Elements",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/top-k-frequent-elements/",day:1},
  {id:5,t:"Encode and Decode Strings",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/encode-and-decode-strings/",day:2},
  {id:6,t:"Range Sum Query 2D Immutable",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/range-sum-query-2d-immutable/",day:2},
  {id:7,t:"Product of Array Except Self",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/product-of-array-except-self/",day:2},
  {id:8,t:"Valid Sudoku",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/valid-sudoku/",day:3},
  {id:9,t:"Longest Consecutive Sequence",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/longest-consecutive-sequence/",day:3},
  {id:10,t:"Best Time to Buy And Sell Stock II",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",day:4},
  {id:11,t:"Majority Element II",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/majority-element-ii",day:4},
  {id:12,t:"Subarray Sum Equals K",c:"Arrays & Hashing",d:"Medium",lc:"https://leetcode.com/problems/subarray-sum-equals-k/",day:4},
  {id:13,t:"First Missing Positive",c:"Arrays & Hashing",d:"Hard",lc:"https://leetcode.com/problems/first-missing-positive/",day:5},
  {id:14,t:"Concatenation of Array",c:"Arrays & Hashing",d:"Easy",lc:"https://leetcode.com/problems/concatenation-of-array/",day:5},
  {id:15,t:"Contains Duplicate",c:"Arrays & Hashing",d:"Easy",lc:"https://leetcode.com/problems/contains-duplicate/",day:6},
  {id:16,t:"Valid Anagram",c:"Arrays & Hashing",d:"Easy",lc:"https://leetcode.com/problems/valid-anagram/",day:6},
  {id:17,t:"Two Sum",c:"Arrays & Hashing",d:"Easy",lc:"https://leetcode.com/problems/two-sum/",day:6},
  {id:18,t:"Longest Common Prefix",c:"Arrays & Hashing",d:"Easy",lc:"https://leetcode.com/problems/longest-common-prefix/",day:7},
  {id:19,t:"Remove Element",c:"Arrays & Hashing",d:"Easy",lc:"https://leetcode.com/problems/remove-element/",day:7},
  {id:20,t:"Majority Element",c:"Arrays & Hashing",d:"Easy",lc:"https://leetcode.com/problems/majority-element/",day:8},
  {id:21,t:"Design HashSet",c:"Arrays & Hashing",d:"Easy",lc:"https://leetcode.com/problems/design-hashset/",day:8},
  {id:22,t:"Design HashMap",c:"Arrays & Hashing",d:"Easy",lc:"https://leetcode.com/problems/design-hashmap/",day:8},
  {id:23,t:"Two Sum II Input Array Is Sorted",c:"Two Pointers",d:"Medium",lc:"https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",day:9},
  {id:24,t:"3Sum",c:"Two Pointers",d:"Medium",lc:"https://leetcode.com/problems/3sum/",day:9},
  {id:25,t:"4Sum",c:"Two Pointers",d:"Medium",lc:"https://leetcode.com/problems/4sum/",day:10},
  {id:26,t:"Rotate Array",c:"Two Pointers",d:"Medium",lc:"https://leetcode.com/problems/rotate-array/",day:10},
  {id:27,t:"Container With Most Water",c:"Two Pointers",d:"Medium",lc:"https://leetcode.com/problems/container-with-most-water/",day:10},
  {id:28,t:"Boats to Save People",c:"Two Pointers",d:"Medium",lc:"https://leetcode.com/problems/boats-to-save-people/",day:11},
  {id:29,t:"Trapping Rain Water",c:"Two Pointers",d:"Hard",lc:"https://leetcode.com/problems/trapping-rain-water/",day:11},
  {id:30,t:"Reverse String",c:"Two Pointers",d:"Easy",lc:"https://leetcode.com/problems/reverse-string/",day:12},
  {id:31,t:"Valid Palindrome",c:"Two Pointers",d:"Easy",lc:"https://leetcode.com/problems/valid-palindrome/",day:12},
  {id:32,t:"Valid Palindrome II",c:"Two Pointers",d:"Easy",lc:"https://leetcode.com/problems/valid-palindrome-ii/",day:12},
  {id:33,t:"Merge Strings Alternately",c:"Two Pointers",d:"Easy",lc:"https://leetcode.com/problems/merge-strings-alternately/",day:13},
  {id:34,t:"Merge Sorted Array",c:"Two Pointers",d:"Easy",lc:"https://leetcode.com/problems/merge-sorted-array/",day:13},
  {id:35,t:"Remove Duplicates From Sorted Array",c:"Two Pointers",d:"Easy",lc:"https://leetcode.com/problems/remove-duplicates-from-sorted-array/",day:14},
  {id:36,t:"Longest Substring Without Repeating Characters",c:"Sliding Window",d:"Medium",lc:"https://leetcode.com/problems/longest-substring-without-repeating-characters/",day:14},
  {id:37,t:"Longest Repeating Character Replacement",c:"Sliding Window",d:"Medium",lc:"https://leetcode.com/problems/longest-repeating-character-replacement/",day:14},
  {id:38,t:"Permutation In String",c:"Sliding Window",d:"Medium",lc:"https://leetcode.com/problems/permutation-in-string/",day:15},
  {id:39,t:"Minimum Size Subarray Sum",c:"Sliding Window",d:"Medium",lc:"https://leetcode.com/problems/minimum-size-subarray-sum/",day:15},
  {id:40,t:"Find K Closest Elements",c:"Sliding Window",d:"Medium",lc:"https://leetcode.com/problems/find-k-closest-elements/",day:16},
  {id:41,t:"Minimum Window Substring",c:"Sliding Window",d:"Hard",lc:"https://leetcode.com/problems/minimum-window-substring/",day:16},
  {id:42,t:"Sliding Window Maximum",c:"Sliding Window",d:"Hard",lc:"https://leetcode.com/problems/sliding-window-maximum/",day:16},
  {id:43,t:"Contains Duplicate II",c:"Sliding Window",d:"Easy",lc:"https://leetcode.com/problems/contains-duplicate-ii/",day:17},
  {id:44,t:"Best Time to Buy And Sell Stock",c:"Sliding Window",d:"Easy",lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",day:17},
  {id:45,t:"Min Stack",c:"Stack",d:"Medium",lc:"https://leetcode.com/problems/min-stack/",day:18},
  {id:46,t:"Evaluate Reverse Polish Notation",c:"Stack",d:"Medium",lc:"https://leetcode.com/problems/evaluate-reverse-polish-notation/",day:18},
  {id:47,t:"Generate Parentheses",c:"Stack",d:"Medium",lc:"https://leetcode.com/problems/generate-parentheses/",day:18},
  {id:48,t:"Asteroid Collision",c:"Stack",d:"Medium",lc:"https://leetcode.com/problems/asteroid-collision/",day:19},
  {id:49,t:"Daily Temperatures",c:"Stack",d:"Medium",lc:"https://leetcode.com/problems/daily-temperatures/",day:19},
  {id:50,t:"Online Stock Span",c:"Stack",d:"Medium",lc:"https://leetcode.com/problems/online-stock-span/",day:20},
  {id:51,t:"Car Fleet",c:"Stack",d:"Medium",lc:"https://leetcode.com/problems/car-fleet/",day:20},
  {id:52,t:"Simplify Path",c:"Stack",d:"Medium",lc:"https://leetcode.com/problems/simplify-path/",day:20},
  {id:53,t:"Decode String",c:"Stack",d:"Medium",lc:"https://leetcode.com/problems/decode-string/",day:21},
  {id:54,t:"Maximum Frequency Stack",c:"Stack",d:"Hard",lc:"https://leetcode.com/problems/maximum-frequency-stack/",day:21},
  {id:55,t:"Largest Rectangle In Histogram",c:"Stack",d:"Hard",lc:"https://leetcode.com/problems/largest-rectangle-in-histogram/",day:22},
  {id:56,t:"Baseball Game",c:"Stack",d:"Easy",lc:"https://leetcode.com/problems/baseball-game/",day:22},
  {id:57,t:"Valid Parentheses",c:"Stack",d:"Easy",lc:"https://leetcode.com/problems/valid-parentheses/",day:22},
  {id:58,t:"Implement Stack Using Queues",c:"Stack",d:"Easy",lc:"https://leetcode.com/problems/implement-stack-using-queues/",day:23},
  {id:59,t:"Implement Queue using Stacks",c:"Stack",d:"Easy",lc:"https://leetcode.com/problems/implement-queue-using-stacks",day:23},
  {id:60,t:"Search a 2D Matrix",c:"Binary Search",d:"Medium",lc:"https://leetcode.com/problems/search-a-2d-matrix/",day:24},
  {id:61,t:"Koko Eating Bananas",c:"Binary Search",d:"Medium",lc:"https://leetcode.com/problems/koko-eating-bananas/",day:24},
  {id:62,t:"Capacity to Ship Packages Within D Days",c:"Binary Search",d:"Medium",lc:"https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",day:24},
  {id:63,t:"Find Minimum In Rotated Sorted Array",c:"Binary Search",d:"Medium",lc:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",day:25},
  {id:64,t:"Search In Rotated Sorted Array",c:"Binary Search",d:"Medium",lc:"https://leetcode.com/problems/search-in-rotated-sorted-array/",day:25},
  {id:65,t:"Search In Rotated Sorted Array II",c:"Binary Search",d:"Medium",lc:"https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",day:26},
  {id:66,t:"Time Based Key Value Store",c:"Binary Search",d:"Medium",lc:"https://leetcode.com/problems/time-based-key-value-store/",day:26},
  {id:67,t:"Split Array Largest Sum",c:"Binary Search",d:"Hard",lc:"https://leetcode.com/problems/split-array-largest-sum/",day:27},
  {id:68,t:"Median of Two Sorted Arrays",c:"Binary Search",d:"Hard",lc:"https://leetcode.com/problems/median-of-two-sorted-arrays/",day:27},
  {id:69,t:"Find in Mountain Array",c:"Binary Search",d:"Hard",lc:"https://leetcode.com/problems/find-in-mountain-array",day:27},
  {id:70,t:"Binary Search",c:"Binary Search",d:"Easy",lc:"https://leetcode.com/problems/binary-search/",day:28},
  {id:71,t:"Search Insert Position",c:"Binary Search",d:"Easy",lc:"https://leetcode.com/problems/search-insert-position/",day:28},
  {id:72,t:"Guess Number Higher Or Lower",c:"Binary Search",d:"Easy",lc:"https://leetcode.com/problems/guess-number-higher-or-lower/",day:29},
  {id:73,t:"Sqrt(x)",c:"Binary Search",d:"Easy",lc:"https://leetcode.com/problems/sqrtx/",day:29},
  {id:74,t:"Reorder List",c:"Linked List",d:"Medium",lc:"https://leetcode.com/problems/reorder-list/",day:29},
  {id:75,t:"Remove Nth Node From End of List",c:"Linked List",d:"Medium",lc:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/",day:30},
  {id:76,t:"Copy List With Random Pointer",c:"Linked List",d:"Medium",lc:"https://leetcode.com/problems/copy-list-with-random-pointer/",day:30},
  {id:77,t:"Add Two Numbers",c:"Linked List",d:"Medium",lc:"https://leetcode.com/problems/add-two-numbers/",day:31},
  {id:78,t:"Find The Duplicate Number",c:"Linked List",d:"Medium",lc:"https://leetcode.com/problems/find-the-duplicate-number/",day:31},
  {id:79,t:"Reverse Linked List II",c:"Linked List",d:"Medium",lc:"https://leetcode.com/problems/reverse-linked-list-ii/",day:31},
  {id:80,t:"Design Circular Queue",c:"Linked List",d:"Medium",lc:"https://leetcode.com/problems/design-circular-queue/",day:32},
  {id:81,t:"LRU Cache",c:"Linked List",d:"Medium",lc:"https://leetcode.com/problems/lru-cache/",day:32},
  {id:82,t:"LFU Cache",c:"Linked List",d:"Hard",lc:"https://leetcode.com/problems/lfu-cache/",day:33},
  {id:83,t:"Merge K Sorted Lists",c:"Linked List",d:"Hard",lc:"https://leetcode.com/problems/merge-k-sorted-lists/",day:33},
  {id:84,t:"Reverse Nodes In K Group",c:"Linked List",d:"Hard",lc:"https://leetcode.com/problems/reverse-nodes-in-k-group/",day:33},
  {id:85,t:"Reverse Linked List",c:"Linked List",d:"Easy",lc:"https://leetcode.com/problems/reverse-linked-list/",day:34},
  {id:86,t:"Merge Two Sorted Lists",c:"Linked List",d:"Easy",lc:"https://leetcode.com/problems/merge-two-sorted-lists/",day:34},
  {id:87,t:"Linked List Cycle",c:"Linked List",d:"Easy",lc:"https://leetcode.com/problems/linked-list-cycle/",day:35},
  {id:88,t:"Lowest Common Ancestor of a Binary Search Tree",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",day:35},
  {id:89,t:"Insert into a Binary Search Tree",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/insert-into-a-binary-search-tree/",day:35},
  {id:90,t:"Delete Node in a BST",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/delete-node-in-a-bst/",day:36},
  {id:91,t:"Binary Tree Level Order Traversal",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/binary-tree-level-order-traversal/",day:36},
  {id:92,t:"Binary Tree Right Side View",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/binary-tree-right-side-view/",day:37},
  {id:93,t:"Construct Quad Tree",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/construct-quad-tree/",day:37},
  {id:94,t:"Count Good Nodes In Binary Tree",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/count-good-nodes-in-binary-tree/",day:37},
  {id:95,t:"Validate Binary Search Tree",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/validate-binary-search-tree/",day:38},
  {id:96,t:"Kth Smallest Element In a Bst",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/",day:38},
  {id:97,t:"Construct Binary Tree From Preorder And Inorder Traversal",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",day:39},
  {id:98,t:"House Robber III",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/house-robber-iii/",day:39},
  {id:99,t:"Delete Leaves With a Given Value",c:"Trees",d:"Medium",lc:"https://leetcode.com/problems/delete-leaves-with-a-given-value",day:39},
  {id:100,t:"Binary Tree Maximum Path Sum",c:"Trees",d:"Hard",lc:"https://leetcode.com/problems/binary-tree-maximum-path-sum/",day:40},
  {id:101,t:"Serialize And Deserialize Binary Tree",c:"Trees",d:"Hard",lc:"https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",day:40},
  {id:102,t:"Binary Tree Inorder Traversal",c:"Trees",d:"Easy",lc:"https://leetcode.com/problems/binary-tree-inorder-traversal/",day:41},
  {id:103,t:"Binary Tree Preorder Traversal",c:"Trees",d:"Easy",lc:"https://leetcode.com/problems/binary-tree-preorder-traversal/",day:41},
  {id:104,t:"Binary Tree Postorder Traversal",c:"Trees",d:"Easy",lc:"https://leetcode.com/problems/binary-tree-postorder-traversal/",day:41},
  {id:105,t:"Invert Binary Tree",c:"Trees",d:"Easy",lc:"https://leetcode.com/problems/invert-binary-tree/",day:42},
  {id:106,t:"Maximum Depth of Binary Tree",c:"Trees",d:"Easy",lc:"https://leetcode.com/problems/maximum-depth-of-binary-tree/",day:42},
  {id:107,t:"Diameter of Binary Tree",c:"Trees",d:"Easy",lc:"https://leetcode.com/problems/diameter-of-binary-tree/",day:43},
  {id:108,t:"Balanced Binary Tree",c:"Trees",d:"Easy",lc:"https://leetcode.com/problems/balanced-binary-tree/",day:43},
  {id:109,t:"Same Tree",c:"Trees",d:"Easy",lc:"https://leetcode.com/problems/same-tree/",day:43},
  {id:110,t:"Subtree of Another Tree",c:"Trees",d:"Easy",lc:"https://leetcode.com/problems/subtree-of-another-tree/",day:44},
  {id:111,t:"K Closest Points to Origin",c:"Heap / Priority Queue",d:"Medium",lc:"https://leetcode.com/problems/k-closest-points-to-origin/",day:44},
  {id:112,t:"Kth Largest Element In An Array",c:"Heap / Priority Queue",d:"Medium",lc:"https://leetcode.com/problems/kth-largest-element-in-an-array/",day:45},
  {id:113,t:"Task Scheduler",c:"Heap / Priority Queue",d:"Medium",lc:"https://leetcode.com/problems/task-scheduler/",day:45},
  {id:114,t:"Design Twitter",c:"Heap / Priority Queue",d:"Medium",lc:"https://leetcode.com/problems/design-twitter/",day:45},
  {id:115,t:"Single Threaded CPU",c:"Heap / Priority Queue",d:"Medium",lc:"https://leetcode.com/problems/single-threaded-cpu/",day:46},
  {id:116,t:"Reorganize String",c:"Heap / Priority Queue",d:"Medium",lc:"https://leetcode.com/problems/reorganize-string/",day:46},
  {id:117,t:"Longest Happy String",c:"Heap / Priority Queue",d:"Medium",lc:"https://leetcode.com/problems/longest-happy-string/",day:47},
  {id:118,t:"Car Pooling",c:"Heap / Priority Queue",d:"Medium",lc:"https://leetcode.com/problems/car-pooling/",day:47},
  {id:119,t:"Find Median From Data Stream",c:"Heap / Priority Queue",d:"Hard",lc:"https://leetcode.com/problems/find-median-from-data-stream/",day:47},
  {id:120,t:"IPO",c:"Heap / Priority Queue",d:"Hard",lc:"https://leetcode.com/problems/ipo/",day:48},
  {id:121,t:"Kth Largest Element In a Stream",c:"Heap / Priority Queue",d:"Easy",lc:"https://leetcode.com/problems/kth-largest-element-in-a-stream/",day:48},
  {id:122,t:"Last Stone Weight",c:"Heap / Priority Queue",d:"Easy",lc:"https://leetcode.com/problems/last-stone-weight/",day:49},
  {id:123,t:"Subsets",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/subsets/",day:49},
  {id:124,t:"Combination Sum",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/combination-sum/",day:49},
  {id:125,t:"Combination Sum II",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/combination-sum-ii/",day:50},
  {id:126,t:"Combinations",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/combinations/",day:50},
  {id:127,t:"Permutations",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/permutations/",day:51},
  {id:128,t:"Subsets II",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/subsets-ii/",day:51},
  {id:129,t:"Permutations II",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/permutations-ii/",day:51},
  {id:130,t:"Word Search",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/word-search/",day:52},
  {id:131,t:"Palindrome Partitioning",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/palindrome-partitioning/",day:52},
  {id:132,t:"Letter Combinations of a Phone Number",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/letter-combinations-of-a-phone-number/",day:53},
  {id:133,t:"Matchsticks to Square",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/matchsticks-to-square/",day:53},
  {id:134,t:"Partition to K Equal Sum Subsets",c:"Backtracking",d:"Medium",lc:"https://leetcode.com/problems/partition-to-k-equal-sum-subsets/",day:53},
  {id:135,t:"N Queens",c:"Backtracking",d:"Hard",lc:"https://leetcode.com/problems/n-queens/",day:54},
  {id:136,t:"N Queens II",c:"Backtracking",d:"Hard",lc:"https://leetcode.com/problems/n-queens-ii/",day:54},
  {id:137,t:"Word Break II",c:"Backtracking",d:"Hard",lc:"https://leetcode.com/problems/word-break-ii",day:55},
  {id:138,t:"Sum of All Subsets XOR Total",c:"Backtracking",d:"Easy",lc:"https://leetcode.com/problems/sum-of-all-subset-xor-totals",day:55},
  {id:139,t:"Implement Trie Prefix Tree",c:"Tries",d:"Medium",lc:"https://leetcode.com/problems/implement-trie-prefix-tree/",day:55},
  {id:140,t:"Design Add And Search Words Data Structure",c:"Tries",d:"Medium",lc:"https://leetcode.com/problems/design-add-and-search-words-data-structure/",day:56},
  {id:141,t:"Extra Characters in a String",c:"Tries",d:"Medium",lc:"https://leetcode.com/problems/extra-characters-in-a-string/",day:56},
  {id:142,t:"Word Search II",c:"Tries",d:"Hard",lc:"https://leetcode.com/problems/word-search-ii/",day:57},
  {id:143,t:"Number of Islands",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/number-of-islands/",day:57},
  {id:144,t:"Max Area of Island",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/max-area-of-island/",day:57},
  {id:145,t:"Clone Graph",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/clone-graph/",day:58},
  {id:146,t:"Walls And Gates",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/walls-and-gates/",day:58},
  {id:147,t:"Rotting Oranges",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/rotting-oranges/",day:59},
  {id:148,t:"Pacific Atlantic Water Flow",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/pacific-atlantic-water-flow/",day:59},
  {id:149,t:"Surrounded Regions",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/surrounded-regions/",day:59},
  {id:150,t:"Open The Lock",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/open-the-lock/",day:60},
  {id:151,t:"Course Schedule",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/course-schedule/",day:60},
  {id:152,t:"Course Schedule II",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/course-schedule-ii/",day:61},
  {id:153,t:"Graph Valid Tree",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/graph-valid-tree/",day:61},
  {id:154,t:"Course Schedule IV",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/course-schedule-iv/",day:61},
  {id:155,t:"Number of Connected Components In An Undirected Graph",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",day:62},
  {id:156,t:"Redundant Connection",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/redundant-connection/",day:62},
  {id:157,t:"Accounts Merge",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/accounts-merge/",day:63},
  {id:158,t:"Evaluate Division",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/evaluate-division/",day:63},
  {id:159,t:"Minimum Height Trees",c:"Graphs",d:"Medium",lc:"https://leetcode.com/problems/minimum-height-trees",day:63},
  {id:160,t:"Word Ladder",c:"Graphs",d:"Hard",lc:"https://leetcode.com/problems/word-ladder/",day:64},
  {id:161,t:"Island Perimeter",c:"Graphs",d:"Easy",lc:"https://leetcode.com/problems/island-perimeter/",day:64},
  {id:162,t:"Verifying An Alien Dictionary",c:"Graphs",d:"Easy",lc:"https://leetcode.com/problems/verifying-an-alien-dictionary/",day:65},
  {id:163,t:"Find the Town Judge",c:"Graphs",d:"Easy",lc:"https://leetcode.com/problems/find-the-town-judge",day:65},
  {id:164,t:"Path with Minimum Effort",c:"Advanced Graphs",d:"Medium",lc:"https://leetcode.com/problems/path-with-minimum-effort/",day:65},
  {id:165,t:"Network Delay Time",c:"Advanced Graphs",d:"Medium",lc:"https://leetcode.com/problems/network-delay-time/",day:66},
  {id:166,t:"Min Cost to Connect All Points",c:"Advanced Graphs",d:"Medium",lc:"https://leetcode.com/problems/min-cost-to-connect-all-points/",day:66},
  {id:167,t:"Cheapest Flights Within K Stops",c:"Advanced Graphs",d:"Medium",lc:"https://leetcode.com/problems/cheapest-flights-within-k-stops/",day:67},
  {id:168,t:"Reconstruct Itinerary",c:"Advanced Graphs",d:"Hard",lc:"https://leetcode.com/problems/reconstruct-itinerary/",day:67},
  {id:169,t:"Swim In Rising Water",c:"Advanced Graphs",d:"Hard",lc:"https://leetcode.com/problems/swim-in-rising-water/",day:67},
  {id:170,t:"Alien Dictionary",c:"Advanced Graphs",d:"Hard",lc:"https://leetcode.com/problems/alien-dictionary/",day:68},
  {id:171,t:"Find Critical and Pseudo Critical Edges in Minimum Spanning Tree",c:"Advanced Graphs",d:"Hard",lc:"https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/",day:68},
  {id:172,t:"Build a Matrix With Conditions",c:"Advanced Graphs",d:"Hard",lc:"https://leetcode.com/problems/build-a-matrix-with-conditions",day:69},
  {id:173,t:"Greatest Common Divisor Traversal",c:"Advanced Graphs",d:"Hard",lc:"https://leetcode.com/problems/greatest-common-divisor-traversal",day:69},
  {id:174,t:"House Robber",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/house-robber/",day:69},
  {id:175,t:"House Robber II",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/house-robber-ii/",day:70},
  {id:176,t:"Longest Palindromic Substring",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/longest-palindromic-substring/",day:70},
  {id:177,t:"Palindromic Substrings",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/palindromic-substrings/",day:71},
  {id:178,t:"Decode Ways",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/decode-ways/",day:71},
  {id:179,t:"Coin Change",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/coin-change/",day:71},
  {id:180,t:"Maximum Product Subarray",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/maximum-product-subarray/",day:72},
  {id:181,t:"Word Break",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/word-break/",day:72},
  {id:182,t:"Longest Increasing Subsequence",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/longest-increasing-subsequence/",day:73},
  {id:183,t:"Partition Equal Subset Sum",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/partition-equal-subset-sum/",day:73},
  {id:184,t:"Combination Sum IV",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/combination-sum-iv/",day:73},
  {id:185,t:"Perfect Squares",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/perfect-squares/",day:74},
  {id:186,t:"Integer Break",c:"1-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/integer-break/",day:74},
  {id:187,t:"Stone Game III",c:"1-D Dynamic Programming",d:"Hard",lc:"https://leetcode.com/problems/stone-game-iii/",day:75},
  {id:188,t:"Climbing Stairs",c:"1-D Dynamic Programming",d:"Easy",lc:"https://leetcode.com/problems/climbing-stairs/",day:75},
  {id:189,t:"Min Cost Climbing Stairs",c:"1-D Dynamic Programming",d:"Easy",lc:"https://leetcode.com/problems/min-cost-climbing-stairs/",day:76},
  {id:190,t:"N-th Tribonacci Number",c:"1-D Dynamic Programming",d:"Easy",lc:"https://leetcode.com/problems/n-th-tribonacci-number/",day:76},
  {id:191,t:"Unique Paths",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/unique-paths/",day:76},
  {id:192,t:"Unique Paths II",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/unique-paths-ii/",day:77},
  {id:193,t:"Minimum Path Sum",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/minimum-path-sum/",day:77},
  {id:194,t:"Longest Common Subsequence",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/longest-common-subsequence/",day:78},
  {id:195,t:"Last Stone Weight II",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/last-stone-weight-ii/",day:78},
  {id:196,t:"Best Time to Buy And Sell Stock With Cooldown",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",day:78},
  {id:197,t:"Coin Change II",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/coin-change-ii/",day:79},
  {id:198,t:"Target Sum",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/target-sum/",day:79},
  {id:199,t:"Interleaving String",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/interleaving-string/",day:80},
  {id:200,t:"Stone Game",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/stone-game/",day:80},
  {id:201,t:"Stone Game II",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/stone-game-ii/",day:80},
  {id:202,t:"Edit Distance",c:"2-D Dynamic Programming",d:"Medium",lc:"https://leetcode.com/problems/edit-distance/",day:81},
  {id:203,t:"Longest Increasing Path In a Matrix",c:"2-D Dynamic Programming",d:"Hard",lc:"https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",day:81},
  {id:204,t:"Distinct Subsequences",c:"2-D Dynamic Programming",d:"Hard",lc:"https://leetcode.com/problems/distinct-subsequences/",day:82},
  {id:205,t:"Burst Balloons",c:"2-D Dynamic Programming",d:"Hard",lc:"https://leetcode.com/problems/burst-balloons/",day:82},
  {id:206,t:"Regular Expression Matching",c:"2-D Dynamic Programming",d:"Hard",lc:"https://leetcode.com/problems/regular-expression-matching/",day:82},
  {id:207,t:"Maximum Subarray",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/maximum-subarray/",day:83},
  {id:208,t:"Maximum Sum Circular Subarray",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/maximum-sum-circular-subarray/",day:83},
  {id:209,t:"Longest Turbulent Subarray",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/longest-turbulent-subarray/",day:84},
  {id:210,t:"Jump Game",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/jump-game/",day:84},
  {id:211,t:"Jump Game II",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/jump-game-ii/",day:84},
  {id:212,t:"Jump Game VII",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/jump-game-vii/",day:85},
  {id:213,t:"Gas Station",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/gas-station/",day:85},
  {id:214,t:"Hand of Straights",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/hand-of-straights/",day:86},
  {id:215,t:"Dota2 Senate",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/dota2-senate/",day:86},
  {id:216,t:"Merge Triplets to Form Target Triplet",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/merge-triplets-to-form-target-triplet/",day:86},
  {id:217,t:"Partition Labels",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/partition-labels/",day:87},
  {id:218,t:"Valid Parenthesis String",c:"Greedy",d:"Medium",lc:"https://leetcode.com/problems/valid-parenthesis-string/",day:87},
  {id:219,t:"Candy",c:"Greedy",d:"Hard",lc:"https://leetcode.com/problems/candy/",day:88},
  {id:220,t:"Lemonade Change",c:"Greedy",d:"Easy",lc:"https://leetcode.com/problems/lemonade-change/",day:88},
  {id:221,t:"Insert Interval",c:"Intervals",d:"Medium",lc:"https://leetcode.com/problems/insert-interval/",day:88},
  {id:222,t:"Merge Intervals",c:"Intervals",d:"Medium",lc:"https://leetcode.com/problems/merge-intervals/",day:89},
  {id:223,t:"Non Overlapping Intervals",c:"Intervals",d:"Medium",lc:"https://leetcode.com/problems/non-overlapping-intervals/",day:89},
  {id:224,t:"Meeting Rooms II",c:"Intervals",d:"Medium",lc:"https://leetcode.com/problems/meeting-rooms-ii/",day:90},
  {id:225,t:"Meeting Rooms III",c:"Intervals",d:"Hard",lc:"https://leetcode.com/problems/meeting-rooms-iii",day:90},
  {id:226,t:"Minimum Interval to Include Each Query",c:"Intervals",d:"Hard",lc:"https://leetcode.com/problems/minimum-interval-to-include-each-query/",day:90},
  {id:227,t:"Meeting Rooms",c:"Intervals",d:"Easy",lc:"https://leetcode.com/problems/meeting-rooms/",day:91},
  {id:228,t:"Insert Greatest Common Divisors in Linked List",c:"Math & Geometry",d:"Medium",lc:"https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/",day:91},
  {id:229,t:"Rotate Image",c:"Math & Geometry",d:"Medium",lc:"https://leetcode.com/problems/rotate-image/",day:92},
  {id:230,t:"Spiral Matrix",c:"Math & Geometry",d:"Medium",lc:"https://leetcode.com/problems/spiral-matrix/",day:92},
  {id:231,t:"Set Matrix Zeroes",c:"Math & Geometry",d:"Medium",lc:"https://leetcode.com/problems/set-matrix-zeroes/",day:92},
  {id:232,t:"Pow(x, n)",c:"Math & Geometry",d:"Medium",lc:"https://leetcode.com/problems/powx-n/",day:93},
  {id:233,t:"Multiply Strings",c:"Math & Geometry",d:"Medium",lc:"https://leetcode.com/problems/multiply-strings/",day:93},
  {id:234,t:"Detect Squares",c:"Math & Geometry",d:"Medium",lc:"https://leetcode.com/problems/detect-squares/",day:94},
  {id:235,t:"Excel Sheet Column Title",c:"Math & Geometry",d:"Easy",lc:"https://leetcode.com/problems/excel-sheet-column-title/",day:94},
  {id:236,t:"Greatest Common Divisor of Strings",c:"Math & Geometry",d:"Easy",lc:"https://leetcode.com/problems/greatest-common-divisor-of-strings/",day:94},
  {id:237,t:"Transpose Matrix",c:"Math & Geometry",d:"Easy",lc:"https://leetcode.com/problems/transpose-matrix",day:95},
  {id:238,t:"Happy Number",c:"Math & Geometry",d:"Easy",lc:"https://leetcode.com/problems/happy-number/",day:95},
  {id:239,t:"Plus One",c:"Math & Geometry",d:"Easy",lc:"https://leetcode.com/problems/plus-one/",day:96},
  {id:240,t:"Roman to Integer",c:"Math & Geometry",d:"Easy",lc:"https://leetcode.com/problems/roman-to-integer/",day:96},
  {id:241,t:"Sum of Two Integers",c:"Bit Manipulation",d:"Medium",lc:"https://leetcode.com/problems/sum-of-two-integers/",day:96},
  {id:242,t:"Reverse Integer",c:"Bit Manipulation",d:"Medium",lc:"https://leetcode.com/problems/reverse-integer/",day:97},
  {id:243,t:"Bitwise AND of Numbers Range",c:"Bit Manipulation",d:"Medium",lc:"https://leetcode.com/problems/bitwise-and-of-numbers-range",day:97},
  {id:244,t:"Minimum Array End",c:"Bit Manipulation",d:"Medium",lc:"https://leetcode.com/problems/minimum-array-end/",day:98},
  {id:245,t:"Single Number",c:"Bit Manipulation",d:"Easy",lc:"https://leetcode.com/problems/single-number/",day:98},
  {id:246,t:"Number of 1 Bits",c:"Bit Manipulation",d:"Easy",lc:"https://leetcode.com/problems/number-of-1-bits/",day:98},
  {id:247,t:"Counting Bits",c:"Bit Manipulation",d:"Easy",lc:"https://leetcode.com/problems/counting-bits/",day:99},
  {id:248,t:"Add Binary",c:"Bit Manipulation",d:"Easy",lc:"https://leetcode.com/problems/add-binary/",day:99},
  {id:249,t:"Reverse Bits",c:"Bit Manipulation",d:"Easy",lc:"https://leetcode.com/problems/reverse-bits/",day:100},
  {id:250,t:"Missing Number",c:"Bit Manipulation",d:"Easy",lc:"https://leetcode.com/problems/missing-number/",day:100},];

// ─── Constants ────────────────────────────────────────────────────────────────
const START        = "2026-05-22";
const SR_OFFSETS   = [1, 3, 7, 14, 30];
const SR_LABELS    = ["Next Day", "+3 Days", "+1 Week", "+2 Weeks", "+1 Month"];
// Gaps between consecutive reviews (used to compute adaptive next-due)
const SR_GAPS      = [2, 4, 7, 16]; // days after review i until review i+1 (base)
const EASE_MULT    = { hard: 0.5, ok: 1, easy: 2 };
const EASE_COLOR   = { hard: "#ef4444", ok: "#fbbf24", easy: "#22c55e" };
const CATEGORIES   = [...new Set(PROBLEMS.map(p => p.c))];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const addDays = (s, n) => {
  const d = new Date(s + "T12:00:00");
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};

// Pre-compute scheduled date for each problem
const SCHEDULED = PROBLEMS.map(p => ({ ...p, sched: addDays(START, p.day) }));

// Seeded RNG (consistent per day so random picks don't change mid-day)
function mkRng(dateStr) {
  let s = [...dateStr].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 1) >>> 0;
  return () => { s = (Math.imul(s, 747796405) + 2891336453) >>> 0; return s / 4294967296; };
}

// ─── ICS Calendar Export ──────────────────────────────────────────────────────
function generateICS(probs, randDone) {
  const td = localToday();
  let ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NeetCode 250 Study Tracker//EN",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:NeetCode 250 Study Plan",
    "X-WR-CALDESC:All 250 NeetCode problems scheduled May 22 – Aug 31 2026",
    "X-APPLE-CALENDAR-COLOR:#4d9de0",
  ].join("\r\n") + "\r\n";

  // 1) New problem events (all 250)
  SCHEDULED.forEach(p => {
    const done     = !!probs[p.id];
    const dateStr  = p.sched.replace(/-/g, "");
    const nextDay  = addDays(p.sched, 1).replace(/-/g, "");
    const diffIcon = p.d === "Easy" ? "🟢" : p.d === "Medium" ? "🟡" : "🔴";
    const summary  = (done ? "✅ " : "📚 ") + `#${p.id} ${p.t} [${p.d}]`;
    const desc     = `Category: ${p.c}\\nDifficulty: ${p.d}\\nStatus: ${done ? "Completed" : "Pending"}\\nLeetCode: ${p.lc}`;
    ics += [
      "BEGIN:VEVENT",
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${nextDay}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${desc}`,
      `UID:nc250-new-${p.id}@tracker`,
      `STATUS:${done ? "CONFIRMED" : "TENTATIVE"}`,
      `CATEGORIES:NeetCode,${p.c},${p.d}`,
      "END:VEVENT",
    ].join("\r\n") + "\r\n";
  });

  // 2) Spaced repetition review events (for learned problems)
  SCHEDULED.forEach(p => {
    if (!probs[p.id]) return;
    probs[p.id].rev.forEach((r, i) => {
      const done    = !!r.done;
      const dateStr = r.due.replace(/-/g, "");
      const nextDay = addDays(r.due, 1).replace(/-/g, "");
      const summary = (done ? "✅ " : "🔁 ") + `REVIEW #${p.id} ${p.t} (${SR_LABELS[i]})`;
      const desc    = `Spaced repetition review\\nInterval: ${SR_LABELS[i]}\\nProblem: ${p.t}\\nLeetCode: ${p.lc}`;
      ics += [
        "BEGIN:VEVENT",
        `DTSTART;VALUE=DATE:${dateStr}`,
        `DTEND;VALUE=DATE:${nextDay}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${desc}`,
        `UID:nc250-rev-${p.id}-${i}@tracker`,
        `STATUS:${done ? "CONFIRMED" : "TENTATIVE"}`,
        `CATEGORIES:NeetCode,Review`,
        "END:VEVENT",
      ].join("\r\n") + "\r\n";
    });
  });

  ics += "END:VCALENDAR";
  return ics;
}

function downloadICS(content) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "neetcode250-study-plan.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  bg: "#07111e", panel: "#0b1829", card: "#0f1f30", border: "#1a3048",
  txt: "#c8d8e8", muted: "#4a6880", accent: "#4d9de0",
};
const DIFF_S = {
  Easy:   { bg:"#0a1e12", fg:"#4ade80", bd:"#153a1e" },
  Medium: { bg:"#201400", fg:"#fbbf24", bd:"#3d2800" },
  Hard:   { bg:"#1c0808", fg:"#f87171", bd:"#3d1010" },
};
const CAT_C = {
  "Arrays & Hashing":"#6366f1","Two Pointers":"#8b5cf6","Sliding Window":"#a78bfa",
  "Stack":"#f43f5e","Binary Search":"#e11d48","Linked List":"#f97316",
  "Trees":"#22c55e","Heap / Priority Queue":"#06b6d4","Backtracking":"#c026d3",
  "Tries":"#14b8a6","Graphs":"#3b82f6","Advanced Graphs":"#1d4ed8",
  "1-D Dynamic Programming":"#eab308","2-D Dynamic Programming":"#ca8a04",
  "Greedy":"#ef4444","Intervals":"#9333ea","Math & Geometry":"#0ea5e9",
  "Bit Manipulation":"#10b981",
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function NeetCode250() {
  const [db,      setDb]      = useState(null);
  const [tab,     setTab]     = useState("today");
  const [q,       setQ]       = useState("");
  const [catF,    setCatF]    = useState("All");
  const [diffF,   setDiffF]   = useState("All");
  const [saving,  setSaving]  = useState(false);
  const [flash,   setFlash]   = useState(null);
  const [icsMsg,  setIcsMsg]  = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/progress");
        setDb(await res.json());
      } catch { setDb({ p:{}, r:{} }); }
    })();
  }, []);

  const persist = async (nd) => {
    setDb(nd); setSaving(true);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nd),
      });
    } catch(e) { console.error(e); }
    setSaving(false);
  };

  const markLearn = async (id) => {
    const td = localToday();
    await persist({ ...db, p: { ...db.p, [id]: {
      on: td, rev: SR_OFFSETS.map((n,i) => ({ due: addDays(td,n), lbl: SR_LABELS[i], done: null }))
    }}});
    setFlash(id); setTimeout(() => setFlash(null), 700);
  };

  const markSR = async (id, i, ease) => {
    const prob = db.p[id];
    const td   = localToday();
    const rev  = prob.rev.map((r, j) => {
      if (j === i) return { ...r, done: td, ease };
      if (j === i + 1 && SR_GAPS[i] !== undefined) {
        const gap = Math.max(1, Math.round(SR_GAPS[i] * EASE_MULT[ease]));
        return { ...r, due: addDays(td, gap) };
      }
      return r;
    });
    await persist({ ...db, p: { ...db.p, [id]: { ...prob, rev } } });
    setFlash(id); setTimeout(() => setFlash(null), 700);
  };

  const markRand = async (id) => {
    const td = localToday();
    const r  = { ...(db.r||{}), [td]: [...new Set([...(db.r?.[td]||[]), id])] };
    await persist({ ...db, r });
    setFlash(id); setTimeout(() => setFlash(null), 700);
  };

  const resetP = async (id) => {
    const p = { ...db.p }; delete p[id];
    await persist({ ...db, p });
  };

  const exportCalendar = () => {
    const ics = generateICS(db.p, db.r || {});
    downloadICS(ics);
    setIcsMsg("✓ Downloaded! Open the .ics file → Apple Calendar will import it.");
    setTimeout(() => setIcsMsg(""), 5000);
  };

  // ── Guard ──
  if (!db) return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",
      height:"100vh", background:T.bg, color:T.txt,
      fontFamily:"'SF Mono','Fira Code',monospace", fontSize:14 }}>
      Loading…
    </div>
  );

  // ── Derived ──
  const td      = localToday();
  const probs   = db.p;
  const randDone = db.r || {};
  const dayNum  = Math.round((new Date(td+"T12:00:00") - new Date(START+"T12:00:00")) / 86400000);

  const newToday   = SCHEDULED.filter(x => x.sched === td && !probs[x.id]);
  const overdueNew = SCHEDULED.filter(x => x.sched  < td && !probs[x.id]);

  const srDue = [];
  SCHEDULED.forEach(x => {
    if (!probs[x.id]) return;
    probs[x.id].rev.forEach((r,i) => {
      if (r.due <= td && !r.done)
        srDue.push({ prob:x, idx:i, overdue: r.due<td, lbl: r.lbl });
    });
  });

  const srIds     = new Set(srDue.map(s => s.prob.id));
  const learned   = SCHEDULED.filter(x => probs[x.id] && !srIds.has(x.id));
  const rng       = mkRng(td);
  const randPicks = [...learned].sort(() => rng() - 0.5).slice(0, 2);
  const todayRand = randDone[td] || [];

  const totalLearned  = Object.keys(probs).length;
  const totalRevDone  = Object.values(probs).reduce((a,v) => a + v.rev.filter(r=>r.done).length, 0);
  const pct           = Math.round(totalLearned / 250 * 100);
  const todayPending  = newToday.length + srDue.length + randPicks.filter(p => !todayRand.includes(p.id)).length;

  const filtered = SCHEDULED.filter(x => {
    if (q    && !x.t.toLowerCase().includes(q.toLowerCase())) return false;
    if (catF !== "All" && x.c !== catF)  return false;
    if (diffF!== "All" && x.d !== diffF) return false;
    return true;
  });

  // ── Styles ──
  const tabBtn = (active) => ({
    background: active ? "#112236" : "transparent",
    color:  active ? T.accent : T.muted,
    border: `1px solid ${active ? T.accent+"66" : T.border}`,
    borderRadius: 6, padding: "7px 14px",
    cursor:"pointer", fontSize:12, fontWeight: active ? 700 : 400,
    fontFamily:"inherit", letterSpacing: 0.5,
  });

  // ── ProbCard component ──
  const ProbCard = ({ prob, type, idx, lbl, overdue }) => {
    const pData   = probs[prob.id];
    const cc      = CAT_C[prob.c] || "#888";
    const ds      = DIFF_S[prob.d];
    const isFlash = flash === prob.id;
    const isDone  = type==="new"    ? !!pData
                  : type==="sr"     ? !!(pData?.rev[idx]?.done)
                  : todayRand.includes(prob.id);

    return (
      <div style={{
        background:   isFlash ? "#0a2418" : isDone ? "#0a160a" : T.card,
        border:       `1px solid ${isDone ? "#1a3a1a" : T.border}`,
        borderLeft:   `3px solid ${isDone ? "#22c55e66" : cc}`,
        borderRadius: 10, padding:"11px 14px", marginBottom:7,
        opacity: isDone ? 0.55 : 1, transition:"all 0.25s",
      }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
              <span style={{ color:T.muted, fontSize:10, fontFamily:"monospace", minWidth:24 }}>
                #{String(prob.id).padStart(3,"0")}
              </span>
              <span style={{ color: isDone ? "#4ade80" : T.txt, fontWeight:600, fontSize:13 }}>
                {prob.t}
              </span>
              {isDone && <span style={{ color:"#22c55e", fontSize:12 }}>✓</span>}
              {overdue && <span style={{ background:"#2a0a00", color:"#fb923c",
                border:"1px solid #7c2d12", fontSize:9, padding:"1px 5px", borderRadius:3 }}>OVERDUE</span>}
            </div>
            <div style={{ display:"flex", gap:5, marginTop:5, flexWrap:"wrap", alignItems:"center" }}>
              <span style={{ background:ds.bg, color:ds.fg, border:`1px solid ${ds.bd}`,
                fontSize:9, padding:"1px 6px", borderRadius:20, fontWeight:700 }}>{prob.d}</span>
              <span style={{ background:cc+"15", color:cc, border:`1px solid ${cc}30`,
                fontSize:9, padding:"1px 6px", borderRadius:20 }}>{prob.c}</span>
              {lbl && <span style={{ background:"#100d28", color:"#a5b4fc",
                border:"1px solid #2a2460", fontSize:9, padding:"1px 5px", borderRadius:20 }}>↻ {lbl}</span>}
              {type==="random" && <span style={{ background:"#041414", color:"#5eead4",
                border:"1px solid #0a3030", fontSize:9, padding:"1px 5px", borderRadius:20 }}>🎲 random</span>}
            </div>
          </div>
          <div style={{ display:"flex", gap:5, alignItems:"center", flexShrink:0 }}>
            {!isDone && type==="new"    && <button onClick={() => markLearn(prob.id)} style={{ background:"#14532d", color:"#4ade80", border:"1px solid #166534", borderRadius:7, padding:"5px 11px", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"inherit" }}>✓ Done</button>}
            {!isDone && type==="sr" && (
              <>
                {[["hard","🔴","#3a0a0a","#ef4444","#7f1d1d"],
                  ["ok",  "🟡","#2a1f00","#fbbf24","#78350f"],
                  ["easy","🟢","#052010","#4ade80","#14532d"]].map(([ease,ico,bg,fg,bd]) => (
                  <button key={ease} onClick={() => markSR(prob.id, idx, ease)}
                    style={{ background:bg, color:fg, border:`1px solid ${bd}`,
                      borderRadius:7, padding:"5px 9px", cursor:"pointer",
                      fontSize:11, fontWeight:700, fontFamily:"inherit" }}>
                    {ico} {ease.charAt(0).toUpperCase()+ease.slice(1)}
                  </button>
                ))}
              </>
            )}
            {!isDone && type==="random" && <button onClick={() => markRand(prob.id)} style={{ background:"#062020", color:"#5eead4", border:"1px solid #0e4040", borderRadius:7, padding:"5px 11px", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"inherit" }}>✓ Revised</button>}
            <a href={prob.lc} target="_blank" rel="noopener noreferrer"
               style={{ color:T.muted, border:`1px solid ${T.border}`, borderRadius:7,
                 padding:"5px 8px", fontSize:10, textDecoration:"none" }}>LC↗</a>
          </div>
        </div>
        {pData && (
          <div style={{ display:"flex", gap:3, marginTop:7 }}>
            {pData.rev.map((r,i) => (
              <div key={i} title={SR_LABELS[i]+(r.done ? ` ✓ (${r.ease||"ok"})` : " due "+r.due)}
                style={{ flex:1, height:3, borderRadius:1,
                  background: r.done ? (EASE_COLOR[r.ease]||"#22c55e") : r.due<=td ? "#fbbf24" : T.border }} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── Render ──
  return (
    <div style={{ background:T.bg, minHeight:"100vh", color:T.txt,
      fontFamily:"'SF Mono','Fira Code','Courier New',monospace", fontSize:13 }}>

      {/* ══ Header ══ */}
      <div style={{ background:T.panel, borderBottom:`1px solid ${T.border}`,
        padding:"13px 20px", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <div>
              <div style={{ fontWeight:800, fontSize:15, color:T.accent, letterSpacing:2 }}>
                ◈ NEETCODE 250
              </div>
              <div style={{ color:T.muted, fontSize:10, marginTop:2, letterSpacing:1 }}>
                DAY {Math.max(1,dayNum+1)} / 101 &nbsp;·&nbsp; MAY 22 → AUG 31 2026
                {saving && <span style={{ color:"#fbbf24", marginLeft:8 }}>↑ SAVING</span>}
              </div>
            </div>
            <div style={{ display:"flex", gap:16, alignItems:"center" }}>
              {[
                { v:totalLearned, l:"SOLVED",   c:"#22c55e" },
                { v:srDue.length, l:"DUE",       c:"#fbbf24" },
                { v:totalRevDone, l:"REVIEWS",   c:"#4d9de0" },
                { v:pct+"%",      l:"COMPLETE",  c:"#a78bfa" },
              ].map(s => (
                <div key={s.l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:17, fontWeight:800, color:s.c, lineHeight:1 }}>{s.v}</div>
                  <div style={{ fontSize:8, color:T.muted, marginTop:2, letterSpacing:1 }}>{s.l}</div>
                </div>
              ))}
              {/* Apple Calendar Export */}
              <button onClick={exportCalendar} style={{
                background:"#062020", color:"#5eead4", border:"1px solid #0e4040",
                borderRadius:7, padding:"6px 12px", cursor:"pointer",
                fontSize:11, fontFamily:"inherit", whiteSpace:"nowrap"
              }}>📅 Apple Cal</button>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ height:3, background:T.border, borderRadius:2, marginTop:10 }}>
            <div style={{ width:`${pct}%`, height:"100%", borderRadius:2,
              background:"linear-gradient(90deg,#4d9de0,#a78bfa)", transition:"width 0.5s" }} />
          </div>
          {icsMsg && (
            <div style={{ marginTop:8, background:"#062020", color:"#5eead4",
              border:"1px solid #0e4040", borderRadius:6, padding:"7px 12px", fontSize:11 }}>
              {icsMsg}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"16px 16px 80px" }}>

        {/* ══ Tabs ══ */}
        <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap" }}>
          <button style={tabBtn(tab==="today")} onClick={() => setTab("today")}>
            TODAY {todayPending>0 && <span style={{ background:"#ef4444", color:"#fff",
              borderRadius:20, padding:"0 5px", fontSize:9, marginLeft:4 }}>{todayPending}</span>}
          </button>
          <button style={tabBtn(tab==="probs")}  onClick={() => setTab("probs")}>ALL 250</button>
          <button style={tabBtn(tab==="stats")}  onClick={() => setTab("stats")}>PROGRESS</button>
          <button style={tabBtn(tab==="plan")}   onClick={() => setTab("plan")}>SCHEDULE</button>
        </div>

        {/* ════════════ TODAY ════════════ */}
        {tab==="today" && (
          <div>
            <div style={{ color:T.muted, fontSize:10, marginBottom:14, letterSpacing:1 }}>
              {new Date(td+"T12:00:00").toLocaleDateString("en-US",
                {weekday:"long",month:"long",day:"numeric",year:"numeric"}).toUpperCase()}
            </div>

            {overdueNew.length > 0 && (
              <div style={{ background:"#1a0800", border:"1px solid #7c2d12",
                borderRadius:8, padding:"10px 14px", marginBottom:14 }}>
                <span style={{ color:"#fb923c", fontWeight:700 }}>
                  ⚠ {overdueNew.length} OVERDUE PROBLEM{overdueNew.length>1?"S":""}
                </span>
                <span style={{ color:"#78350f", fontSize:10, marginLeft:8 }}>
                  — catch up anytime in the ALL 250 tab
                </span>
              </div>
            )}

            {/* New problems */}
            {newToday.length > 0 ? (
              <section style={{ marginBottom:22 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <span style={{ color:"#22c55e", fontWeight:800, fontSize:11, letterSpacing:1 }}>◆ NEW TODAY</span>
                  <span style={{ background:"#0a1e12", color:"#4ade80",
                    border:"1px solid #153a1e", borderRadius:20, padding:"0 7px", fontSize:10 }}>
                    {newToday.length} problem{newToday.length>1?"s":""}
                  </span>
                </div>
                {newToday.map(p => <ProbCard key={p.id} prob={p} type="new" />)}
              </section>
            ) : (
              <div style={{ background:T.card, border:`1px solid ${T.border}`,
                borderRadius:8, padding:"10px 14px", marginBottom:18, color:T.muted, fontSize:11 }}>
                ✓ No new problems scheduled today
              </div>
            )}

            {/* SR Reviews */}
            {srDue.length > 0 && (
              <section style={{ marginBottom:22 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <span style={{ color:"#4d9de0", fontWeight:800, fontSize:11, letterSpacing:1 }}>↺ SPACED REPETITION</span>
                  <span style={{ background:"#061830", color:"#4d9de0",
                    border:"1px solid #1a3a5c", borderRadius:20, padding:"0 7px", fontSize:10 }}>{srDue.length}</span>
                  <span style={{ color:T.muted, fontSize:9 }}>+1d → +3d → +1w → +2w → +1mo</span>
                </div>
                {srDue.map(({prob,idx,overdue,lbl}) => (
                  <ProbCard key={`${prob.id}-${idx}`} prob={prob} type="sr" idx={idx} overdue={overdue} lbl={lbl} />
                ))}
              </section>
            )}

            {/* Random revisions */}
            {randPicks.length > 0 && (
              <section style={{ marginBottom:22 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <span style={{ color:"#14b8a6", fontWeight:800, fontSize:11, letterSpacing:1 }}>🎲 RANDOM REVISIONS</span>
                  <span style={{ background:"#041414", color:"#5eead4",
                    border:"1px solid #0a3030", borderRadius:20, padding:"0 7px", fontSize:10 }}>2 / day</span>
                  <span style={{ color:T.muted, fontSize:9 }}>seeded daily · keeps old problems alive</span>
                </div>
                {randPicks.map(p => <ProbCard key={`r-${p.id}`} prob={p} type="random" />)}
              </section>
            )}

            {todayPending===0 && totalLearned===0 && (
              <div style={{ textAlign:"center", padding:"50px 20px" }}>
                <div style={{ fontSize:32, marginBottom:10, color:T.accent }}>◈</div>
                <div style={{ fontSize:15, fontWeight:700 }}>Day 1 — start with today's problems above</div>
                <div style={{ color:T.muted, fontSize:11, marginTop:6 }}>
                  2–3 new Medium/Hard problems per day, spaced-repetition reviews built in
                </div>
              </div>
            )}
            {todayPending===0 && totalLearned>0 && (
              <div style={{ textAlign:"center", padding:"50px 20px" }}>
                <div style={{ fontSize:28, marginBottom:10 }}>✓</div>
                <div style={{ color:"#4ade80", fontWeight:700 }}>All done for today!</div>
                <div style={{ color:T.muted, fontSize:11, marginTop:6 }}>
                  {totalLearned}/250 solved · {totalRevDone} total revisions
                </div>
              </div>
            )}

            {/* System note */}
            <div style={{ background:T.panel, border:`1px solid ${T.border}`,
              borderRadius:8, padding:"10px 14px", marginTop:4 }}>
              <div style={{ color:T.muted, fontSize:10, lineHeight:1.7 }}>
                <span style={{ color:T.txt, fontWeight:700 }}>REVISION SYSTEM: </span>
                Learn → +1d → +3d → +1w → +2w → +1mo = <span style={{ color:"#4ade80" }}>5 SR reviews</span>
                &nbsp;+&nbsp;<span style={{ color:"#5eead4" }}>2 daily randoms</span>
                &nbsp;=&nbsp;<span style={{ color:"#a78bfa" }}>7+ touches per problem minimum</span>
                &nbsp;·&nbsp; Export to <span style={{ color:"#4d9de0" }}>Apple Calendar</span> for full schedule sync
              </div>
            </div>
          </div>
        )}

        {/* ════════════ ALL 250 ════════════ */}
        {tab==="probs" && (
          <div>
            <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
              <input placeholder="🔍 search..." value={q} onChange={e=>setQ(e.target.value)}
                style={{ flex:1, minWidth:140, background:T.card, border:`1px solid ${T.border}`,
                  color:T.txt, borderRadius:7, padding:"7px 11px", fontSize:12,
                  outline:"none", fontFamily:"inherit" }} />
              <select value={catF} onChange={e=>setCatF(e.target.value)}
                style={{ background:T.card, border:`1px solid ${T.border}`, color:T.txt,
                  borderRadius:7, padding:"7px 9px", fontSize:11, outline:"none", fontFamily:"inherit" }}>
                <option value="All">all categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={diffF} onChange={e=>setDiffF(e.target.value)}
                style={{ background:T.card, border:`1px solid ${T.border}`, color:T.txt,
                  borderRadius:7, padding:"7px 9px", fontSize:11, outline:"none", fontFamily:"inherit" }}>
                <option value="All">all difficulties</option>
                <option>Medium</option><option>Hard</option><option>Easy</option>
              </select>
            </div>
            <div style={{ color:T.muted, fontSize:10, marginBottom:10, letterSpacing:1 }}>
              {filtered.length} PROBLEMS · {totalLearned} SOLVED
            </div>

            {filtered.map(p => {
              const pData  = probs[p.id];
              const cc     = CAT_C[p.c] || "#888";
              const ds     = DIFF_S[p.d];
              const future = p.sched > td;
              const revDone = pData ? pData.rev.filter(r=>r.done).length : 0;
              return (
                <div key={p.id} style={{
                  background: pData ? "#0a160a" : T.card,
                  border: `1px solid ${pData?"#1a3a1a":T.border}`,
                  borderLeft: `3px solid ${pData?"#22c55e": future?T.border:cc}`,
                  borderRadius:9, padding:"9px 12px", marginBottom:6,
                  opacity: future&&!pData ? 0.4 : 1,
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                        <span style={{ color:T.muted, fontSize:9, minWidth:28, fontFamily:"monospace" }}>#{String(p.id).padStart(3,"0")}</span>
                        <span style={{ color: pData?"#4ade80":T.txt, fontWeight:600, fontSize:12 }}>{p.t}</span>
                        {pData && <span style={{ color:"#22c55e", fontSize:11 }}>✓</span>}
                      </div>
                      <div style={{ display:"flex", gap:5, marginTop:3, flexWrap:"wrap", alignItems:"center" }}>
                        <span style={{ background:ds.bg, color:ds.fg, border:`1px solid ${ds.bd}`,
                          fontSize:9, padding:"1px 6px", borderRadius:20, fontWeight:700 }}>{p.d}</span>
                        <span style={{ color:T.muted, fontSize:9 }}>{p.c}</span>
                        <span style={{ color:future?T.muted:"#4a6880", fontSize:9 }}>📅 {p.sched}</span>
                        {pData && <span style={{ color:T.muted, fontSize:9 }}>{revDone}/5 revisions</span>}
                      </div>
                      {pData && (
                        <div style={{ display:"flex", gap:3, marginTop:5 }}>
                          {pData.rev.map((r,i) => (
                            <div key={i} title={SR_LABELS[i]+(r.done ? ` ✓ (${r.ease||"ok"})` : " due "+r.due)}
                              style={{ flex:1, height:3, borderRadius:1,
                                background:r.done?(EASE_COLOR[r.ease]||"#22c55e"):r.due<=td?"#fbbf24":T.border }} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ display:"flex", gap:4, flexShrink:0 }}>
                      {!pData && !future && (
                        <button onClick={() => markLearn(p.id)} style={{
                          background:"#0a1e12", color:"#4ade80", border:"1px solid #153a1e",
                          borderRadius:6, padding:"3px 9px", cursor:"pointer", fontSize:11, fontFamily:"inherit"
                        }}>+ Done</button>
                      )}
                      {pData && (
                        <button onClick={() => resetP(p.id)} title="Reset"
                          style={{ background:"transparent", color:T.muted, border:`1px solid ${T.border}`,
                            borderRadius:6, padding:"3px 7px", cursor:"pointer", fontSize:10, fontFamily:"inherit"
                          }}>↺</button>
                      )}
                      <a href={p.lc} target="_blank" rel="noopener noreferrer"
                         style={{ color:T.muted, border:`1px solid ${T.border}`,
                           borderRadius:6, padding:"3px 7px", fontSize:10, textDecoration:"none" }}>LC↗</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ════════════ PROGRESS ════════════ */}
        {tab==="stats" && (
          <div>
            {/* Overview cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(115px,1fr))", gap:9, marginBottom:22 }}>
              {[
                { v:totalLearned, l:"Solved",       t:250,              c:"#22c55e" },
                { v:totalRevDone, l:"Reviews Done",  t:totalLearned*5,  c:"#4d9de0" },
                { v:srDue.length, l:"Due Today",     t:null,             c:"#fbbf24" },
                { v:`${(totalLearned/Math.max(dayNum,1)).toFixed(1)}/d`, l:"Pace", t:null, c:"#a78bfa" },
              ].map(s => (
                <div key={s.l} style={{ background:T.card, border:`1px solid ${T.border}`,
                  borderRadius:10, padding:"12px 13px" }}>
                  <div style={{ fontSize:20, fontWeight:800, color:s.c }}>{s.v}</div>
                  {s.t!=null && <div style={{ height:2, background:T.border, borderRadius:1, margin:"5px 0 3px" }}>
                    <div style={{ width:`${Math.min(100,s.v/s.t*100)}%`, height:"100%", background:s.c, borderRadius:1 }} />
                  </div>}
                  <div style={{ color:T.muted, fontSize:9, marginTop: s.t?0:6, letterSpacing:1 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Difficulty breakdown */}
            <div style={{ display:"flex", gap:9, marginBottom:22 }}>
              {["Medium","Hard","Easy"].map(diff => {
                const all  = PROBLEMS.filter(x => x.d===diff);
                const done = all.filter(x => probs[x.id]).length;
                const ds   = DIFF_S[diff];
                return (
                  <div key={diff} style={{ flex:1, background:T.card, border:`1px solid ${T.border}`,
                    borderRadius:10, padding:"11px 13px", textAlign:"center" }}>
                    <div style={{ fontSize:18, fontWeight:800, color:ds.fg }}>{done}</div>
                    <div style={{ color:T.muted, fontSize:8, marginTop:2 }}>/ {all.length} {diff.toUpperCase()}</div>
                    <div style={{ height:2, background:T.border, borderRadius:1, marginTop:6 }}>
                      <div style={{ width:`${Math.round(done/all.length*100)}%`, height:"100%",
                        background:ds.fg, borderRadius:1 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Category progress */}
            <div style={{ color:T.muted, fontSize:9, letterSpacing:1, marginBottom:10 }}>CATEGORY PROGRESS</div>
            {CATEGORIES.map(c => {
              const all  = PROBLEMS.filter(x => x.c===c);
              const done = all.filter(x => probs[x.id]).length;
              const pct2 = Math.round(done/all.length*100);
              const cc   = CAT_C[c]||"#888";
              return (
                <div key={c} style={{ marginBottom:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ fontSize:11, color: done===all.length?"#4ade80":T.txt }}>{c}</span>
                    <span style={{ fontSize:10, color:T.muted }}>{done}/{all.length}</span>
                  </div>
                  <div style={{ height:4, background:T.border, borderRadius:2 }}>
                    <div style={{ width:`${pct2}%`, height:"100%", background:cc, borderRadius:2, transition:"width 0.4s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ════════════ SCHEDULE ════════════ */}
        {tab==="plan" && (
          <div>
            {/* Phase overview */}
            <div style={{ color:T.muted, fontSize:9, letterSpacing:1, marginBottom:12 }}>STUDY PHASES</div>
            {[
              { label:"Phase 1 · Foundations",      dates:"May 22 – Jun 7",   color:"#22c55e",  cats:["Arrays & Hashing","Two Pointers","Sliding Window","Stack"] },
              { label:"Phase 2 · Search & Lists",   dates:"Jun 8 – Jun 26",   color:"#4d9de0",  cats:["Binary Search","Linked List"] },
              { label:"Phase 3 · Trees & Heaps",    dates:"Jun 27 – Jul 13",  color:"#a78bfa",  cats:["Trees","Heap / Priority Queue"] },
              { label:"Phase 4 · Graphs & BT",      dates:"Jul 14 – Aug 1",   color:"#f97316",  cats:["Backtracking","Tries","Graphs","Advanced Graphs"] },
              { label:"Phase 5 · DP & Finish",      dates:"Aug 2 – Aug 31",   color:"#f43f5e",  cats:["1-D Dynamic Programming","2-D Dynamic Programming","Greedy","Intervals","Math & Geometry","Bit Manipulation"] },
            ].map(ph => (
              <div key={ph.label} style={{ background:T.card, border:`1px solid ${T.border}`,
                borderLeft:`3px solid ${ph.color}`, borderRadius:10, padding:"11px 14px", marginBottom:9 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontWeight:700, color:ph.color, fontSize:11 }}>{ph.label}</span>
                  <span style={{ color:T.muted, fontSize:9 }}>{ph.dates}</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                  {ph.cats.map(c => {
                    const all  = PROBLEMS.filter(x => x.c===c);
                    const done = all.filter(x => probs[x.id]).length;
                    const cc   = CAT_C[c]||"#888";
                    return (
                      <span key={c} style={{ background:cc+"15", color:cc, border:`1px solid ${cc}30`,
                        borderRadius:6, fontSize:9, padding:"2px 7px" }}>
                        {c} ({done}/{all.length})
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Upcoming 10 days */}
            <div style={{ color:T.muted, fontSize:9, letterSpacing:1, margin:"18px 0 10px" }}>NEXT 10 DAYS</div>
            {Array.from({length:10},(_,i) => {
              const d      = addDays(td,i);
              const dayPs  = SCHEDULED.filter(x => x.sched===d);
              const label  = i===0?"TODAY":i===1?"TOMORROW":
                new Date(d+"T12:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}).toUpperCase();
              return (
                <div key={d} style={{ marginBottom:9 }}>
                  <div style={{ color:T.muted, fontSize:9, marginBottom:3, letterSpacing:1 }}>
                    {label} — {d}
                    {dayPs.length===0
                      ? <span style={{ color:T.muted+"66" }}> (revisions only)</span>
                      : <span style={{ color:"#4ade80" }}> +{dayPs.length} new problem{dayPs.length>1?"s":""}</span>}
                  </div>
                  {dayPs.length>0 && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:4, paddingLeft:10 }}>
                      {dayPs.map(p => {
                        const cc   = CAT_C[p.c]||"#888";
                        const done = !!probs[p.id];
                        const ds   = DIFF_S[p.d];
                        return (
                          <span key={p.id} style={{
                            background: done?"#0a160a":cc+"15",
                            color: done?"#4ade80":cc,
                            border:`1px solid ${done?"#1a3a1a":cc+"30"}`,
                            borderRadius:6, fontSize:9, padding:"2px 8px",
                          }}>
                            {done?"✓ ":""}{p.d==="Hard"?"🔴 ":p.d==="Medium"?"🟡 ":"🟢 "}#{p.id} {p.t}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Calendar export info */}
            <div style={{ background:T.card, border:`1px solid ${T.border}`,
              borderRadius:10, padding:"14px 16px", marginTop:16 }}>
              <div style={{ fontWeight:700, color:T.accent, fontSize:11, marginBottom:6 }}>
                📅 APPLE CALENDAR INTEGRATION
              </div>
              <div style={{ color:T.muted, fontSize:10, lineHeight:1.7 }}>
                Click <span style={{ color:"#5eead4" }}>"Apple Cal"</span> in the header to download a <code style={{ color:"#a78bfa" }}>.ics</code> file.<br/>
                Open it → Apple Calendar imports all 250 scheduled problems + all revision events.<br/>
                <strong style={{ color:T.txt }}>Completed problems</strong> show ✅ in the title; pending ones show 📚.<br/>
                <strong style={{ color:T.txt }}>SR reviews</strong> appear as separate 🔁 events on their due dates.<br/>
                Re-export anytime to refresh status in your calendar.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
