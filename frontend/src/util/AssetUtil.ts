import type {
  DatatableAsset,
  Heading1Asset,
  Heading2Asset,
  Heading3Asset,
  Heading4Asset,
  Heading5Asset,
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

export type HeadingAsset =
  | Heading1Asset
  | Heading2Asset
  | Heading3Asset
  | Heading4Asset
  | Heading5Asset;

export type HeadingAssetType =
  | typeof BaseAssetTypeEnum.Heading1
  | typeof BaseAssetTypeEnum.Heading2
  | typeof BaseAssetTypeEnum.Heading3
  | typeof BaseAssetTypeEnum.Heading4
  | typeof BaseAssetTypeEnum.Heading5;

export function useAssetUtil() {
  function generateId() {
    return Date.now() * Math.random();
  }

  function createHeadingAsset(
    text: string,
    type: HeadingAssetType
  ): HeadingAsset {
    const asset: HeadingAsset = {
      id: generateId(),
      type,
      text,
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
