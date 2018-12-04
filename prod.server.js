const express = require('express');

const app = express();

app.use(express.static('./build'));

app.listen('9001',function(){
    console.log('manager-antd run at 9001')
})