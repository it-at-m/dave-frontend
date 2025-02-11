import type MessfaehigkeitDTO from "@/types/messstelle/MessfaehigkeitDTO";
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";

import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { useMessstelleStore } from "@/store/MessstelleStore";
import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

describe("OptionsmenueSettingsStore.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("getMessfaehigkeitenForGivenZeitraum", () => {
    const messstelleStore = useMessstelleStore();

    const messstelleInfo = {} as MessstelleInfoDTO;

    const messfaehigkeit1 = {
      gueltigAb: "2025-02-01",
      gueltigBis: "2025-02-05",
      intervall: ZaehldatenIntervall.STUNDE_KOMPLETT,
      fahrzeugklassen: Fahrzeugklasse.ACHT_PLUS_EINS,
    } as MessfaehigkeitDTO;
    const messfaehigkeit2 = {
      gueltigAb: "2025-02-06",
      gueltigBis: "2025-02-08",
      intervall: ZaehldatenIntervall.STUNDE_HALB,
      fahrzeugklassen: Fahrzeugklasse.ACHT_PLUS_EINS,
    } as MessfaehigkeitDTO;

    messstelleInfo.messfaehigkeiten = [messfaehigkeit1, messfaehigkeit2];
    messstelleStore.setMessstelleInfo(messstelleInfo);

    let start = new Date(2025, 1, 1);
    let end = new Date(2025, 1, 1);
    let result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(
      start,
      end
    );
    let expected = [messfaehigkeit1];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 0, 1);
    end = new Date(2025, 0, 31);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 0, 31);
    end = new Date(2025, 0, 31);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 1, 3);
    end = new Date(2025, 1, 3);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [messfaehigkeit1];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 0, 1);
    end = new Date(2025, 1, 5);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [messfaehigkeit1];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 1, 1);
    end = new Date(2025, 1, 5);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [messfaehigkeit1];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 0, 1);
    end = new Date(2025, 1, 6);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [messfaehigkeit1, messfaehigkeit2];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 1, 1);
    end = new Date(2025, 1, 8);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [messfaehigkeit1, messfaehigkeit2];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 1, 5);
    end = new Date(2025, 1, 8);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [messfaehigkeit1, messfaehigkeit2];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 0, 1);
    end = new Date(2025, 11, 31);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [messfaehigkeit1, messfaehigkeit2];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 1, 6);
    end = new Date(2025, 1, 8);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [messfaehigkeit2];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 1, 7);
    end = new Date(2025, 1, 7);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [messfaehigkeit2];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 1, 8);
    end = new Date(2025, 1, 8);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [messfaehigkeit2];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 1, 8);
    end = new Date(2025, 1, 9);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [messfaehigkeit2];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 1, 9);
    end = new Date(2025, 1, 9);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [];
    expect(result).toStrictEqual(expected);

    start = new Date(2025, 1, 9);
    end = new Date(2025, 1, 20);
    result = messstelleStore.getMessfaehigkeitenForGivenZeitraum(start, end);
    expected = [];
    expect(result).toStrictEqual(expected);
  });
});
