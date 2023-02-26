const supertest = require("supertest");
const { expect } = require("chai");
const path = require("path");

const app = require("../app/app");
const request = supertest(app.listen(3001));
const models = require("../app/models"); //执行models下的文件,将模型挂载
const account = Date.parse(new Date()) / 1000;

let token;
describe("# register测试", () => {
  it("正常测试", (done) => {
    request
      .post("/api/register")
      .send({ account: account, password: "456", repassword: "456" })
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.equal(true);
        expect(res.body.msg).to.equal("注册成功");
        done();
      });
  });
  it("密码不一致测试", (done) => {
    request
      .post("/api/register")
      .send({ account: "123", password: "456", repassword: "4566" })
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.equal(false);
        expect(res.body.msg).to.equal("两次密码输入不一致");
        done();
      });
  });
  it("账号重复测试", (done) => {
    request
      .post("/api/register")
      .send({ account: "123", password: "456", repassword: "456" })
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.equal(false);
        expect(res.body.msg).to.equal("注册失败,账号重复");
        done();
      });
  });
  it("空参数测试", (done) => {
    request
      .post("/api/register")
      .send()
      .expect(400)
      .end(() => {
        done();
      });
  });
});
describe("# login测试", () => {
  it("正常测试", (done) => {
    request
      .post("/api/login")
      .send({ account, password: "456" })
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.msg).to.equal("登录成功");
        token = res.body.data;
        done();
      });
  });
  it("账号不存在测试", (done) => {
    request
      .post("/api/login")
      .send({ account: "12", password: "456" })
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.equal(false);
        expect(res.body.msg).to.equal("账号不存在");
        done();
      });
  });
  it("错密码测试", (done) => {
    request
      .post("/api/login")
      .send({ account: "123", password: "45" })
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.equal(false);
        expect(res.body.msg).to.equal("账号或密码错误");
        done();
      });
  });
  it("空参数测试", (done) => {
    request
      .post("/api/login")
      .send()
      .expect(400)
      .end(() => {
        done();
      });
  });
});
describe("# token测试", () => {
  it("正常测试", (done) => {
    request
      .get("/api")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.equals("测试");
        done();
      });
  });
  it("不带token测试", (done) => {
    request
      .get("/api")
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.equals(null);
        expect(res.body.msg).to.equals("没有权限");
        done();
      });
  });
  it("错token测试", (done) => {
    request
      .get("/api")
      .set("Authorization", `Bearer 1`)
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.equals(null);
        expect(res.body.msg).to.equals("没有权限");
        done();
      });
  });
});
describe("# edit测试", () => {
  it("正常测试", (done) => {
    request
      .post("/api/edit")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "multipart/form-data")
      .field("content", "test123")
      .attach("file1", path.join(__dirname, "../app/public/default.jpeg"))
      .attach("file2", path.join(__dirname, "../app/public/default.jpeg"))
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.equals(true);
        expect(res.body.msg).to.equals("发表成功");
        done();
      });
  });
  it("内容超出测试", (done) => {
    request
      .post("/api/edit")
      .set("Content-Type", "multipart/form-data")
      .field(
        "content",
        `我的邻居李阿姨是四川人，因为那场大地震失去自己的儿女，成了一个失去儿女的孤独阿姨。李阿姨虽然失去自己的儿女，但是周围的孩子对她都很尊重，因此她把周围的孩子当做自己的孩子来疼爱。
      记得那一天下午，天突然下起了鹅毛般的大雪。放学时候，每个同学都冻得缩成一团，等待父母来送衣物。一些同学的父母来得早送衣物给他的儿女早就回家了，而我只好在教室里焦急的等待妈妈送衣物给我。这是李阿姨正好下班，她看见我冻成这个样子，马上把身上唯一能取暖的大衣脱了，往我身上盖，全身发抖的说：“快把这件大衣穿上，要么就会冻病了，快穿。”阿姨你不冷吗？”我哆嗦的问。阿姨想用手取暖的说：“我不冷，阿姨的身体比你强壮，冻一会没什么问题。”“难道阿姨真的不冷吗？不是的，李阿姨看见我冷，仿佛就看见自己的儿女也在冷，就自由的想把自己身上的大衣脱下来给我穿。当时，她每发抖一下，我的心有一种说不出的感谢。当我走到家里，李阿姨已经冻得像一块冰一样，但她还是装作没事的样子说：“我没事，你放心回家吧。”听到这句话，我感动的快要流泪。
      第二天，我才知道李阿姨生病了，我知道李阿姨是因为我才生病的，我经过这次才真正了解李阿姨真的很爱每个孩子。虽然这次我没有去探望李阿姨（在这场大雪中，我也生病了）但是我永远不会忘记。每当下雪时走在路上，我的头里就会浮现李阿姨送我回家的情景。
      `
      )
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.equals(null);
        done();
      });
  });
});
