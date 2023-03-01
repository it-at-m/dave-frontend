/**
 * Die Fahrtrichtungsraten sind in der Reihenfolge sortiert, in der sie
 * später auf der "von" Basis dargestellt werden. D.h. um die richtige
 * Reihenfolge für die Darstellung zu ermitteln, kann einfach die Liste
 * sortiert werden.
 *
 * ACHTUNG: Wer hier die Reihenfolge ändert sollte wissen warum :)
 */
export enum Fahrtrichtungsarten {

  RECHTS45,
  RECHTS90 = 1,
  RECHTS135,
  GERADE,
  LINKS135,
  LINKS90,
  LINKS45,
  UTURN

}

export default Fahrtrichtungsarten