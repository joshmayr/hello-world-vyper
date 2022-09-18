const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HelloWorld", function () {
  async function deployHelloWorldFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy(); // TODO: Breaking here
    await helloWorld.deployed()

    return { helloWorld, owner, otherAccount };
  }

  describe("Send message", function () {
    it("Should emit MessageSent event", async function () {
      const { helloWorld, owner } = await loadFixture(deployHelloWorldFixture);
      await expect(helloWorld.sendMessage("Hello, World!"))
        .to.emit(helloWorld, "MessageSent")
        .withArgs(await owner.address, "Hello, World!", anyValue);
    });
  });

  describe("Read messages", function () {
    it("GetAllMessages should return all messages", async function () {
      const { helloWorld } = await loadFixture(deployHelloWorldFixture);
      expect((await helloWorld.getAllMessages()).length).to.equal(1);
      const tx = await helloWorld.sendMessage("Second message");
      expect((await helloWorld.getAllMessages()).length).to.equal(2);
    });

    it("GetLastMessageFromAddress should print user's last message", async function () {
      const { helloWorld, owner, otherAccount } = await loadFixture(deployHelloWorldFixture);
      await helloWorld.sendMessage("Hello, World!");
      expect((await helloWorld.getLastMessageFromAddress(owner.address)).message).to.equal(
        "Hello, World!"
      );
      await helloWorld.sendMessage("Second message");
      expect((await helloWorld.getLastMessageFromAddress(owner.address)).message).to.equal(
        "Second message"
      );
    });

    it("GetLastMessageFromAddress should revert when user hasn't sent any messages", async function () {
      const { helloWorld, owner, otherAccount } = await loadFixture(deployHelloWorldFixture);
      await helloWorld.sendMessage("Hello, World!");
      await expect(helloWorld.getLastMessageFromAddress(otherAccount.address)).to.be.revertedWith(
        "User hasn't sent any messages"
      );
    });
  });
});
