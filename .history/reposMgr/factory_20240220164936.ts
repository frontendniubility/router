import * as fs from 'node:fs';
import { Repo, Factory, Context } from './types';
import { Context } from '../dev home/reposMgr/types';

export let factory: Factory = {
    ".git": {
        isType(ctx: Context) {
            return fs.existsSync(dir + '/.git');
        },
        GetRepoInfo(dir: string) {
            // 定义一个GitRepo对象，用于存储git库的信息
            let gitRepo: Repo = {
                remotes: new Set<string>(), // git库的所有远程地址
            };

            // 读取.git/config文件，获取所有远程地址
            let config = fs.readFileSync(dir + '/.git/config', 'utf-8');

            // 使用正则表达式，匹配所有的url字段
            let regex = /url = (.*)/g;

            // 定义一个变量，用于存储匹配结果
            let match;

            // 循环匹配，直到没有更多结果
            while ((match = regex.exec(config)) !== null) {
                // 获取匹配到的url，去除两端的空格，并添加到remotes数组中
                let url = match[1].trim();
                gitRepo.remotes.add(url);
            }
            return gitRepo;
        }
    }
};
