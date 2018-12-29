//问题：event loop?
//script(主程序代码)-》process.nextTick----->Promises..---->setTimeOut-->setInterval-->setImmediate---->I/O-----?UI rendering;
//例1          与例 2 对比更加容易理解
setTimeout(() => {
    console.log(1)
}, 0);
new Promise((resolve, reject) => {
    console.log(2);
  resolve();
}).then(function () {
    console.log(3)
}).then(function () {
    console.log(4)
})
process.nextTick(function () {
    console.log(5)
})
console.log(6)
// 2 6 5 3  4 1
//在这个Promise中 没有异步setTimeout, 所以script(主程序代码)-》process.nextTick----->Promises..---->setTimeOut--

//例2
setTimeout(() => {
    console.log(1)
}, 0);
new Promise((resolve, reject) => {
    console.log(2);
    setTimeout(function () {
        resolve()
    }, 0)
}).then(function () {
    console.log(3)
}).then(function () {
    console.log(4)
})
process.nextTick(function () {
    console.log(5)
})
console.log(6)
//2 6 5 1 3 4
//因为是主线程同步所以先是 console.log(2);//2 接着是console.log(6)
//再然后script(主程序代码)-》process.nextTick process.nextTick(function () { console.log(5)})
//因为 在Promise中setTimeout 所以从上面setTimeout开始；

