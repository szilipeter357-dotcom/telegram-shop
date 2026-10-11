"use client";

import { useEffect, useState } from "react";

type Tab =
  | "home"
  | "promo"
  | "menu"
  | "profile"
  | "cart"
  | "topupGuide";

type ShopCategory = "All Products" | "Digital" | "Premium";

type Product = {
  name: string;
  description: string;
  price: string;
  image: string;
  category: ShopCategory;
};

type CartItem = {
  product: Product;
  quantity: number;
  area: string;
};

const banners = [
   {
    update: "Update: 08.10",
    locations: ["Balatonszemes", "Veszprém", "Pécs"],
    image: "/slidepic.jpeg",
  },
  {
    update: "Update: 07.10",
    locations: ["Citadella", "Kecskemét", "Balatonboglár"],
    image: "/slidepic.jpeg",
  },
 
  {
    update: "Update: 05.10",
    locations: ["Debrecen", "Komárom"],
    image: "/slidepic.jpeg",
  },
  {
  update: "⚠️ ATTENTION ⚠️",
  locations: ["If you see something happen with the app, chat to Live Support"],
  image: "/slidepic.jpeg",
  special: true,
  },
  {
    update: "",
    locations: ["Updated Guide how to Top Up balance Click on this post to see it"],
    image: "/slidekep.png",
    
  },
];

/* =========================================================
   CITY-SPECIFIC PRODUCTS
   MINDEN VÁROS KÜLÖN KEZELVE
========================================================= */

const cityProducts: Record<string, Product[]> = {
  "Rákosliget": [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],
  "Népliget": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

  "Nyugati":  [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],

  "Óbuda":  [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],

  "Soroksári": [
    {
      name: "Soroksári Icon Pack",
      description: "Modern digitális ikoncsomag.",
      price: "0.03 SOL",
      image: "/slidepic.jpeg",
      category: "Digital",
    },
  ],

  "Duna Plaza": [
    {
      name: "Duna Plaza Bundle",
      description: "Több digitális termék egy csomagban.",
      price: "0.12 SOL",
      image: "/slidepic.jpeg",
      category: "Premium",
    },
  ],

  "Svábhegy": [
    {
      name: "Svábhegy Premium Guide",
      description: "Prémium digitális kiadvány.",
      price: "0.07 SOL",
      image: "/slidepic.jpeg",
      category: "Premium",
    },
  ],

  "Citadella":  [

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     

    
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
    [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],

  ],



  "Goliat-Városliget":  [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],
  
  "Dunakeszi": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],


  "Nyugati": [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],

  "Óbuda": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

  "Soroksári":  [

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     

    
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
    

  ],

  "Duna Plaza": [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],

  "Svábhegy": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],


  "Puskás Ferenc": [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],

  "Kelenföld": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],



  "Szigetszentmiklós": [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],


  "Vecsés": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

 "Szentendre": [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },




  ],


"Balatonföldvár": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],


"Zamárdi":  [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],
"Balatonszárszó": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

"Balatonszemes": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

  "Balatonboglár":  [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],


  "Balatonfüred":  [

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     

    
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
    

  ],

 
  "Balatonalmádi": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

