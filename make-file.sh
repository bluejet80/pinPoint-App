#!/bin/bash

HTML='
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Template Web</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="main-div">
      <div class="nav">
        <div class="top-nav">
          <div class="nav-logo">Logo</div>
          <div class="nav-option">time</div>
        </div>

        <ul class="nav-bar grey">
          <li>Link1</li>
          <li>Link2</li>
          <li>Link3</li>
        </ul>
      </div>
      <div class="content">
        <div class="section1">
          <div class="part1 red">One</div>
          <div class="part1 green">Two</div>
          <div class="part1 blue">Three</div>
        </div>
        <div class="section2 grey">
          <h1>JavaScript Examples</h1>
          <p>This is the Template Website</p>
        </div>
      </div>
      <div class="footer dr-grey">
        <div class="foot-left">Left</div>
        <div class="foot-center">
          <p class="foot-title">This is the center portion</p>
          <p>This is a template Website</p>
        </div>
        <div class="foot-right">Right</div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
'
CSS='
\* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  margin: 0px;
}

.main-div {
  display: grid;
  width: 100%;
}

.nav {
  display: block;
  width: 100%;
  height: fit-content;
  background: grey;
  color: white;
}

.top-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
}

.nav-logo {
  height: 25px;
  width: 25px;
  margin-left: 20px;
  letter-spacing: 10px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
}
.nav-option {
  margin-right: 20px;
}

.nav-bar {
  display: flex;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px;
  clip-path: polygon(8% 0, 100% 0, 100% 100%, 2% 100%);
}

.nav-bar li {
  margin-left: 10%;
  list-style: none;
}

.red {
  background: rgb(194, 23, 23);
}
.green {
  background: rgb(21, 158, 80);
}
.blue {
  background: rgb(91, 97, 221);
}
.grey {
  background: rgb(171, 171, 171);
}
.dr-grey {
  background: rgb(57, 57, 59);
}

.content {
  display: flex;
  width: 100%;
  height: fit-content;
}

.section1 {
  display: block;
  width: 25%;
}
.part1 {
  width: 100%;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 24px;
  text-align: center;
  padding: 30px 0px;
}
.section2 {
  display: block;
  width: 75%;
  height: 150px \* 3;
  padding: 10px;
}

.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: fit-content;
  width: 100%;
  color: white;
}

.foot-left,
.foot-right {
  margin: 20px;
}

.foot-center {
  text-align: center;
  margin: 5px;
}

.foot-center p {
  margin: 0px;
}

.foot-title {
  font-family: "Courier New", Courier, monospace;
  font-size: 20px;
  margin-bottom: -10px;
}
'

JS='
"use strict";

const button = document.querySelector(".button")
'


touch index.html
touch style.css
touch script.js

echo $HTML > index.html
echo $CSS > style.css
echo $JS > script.js

