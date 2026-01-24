import {test,expect}from '@playwright/test'

test("Test1",async({page})=>{
    console.log("Only")
})

test("Test2",async({page})=>{
    console.log("Skip-12")
})
test("Test3",async({page})=>{
    console.log("Skip-3")
})