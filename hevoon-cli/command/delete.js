'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
  co(function* () {

    let tplName = yield prompt('项目模板(id): ') // 接收用户输入的参数


    if (config.tpl[tplName]) {
      config.tpl[tplName] = ''
    } else {
      console.log(chalk.red('该模板不存在!'))
      process.exit()
    } // 删除对应的模板

   
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if (err) console.log(err)
      console.log(chalk.green('模板已经删除!'))
      console.log(chalk.grey('模板列表如下: \n'))
      console.log(config)
      console.log('\n')
      process.exit()
    }) // 写入template.json
  })
}