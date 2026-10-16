import type {
  DatatableAsset,
  HeadingAsset,
  ImageAsset,
  MessstelleDatatableAsset,
  NewlineAsset,
  OptionsDTO,
  PagebreakAsset,
  TextAsset,
  ZaehlungskenngroessenAsset,
} from "@/api/client";
import type MessstelleOptions from "@/types/messstelle/MessstelleOptions";

import { BaseAssetTypeEnum } from "@/api/client";
import MessstelleOptionsMapper from "@/types/messstelle/MessstelleOptionsMapper";

export function useAssetUtil() {
  function generateId() {
    return Date.now() * Math.random();
  }

  function createHeadingAsset(
    date: string,
    type: BaseAssetTypeEnum
  ): HeadingAsset {
    const asset: HeadingAsset = {
      id: generateId(),
      type,
      text: "Mein Überschriftentext",
    };
    return asset;
  }

  function createDatatableAsset(
    options: OptionsDTO,
    zaehlungId: string,
    text: string
  ): DatatableAsset {
    const asset: DatatableAsset = {
      id: generateId(),
      type: BaseAssetTypeEnum.Datatable,
      options: options,
      zaehlungId,
      text,
    };
    return asset;
  }

  function createImageAsset(caption: string, image: string): ImageAsset {
    const asset: ImageAsset = {
      id: generateId(),
      type: BaseAssetTypeEnum.Image,
      caption: caption,
      image: image,
    };
    return asset;
  }

  function createMessstelleDatatableAsset(
    options: MessstelleOptions,
    mstId: string,
    text: string
  ): MessstelleDatatableAsset {
    const asset: MessstelleDatatableAsset = {
      id: generateId(),
      type: BaseAssetTypeEnum.DatatableMessstelle,
      options: options ? MessstelleOptionsMapper.toBackend(options) : undefined,
      mstId: mstId,
      text: text,
    };
    return asset;
  }

  function createNewlineAsset(): NewlineAsset {
    const asset: NewlineAsset = {
      id: generateId(),
      type: BaseAssetTypeEnum.Newline,
    };
    return asset;
  }

  function createPagebreakAsset(): PagebreakAsset {
    const asset: PagebreakAsset = {
      id: generateId(),
      type: BaseAssetTypeEnum.Pagebreak,
    };
    return asset;
  }

  function createTextAsset(text: string, size?: string): TextAsset {
    const asset: TextAsset = {
      id: generateId(),
      type: BaseAssetTypeEnum.Text,
      text,
      size: size ? size : "medium",
    };
    return asset;
  }

  function createZaehlungskenngroessenAsset(
    text: string,
    zaehlungId: string
  ): ZaehlungskenngroessenAsset {
    const asset: ZaehlungskenngroessenAsset = {
      id: generateId(),
      type: BaseAssetTypeEnum.Zaehlungskenngroessen,
      text,
      zaehlungId,
    };
    return asset;
  }

  return {
    createHeadingAsset,
    createDatatableAsset,
    createImageAsset,
    createMessstelleDatatableAsset,
    createNewlineAsset,
    createPagebreakAsset,
    createTextAsset,
    createZaehlungskenngroessenAsset,
  };
}
