# V8Core
> v8版本：8.6.395.17

1. 安装virtual studio 2019
2. 安装vc2019编译工具(v142), 以及英语语言包, 和window 10 SDK(10.0.19041.0)
3. 安装vcpkg和debugger for windows
4. 执行vcpkg integrate install
5. 执行vcpkg install v8:x86-windows-static (可能需要翻墙, 可以用proifier代理进程)
6. 打开v8core.sln工程文件，修改目标为Release和x86，并修改vc库目录,引用目录,包含目录，还有修改平台工具集为v142,window SDK设置为10.0.19041.0
7. 编译