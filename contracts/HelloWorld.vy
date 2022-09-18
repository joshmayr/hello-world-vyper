# @version ^0.3.0
struct Message:
    sender: address
    message: String[256] # Strings must have a max length in Vyper
    blockTime: uint256

event MessageSent:
    sender: address
    message: String[256]
    blockTime: uint256


messages: DynArray[Message, 1024]
lastMessage: public(HashMap[address, uint256]) 
totalMessages: uint256

@external
def __init__():
    """
    @dev Contract constructor.
    """
    self.messages.append(Message(
        {sender: msg.sender,
        message: "Placeholder",
        blockTime: block.timestamp
        }))
    self.lastMessage[msg.sender] = self.totalMessages
    self.totalMessages += 1

@external
def sendMessage(_message: String[256]):
    self.messages.append(Message(
        {sender: msg.sender,
        message: _message,
        blockTime: block.timestamp
        }))
    self.lastMessage[msg.sender] = self.totalMessages
    self.totalMessages += 1
    log MessageSent(msg.sender, _message, block.timestamp)



@external
@view
def getAllMessages() -> DynArray[Message, 1024]:
    return self.messages

@external
@view
def getLastMessageFromAddress(_sender: address) -> Message:
    assert self.lastMessage[_sender] != 0, "User hasn't sent any messages"
    return self.messages[self.lastMessage[_sender]]