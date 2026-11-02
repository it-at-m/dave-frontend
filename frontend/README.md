# DAVe-GUI

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Generate typescript backend client

```
mvn -Popenapi generate-sources
```

#### Known errors

In der Datei LadeProcessedZaehldatenBelastungsplanDTO.ts fehlen einige Imports für verwendete Interfaces:

```import type {
LadeBelastungsplanDTO,
```

Ausserdem ist in der Funktion _LadeProcessedZaehldatenBelastungsplanDTOToJSONTyped_ falsch verwendet.
Richtige Lösung:

```
  default:
    return value;
```

Die Ursache ist eine Einschränkung des verwendeten typescript-fetch-Generators:

- LadeProcessedZaehldatenBelastungsplanDTO ist ein reines oneOf-Alias.
- Der Generator erzeugt daraus zwar den Union-Typ, aber keine Imports für die referenzierten Modelle.
- generateAliasAsModel wird von der verwendeten Generator-Version nicht wirksam unterstützt.
- anyOf erzeugt zwar Imports, aber ein falsches gemeinsames Interface und kaputte Typzuweisungen.

Zu lösen wäre das nur mit einem eigenen OpenAPI-Generator-Template.
