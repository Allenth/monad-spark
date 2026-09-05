// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

/// @notice Experimental document agreement registry. Stores hashes, never document contents.
contract DocumentAgreement {
    enum Status { Missing, Pending, Signed, Cancelled }
    struct Agreement {
        address creator;
        address counterparty;
        bytes32 bidHash;
        bytes32 contractHash;
        uint256 createdAt;
        Status status;
        uint256 signedAt;
    }

    mapping(address => bool) public registered;
    mapping(uint256 => Agreement) public agreements;
    uint256 public agreementCount;

    event Registered(address indexed account);
    event AgreementCreated(uint256 indexed id, address indexed creator, address indexed counterparty);
    event AgreementSigned(uint256 indexed id, address indexed signer);
    event AgreementCancelled(uint256 indexed id, address indexed creator);

    error AlreadyRegistered();
    error NotRegistered();
    error InvalidCounterparty();
    error EmptyHash();
    error RecordMissing();
    error NotPending();
    error Unauthorized();
    error HashMismatch();

    function register() external {
        if (registered[msg.sender]) revert AlreadyRegistered();
        registered[msg.sender] = true;
        emit Registered(msg.sender);
    }

    function createAgreement(bytes32 bidHash, bytes32 contractHash, address counterparty)
        external returns (uint256 id)
    {
        if (!registered[msg.sender]) revert NotRegistered();
        if (counterparty == address(0) || counterparty == msg.sender) revert InvalidCounterparty();
        if (bidHash == bytes32(0) || contractHash == bytes32(0)) revert EmptyHash();
        id = ++agreementCount;
        agreements[id] = Agreement(msg.sender, counterparty, bidHash, contractHash, block.timestamp, Status.Pending, 0);
        emit AgreementCreated(id, msg.sender, counterparty);
    }

    function signAgreement(uint256 id, bytes32 bidHash, bytes32 contractHash) external {
        Agreement storage agreement = _pending(id);
        if (msg.sender != agreement.counterparty) revert Unauthorized();
        if (!registered[msg.sender]) revert NotRegistered();
        if (bidHash != agreement.bidHash || contractHash != agreement.contractHash) revert HashMismatch();
        agreement.status = Status.Signed;
        agreement.signedAt = block.timestamp;
        emit AgreementSigned(id, msg.sender);
    }

    function cancelAgreement(uint256 id) external {
        Agreement storage agreement = _pending(id);
        if (msg.sender != agreement.creator) revert Unauthorized();
        agreement.status = Status.Cancelled;
        emit AgreementCancelled(id, msg.sender);
    }

    function _pending(uint256 id) private view returns (Agreement storage agreement) {
        agreement = agreements[id];
        if (agreement.status == Status.Missing) revert RecordMissing();
        if (agreement.status != Status.Pending) revert NotPending();
    }
}