"Balatonkenese": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

  "Szekszárd": [

 {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    },{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

"Cegléd": [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },




  ],


  
  "Keszthely": [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],
  "Jászberény": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

  "Gödöllő": [

 {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    },{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

"Sopron": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],
  "Kaposvár":  [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],

"Szekszárd": [

 {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    },{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

"Eger": [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },




  ],


"Győr": [

 {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    },{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

"Érd": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],


 "Budaörs":  [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],

  "Debrecen": [

 {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    },{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

  "Székesfehérvár":  [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],

"Szeged": [   {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },
{
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
    {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },




  ],
 "Tatabánya": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

  "Nyíregyháza": [

 {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    },{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],


  "Kecskemét": [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },




  ],
  
"Miskolc": [   {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },
{
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
    {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

 ],

 "Dunaújváros": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],


  "Szombathely": [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },




  ],
"Veszprém": [   {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },
{
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
    {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },


  ],

  
  "Pécs": [

 {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    },{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],

  "Szolnok":  [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],

  "Komárom": [

{
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

   
     {
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    {
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },

    {
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },

   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
     {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     {
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
     {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },

  ],
  "Salgótarján": [   {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },
{
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },
     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
    {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },




  ],
 "Siófok":  [ {
      name: "Alpha-PVP - 2g",
      description: "Colored HQ; Effect: Euphoria, Speed, Adrenaline Boost",
      price: "28500 HUF",
      image: "/alpha.jpeg",
      category: "Premium",
    },{
      name: "Cocaine - 1g",
      description: "Purity: 95%; Flake white, First peak, Yungas Gold Line",
      price: "48000 HUF",
      image: "/coke.jpeg",
      category: "Premium",
    },

{
      name: "Super Sour Diesel - 3g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "21000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
   
    
    {
      name: "AMF - 2g",
      description: " ⭐ VHQ.⚠️ 93% PURE.🧪 EPHEDRINE🇩🇪",
      price: "23000 HUF",
      image: "/sp.png",
      category: "Premium",
    },

     {
      name: "Super Sour Diesel - 5g",
      description: " 🇪🇸  Spain Quality  🇪🇸 Feeling: Euphoria, Happy",
      price: "39000 HUF",
      image: "/zaza6.jpeg",
      category: "Digital",
    },
     
    
     
 
    
     {
      name: "Meph- 2g",
      description: "⭐ VHQ.⚠️ 93% PURE.🧪 4MMC.💎 WHITE CRYSTALS.🇫🇷",
      price: "34000 HUF",
      image: "/meph.png",
      category: "Premium",
    }, {
      name: "Ketamin - 2g",
      description: "⚗️ PFIZER, 99% PURE 🇨🇭.  DETACHED, FLOATING, SURREAL.",
      price: "23000 HUF",
      image: "/ket.png",
      category: "Premium",
    }, 
     {
      name: "MAC - 3g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "19500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },{
      name: "Hash - 3g",
      description: "🇺🇸  Cali Quality  🇺🇸 Feeling: Euphoric, Relaxed, Giggly ",
      price: "19500 HUF",
      image: "/hash.png",
      category: "Digital",
    },
    
{
      name: "Meth Crystal - 1g",
      description: "Supplier: Netherlands 🇳🇱 ",
      price: "30000 HUF",
      image: "/meth.png",
      category: "Premium",
    },{
      name: "XTC Kim - 5pc",
      description: "300mg; Supplier: Netherlands 🇳🇱 ",
      price: "22000 HUF",
      image: "/xtc.png",
      category: "Premium",
    },
{
      name: "MDMA Crystal - 2g",
      description: " Supplier: Netherlands 🇳🇱",
      price: "28000 HUF",
      image: "/mdmacrystal.png",
      category: "Premium",
    },
   {
      name: "Oxicontin - 1pc",
      description: "80mg, 🇵🇱 Poland, Mundipharma",
      price: "12500 HUF",
      image: "/oxi.png",
      category: "Premium",
    }, {
      name: "LSD - 5pc",
      description: "250ug",
      price: "22000 HUF",
      image: "/lsd.png",
      category: "Premium",
    },
{
      name: "Tramadol",
      description: "200mg, 🇵🇱 Poland, STADA",
      price: "9500 HUF",
      image: "/tramadolor.png",
      category: "Premium",
    },
    

{
      name: "MAC - 5g",
      description: " 🇪🇸 Spain Quality 🇪🇸 Feeling: Happy, Relaxing, Uplifting",
      price: "37500 HUF",
      image: "/zaza3.jpeg",
      category: "Digital",
    },
    {
      name: "Gelato 41 - 5g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "39000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },
     

     
    {
      name: "Gelato 41 - 3g",
      description: " 🇺🇸  Cali Quality  🇺🇸 Feeling: Uplifted, Relaxing, Euphoric",
      price: "21000 HUF",
      image: "/zaza4.jpeg",
      category: "Digital",
    },

  ],
};


/* =========================================================
   CITY LISTS
========================================================= */

const budapestCities = [
  "Rákosliget",
  "Népliget",
  "Nyugati",
  "Óbuda",
  "Soroksári",
  "Duna Plaza",
  "Svábhegy",
  "Puskás Ferenc",
  "Kelenföld",
  "Citadella",
  "Goliat-Városliget",
  "Dunakeszi",
];

const regionCities = [
  "Szigetszentmiklós",
  "Vecsés",
  "Szentendre",
  "Balatonföldvár",
  "Zamárdi",
  "Balatonszárszó",
  "Balatonszemes",
  "Balatonboglár",
  "Balatonfüred",
  "Balatonalmádi",
  "Balatonkenese",
  "Szekszárd",
  "Cegléd",
  "Keszthely",
  "Jászberény",
  "Gödöllő",
  "Sopron",
  "Kaposvár",
  "Eger",
  "Győr",
  "Érd",
  "Budaörs",
  "Debrecen",
  "Székesfehérvár",
  "Szeged",
  "Tatabánya",
  "Nyíregyháza",
  "Kecskemét",
  "Miskolc",
  "Dunaújváros",
  "Szombathely",
  "Veszprém",
  "Pécs",
  "Szolnok",
  "Komárom",
  "Salgótarján",
  "Siófok",
];


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Home() {

  const [showNotEnoughCoins, setShowNotEnoughCoins] =
  useState(false);

  const [showSlotGame, setShowSlotGame] = useState(false);
  const [showSlotRulesModal, setShowSlotRulesModal] = useState(false);
const [slotGameTab, setSlotGameTab] = useState<
  "spin" | "exchange" | "rules"
>("spin");
const [slotReels, setSlotReels] = useState<string[]>([
  "🍇",
  "🏷️",
  "🏷️",
]);

const [isSpinning, setIsSpinning] = useState(false);

const [spinningReels, setSpinningReels] = useState<boolean[]>([
  false,
  false,
  false,
]);

const [slotNotice, setSlotNotice] = useState(
  "Press SPIN to win reward"
);

// 24-hour slot cooldown
const [slotCooldownUntil, setSlotCooldownUntil] =
  useState<number | null>(null);

const [clockNow, setClockNow] = useState(Date.now());

// Restore the cooldown after a page refresh
useEffect(() => {
  const saved = window.localStorage.getItem(
    "calibudaSlotCooldownUntil"
  );

  const savedTime = saved ? Number(saved) : 0;
  const now = Date.now();

  if (savedTime > now) {
    setSlotCooldownUntil(savedTime);
  } else {
    window.localStorage.removeItem(
      "calibudaSlotCooldownUntil"
    );
    setSlotCooldownUntil(null);
  }

  setClockNow(now);
}, []);

// Update the countdown every second
useEffect(() => {
  if (slotCooldownUntil === null) return;

  const updateCountdown = () => {
    const now = Date.now();
    setClockNow(now);

    if (now >= slotCooldownUntil) {
      setSlotCooldownUntil(null);

      window.localStorage.removeItem(
        "calibudaSlotCooldownUntil"
      );
    }
  };

  updateCountdown();

  const interval = window.setInterval(
    updateCountdown,
    1000
  );

  return () => window.clearInterval(interval);
}, [slotCooldownUntil]);

const slotCooldownRemaining =
  slotCooldownUntil === null
    ? 0
    : Math.max(0, slotCooldownUntil - clockNow);

const cooldownTotalSeconds = Math.ceil(
  slotCooldownRemaining / 1000
);

const cooldownHours = Math.floor(
  cooldownTotalSeconds / 3600
);

const cooldownMinutes = Math.floor(
  (cooldownTotalSeconds % 3600) / 60
);

const cooldownSeconds =
  cooldownTotalSeconds % 60;

const [slotCoins, setSlotCoins] = useState(0);

const [selectedExchangeTicket, setSelectedExchangeTicket] =
  useState<{
    discount: string;
    title: string;
    price: number;
    ticketClass: string;
  } | null>(null);

const [showInsufficientBalance, setShowInsufficientBalance] =
  useState(false);

  const [showTicketPriceWarning, setShowTicketPriceWarning] =
  useState(false);

const [showNoTicketsPopup, setShowNoTicketsPopup] =
  useState(false);

  const [tab, setTab] =
    useState<Tab>("home");

  const [banner, setBanner] =
    useState(0);

  const [cart, setCart] =
  useState<CartItem[]>([]);

const [productLimits] = useState<Record<string, number>>(() => {
  const limits: Record<string, number> = {};

  Object.values(cityProducts).flat().forEach((product) => {
    if (limits[product.name] === undefined) {
      limits[product.name] = Math.random() < 0.5 ? 4 : 7;
    }
  });

  return limits;
});

  const [selectedCity, setSelectedCity] =
    useState<string | null>(null);

  const [shopCategory, setShopCategory] =
    useState<ShopCategory>("All Products");

const [addressCopied, setAddressCopied] =
  useState(false);

  const [cartPopup, setCartPopup] =
  useState<string | null>(null);

  const [previewImage, setPreviewImage] =
  useState<string | null>(null);

  const [showMinTransactionPopup, setShowMinTransactionPopup] =
  useState(false);

  /* =========================================
     CART
  ========================================= */

 const addToCart = (product: Product) => {

  const existing = cart.find(
  (item) => item.product.name === product.name
);

if (existing && existing.quantity >= 4) {
  alert("Ebből a termékből maximum 4 darab tehető a kosárba!");
  return;
}

  setCart((current) => {
    const existing = current.find(
      (item) =>
        item.product.name === product.name &&
        item.area === (selectedCity ?? "")
    );

    if (existing) {
      return current.map((item) =>
        item.product.name === product.name &&
        item.area === (selectedCity ?? "")
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    return [
      ...current,
      {
        product,
        quantity: 1,
        area: selectedCity ?? "",
      },
    ];
  });

  setCartPopup(product.name);
};

const increaseCartItem = (productName: string) => {
  setCart((current) =>
    current.map((item) =>
      item.product.name === productName
        ? {
            ...item,
            quantity: Math.min(item.quantity + 1, 4),
          }
        : item
    )
  );
};

const decreaseCartItem = (productName: string) => {
  setCart((current) =>
    current
      .map((item) =>
        item.product.name === productName
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeCartItem = (productName: string) => {
  setCart((current) =>
    current.filter(
      (item) =>
        item.product.name !== productName
    )
  );
};

const SOL_TO_HUF = 38545;

const getPriceValue = (price: string) => {
  const value = parseFloat(
    price
      .replace(",", ".")
      .replace(/[^\d.]/g, "")
  );

  if (price.toUpperCase().includes("SOL")) {
    return {
      huf: value * SOL_TO_HUF,
      sol: value,
    };
  }

  return {
    huf: value,
    sol: value / SOL_TO_HUF,
  };
};

const cartTotal = cart.reduce(
  (total, item) => {
    const price = getPriceValue(
      item.product.price
    );

    total.huf +=
      price.huf * item.quantity;

    total.sol +=
      price.sol * item.quantity;

    return total;
  },
  {
    huf: 0,
    sol: 0,
  }
);

const cartQuantity = cart.reduce(
  (total, item) =>
    total + item.quantity,
  0
);




  /* =========================================
     NAVIGATION
  ========================================= */

  const openMenu = () => {
    setSelectedCity(null);
    setShopCategory("All Products");
    setTab("menu");
  };


  const openCityShop = (city: string) => {
    setSelectedCity(city);
    setShopCategory("All Products");
  };


  const goHome = () => {
    setSelectedCity(null);
    setShopCategory("All Products");
    setTab("home");
  };


  const goPromo = () => {
    setSelectedCity(null);
    setShopCategory("All Products");
    setTab("promo");
  };



  const goCart = () => {
    setSelectedCity(null);
    setShopCategory("All Products");
    setTab("cart");
  };

const goProfile = () => {
  setSelectedCity(null);
  setShopCategory("All Products");
  setTab("profile");
};
  /* =========================================
     HERO TIMER
  ========================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setBanner(
        (current) =>
          (current + 1) % banners.length
      );
    }, 4000);

    return () =>
      clearInterval(timer);
  }, []);


  /* =========================================
     CURRENT CITY PRODUCTS
  ========================================= */

  const currentCityProducts =
    selectedCity
      ? cityProducts[selectedCity] || []
      : [];


  const visibleProducts =
    shopCategory === "All Products"
      ? currentCityProducts
      : currentCityProducts.filter(
          (product) =>
            product.category === shopCategory
        );


 return (
 <main className={`shop-shell ${tab === "home" ? "home-active" : ""}`}>

    {addressCopied && (
      <div className="address-copied-toast">
        address copied!
      </div>
    )}

    {/* HEADER */}

      {/* HEADER */}

      <header className="top-header">

        <div className="balance-header">

          <span>
            Balance
          </span>

          <strong>
            0<small> HUF</small>
          </strong>

        </div>


        <img
          className="shop-logo"
          src="/cali-removebg-preview.png"
          alt="Shop logo"
        />

      </header>


      {/* CONTENT */}

      <div className="content">


        {/* ===================================
            HOME
        =================================== */}

        {tab === "home" && (
          <>

            <section className="hero-card">

              <div className="hero-slider-window">

                <div
                  className="hero-slider-track"
                  style={{
                    transform:
                      `translateX(-${banner * 100}%)`,
                  }}
                >

                  {banners.map(
                    (item, index) => (
<div
  key={item.update}
  className={`hero-background banner-${index}`}
  style={{
    backgroundImage: `url(${item.image})`,
    cursor: item.update === "" ? "pointer" : "default",
  }}
  onClick={() => {
    if (item.update === "") {
      setTab("topupGuide");
    }
  }}
  role={item.update === "" ? "button" : undefined}
  tabIndex={item.update === "" ? 0 : undefined}
  onKeyDown={(event) => {
    if (
      item.update === "" &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      setTab("topupGuide");
    }
  }}
>

                        <div
                          className="hero-overlay"
                        />

                       <div
  className="hero-text"
>
  {item.update === "" ? (
    <div className="topup-slide-text">
      <div>Updated Guide how to Top Up balance</div>
      <div>Click on this post to see it</div>
    </div>
  ) : item.special ? (
    <>
      <span>
        {item.update}
      </span>

      <strong>
        If you see something happen with the
      </strong>

      <strong>
        bot, chat to
      </strong>

      <strong className="live-support-text">
        Live Support
      </strong>
    </>
  ) : (
    <>
      <span>
        {item.update}
      </span>

      {item.locations.map(
        (location) => (
          <strong
            key={location}
          >
            {location}
          </strong>
        )
      )}
    </>
  )}
</div>
                      </div>

                    )
                  )}

                </div>

              </div>


              <div className="slider-controls">

                {banners.map(
                  (_, index) => (

                    <button
                      key={index}
                      className={
                        banner === index
                          ? "slider-dot active"
                          : "slider-dot"
                      }
                      onClick={() =>
                        setBanner(index)
                      }
                      aria-label={
                        `Slide ${index + 1}`
                      }
                    />

                  )
                )}

              </div>

            </section>


           
<button
  type="button"
  className="big-menu-button"
  onClick={openMenu}
>
  <svg
    className="big-menu-icon"
    viewBox="0 0 48 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="3"
      width="42"
      height="36"
      rx="7"
      stroke="white"
      strokeWidth="4"
    />
    <path
      d="M13 13H35 M13 21H35 M13 29H35"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>

  <span>MENU</span>
</button>



            <section
              className="feature-card"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(10,15,28,.58),rgba(10,15,28,.72)),url('/slidepic.jpeg')",
              }}
            >

              <h2>
                CALIWHEEL
              </h2>

              <div className="feature-row">

               <div className="wheel-items">
  <div>
    <span className="wheel-reel-window">
      <span className="wheel-reel-strip">
       {["🍋", "⭐", "🍉", "🍇", "🍒", "🍋", "⭐", "🍉", "🍇", "🍒"].map((emoji, i) => (
  <span key={i}>{emoji}</span>
))}
      </span>
    </span>
  </div>

  <div>
    <span className="wheel-reel-window">
      <span className="wheel-reel-strip">
        {["⭐", "🍉", "🍇", "🍒", "🍋", "⭐", "🍉", "🍇", "🍒", "🍋"].map((emoji, i) => (
  <span key={i}>{emoji}</span>
))}
      </span>
    </span>
  </div>

  <div>
    <span className="wheel-reel-window">
      <span className="wheel-reel-strip">
        {["🍉", "🍇", "🍒", "🍋", "⭐", "🍉", "🍇", "🍒", "🍋", "⭐"].map((emoji, i) => (
  <span key={i}>{emoji}</span>
))}
      </span>
    </span>
  </div>
</div>

               <button
  type="button"
  className="gold-button"
  onClick={() => {
    setShowSlotGame(true);
    setSlotNotice("Press SPIN to win reward");
    
  }}
>
  OPEN SLOT
</button>

              </div>

            </section>


            <section
              className="info-card"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(10,15,28,.58),rgba(10,15,28,.72)),url('/slidepic.jpeg')",
              }}
            >

              <h2>
                Присоединяйся к нам в команду💪
              </h2>

              <p>
                Нужны:

              </p>

              <strong>
              📨Курьеры
              </strong>

              <p>
              За дополнительной информацией
              </p>

              <button className="text-link">
               ПИШИ в "саппорт"
              </button>

            </section>


            <section className="section">

              <h2 className="gold-title">
                ⭐ Hot Offer (pre-order)
              </h2>

              <div className="no-prem-product">
                No available prem product.
              </div>

              <div className="no-prem-product">
                Open menu to see what we
                have now
              </div>

            </section>

          </>
        )}


        {/* ===================================
            PROMO
        =================================== */}

        {tab === "promo" && (

          <section className="promo-page">

            <div className="promo-hero-title">

<h1>
                🤩CALIBUDA🤩
              </h1>
<h1>
Giveaway              </h1>
              <h1>
                The Giveaway is over 
              </h1>

              <h2>
                winners will be determin soon
              </h2>

            </div>


            <div className="promo-card">

              <h2>
                📅 What's Date?
              </h2>

              <p>
                The Giveway will take place from <b>18/08/26</b> to <b>18/09/26</b> 
              </p>

              <p>
                During this period, you can join the participants of the drawing.
              </p>

            </div>


            <div className="promo-card">

              <h2>
                🎁 What's Gift?
              </h2>
<p>Depending on your winning place, you can get such prizes:</p>
              <div className="promo-prizes">

                <div>
                  🥇 Weed - 30g | Coca - 1g
                </div>

                <div>
                  🥈 Weed - 25g | Coca - 1g
                </div>

                <div>
                  🥉 Weed - 20g | Coca - 1g
                </div>
                <div>
                  4️⃣ Weed - 15g | Coca - 1g
                </div>
<div>
                  5️⃣ Weed - 10g | Coca - 1g
                </div>

              </div>

            </div>


            <div className="promo-card">

              <h2>
                📜 What's Rules?
              </h2>

              <ul>

                <li>
                  Just Top Up your balance for 100000+ HUF with one transaction
                </li>

                <li>
                  You can spend your balance on purchases. Your status for participation in the event will be saved!
                </li>

                <li>
                  5 Winners will be determined randomly. After the draw, all winners will receive a personal message in the telegram bot with manual how to get the prize
                </li>
                <li>
                  
                One prize for one participant. The same participant cannot receive more than one prize
</li>
              </ul>

            </div>

          </section>

        )}


        {/* ===================================
            MENU
        =================================== */}

        {tab === "menu" && (

          <section className="menu-page">


            {/* =================================
                CITY SHOP
            ================================= */}

            {selectedCity !== null ? (

              <section
                style={{
                  width: "100%",
                  paddingBottom: "115px",
                }}
              >

                {/* CITY NAME */}

                <h1
                  style={{
                    margin:
                      "24px 0 40px",
                    padding: 0,
                    color: "#f3f3f6",
                    fontSize: "38px",
                    lineHeight: 1.1,
                    fontWeight: 300,
                    textAlign: "left",
                  }}
                >
                  {selectedCity}
                </h1>


                {/* CATEGORIES */}

                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns:
                      "1.05fr 1fr 1fr",
                    gap: "16px",
                    marginBottom: "40px",
                  }}
                >

                  <button
                    onClick={() =>
                      setShopCategory(
                        "All Products"
                      )
                    }
                    style={{
                      minHeight: "62px",
                      border: 0,
                      borderRadius: "18px",

                      background:
                        shopCategory ===
                        "All Products"
                          ? "#dfb46c"
                          : "#1d223a",

                      color:
                        shopCategory ===
                        "All Products"
                          ? "#fff"
                          : "#dfb46c",

                      fontSize: "22px",
                      fontWeight: 400,

                      boxShadow:
                        "0 0 10px rgba(116,190,91,.35)",
                    }}
                  >
                    ☷ All Prods
                  </button>


                  <button
                    onClick={() =>
                      setShopCategory(
                        "Digital"
                      )
                    }
                    style={{
                      minHeight: "62px",

                      border:
                        shopCategory === "Digital"
                          ? "2px solid #dfb46c"
                          : "1px solid rgba(116,181,103,.65)",

                      borderRadius: "18px",

                      background:
                        shopCategory === "Digital"
                          ? "#dfb46c"
                          : "#1d223a",

                      color:
                        shopCategory === "Digital"
                          ? "#fff"
                          : "#dfb46c",

                      fontSize: "22px",
                      fontWeight: 400,

                      boxShadow:
                        "0 0 8px rgba(116,190,91,.5), 0 0 18px rgba(116,190,91,.25)",
                    }}
                  >
                    🌿 Organics
                  </button>


                  <button
                    onClick={() =>
                      setShopCategory(
                        "Premium"
                      )
                    }
                    style={{
                      minHeight: "62px",

                      border:
                        shopCategory === "Premium"
                          ? "2px solid #dfb46c"
                          : "1px solid rgba(116,181,103,.65)",

                      borderRadius: "18px",

                      background:
                        shopCategory === "Premium"
                          ? "#dfb46c"
                          : "#1d223a",

                      color:
                        shopCategory === "Premium"
                          ? "#fff"
                          : "#dfb46c",

                      fontSize: "22px",
                      fontWeight: 400,

                      boxShadow:
                        "0 0 8px rgba(116,190,91,.5), 0 0 18px rgba(116,190,91,.25)",
                    }}
                  >
                    ⚗️ Chems
                  </button>

                </div>


                {/* PRODUCTS */}

                {visibleProducts.length === 0 ? (

                  <div
                    style={{
                      width: "100%",
                      marginTop: "30px",
                      textAlign: "center",
                      color: "#f1f1f4",
                      fontSize: "23px",
                      lineHeight: 1.4,
                    }}
                  >
                    No products available
                    in this category.
                  </div>

                ) : (

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2,minmax(0,1fr))",
                      gap: "18px",
                    }}
                  >

                    {visibleProducts.map(
                      (product) => (

                        <article
                          key={product.name}
                          style={{
                            overflow: "hidden",
                            borderRadius: "21px",
                            background:
                              "linear-gradient(180deg,#7c4263,#8d503d)",
                            border:
                              "1px solid rgba(113,158,100,.35)",
                            boxShadow:
                              "0 0 14px rgba(92,145,81,.35)",
                          }}
                        >

    <div
  onClick={() => setPreviewImage(product.image)}
  style={{
    width: "100%",
    height: "320px",
    backgroundImage:
      `url(${product.image})`,
    backgroundSize:
      "cover",
    backgroundPosition:
      "center",
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    cursor: "pointer",
    
  }}
>

                            <div

                            >
                              
                            </div>

                          </div>


                          <div
                            style={{
                              padding: "16px",
                            }}
                          >

                            <h2
                              style={{
                                margin:
                                  "0 0 9px",
                                color: "#fff",
                                fontSize:
                                  "25px",
                                fontWeight: 700,
                                lineHeight: 1.2,
                              }}
                            >
                              {product.name}
                            </h2>


                            <p
                              style={{
                                margin: 0,
                                minHeight:
                                  "69px",
                                color:
                                  "#8ff3e8",
                                fontSize:
                                  "19px",
                                lineHeight:
                                  1.22,
                                fontStyle:
                                  "italic",
                              }}
                            >
                              {
                                product.description
                              }
                            </p>


                            <div
                              style={{
                                marginTop:
                                  "17px",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "space-between",
                                gap:
                                  "10px",
                              }}
                            >

                              <strong
                                style={{
                                  color:
                                    "#fff",
                                  fontSize:
                                    "31px",
                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                {product.price}
                              </strong>


<button
  type="button"
  onClick={() => addToCart(product)}
  aria-label={`Add ${product.name} to cart`}
  style={{
    width: "52px",
    height: "52px",
    flex: "0 0 52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: 0,
    borderRadius: "12px",
    background: "#96c86e",
    color: "#ffffff",
    padding: "9px",
    cursor: "pointer",
  }}
>
  <svg
    viewBox="0 0 48 48"
    width="100%"
    height="100%"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 7H9L14 30H38L44 14H12"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 17H34M29 12V22"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="18" cy="38" r="3.5" fill="white" />
    <circle cx="36" cy="38" r="3.5" fill="white" />
  </svg>
</button>


                            </div>

                          </div>

                        </article>

                      )
                    )}

                  </div>
                )}

              </section>

            ) : (

              /* =================================
                 CITY LIST
              ================================= */

              <>

                <div
                  className="menu-page-header"
                >

                  <h1>
                    Please select
                    area or region
                  </h1>


                  <button
                    className=
                      "menu-close-button"
                    onClick={goHome}
                    aria-label=
                      "Close menu"
                  >
                    ×
                  </button>

                </div>


                <div
                  className="menu-search"
                >

                  <span>
                    ⌕
                  </span>

                  <input
                    type="text"
                    placeholder="Search..."
                    aria-label=
                      "Search cities"
                  />

                </div>


                <section
                  className=
                    "menu-category"
                >

                  <h2>
                    Budapest:
                  </h2>


                  <button
                    className=
                      "menu-category-main"
                    onClick={() =>
                      openCityShop(
                        "Rákosliget"
                      )
                    }
                  >
                    Rákosliget
                  </button>


                  <div
                    className=
                      "menu-grid three"
                  >

                    {budapestCities
                      .slice(1, 10)
                      .map(
                        (city) => (

                          <button
                            key={city}
                            onClick={() =>
                              openCityShop(
                                city
                              )
                            }
                          >
                            {city}
                          </button>

                        )
                      )}

                  </div>


                  <div
                    className=
                      "menu-grid two"
                  >

                    {budapestCities
                      .slice(10)
                      .map(
                        (city) => (

                          <button
                            key={city}
                            onClick={() =>
                              openCityShop(
                                city
                              )
                            }
                          >
                            {city}
                          </button>

                        )
                      )}

                  </div>

                </section>


            
<section className="menu-category">
  <h2>Regions:</h2>

  {/* 1. teljes szélességű város */}
  <button
    type="button"
    className="menu-category-main"
    onClick={() => openCityShop(regionCities[0])}
  >
    {regionCities[0]}
  </button>

  {/* 2. három város */}
  <div className="menu-grid three">
    {regionCities.slice(1, 4).map((city) => (
      <button
        type="button"
        key={city}
        onClick={() => openCityShop(city)}
      >
        {city}
      </button>
    ))}
  </div>

  {/* 3. két város */}
  <div className="menu-grid two">
    {regionCities.slice(4, 6).map((city) => (
      <button
        type="button"
        key={city}
        onClick={() => openCityShop(city)}
      >
        {city}
      </button>
    ))}
  </div>

  {/* 4. két város */}
  <div className="menu-grid two">
    {regionCities.slice(6, 8).map((city) => (
      <button
        type="button"
        key={city}
        onClick={() => openCityShop(city)}
      >
        {city}
      </button>
    ))}
  </div>

  {/* 5. két város */}
  <div className="menu-grid two">
    {regionCities.slice(8, 10).map((city) => (
      <button
        type="button"
        key={city}
        onClick={() => openCityShop(city)}
      >
        {city}
      </button>
    ))}
  </div>

  {/* 6. a többi város, három oszlopban */}
  <div className="menu-grid three">
    {regionCities.slice(10).map((city) => (
      <button
        type="button"
        key={city}
        onClick={() => openCityShop(city)}
      >
        {city}
      </button>
    ))}
  </div>
</section>


              </>
            )}

          </section>
        )}


        {/* ===================================
            PROFILE
        =================================== */}

        {tab === "profile" && (

          <section
            className="profile-page"
          >

            <div
              className=
                "profile-balance"
            >

              <div
                className=
                  "profile-balance-left"
              >

                <span>
                  Current Balance:
                </span>

                <strong>
                  0<small> HUF</small>
                </strong>

              </div>


              <button
                className=
                  "profile-refresh-button"
              >
                <span>
                  ↻
                </span>

                Refresh
              </button>

            </div>


            <p
              className=
                "payment-description"
            >
              Copy and paste the
              payment SOL address
              into your wallet.
            </p>


            <section
              className=
                "profile-solana-card"
            >

              <div
                className=
                  "profile-solana-title"
              >

                <img
                  className=
                    "solana-logo-image"
                  src=
                    "/sol-removebg-preview.png"
                  alt="Solana"
                />

                <strong>
                  Solana Address
                </strong>

              </div>


              <div
                className=
                  "profile-address-box"
              >

                <span>
                  E2ZRPqU6JC9GsrQTd19JjA6yuyz9WcyefKcSmiuPrJDn
                </span>


                <button
  className="profile-copy-button"
  onClick={async () => {
    await navigator.clipboard.writeText(
      "E2ZRPqU6JC9GsrQTd19JjA6yuyz9WcyefKcSmiuPrJDn"
    );

    setAddressCopied(true);

    setTimeout(() => {
      setAddressCopied(false);
    }, 1500);
  }}
  aria-label="Copy wallet address"
>
  📋
</button>

              </div>


             <button
  type="button"
  className="profile-topup-button"
  onClick={() => setTab("topupGuide")}
>
  Complete guide "How to Top Up Balance"
</button>


              <div
                className=
                  "profile-bonus"
              >
                +10% Deposit Bonus from 100 000 HUF
              </div>

            </section>


            <button
              className=
                "profile-support-button"
            >
              CHAT TO SUPPORT
            </button>


            <div
              className=
                "profile-exchange"
            >

              <span>
                Exchange Rate:
              </span>

              <strong>
                1 SOL ≈ 35035 HUF
              </strong>

            </div>


            <div
              className=
                "profile-divider"
            />


            <section
              className=
                "profile-transactions"
            >

              <h2>
                Last transactions
              </h2>


              <div
                className=
                  "transaction-item"
              >

                <div>

                  <strong>
                    Deposit
                  </strong>

                  <span>
                    20.09.2026
                  </span>

                </div>

                <b>
                  —
                </b>

              </div>


              <div
                className=
                  "transaction-item"
              >

                <div>

                  <strong>
                    No more transactions
                  </strong>

                  <span>
                 
                  </span>

                </div>

                <b>
                  —
                </b>

              </div>

            </section>
<div className="profile-notice">
  <ul>
    <li>
      Send only Solana (SOL) to this address. Other funds will be lost forever.
      We recommend sending a bit bigger amount to cover the network fee.
    </li>

    <li>
      If you use Custodial wallet like Revolute, choose "Trust Wallet" option
      when send funds
    </li>

    <li>
      This is approximate exchange rate. Solana rate changes every second.
      We recommend checking the rate before top up balance
    </li>

    <li>
      If you have issue with payment or any questions, create a ticket in our
      special form
    </li>
  </ul>
</div>
          </section>
        )}


{tab === "topupGuide" && (
  <section className="topup-guide-page">
    <button
      type="button"
      className="topup-guide-back"
      onClick={() => setTab("profile")}
    >
    
    </button>

    <h1 className="topup-guide-main-title">
      A complete guide on how to top up CaliBuda
    </h1>

    <section className="topup-guide-services">
      <h2>List of All tested working services</h2>
      <p>Crypto.com</p>
      <p>Exodus Wallet</p>
    </section>

    <h2 className="topup-guide-section-title">
      Video Guide (Crypto.com)
    </h2>


<div className="topup-guide-video">
  <video
    className="topup-guide-video-player"
    controls
    playsInline
    preload="metadata"
  >
    <source
      src="/topup-guide/topup-video.mp4"
      type="video/mp4"
    />
    Your browser does not support video playback.
  </video>
</div>

    
    <h2 className="topup-guide-section-title">
      Text Guide (Crypto.com)
    </h2>

    <div className="topup-guide-step">
      <p>
        1. Download and install Crypto.com app from App Store
        or Google Play and complete registration.
      </p>

      <div className="topup-guide-badges">
        <div> Download on the App Store</div>
        <div>▶ GET IT ON Google Play</div>
      </div>
    </div>

    <div className="topup-guide-step">
      <p>
        2. After Registration you will have one of two options:
      </p>
      <p>
        - You will be asked to complete KYC verification.
        <br />
        - You will be redirected to the app's main screen.
      </p>
      <p>
        In the first case, simply follow the app's instructions
        step by step.
        <br />
        First part of this guide will be based on the second option.
      </p>
      <p>
        ⚠️ Keep in mind that you can be asked to complete KYC
        at any step.
      </p>
    </div>

    <div className="topup-guide-step">
      <p>3. Press "Buy" button</p>
      <img
        src="/tutoriall1.jpeg"
        alt="Crypto.com Buy button"
        className="topup-guide-image"
      />
    </div>

    <div className="topup-guide-step">
      <p>4. Select Solana</p>
      <img
        src="/tutoriall2.jpeg"
        alt="Select Solana"
        className="topup-guide-image"
      />
    </div>

    <div className="topup-guide-step">
      <p>
        5. Switch from USD to SOL and enter the amount you want
        to buy, then press "Review Order".
      </p>
      <img
        src="/tutoriall3.jpeg"
        alt="Enter amount and review order"
        className="topup-guide-image"
      />
    </div>

    <div className="topup-guide-step">
      <p>
        6. You may need to submit additional information about
        your income.
      </p>
      <img
        src="/tutoriall4.jpeg"
        alt="Additional information required"
        className="topup-guide-image"
      />

      <p>
        Here is a list of questions and answers for it
        (you can choose mine if you don't have official income).
      </p>

      <img
        src="/tutoriall5.jpeg"
        alt="Annual income question"
        className="topup-guide-image"
      />

      <img
        src="/tutoriall6.jpeg"
        alt="Occupation question"
        className="topup-guide-image"
      />

      <img
        src="/tutoriall7.jpeg"
        alt="Source of wealth question"
        className="topup-guide-image"
      />

      <img
        src="/tutoriall8.jpeg"
        alt="Country question"
        className="topup-guide-image"
      />

      <img
        src="/tutoriall9.jpeg"
        alt="Citizenship question"
        className="topup-guide-image"
      />
    </div>

    <div className="topup-guide-step">
      <p>
        7. After submitting the information, press "Review Order"
        again. You will be redirected to the confirmation page.
      </p>
      <p>
        Complete your purchase using the payment method you chose.
      </p>
      <p>
        After a short time, your SOL balance should appear in
        your Crypto.com account.
      </p>
    </div>

    <div className="topup-guide-step">
      <p>8. Now you are ready to top up your CaliBuda balance.</p>
      <p>
        Go to "Balance" on the CaliBuda app and copy your SOL
        address.
      </p>
    </div>

    <div className="topup-guide-step">
      <p>
        9. Go back to Crypto.com and open "Accounts".
        Select "Crypto" and choose SOL.
      </p>
      <img
        src="/tutoriall10.jpeg"
        alt="Open Accounts and select SOL"
        className="topup-guide-image"
      />
    </div>

    <div className="topup-guide-step">
      <p>
        10. Press "Withdraw" and choose "External Wallet".
      </p>
      <img
        src="/tutoriall11.jpeg"
        alt="Choose External Wallet"
        className="topup-guide-image"
      />
    </div>

    <div className="topup-guide-step">
      <p>
        11. Add the CaliBuda address to your whitelist and
        select Solana as the network.
      </p>
      <img
        src="/tutoriall12.jpeg"
        alt="Select Solana network and add wallet address"
        className="topup-guide-image"
      />
    </div>

    <div className="topup-guide-step">
      <p>
        12. Paste your SOL address into "Wallet Address".
        Enter any name you want into "Wallet Name".
      </p>
      <img
        src="/tutoriall13.jpeg"
        alt="Wallet address and wallet name"
        className="topup-guide-image"
      />
    </div>

    <div className="topup-guide-step">
      <p>
        13. After the address has been added successfully,
        select it from the list.
      </p>
      <img
        src="/tutoriall14.jpeg"
        alt="Select saved wallet"
        className="topup-guide-image"
      />
    </div>

    <div className="topup-guide-step">
      <p>
        14. Switch from USD to SOL, enter the withdrawal amount,
        and press "Withdraw".
      </p>
      <img
        src="/tutoriall15.jpeg"
        alt="Enter withdrawal amount"
        className="topup-guide-image"
      />
    </div>

    <div className="topup-guide-step">
      <p>
        15. Verify your payment. After 3–5 minutes, refresh
        your CaliBuda balance.
      </p>
      <img
        
      
      />
    </div>
  </section>
)}


        {/* ===================================
            CART POPUP
        =================================== */}

       {tab === "cart" && (
  <div className="cart-popup-overlay">
    <section className="cart-popup">

      <div className="cart-popup-header">
        <h1>Cart</h1>

        <button
          className="cart-popup-close"
          onClick={goHome}
          aria-label="Close cart"
        >
          ×
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="cart-popup-empty">

          <img
            className="cart-popup-logo"
            src="/cali-removebg-preview.png"
            alt="Shop logo"
          />

          <div className="cart-popup-text">
            <h2>Your Cart is Empty.</h2>

            <p>
              Open menu to see our products
            </p>
          </div>

        </div>
      ) : (
        <>

          <div className="cart-popup-items">

            {cart.map((item) => (
              <article
                className="cart-product-card"
                key={`${item.product.name}-${item.area}`}
              >

                <div
                  className="cart-product-image"
                  style={{
                    backgroundImage:
                      `url(${item.product.image})`,
                  }}
                  onClick={() =>
                    setPreviewImage(
                      item.product.image
                    )
                  }
                />

                <div className="cart-product-content">

                  <div className="cart-product-top">

                    <h2>
                      {item.product.name}
                    </h2>

                    <button
                      className="cart-remove-button"
                      onClick={() =>
                        removeCartItem(
                          item.product.name
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                  {item.area && (
                    <div className="cart-product-area">
                      Area: {item.area}
                    </div>
                  )}

                  <div className="cart-product-description">
                    {item.product.description}
                  </div>

                  <div className="cart-product-bottom">

                    <strong className="cart-product-price">
                      {item.product.price}
                    </strong>

                    <div className="cart-quantity">

                      <button
                        onClick={() =>
                          decreaseCartItem(
                            item.product.name
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseCartItem(
                            item.product.name
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

              </article>
            ))}

          </div>

          <div className="cart-summary">

            <div className="cart-total-row">

              <span>
                Total:
              </span>

              <strong>
                {new Intl.NumberFormat(
                  "hu-HU",
                  {
                    maximumFractionDigits: 0,
                  }
                ).format(cartTotal.huf)}
                <small>
                  {" "}HUF
                </small>
              </strong>

              <em>
                ≈ {cartTotal.sol.toFixed(4)} SOL
              </em>

            </div>
<button
  type="button"
  className="cart-ticket-button"
  onClick={() => {
    const hasExpensiveProduct = cart.some(
      (item) => getPriceValue(item.product.price).huf > 25000
    );

    if (hasExpensiveProduct) {
      setShowTicketPriceWarning(true);
      setShowNoTicketsPopup(false);
    } else {
      setShowTicketPriceWarning(false);
      setShowNoTicketsPopup(true);
    }
  }}
>
  Use Ticket
</button>

           <button
  type="button"
  className="cart-pay-button"
  onClick={() => setShowInsufficientBalance(true)}
>
  PAY
</button>

          </div>

        </>
      )}

    </section>
  </div>
)}


      {/* ===================================
          BOTTOM NAV
      =================================== */}

      <nav
        className="bottom-nav"
      >

        <NavButton
          active={
            tab === "home"
          }
          icon="⌂"
          label="Home"
          onClick={goHome}
        />


        <NavButton
          active={
            tab === "promo"
          }
          icon="🎁"
          label="Promo"
          onClick={goPromo}
        />


        <NavButton
          active={
            tab === "menu"
          }
          icon="☰"
          label="Menu"
          onClick={openMenu}
        />

<NavButton
  active={tab === "profile"}
  icon="▭"
  label="Profile"
  onClick={() => {
    goProfile();
    setShowMinTransactionPopup(true);
  }}
/>

        <NavButton
          active={
            tab === "cart"
          }
          icon="🛒"
          label="Cart"
          badge={
            cart.length
          }
          onClick={goCart}
        
        />
       

      </nav>
{previewImage && (
  <div
    className="image-preview-overlay"
    onClick={() => setPreviewImage(null)}
  >
    <div
      className="image-preview-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="image-preview-close"
        onClick={() => setPreviewImage(null)}
        aria-label="Close image preview"
      >
        ×
      </button>

      <img
        src={previewImage}
        alt="Product preview"
        className="image-preview-image"
      />
    </div>
  </div>
)}
{cartPopup && (
  <div
    className="cart-added-overlay"
    onClick={() => setCartPopup(null)}
  >
    <div
      className="cart-added-popup"
      onClick={(event) =>
        event.stopPropagation()
      }
    >
      <button
        className="cart-added-close"
        onClick={() => setCartPopup(null)}
      >
        ×
      </button>

      <div className="cart-added-check">
        ✓
      </div>

      <div className="cart-added-message">
        <strong>{cartPopup}</strong> added to cart
      </div>

      <div className="cart-added-actions">
        <button
          className="cart-added-keep"
          onClick={() => setCartPopup(null)}
        >
          Keep Shopping
        </button>

        <button
          className="cart-added-open"
          onClick={() => {
            setCartPopup(null);
            goCart();
          }}
        >
          Open Cart
        </button>
        
      </div>
    </div>
  </div>
)}


{showMinTransactionPopup && (
  <div
    className="min-transaction-overlay"
    onClick={() => setShowMinTransactionPopup(false)}
  >
    <div
      className="min-transaction-modal"
      onClick={(event) => event.stopPropagation()}
      role="alertdialog"
      aria-modal="true"
      aria-label="Minimum transaction warning"
    >
      <button
        className="min-transaction-close"
        onClick={() => setShowMinTransactionPopup(false)}
        aria-label="Close warning"
      >
        ×
      </button>

      <svg
        className="min-transaction-warning-icon"
        viewBox="0 0 140 125"
        aria-hidden="true"
      >
        <path
          d="M57 8 Q70 -2 81 14 L136 108 Q144 124 124 124 H16 Q-2 124 8 108 Z"
          fill="#ffb900"
        />
        <rect
          x="64"
          y="35"
          width="12"
          height="41"
          rx="6"
          fill="#1d233d"
        />
        <circle cx="70" cy="98" r="8" fill="#1d233d" />
      </svg>

      <p className="min-transaction-message">
        Minimum transaction is <strong>0.02 SOL</strong>
      </p>

      <button
        className="min-transaction-confirm"
        onClick={() => setShowMinTransactionPopup(false)}
      >
        Got It!
      </button>



      </div>
    </div>
  )}

  {showInsufficientBalance && (
    <div
      className="insufficient-balance-overlay"
      onClick={() => setShowInsufficientBalance(false)}
    >
      <div
        className="insufficient-balance-modal"
        onClick={(event) => event.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-label="Insufficient balance"
      >
        <button
          className="insufficient-balance-close"
          onClick={() => setShowInsufficientBalance(false)}
          aria-label="Close"
        >
          ×
        </button>

        <svg
          className="insufficient-balance-icon"
          viewBox="0 0 124 124"
          aria-hidden="true"
        >
          <circle cx="62" cy="62" r="62" fill="#59418d" />
          <circle cx="43" cy="50" r="8" fill="#1d233d" />
          <circle cx="81" cy="50" r="8" fill="#1d233d" />
          <path
            d="M34 91 C44 65 80 65 90 91"
            fill="none"
            stroke="#1d233d"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>

        <p className="insufficient-balance-message">
          Not enough HUF on your balance. Please top up your balance to make purchase
        </p>

        <button
          className="insufficient-balance-topup"
          onClick={() => {
            setShowInsufficientBalance(false);
            setShowMinTransactionPopup(false);
            goProfile();
          }}
        >
          <span className="topup-plus-icon">+</span>
          Top Up
        </button>
      </div>
    </div>
  )}

  
{showTicketPriceWarning && (
  <div
    className="insufficient-balance-overlay"
    onClick={() => setShowTicketPriceWarning(false)}
  >
    <div
      className="insufficient-balance-modal"
      onClick={(event) => event.stopPropagation()}
      role="alertdialog"
      aria-modal="true"
      aria-label="Product price limit warning"
    >
      <button
        type="button"
        className="insufficient-balance-close"
        onClick={() => setShowTicketPriceWarning(false)}
        aria-label="Close warning"
      >
        ×
      </button>

      <svg
        className="insufficient-balance-icon"
        viewBox="0 0 124 124"
        aria-hidden="true"
      >
        <circle cx="62" cy="62" r="62" fill="#59418d" />
        <circle cx="43" cy="50" r="8" fill="#1d233d" />
        <circle cx="81" cy="50" r="8" fill="#1d233d" />
        <path
          d="M34 91 C44 65 80 65 90 91"
          fill="none"
          stroke="#1d233d"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      <p className="insufficient-balance-message">
        You can't apply ticket for product you want to buy.
        Product price must be less then 25000 HUF
      </p>

      <button
        type="button"
        className="insufficient-balance-topup"
        onClick={() => setShowTicketPriceWarning(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
{showNoTicketsPopup && (
  <div
    className="no-tickets-overlay"
    onClick={() => setShowNoTicketsPopup(false)}
  >
    <div
      className="no-tickets-modal"
      onClick={(event) => event.stopPropagation()}
      role="alertdialog"
      aria-modal="true"
      aria-label="You have no tickets"
    >
      <button
        type="button"
        className="no-tickets-close"
        onClick={() => setShowNoTicketsPopup(false)}
        aria-label="Close"
      >
        ×
      </button>

      <svg
        className="no-tickets-icon"
        viewBox="0 0 124 124"
        aria-hidden="true"
      >
        <circle cx="62" cy="62" r="62" fill="#59418d" />
        <circle cx="43" cy="50" r="8" fill="#1d233d" />
        <circle cx="81" cy="50" r="8" fill="#1d233d" />
        <path
          d="M34 91 C44 65 80 65 90 91"
          fill="none"
          stroke="#1d233d"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      <p>You have no tickets</p>

      <button
        type="button"
        className="no-tickets-openslot"
        onClick={() => {
          setShowNoTicketsPopup(false);
          setShowSlotGame(true);
          setSlotGameTab("spin");
          setSlotNotice("Press SPIN to win reward");
        }}
      >
        <span className="no-tickets-plus">+</span>
        Open CaliSlot
      </button>
    </div>
  </div>
)}



</div>


{showSlotGame && (
<div
  className={`slot-game-screen ${
    slotGameTab === "exchange" ? "slot-exchange-active" : ""
  }`}
>
    <div className="slot-game-wallet">
      <img
        className="slot-game-logo"
        src="/cali-removebg-preview.png"
        alt="CALIBUDA"
      />

      <div className="slot-game-counters">
        <div className="slot-game-counter">
          <span className="slot-ticket slot-ticket-yellow">
            -50%
          </span>
          <b>0</b>
        </div>

        <div className="slot-game-counter">
          <span className="slot-ticket slot-ticket-blue">
            -25%
          </span>
          <b>0</b>
        </div>

        <div className="slot-game-counter">
          <span className="slot-ticket slot-ticket-green">
            -10%
          </span>
          <b>0</b>
        </div>

      <div className="slot-game-counter slot-game-coins">
  <span>🪙</span>
  <b>{slotCoins}</b>
</div>
      </div>
    </div>

   

<div className="slot-game-content">
  {slotGameTab === "exchange" ? (
    <div className="slot-exchange-list">
      <div className="slot-exchange-card">
        <div className="slot-exchange-ticket slot-ticket-yellow">
          -50%
        </div>
        <div className="slot-exchange-details">
          <strong>-50% Sale Ticket</strong>
          <span>590 🪙</span>
        </div>
        <button
  type="button"
  className="slot-exchange-buy"
  onClick={() =>
    setSelectedExchangeTicket({
      discount: "-50%",
      title: "-50% Sale Ticket",
      price: 590,
      ticketClass: "slot-ticket-yellow",
    })
  }
>
  Buy
</button>
      </div>

      <div className="slot-exchange-card">
        <div className="slot-exchange-ticket slot-ticket-blue">
          -25%
        </div>
        <div className="slot-exchange-details">
          <strong>-25% Sale Ticket</strong>
          <span>360 🪙</span>
        </div>
       <button
  type="button"
  className="slot-exchange-buy"
  onClick={() =>
    setSelectedExchangeTicket({
      discount: "-25%",
      title: "-25% Sale Ticket",
      price: 360,
      ticketClass: "slot-ticket-blue",
    })
  }
>
  Buy
</button>
      </div>

      <div className="slot-exchange-card">
        <div className="slot-exchange-ticket slot-ticket-green">
          -10%
        </div>
        <div className="slot-exchange-details">
          <strong>-10% Sale Ticket</strong>
          <span>160 🪙</span>
        </div>
      <button
  type="button"
  className="slot-exchange-buy"
  onClick={() =>
    setSelectedExchangeTicket({
      discount: "-10%",
      title: "-10% Sale Ticket",
      price: 160,
      ticketClass: "slot-ticket-green",
    })
  }
>
  Buy
</button>
      </div>
    </div>
  ) : slotGameTab === "rules" ? (
    <section className="slot-rules-card">
      <h2>Rules</h2>
      <p>Press SPIN to play and win rewards.</p>
      <p>Exchange your coins for Sale Tickets.</p>
    </section>
  ) : (
    <>
      <section className="slot-shop-banner">
        <div className="slot-shop-copy">
          <h1>CALIBUDA</h1>
          <p>Best Hungary Shop</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowSlotGame(false);
            goHome();
          }}
        >
          OPEN SHOP
        </button>
      </section>

<section className="slot-machine-card">
  <div className="slot-reels">
    {slotReels.map((symbol, index) => (
      <div className="slot-reel" key={index}>
        {spinningReels[index] ? (
          <div className="slot-reel-strip">
            {[
              "🍋", "⭐", "🍉", "🍇", "🍒",
              "🍋", "⭐", "🍉", "🍇", "🍒",
            ].map((emoji, emojiIndex) => (
              <span key={emojiIndex}>{emoji}</span>
            ))}
          </div>
        ) : (
          <span className="slot-reel-static">{symbol}</span>
        )}
      </div>
    ))}
  </div>

  {slotCooldownRemaining > 0 && (
    <div
      className="slot-cooldown-timer"
      role="timer"
      aria-label="Time remaining until the next spin"
    >
      {cooldownHours}h : {cooldownMinutes}m : {cooldownSeconds}s
    </div>
  )}

  <button
    type="button"
    className="slot-spin-button"
    disabled={isSpinning || slotCooldownRemaining > 0}
    onClick={async () => {
      if (
        isSpinning ||
        (slotCooldownUntil !== null &&
          slotCooldownUntil > Date.now())
      ) {
        return;
      }

      const symbols = ["🍋", "⭐", "🍉", "🍇", "🍒"];
      const randomSymbol = () =>
        symbols[Math.floor(Math.random() * symbols.length)];

      const wait = (ms: number) =>
        new Promise<void>((resolve) =>
          window.setTimeout(resolve, ms)
        );

      const cooldownEnd = Date.now() + 24 * 60 * 60 * 1000;

      window.localStorage.setItem(
        "calibudaSlotCooldownUntil",
        String(cooldownEnd)
      );

      setSlotCooldownUntil(cooldownEnd);
      setClockNow(Date.now());
      setIsSpinning(true);
      setSpinningReels([true, true, true]);
      setSlotNotice("");

      const finalResults = [...slotReels];

      const spinReel = async (
        reelIndex: number,
        duration: number
      ) => {
        const endTime = Date.now() + duration;

        while (Date.now() < endTime) {
          setSlotReels((current) =>
            current.map((symbol, index) =>
              index === reelIndex ? randomSymbol() : symbol
            )
          );

          await wait(80);
        }

        const finalSymbol = randomSymbol();
        finalResults[reelIndex] = finalSymbol;

        setSlotReels((current) =>
          current.map((symbol, index) =>
            index === reelIndex ? finalSymbol : symbol
          )
        );

        setSpinningReels((current) =>
          current.map((spinning, index) =>
            index === reelIndex ? false : spinning
          )
        );
      };

      await Promise.all([
        spinReel(0, 1400),
        spinReel(1, 2200),
        spinReel(2, 3000),
      ]);

      const uniqueSymbols = new Set(finalResults).size;

      const reward =
        uniqueSymbols === 1 ? 60 :
        uniqueSymbols === 2 ? 30 :
        15;

      setSlotCoins((current) => current + reward);
      setSlotNotice(`🪙 You won ${reward} CaliCoins`);
      setIsSpinning(false);
    }}
  >
    SPIN
  </button>

  {!isSpinning && <p>{slotNotice}</p>}
</section>

    </>
  )}
</div>

{selectedExchangeTicket && (
  <div
    className="slot-confirm-overlay"
    onClick={() => setSelectedExchangeTicket(null)}
  >
    <div
      className="slot-confirm-modal"
      onClick={(event) => event.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label="Confirm your purchase"
    >
      <button
        type="button"
        className="slot-confirm-close"
        onClick={() => setSelectedExchangeTicket(null)}
        aria-label="Close"
      >
        ×
      </button>

      <h2>Confirm Your Purchase</h2>

      <div
        className={`slot-confirm-ticket ${selectedExchangeTicket.ticketClass}`}
      >
        {selectedExchangeTicket.discount}
      </div>

      <p className="slot-confirm-product">
        {selectedExchangeTicket.title} x 1
      </p>

      <div className="slot-confirm-price">
        {selectedExchangeTicket.price}
        <span>🪙</span>
      </div>

      <div className="slot-confirm-actions">
        
<button
  type="button"
  className="slot-confirm-accept"
  onClick={() => {
    setSelectedExchangeTicket(null);
    setShowNotEnoughCoins(true);
  }}
>
  CONFIRM
</button>
        <button
          type="button"
          className="slot-confirm-cancel"
          onClick={() => setSelectedExchangeTicket(null)}
        >
          CANCEL
        </button>
      </div>
    </div>
  </div>
)}


    <nav className="slot-game-bottom-nav">
     
<button
  type="button"
  className={slotGameTab === "spin" ? "slot-nav-active" : ""}
  onClick={() => setSlotGameTab("spin")}
>
  <span>⌂</span>
  Spin
</button>

<button
  type="button"
  className={slotGameTab === "exchange" ? "slot-nav-active" : ""}
  onClick={() => setSlotGameTab("exchange")}
>
  <span>◎</span>
  Exchange
</button>

<button
  type="button"
  onClick={() => setShowSlotRulesModal(true)}
>
  <span>▤</span>
  Rules
</button>
    </nav>
    
{showSlotRulesModal && (
  <div
    className="slot-rules-overlay"
    onClick={() => setShowSlotRulesModal(false)}
  >
    <div
      className="slot-rules-modal"
      onClick={(event) => event.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label="Guide and Rules"
    >
      <button
        type="button"
        className="slot-rules-close"
        onClick={() => setShowSlotRulesModal(false)}
        aria-label="Close"
      >
        ×
      </button>

      <h2>Guide</h2>

      <div className="slot-rules-text">
        <p>
          1. Spin the Slot every 24 hours and get a reward from 15 to 50 CaliCoins.
        </p>

        <p>
          2. In the future, you will be able to exchange CaliCoins for cool prizes, such as discount coupons and others.
        </p>

        <p>
          3. You have a chance to get a super prize from the slot: -50% 'GOLDEN TICKET' on your purchase.
        </p>

        <p>
          4. For Exchange your discount you need{" "}
          <button
            type="button"
            className="slot-rules-link"
            onClick={() => {
              setShowSlotRulesModal(false);
              setShowSlotGame(false);
              goHome();
            }}
          >
            go to shop
          </button>{" "}
          and in cart press "USE TICKETS" and apply ticket to product
        </p>
      </div>

      <h2>Rules</h2>

      <div className="slot-rules-text">
        <p>
          1. You can apply one ticket per purchase. That's mean if have few product in cart you can use only one ticket to one product and can not use one more ticket to other product
        </p>

        <p>
          2. You can apply the ticket to a product priced at 25,000 HUF or less.
        </p>

        <p>
          3. Any attempts at cheating will result in a permanent ban from the slot.
        </p>
      </div>

      <div className="slot-rules-confirm-wrap">
        <button
          type="button"
          className="slot-rules-confirm"
          onClick={() => setShowSlotRulesModal(false)}
        >
          CONFIRM
        </button>
      </div>
    </div>
  </div>
)}

    
{showNotEnoughCoins && (
  <div
    className="slot-coins-warning-overlay"
    onClick={() => setShowNotEnoughCoins(false)}
  >
    <div
      className="slot-coins-warning-modal"
      onClick={(event) => event.stopPropagation()}
      role="alertdialog"
      aria-modal="true"
      aria-label="Not enough CaliCoins"
    >
      <svg
        className="slot-coins-sad-icon"
        viewBox="0 0 124 124"
        aria-hidden="true"
      >
        <circle cx="62" cy="62" r="62" fill="#59418d" />
        <circle cx="43" cy="50" r="8" fill="#050505" />
        <circle cx="81" cy="50" r="8" fill="#050505" />
        <path
          d="M34 91 C44 65 80 65 90 91"
          fill="none"
          stroke="#050505"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      <p>
        Not enough CaliCoins to purchase. Spin the slot to get more coins
      </p>

      <button
        type="button"
        onClick={() => setShowNotEnoughCoins(false)}
      >
        CONFIRM
      </button>
    </div>
  </div>
)}

  </div>
)}

</main>
);
}



/* =========================================================
   NAV BUTTON
========================================================= */

function NavButton({
  active,
  icon,
  label,
  badge,
  onClick,
}: {
  active: boolean;
  icon: string;
  label: string;
  badge?: number;
  onClick: () => void;
}) {

  const renderIcon = () => {

    if (icon === "⌂") {
      return (
        <svg
          viewBox="0 0 64 64"
          aria-hidden="true"
        >

          <path
            d="M8 29L32 9l24 20v26H39V39H25v16H8V29Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          />

        </svg>
      );
    }


    if (icon === "🎁") {
      return (
        <svg
          viewBox="0 0 64 64"
          aria-hidden="true"
        >

          <rect
            x="9"
            y="24"
            width="46"
            height="31"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />

          <path
            d="M7 18h50v11H7zM32 18v37"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <path
            d="M32 18c-7 0-15-2-15-8 0-4 3-6 6-6 5 0 9 7 9 14Zm0 0c7 0 15-2 15-8 0-4-3-6-6-6-5 0-9 7-9 14Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />

        </svg>
      );
    }


    if (icon === "☰") {
      return (
        <svg
          viewBox="0 0 64 64"
          aria-hidden="true"
        >

          <rect
            x="11"
            y="7"
            width="42"
            height="50"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />

          <path
            d="M22 22h20M22 32h20M22 42h20"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />

        </svg>
      );
    }


    if (icon === "▭") {
      return (
        <svg
          viewBox="0 0 64 64"
          aria-hidden="true"
        >

          <rect
            x="9"
            y="12"
            width="44"
            height="40"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />

          <path
            d="M18 21h27M18 43h12"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M14 7h38"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />

        </svg>
      );
    }


    return (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
      >

        <path
          d="M13 27h38l-4 29H17L13 27Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        <path
          d="M8 27h48M18 27l8-16M46 27l-8-16"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />

      </svg>
    );
  };


  return (
    <button
      className={
        `nav-item ${
          active ? "active" : ""
        }`
      }
      onClick={onClick}
    >

      <span className="nav-icon">

        {renderIcon()}

        {badge ? (
          <b className="cart-badge">
            {badge}
          </b>
        ) : null}

      </span>

      <span>
        {label}
      </span>

    </button>
  );
}
