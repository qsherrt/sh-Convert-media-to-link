# sh-Convert-media-to-link

这是一个最小的文件上传后端示例（Node.js + Express + multer），用于接收图片/视频等文件并返回可访问的链接。

文件说明

- package.json - 项目依赖与启动脚本
- server.js - Express + multer 实现上传并把文件存到 uploads/ 目录，同时托管 public/ 和 /uploads
- public/upload.html - 简单的前端上传页面，放在 public/ 下，启动服务后可以通过 http://localhost:3000/upload.html 使用
- .gitignore - 忽略 node_modules、uploads 等

快速运行

1. 克隆仓库并进入目录

   git clone https://github.com/qsherrt/sh-Convert-media-to-link.git
   cd sh-Convert-media-to-link

2. 安装依赖并启动

   npm install
   npm start

3. 打开页面并上传

   打开 http://localhost:3000/upload.html 选择文件并上传，上传后会返回一个 /uploads/<filename> 可访问链接。

生产注意事项

- 在生产环境请使用反向代理（如 nginx）以及 HTTPS。
- 添加访问控制或鉴权以防止滥用。
- 可将文件存储迁移到对象存储（S3 / OSS）以获得更可靠的托管与 CDN 加速。
- 限制文件类型与大小，并定期清理 uploads/。

提交信息：feat(upload): add simple file upload server
