# 项目介绍
这是一个基于vite的项目，且该项目包含了RainSTR Studio的网站源代码。

这是一个内部项目，仅用于RainSTR Studio的官方网站开发。

# 需要安装的软件
由于该项目基于vite，而vite基于Nodejs，所以你需要先安装Nodejs和npm。

## Nodejs
你可以在[Nodejs官网](https://nodejs.org/en/)下载Nodejs (建议下载最新版本)。

安装完成后，输入`node -v`来检查Nodejs是否安装成功。

## npm
npm是Nodejs的包管理器，一般和Nodejs一起安装。一般情况下，你不需要手动安装npm，因为Nodejs安装完成后，会自动安装npm。

如果你实在是不放心，可以运行`npm -v`来检查npm是否安装成功。

但是，有时候你可能需要手动安装npm，比如你使用的是旧版本的Nodejs，或者你使用的是Windows系统。

你可以在Nodejs安装完成后，使用`npm install -g npm`来安装最新版本的npm。

# 前置要求
在clone该项目后，你需要先做以下步骤：

1. 进入该项目目录;
2. 运行`npm install`来安装项目依赖;

# 如何运行
使用`npm run dev`即可在你的电脑上运行该项目

# 如何编译
使用`npm run build`来编译该项目，编译结果在项目根目录的`dist/`下。

如果你是服务器管理员，你可以将编译结果部署到服务器上。

也就是说，你可以直接把`dist/`目录下的文件全部复制到服务器的`/var/www/html`下。
