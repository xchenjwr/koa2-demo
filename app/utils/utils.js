module.exports = {
  async clsupload(filepath) {
    try {
      filepath.forEach((file) => {
        fs.unlink(file, () => {
          fs.rmdir(path.dirname(file), () => {});
        });
      });
    } catch (e) {
      throw { code: 5002, message: "清空上传文件错误" };
    }
  },
};
