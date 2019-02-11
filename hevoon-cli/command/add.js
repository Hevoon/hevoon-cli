'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
 co(function *() {

  
      let tplName = yield prompt('项目模板(id): ')
      let gitUrl='git@github.com:Hevoon/hevoon-cli-template.git'
      let branch='master'
     // 接收用户输入的参数
 
   if (!config.tpl[tplName]) {
     config.tpl[tplName] = {}
     config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') // 过滤unicode字符
     config.tpl[tplName]['branch'] = branch
   } else {
     console.log(chalk.red('该模板已经存在了!'))
     process.exit()
   }  // 避免重复添加,保证tplname(用户定义文件)的唯一性
   
  
   fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
     if (err) console.log(err)
     console.log(chalk.green('该模板添加成功\n'));
     console.log(chalk.green('请根据模板名，运行\'hevoon create\'来创建项目'));
     console.log(chalk.grey('模板列表如下: \n'));
     console.log(config);
     console.log('\n')
     process.exit()
    })// 把模板信息写入templates.json
 })
}
