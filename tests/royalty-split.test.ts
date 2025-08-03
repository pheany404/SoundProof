import { describe, it, expect, beforeEach } from "vitest";

// Types
type Principal = string;

interface RoyaltyConfig {
  recipients: Principal[];
  shares: bigint[];
  locked: boolean;
}

type RoyaltyMap = Record<number, RoyaltyConfig>;

// Mocks
let royaltyMap: RoyaltyMap = {};
const BASIS_POINTS_TOTAL = 10_000n;

function setRoyalty(trackId: number, recipients: Principal[], shares: bigint[]): boolean | string {
  if (royaltyMap[trackId]?.locked) {
    return "royalty-locked";
  }

  if (recipients.length !== shares.length) {
    return "length-mismatch";
  }

  const total = shares.reduce((a, b) => a + b, 0n);
  if (total !== BASIS_POINTS_TOTAL) {
    return "invalid-total-share";
  }

  royaltyMap[trackId] = {
    recipients,
    shares,
    locked: false,
  };
  return true;
}

function lockRoyalty(trackId: number): boolean | string {
  const config = royaltyMap[trackId];
  if (!config) return "not-set";
  royaltyMap[trackId].locked = true;
  return true;
}

function distributeRoyalty(trackId: number, amount: bigint): (readonly [Principal, bigint])[] | string {
  const config = royaltyMap[trackId];
  if (!config || !config.locked) return "not-locked";

  return config.recipients.map((recipient, i) => [
    recipient,
    (amount * config.shares[i]) / BASIS_POINTS_TOTAL,
  ] as const);
}

// Tests
describe("Royalty Split Logic", () => {
  const alice = "SP2ALICE";
  const bob = "SP3BOB";
  const charlie = "SP4CHARLIE";

  beforeEach(() => {
    royaltyMap = {};
  });

  it("sets valid royalty split", () => {
    const result = setRoyalty(1, [alice, bob], [7000n, 3000n]);
    expect(result).toBe(true);
  });

  it("rejects if lengths mismatch", () => {
    const result = setRoyalty(1, [alice], [9000n, 1000n]);
    expect(result).toBe("length-mismatch");
  });

  it("rejects if shares don’t add up to 10,000", () => {
    const result = setRoyalty(1, [alice, bob], [8000n, 1000n]);
    expect(result).toBe("invalid-total-share");
  });

  it("locks royalty split", () => {
    setRoyalty(1, [alice, bob], [6000n, 4000n]);
    const result = lockRoyalty(1);
    expect(result).toBe(true);
  });

  it("prevents editing after lock", () => {
    setRoyalty(1, [alice, bob], [6000n, 4000n]);
    lockRoyalty(1);
    const result = setRoyalty(1, [alice, charlie], [5000n, 5000n]);
    expect(result).toBe("royalty-locked");
  });

  it("distributes funds according to locked shares", () => {
    setRoyalty(1, [alice, bob], [8000n, 2000n]);
    lockRoyalty(1);

    const payouts = distributeRoyalty(1, 1_000_000n);
    expect(payouts).toEqual([
      [alice, 800_000n],
      [bob, 200_000n],
    ]);
  });

  it("rejects distribution if royalty not locked", () => {
    setRoyalty(1, [alice, bob], [8000n, 2000n]);
    const result = distributeRoyalty(1, 500_000n);
    expect(result).toBe("not-locked");
  });

  it("rejects lock if royalty not set", () => {
    const result = lockRoyalty(42);
    expect(result).toBe("not-set");
  });
});
