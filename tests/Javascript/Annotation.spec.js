import {test,expect, chromium}from '@playwright/test'

test.only ("Test1",async({page})=>{
    console.log("Only")
})

test.skip ("Test2",async({page})=>{
    console.log("Skip-1")
})

test ("Test3",async({page})=>{

    if(browser===chromium)
    {
        test.skip()
    }
    console.log("Skip-2")
})

test.fixme ("Test4",async({page})=>{
    console.log("Fixme")
})

//If this code completly perfect then output result will be failed
test.fail ("Test5",async({page})=>{
    console.log("Fail-1")
})
//If this code completly incorrect then output result will be passed
test.fail ("Test6",async({page})=>{
    console.log("Fail-2")
})

test ("Test7",async({page})=>{
    console.log("Slow")
})

test ("Test8",async({page})=>{
    test.setTimeout(3000)
    console.log("Slow-2")
})