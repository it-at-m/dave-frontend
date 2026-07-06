import { describe, expect, it } from "vitest";

import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import {
  areFjsVerkehrsbeziehungenEqual,
  areQjsVerkehrsbeziehungenEqual,
  areQuVerkehrsbeziehungenEqual,
} from "@/util/EqualityUtils";

describe("EqualityUtils", () => {
  describe("areQuVerkehrsbeziehungenEqual", () => {
    it("returns true for two identical arrays", () => {
      const a = [
        { knotenarm: 1, richtung: Himmelsrichtung.N },
        { knotenarm: 2, richtung: Himmelsrichtung.O },
      ] as any;
      const b = [
        { knotenarm: 1, richtung: Himmelsrichtung.N },
        { knotenarm: 2, richtung: Himmelsrichtung.O },
      ] as any;
      expect(areQuVerkehrsbeziehungenEqual(a, b)).toBe(true);
    });

    it("is order independent", () => {
      const a = [
        { knotenarm: 1, richtung: Himmelsrichtung.N },
        { knotenarm: 2, richtung: Himmelsrichtung.O },
      ] as any;
      const b = [
        { knotenarm: 2, richtung: Himmelsrichtung.O },
        { knotenarm: 1, richtung: Himmelsrichtung.N },
      ] as any;
      expect(areQuVerkehrsbeziehungenEqual(a, b)).toBe(true);
    });

    it("treats undefined as empty array", () => {
      expect(areQuVerkehrsbeziehungenEqual(undefined, [])).toBe(true);
      expect(areQuVerkehrsbeziehungenEqual([], undefined)).toBe(true);
      expect(areQuVerkehrsbeziehungenEqual(undefined, undefined)).toBe(true);
    });

    it("returns false for different lengths", () => {
      const a = [{ knotenarm: 1, richtung: Himmelsrichtung.N }] as any;
      const b = [
        { knotenarm: 1, richtung: Himmelsrichtung.N },
        { knotenarm: 2, richtung: Himmelsrichtung.O },
      ] as any;
      expect(areQuVerkehrsbeziehungenEqual(a, b)).toBe(false);
    });

    it("returns false when richtung differs", () => {
      const a = [{ knotenarm: 1, richtung: Himmelsrichtung.N }] as any;
      const c = [{ knotenarm: 1, richtung: Himmelsrichtung.O }] as any; // different richtung
      expect(areQuVerkehrsbeziehungenEqual(a, c)).toBe(false);
    });

    it("returns false when knotenarm differs", () => {
      const a = [{ knotenarm: 1, richtung: Himmelsrichtung.N }] as any;
      const d = [{ knotenarm: 2, richtung: Himmelsrichtung.N }] as any; // different knotenarm
      expect(areQuVerkehrsbeziehungenEqual(a, d)).toBe(false);
    });
  });

  describe("areFjsVerkehrsbeziehungenEqual", () => {
    it("returns true for identical laengsverkehr entries", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.EIN,
        },
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.AUS,
        },
      ] as any;
      const b = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.EIN,
        },
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.AUS,
        },
      ] as any;
      expect(areFjsVerkehrsbeziehungenEqual(a, b)).toBe(true);
    });

    it("is order independent for laengsverkehr", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.EIN,
        },
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.AUS,
        },
      ] as any;
      const b = [
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.AUS,
        },
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.EIN,
        },
      ] as any;
      expect(areFjsVerkehrsbeziehungenEqual(a, b)).toBe(true);
    });

    it("handles undefined/empty", () => {
      expect(areFjsVerkehrsbeziehungenEqual(undefined, [])).toBe(true);
      expect(areFjsVerkehrsbeziehungenEqual([], undefined)).toBe(true);
      expect(areFjsVerkehrsbeziehungenEqual(undefined, undefined)).toBe(true);
    });

    it("returns false for different lengths", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.EIN,
        },
      ] as any;
      const b = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.EIN,
        },
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.AUS,
        },
      ] as any;
      expect(areFjsVerkehrsbeziehungenEqual(a, b)).toBe(false);
    });

    it("returns false when richtung differs", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.EIN,
        },
      ] as any;
      const b = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.AUS,
        },
      ] as any;
      expect(areFjsVerkehrsbeziehungenEqual(a, b)).toBe(false);
    });

    it("returns false when knotenarm differs", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.EIN,
        },
      ] as any;
      const b = [
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.EIN,
        },
      ] as any;
      expect(areFjsVerkehrsbeziehungenEqual(a, b)).toBe(false);
    });

    it("returns false when strassenseite differs", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.EIN,
        },
      ] as any;
      const b = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.EIN,
        },
      ] as any;
      expect(areFjsVerkehrsbeziehungenEqual(a, b)).toBe(false);
    });
  });

  describe("areQjsVerkehrsbeziehungenEqual", () => {
    it("returns true for identical verkehrsbeziehungen", () => {
      const a = [
        { von: 1, nach: 3, strassenseite: Himmelsrichtung.W },
        { von: 2, nach: 4, strassenseite: Himmelsrichtung.N },
      ] as any;
      const b = [
        { von: 1, nach: 3, strassenseite: Himmelsrichtung.W },
        { von: 2, nach: 4, strassenseite: Himmelsrichtung.N },
      ] as any;
      expect(areQjsVerkehrsbeziehungenEqual(a, b)).toBe(true);
    });

    it("is order independent for qjs", () => {
      const a = [
        { von: 1, nach: 3, strassenseite: Himmelsrichtung.W },
        { von: 2, nach: 4, strassenseite: Himmelsrichtung.N },
      ] as any;
      const b = [
        { von: 2, nach: 4, strassenseite: Himmelsrichtung.N },
        { von: 1, nach: 3, strassenseite: Himmelsrichtung.W },
      ] as any;
      expect(areQjsVerkehrsbeziehungenEqual(a, b)).toBe(true);
    });

    it("handles undefined/empty", () => {
      expect(areQjsVerkehrsbeziehungenEqual(undefined, [])).toBe(true);
      expect(areQjsVerkehrsbeziehungenEqual([], undefined)).toBe(true);
      expect(areQjsVerkehrsbeziehungenEqual(undefined, undefined)).toBe(true);
    });

    it("returns false for different lengths", () => {
      const a = [{ von: 1, nach: 3, strassenseite: Himmelsrichtung.W }] as any;
      const b = [
        { von: 1, nach: 3, strassenseite: Himmelsrichtung.W },
        { von: 2, nach: 4, strassenseite: Himmelsrichtung.N },
      ] as any;
      expect(areQjsVerkehrsbeziehungenEqual(a, b)).toBe(false);
    });

    it("returns false when 'von' differs", () => {
      const a = [{ von: 1, nach: 3, strassenseite: Himmelsrichtung.W }] as any;
      const b = [{ von: 2, nach: 3, strassenseite: Himmelsrichtung.W }] as any; // different 'von'
      expect(areQjsVerkehrsbeziehungenEqual(a, b)).toBe(false);
    });

    it("returns false when 'nach' differs", () => {
      const a = [{ von: 1, nach: 3, strassenseite: Himmelsrichtung.W }] as any;
      const b = [{ von: 1, nach: 2, strassenseite: Himmelsrichtung.W }] as any; // different 'nach'
      expect(areQjsVerkehrsbeziehungenEqual(a, b)).toBe(false);
    });

    it("returns false when 'strassenseite' differs", () => {
      const a = [{ von: 1, nach: 3, strassenseite: Himmelsrichtung.W }] as any;
      const b = [{ von: 1, nach: 3, strassenseite: Himmelsrichtung.N }] as any; // different strassenseite
      expect(areQjsVerkehrsbeziehungenEqual(a, b)).toBe(false);
    });
  });
});
