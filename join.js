#!/usr/bin/env node

var program = require('commander');
const fs = require('fs');
const path = require('path');

program
  .arguments('<dir>')
  .alias('./join.js')
  .option('-b, --begin <begin>', 'first sequence to merge',0)
  .option('-e, --end <end>', 'last sequence to merge',1)
  .option('-p, --pattern <pattern>', 'the file number pattern', 'video_*.mp4')
  .option('-o, --output <output>', 'file to use for output', './joined.mp4')
  .action(function(dir,options){
    for (var i = options.begin; i <= options.end; i++) {
      var number = ("000"+(i)).slice(-4);
      var filename = options.pattern.replace('\*',number);
      console.log('merging: ' + path.join(dir,filename));
      var data = fs.readFileSync(path.join(dir,filename));
      fs.appendFileSync(options.output,data,'binary');
    }
  })
  .parse(process.argv);
