'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')

module.exports = () => {
  co(function* () {
    // 处理用户输入
    let tplName = yield prompt('项目模板(id): ')
    let projectName = yield prompt('自定义项目名称: ')
    let gitUrl

    if (!config.tpl[tplName]) {
      console.log(chalk.red('\n 该项目模板不存在!'))
      process.exit()
    }
    gitUrl = config.tpl[tplName].url


    let cmdStr = `git clone ${gitUrl} ${projectName} `;
    // git命令，远程拉取项目并自定义项目名

    console.log(chalk.green('\n \(请等待成功提示后继续操作\)正在生成.....'))

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        process.exit();
      }
      console.log(chalk.green('\n 项目成功生成!'))
      console.log(chalk.green('\n 请稍后自行运行\"npm install --legacy-bundling\"安装项目所需依赖'))
      process.exit()
    })
  })
}