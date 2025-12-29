// "use client";

// import React from "react";
// import Masonry from "react-masonry-css";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { url } from "zod";

// const productImages = [
//   "https://m.media-amazon.com/images/I/51UImKMD48L._AC_.jpg",
//   "https://m.media-amazon.com/images/I/71fYzje3qGL._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/51jkjFdWwGL._AC_.jpg",
//   "https://m.media-amazon.com/images/I/71iGgZng4sL._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/71TlQsUAYeL._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/41Hj7ERkZNL._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/61w0rPUCwiL._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/71GZM-TM+xL._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/61ClnmsIm-L._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/81G6JV57F2L._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/71tUFdxb2fL._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/61SMe-PDrQL._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/91KtlmVsX-S._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/91iqcSy7i5L._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/51nL2y7-JdL._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/612v4DRGHQL._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/61SMe-PDrQL._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/51EjRQCN9AL._AC_.jpg",
//   "https://m.media-amazon.com/images/I/61YJzv8GyKL._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/81pNxqFKFZS._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/61ZsfZFQJ-YL._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/61gjmwvR7zL._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/61GIsOzbTyL._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/41x-lcELSjL._AC_.jpg",
//   "https://m.media-amazon.com/images/I/714Q2hFXwaL._AC_SX679_.jpg",
//   //   "https://m.media-amazon.com/images/I/713rpoSFkEL._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/51m0nW8BFlL._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/61ybuPBoAzL._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/61gjmwvR7zL._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/41Nzdz63xzL._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/61iuzSNWI+L._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/71ZFwdbzH2L._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/61xbJk4LEDL._AC_.jpg",
//   "https://m.media-amazon.com/images/I/71hwHjZg0qL._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/91BHYughfhS._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/91uMxCQHsoS._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/61IzNOQLY-L._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/91BHYughfhS._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/71hwHjZg0qL._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/A1mlCcHy+LS._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/71zmn1LTm3L._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/71rpunC9SAL._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/61WgjDTkN0L._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/610N8cLsQ+L._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/51XAmX9uyYL._AC_SY879_.jpg",
//   "https://m.media-amazon.com/images/I/61r-eDvX44L._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/81x2Z2d3yQL._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/91Tmlqnn3uL._AC_SX695_.jpg",
//   "https://m.media-amazon.com/images/I/61BQ4uaWJRL._AC_SX679_.jpg",
//   "https://m.media-amazon.com/images/I/41EcXj8wYEL._AC_SY695_.jpg",
//   "https://m.media-amazon.com/images/I/61WgjDTkN0L._AC_SY879_.jpg",

