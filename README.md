# V8Core
> v8版本：9.0.257.17#1

1. 安装virtual studio 2019
2. 安装vc2019编译工具(v142), 以及英语语言包, 和window 10 SDK(10.0.19041.0)
3. 安装vcpkg和debugger for windows(vcpkg安装目录 d:\vcpkg)
4. 添加vcpkg目录到系统环境变量PATH
4. 执行vcpkg integrate install
5. 执行vcpkg install v8:x86-windows-static (可能需要翻墙, 可以用proifier代理进程)
6. 打开v8core.sln工程文件，修改目标为Release和x86，并修改vc库目录,引用目录,包含目录，还有修改平台工具集为v142,window SDK设置为10.0.19041.0
7. 编译完成

### 精简icu方法
1. 第5步执行下载完v8源码, 准备编译v8的时候, 如果看见```Building x64-windows-dbg```或```Building x64-windows-rel``` 强制中断编译,
2. 执行```vcpkg remove v8:x86-windows-static```进行删除包
3. 打开文件 ```D:\vcpkg\buildtrees\v8\src\58ffcee747-b6c58ba158\gni\v8.gni``` 把 ```v8_enable_i18n_support = true```改为```v8_enable_i18n_support = false```
4. 执行```vcpkg install v8:x86-windows-static```进行编译
5. 编译dll完成, 你就可以编译v8Core项目了

> 注意：第3步的文件名中的```58ffcee747-b6c58ba158```可能是其他名字
