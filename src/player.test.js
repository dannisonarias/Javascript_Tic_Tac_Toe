import playerFactory from "./player";

test("",()=>{
    expect(playerFactory("danny","X")).toEqual({"name":"danny","symbol":"X","wins":0});
});