//   "https://m.media-amazon.com/images/I/914FRHucU3S._AC_SY879_.jpg",
//   "https://lsco.scene7.com/is/image/lsco/D79590001-front-pdp-ld?fmt=webp&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=1760&hei=1760",
//   "https://lsco.scene7.com/is/image/lsco/D79590001-detail2-pdp-ld?fmt=webp&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=1760&hei=1760",
// ];
// const products = [
//   {
//     id: 1,
//     name: "Tote Bag",
//     url: "https://plus.unsplash.com/premium_photo-1681324227573-953664cf9b32?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG90ZSUyMEJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    
//   },
//   {
//     id: 2,
//     name: "Tote Bag",
//     url:"https://images.unsplash.com/photo-1574365569389-a10d488ca3fb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VG90ZSUyMEJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: 3,
//     name: "Tote Bag",
//     url:"https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VG90ZSUyMEJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: 4,
//     name: "Tote Bag",
//     url:"https://plus.unsplash.com/premium_photo-1681498947021-6875d6a7b21f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VG90ZSUyMEJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: 5,
//     name: "Tote Bag",
//     url:"https://plus.unsplash.com/premium_photo-1693242804614-5d3955b1fb7b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8VG90ZSUyMEJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: 6,
//     name: "Tote Bag",
//     url:"https://images.unsplash.com/photo-1621466550398-ac8062907657?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFRvdGUlMjBCYWd8ZW58MHx8MHx8fDA%3D"
//   },
//   {
//     id: 7,
//     name: "Tote Bag",
//     url:"https://images.unsplash.com/photo-1535981444082-2a5dc0548ef3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fFRvdGUlMjBCYWd8ZW58MHx8MHx8fDA%3D"
//   },
//   {
//     id:8,
//     name:"Tote Bag",
//     url:"https://images.unsplash.com/photo-1683148754073-cfa906017a10?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fFRvdGUlMjBCYWd8ZW58MHx8MHx8fDA%3D"
//   },
//   {
//     id:9,
//     name:"Tote Bag",
//     url:"https://plus.unsplash.com/premium_photo-1681302897622-c1c028c3ca84?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fFRvdGUlMjBCYWd8ZW58MHx8MHx8fDA%3D"
//   },
//   {
//     id:10,
//     name:"Tote Bag",
//     url:"https://images.unsplash.com/photo-1613848531944-a30f04f6679b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fFRvdGUlMjBCYWd8ZW58MHx8MHx8fDA%3D"
//   },
//   {
//     id:11,
//     name:"Tote Bag",
//     url:"https://plus.unsplash.com/premium_photo-1723626023193-6c30fbbc11c9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fFRvdGUlMjBCYWd8ZW58MHx8MHx8fDA%3D"
//   },
//   {
//     id:12,
//     name:"Tote Bag",
//     url:"https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg"
//   },
//   {
//     id:13,
//     name:"Tote Bag",
//     url:"https://images.pexels.com/photos/8148587/pexels-photo-8148587.jpeg"
//   },
//   {
//     id:14,
//     name:"Tote Bag",
//     url:"https://images.pexels.com/photos/29359827/pexels-photo-29359827.jpeg"
//   },
//   {
//     id:15,
//     name:"Tote Bag",
//     url:"https://images.pexels.com/photos/9016544/pexels-photo-9016544.jpeg"
//   },
//   {
//     id:16,
//     name:"Tote Bag",
//     url:"https://images.pexels.com/photos/9991487/pexels-photo-9991487.jpeg"
//   },
//   {
//     id:17,
//     name:"Laptop Bag",
//     url:"https://plus.unsplash.com/premium_photo-1680392544041-d89413b561ce?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFwdG9wJTIwYmFnfGVufDB8fDB8fHww"
//   },
//   {
//     id:18,
//     name:"Laptop Bag",
//     url:"https://images.unsplash.com/photo-1643033998438-38b4211fa2d5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwYmFnfGVufDB8fDB8fHww"
//   },
//   {
//     id:19,
//     name:"Laptop Bag",
//     url:"https://plus.unsplash.com/premium_photo-1664110691115-790e20a41744?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFwdG9wJTIwYmFnfGVufDB8fDB8fHww"
//   },
//   {
//     id:20,
//     name:"Laptop Bag",
//     url:"https://images.unsplash.com/photo-1548611716-f156c633d514?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFwdG9wJTIwYmFnfGVufDB8fDB8fHww"
//   },
//   {
//     id:21,
//     name:"Laptop Bag",
//     url:"https://images.unsplash.com/photo-1587614387466-0a72ca909e16?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcCUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:22,
//     name:"Laptop Bag",
//     url:"https://plus.unsplash.com/premium_photo-1723649902660-66643962d57b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxhcHRvcCUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:23,
//     name:"Laptop Bag",
//     url:"https://plus.unsplash.com/premium_photo-1723649902774-4eafa4b42abc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGxhcHRvcCUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:24,
//     name:"Laptop Bag",
//     url:"https://images.unsplash.com/photo-1763034179057-acad3a072568?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxhcHRvcCUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:25,
//     name:"Laptop Bag",
//     url:"https://plus.unsplash.com/premium_photo-1679314407939-858a78e9e1ac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGxhcHRvcCUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:26,
//     name:"Laptop Bag",
//     url:"https://images.pexels.com/photos/7927069/pexels-photo-7927069.jpeg"
//   },
//   {
//     id:27,
//     name:"Laptop Bag",
//     url:"https://images.unsplash.com/photo-1708447135262-850979354fcf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fGxhcHRvcCUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:28,
//     name:"Laptop Bag",
//     url:"https://images.unsplash.com/photo-1591534577302-1696205bb2bc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE2fHxsYXB0b3AlMjBiYWd8ZW58MHx8MHx8fDA%3D"
//   },
//   {
//     id:29,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D"
//   },
//   {
//     id:30,
//     name:"Backpack",
//     url:"https://plus.unsplash.com/premium_photo-1723649902734-60ec42167731?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D"
//   },
//   {
//     id:31,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1551974222-1d49f576a2a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:32,
//     name:"Backpack",
//     url:"https://plus.unsplash.com/premium_photo-1723649902661-216596f2ac1a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:33,
//     name:"Backpack",
//     url:"https://plus.unsplash.com/premium_photo-1723649902660-66643962d57b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:34,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1475180429745-7bdddbdf4e3d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:35,
//     name:"Backpack",
//     url:"https://plus.unsplash.com/premium_photo-1670444333487-0064c6399f88?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:36,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1591534577302-1696205bb2bc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:37,
//     name:"Backpack",
//     url:"https://plus.unsplash.com/premium_photo-1687867117406-d62e827b31c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:38,
//     name:"Backpack",
//     url:"https://plus.unsplash.com/premium_photo-1723649902593-471185415b4e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:39,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1550253594-356b2f788907?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:40,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1598454663662-e370fd4b539a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:41,
//     name:"Backpack",
//     url:"https://plus.unsplash.com/premium_photo-1723649902616-0dce94980e06?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:42,
//     name:"Backpack",
//     url:"https://plus.unsplash.com/premium_photo-1723649902704-bfd8eb6e204c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:43,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1541267732407-8f72c182cf11?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:44,
//     name:"Backpack",
//     url:"https://plus.unsplash.com/premium_photo-1727456196043-052762e9b4d4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fGJhY2twYWNrfGVufDB8fDB8fHww"
//   },
//   {
//     id:45,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1624292981551-e3aa15c0056d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxiYWNrcGFja3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:46,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1504424715129-fa3bcb0b8903?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxiYWNrcGFja3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:47,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1593215077051-3cf7a6f95f00?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI3fHxiYWNrcGFja3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:48,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1603920347917-d16487c88db4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxiYWNrcGFja3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:49,
//     name:"Backpack",
//     url:"https://images.unsplash.com/photo-1718048687394-5fca4d12bff0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUxfHxiYWNrcGFja3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:50,
//     name:"Makeup Bag",
//     url:"https://m.media-amazon.com/images/I/71-vkU6N+wL._SL1500_.jpg"
//   },
//   {
//     id:51,
//     name:"Makeup Bag",
//     url:"https://m.media-amazon.com/images/I/611UB4dzhHL._SL1500_.jpg"
//   },
//   {
//     id:52,
//     name:"Makeup Bag",
//     url:"https://images.unsplash.com/photo-1632147341802-817aa47ae84b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fG1ha2V1cCUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:53,
//     name:"Makeup Bag",
//     url:"https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg"
//   },
//   {
//     id:54,
//     name:"Makeup Bag",
//     url:"https://images.pexels.com/photos/21283032/pexels-photo-21283032.jpeg"
//   },
//   {
//     id:55,
//     name:"Makeup Bag",
//     url:"https://images.pexels.com/photos/19891271/pexels-photo-19891271.jpeg"
//   },
//   {
//     id:56,
//     name:"Makeup Bag",
//     url:"https://images.pexels.com/photos/28973056/pexels-photo-28973056.jpeg"
//   },
//   {
//     id:57,
//     name:"Waterproof Bag",
//     url:"https://images.pexels.com/photos/16359256/pexels-photo-16359256.jpeg"
//   },
//   {
//     id:58,
//     name:"Waterproof Bag",
//     url:"https://images.pexels.com/photos/17492090/pexels-photo-17492090.jpeg"
//   },
//   {
//     id:59,
//     name:"Waterproof Bag",
//     url:"https://images.pexels.com/photos/35393328/pexels-photo-35393328.jpeg"
//   },
//   {
//     id:60,
//     name:"Waterproof Bag",
//     url:"https://cdn.pixabay.com/photo/2015/03/12/04/41/camera-bag-669616_1280.jpg"
//   },
//   {
//     id:61,
//     name:"Backpack",
//     url:"https://cdn.pixabay.com/photo/2020/04/17/12/27/bag-5054998_1280.jpg"
//   },
//   {
//     id:62,
//     name:"Waterproof Bag",
//     url:"https://m.media-amazon.com/images/I/61afClAWZ+L._SL1500_.jpg"
//   },
//   {
//     id:63,
//     name:"Waterproof Bag",
//     url:"https://m.media-amazon.com/images/I/61zLO40oBAL._SL1500_.jpg"
//   },
//   {
//     id:64,
//     name:"Waterproof Bag",
//     url:"https://m.media-amazon.com/images/I/717RhEMjwDL._SL1500_.jpg"
//   },
//   {
//     id:65,
//     name:"Waterproof Bag",
//     url:"https://m.media-amazon.com/images/I/717KH0pC3JL._SL1500_.jpg"
//   },
//   {
//     id:66,
//     name:"Waterproof Bag",
//     url:"https://m.media-amazon.com/images/I/71x4vY+HULL._SL1500_.jpg"
//   },
//   {
//     id:67,
//     name:"Waterproof Bag",
//     url:"https://m.media-amazon.com/images/I/81JoiG3twRL._SL1500_.jpg"
//   },
//   {
//     id:68,
//     name:"Waterproof Bag",
//     url:"https://m.media-amazon.com/images/I/81+yrxxjabL._SL1500_.jpg"
//   },
//   {
//     id:69,
//     name:"Waterproof Bag",
//     url:"https://m.media-amazon.com/images/I/71X2R86MQPL._SL1500_.jpg"
//   },
//   {
//     id:70,
//     name:"Game Case",
//     url:"https://m.media-amazon.com/images/I/61ehLXoUOJL._AC_SL1500_.jpg"
//   },
//   {
//     id:71,
//     name:"Game Case",
//     url:"https://m.media-amazon.com/images/I/71BClSb90+L._AC_SL1500_.jpg"
//   },
//   {
//     id:72,
//     name:"Game Case",
//     url:"https://m.media-amazon.com/images/I/71xXjc6a1iL._AC_SL1500_.jpg"
//   },
//   {
//     id:73,
//     name:"Game Case",
//     url:"https://m.media-amazon.com/images/I/71RseDpEn8L._AC_SX300_SY300_QL70_FMwebp_.jpg"
//   },
//   {
//     id:74,
//     name:"Waterproof Bag",
//     url:"https://media.istockphoto.com/id/845232734/photo/hiker-with-a-backpack-watching-the-lake-sourrounded-by-mountains.webp?b=1&s=612x612&w=0&k=20&c=EjJD3IeEKhjSHXS2FNxKXd6dboX7bLgdSl6wec6nVDA="
//   },
//   {
//     id:75,
//     name:"Insulated Bag",
//     url:"https://images.pexels.com/photos/9461468/pexels-photo-9461468.jpeg"
//   },
//   {
//     id:76,
//     name:"Insulated Bag",
//     url:"https://images.pexels.com/photos/8989239/pexels-photo-8989239.jpeg"
//   },
//   {
//     id:77,
//     name:"Insulated Bag",
//     url:"https://images.pexels.com/photos/8989247/pexels-photo-8989247.jpeg"
//   },
//   {
//     id:78,
//     name:"Insulated Bag",
//     url:"https://images.pexels.com/photos/8931680/pexels-photo-8931680.jpeg"
//   },
//   {
//     id:79,
//     name:"Insulated Bag",
//     url:"https://images.pexels.com/photos/8931689/pexels-photo-8931689.jpeg"
//   },
//   {
//     id:80,
//     name:"Insulated Bag",
//     url:"https://images.pexels.com/photos/8988468/pexels-photo-8988468.jpeg"
//   },
//   {
//     id:81,
//     name:"Insulated Bag",
//     url:"https://m.media-amazon.com/images/I/81gjTh8VP4L._AC_SL1500_.jpg"
//   },
//   {
//     id:82,
//     name:"Insulated Bag",
//     url:"https://m.media-amazon.com/images/I/81nnmmUgQ+L._AC_SL1500_.jpg"
//   },
//   {
//     id:83,
//     name:"Insulated Bag",
//     url:"https://m.media-amazon.com/images/I/81SXU8N1MzL._AC_SL1500_.jpg"
//   },
//   {
//     id:84,
//     name:"Insulated Bag",
//     url:"https://m.media-amazon.com/images/I/81Yp7OKoLeL._AC_SL1500_.jpg"
//   },
//   {
//     id:85,
//     name:"Insulated Bag",
//     url:"https://m.media-amazon.com/images/I/81XoPcTYUDL._AC_SL1500_.jpg"
//   },
//   {
//     id:86,
//     name:"Insulated Bag",
//     url:"https://m.media-amazon.com/images/I/71t-+13yKIL._AC_SX679_.jpg"
//   },
//   {
//     id:87,
//     name:"Insulated Bag",
//     url:"https://m.media-amazon.com/images/I/61M-xxwJO+L._SL1500_.jpg"
//   },
//   {
//     id:88,
//     name:"Tool Bag",
//     url:"https://images.unsplash.com/photo-1672625912400-35f1f7bca79b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9vbGJhZyUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id:89,
//     name:"Tool Bag",
//     url:"https://images.unsplash.com/photo-1604712941007-2627cfd759fd?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   },
//   {
//     id:90,
//     name:"Tablet Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767018046/c01a5165-0543-4a49-8c5b-c49ad504afb6.png"
//   },
//   {
//     id:91,
//     name:"Tablet Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767018025/304f757a-4a2a-4ff1-97e2-d35d14b5b0f5.png"
//   },
//   {
//     id:92,
//     name:"Tablet Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767017912/ec05fbdf-7588-45ef-9f1e-c8c681f712f3.png"
//   },
//   {
//     id:93,
//     name:"Tablet Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767017851/9985bc26-b427-4702-a08e-434c8dd6ef84.png"
//   },
//   {
//     id:94,
//     name:"Tablet Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767017638/745d3681-d714-45ed-9e51-99747cbc1a90.png"
//   },
//   {
//     id:95,
//     name:"Tablet Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767017638/745d3681-d714-45ed-9e51-99747cbc1a90.png"
//   },
//   {
//     id:96,
//     name:"Tablet Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767017615/0bf1d42a-2278-44d9-9ab6-72b51eb50ef9.png"
//   },
//   {
//     id:97,
//     name:"Tablet Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767017396/2a9c4306-e3ec-4496-9db4-5c60b2553924.png"
//   },
//   {
//     id:98,
//     name:"Tablet Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767017269/72eb3e91-cedb-46fd-84ec-917f35817e37.png"
//   },
//   {
//     id:99,
//     name:"Tablet Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767017851/9985bc26-b427-4702-a08e-434c8dd6ef84.png"
//   },
//   {
//     id:100,
//     name:"Headphone Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767019390/2a24e2f6-b2d1-4480-96e1-e70bfac9bcf6.png"
//   },
//   {
//     id:101,
//     name:"Headphone Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767019404/ce8d41f2-6f2a-4190-b054-3139f49bb4a6.png"
//   },
//   {
//     id:102,
//     name:"Headphone Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767019259/c96a9526-bdb1-41b2-99cb-573dce81596c.png"
//   },
//   {
//     id:103,
//     name:"Headphone Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767019204/3405d137-93d9-45b7-9ac0-08a177787f3d.png"
//   },
//   {
//     id:105,
//     name:"Headphone Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767019176/26767f30-b43c-4a03-8f2e-bf9464b918b9.png"
//   },
//   {
//     id:106,
//     name:"Headphone Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767019091/3b9f82b9-a9a6-4161-bb72-aa002280dcc8.png"
//   },
//   {
//     id:107,
//     name:"Headphone Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767019041/ee4da98d-4b5e-466b-abfa-de0753d4334e.png"
//   },
//   {
//     id:108,
//     name:"Headphone Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767018949/309f9a20-f8c6-472e-8909-c95b70f409d6.png"
//   },
//   {
//     id:109,
//     name:"Headphone Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767018946/1953026b-a9ba-4aa8-ae18-5d3948d83415.png"
//   },
//   {
//     id:110,
//     name:"Headphone Bag",
//     url:"https://res.cloudinary.com/drnascc38/image/upload/v1767018912/77444163-bf11-42da-85b6-438c0b0994f7.png"
//   },
// ];

