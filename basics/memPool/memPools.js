// Test Case 1: Pre Allocation of Arrays
function buildArray(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(i);
    }
}
function buildArrayWithPreAllocation(n) {
    var arr = new Array(n).fill(0);
    for (var i = 0; i < n; i++) {
        arr[i] = i;
    }
}
var buildArrayWithConstFnDec = function (n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(i);
    }
};
function buildArrayWithPreAllocationWithConstFnDec(n) {
    var arr = new Array(n).fill(0);
    for (var i = 0; i < n; i++) {
        arr[i] = i;
    }
}
var runTestsAndGetAvg = function (n, test, sizeOfArray) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var t0 = performance.now();
        test(sizeOfArray);
        var t1 = performance.now() - t0;
        arr.push(t1);
    }
    var timeToRun = 0;
    arr.forEach(function (x) { return (timeToRun += x); });
    return timeToRun / n;
};
var getPercentDiff = function (o, z) { return (o / z) * 100; };
document.addEventListener("DOMContentLoaded", function () {
    console.log("Systems online and ready sir!");
    // Find items in DOM
    var resContainer1 = document.getElementById("resOne");
    var resContainer2 = document.getElementById("resTwo");
    var resContainer3 = document.getElementById("resThree");
    var resContainer4 = document.getElementById("resFour");
    // Amount of time to run tests
    var tSize = 100000;
    var sizeOfArray = 10000;
    // Run Build Arr
    var basicRes = runTestsAndGetAvg(tSize, buildArray, sizeOfArray);
    var basicRes2 = runTestsAndGetAvg(tSize, buildArrayWithPreAllocation, sizeOfArray);
    var basicRes3 = runTestsAndGetAvg(tSize, buildArrayWithConstFnDec, sizeOfArray);
    var basicRes4 = runTestsAndGetAvg(tSize, buildArrayWithPreAllocationWithConstFnDec, sizeOfArray);
    if (resContainer1 && resContainer2 && resContainer3 && resContainer4) {
        resContainer1.textContent = "Standard FN noPreAlloc: ".concat(basicRes);
        resContainer2.textContent = "Standard FN wPreAlloc: ".concat(basicRes3, " - improvement of ").concat(getPercentDiff(basicRes - basicRes2, basicRes), "%");
        resContainer3.textContent = "Const FN noPreAlloc: ".concat(basicRes2);
        resContainer4.textContent = "Const FN wPreAlloc: ".concat(basicRes4, " - improvement of ").concat(getPercentDiff(basicRes3 - basicRes4, basicRes3), "%");
    }
});