// const Gallery = () => {
//   const breakpointColumnsObj = {
//     default: 5,
//     1536: 4,
//     1024: 3,
//     640: 2,
//   };

//   return (
//     <div className="bg-white min-h-screen max-w-7xl mx-auto relative">
//       <div className="p-4 sm:p-8 pb-8">
//         <Masonry
//           breakpointCols={breakpointColumnsObj}
//           className="flex w-auto -ml-4"
//           columnClassName="pl-4 bg-clip-padding"
//         >
//           {productImages.map((link, index) => (
//             <motion.div
//               key={index}
//               layout
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-50px" }}
//               transition={{ duration: 0.5, delay: index * 0.02 }}
//               className="mb-4 break-inside-avoid"
//             >
//               <div className="group relative overflow-hidden rounded-2xl  bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300">
//                 <Image
//                   src={link}
//                   alt={`Product ${index + 1}`}
//                   width={800}
//                   height={0}
//                   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                   className="w-full h-auto block object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
//               </div>
//             </motion.div>
//           ))}
//         </Masonry>
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 h-72 bg-linear-to-t from-white via-white to-transparent pointer-events-none z-20" />
//     </div>
//   );
// };

// export default Gallery;


import React from 'react'
import GalleryPage from './gallery'

export default function Page() {
  return (
    <div>
      <GalleryPage/>
    </div>
  )
}
