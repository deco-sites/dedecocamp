import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useUI } from "../../sdk/useUI.ts";

export interface Images {
  /** @description desktop otimized image */
  srcDesktop: ImageWidget;
  /** @description mobile otimized image */
  srcMobile: ImageWidget;
  /** @description Image's alt text */
  textSeo: string;
}

export interface Props {
  images?: Images[];
}

function ExpandImageGallery({
  images,
}: Props) {
  const { callActionImagesIndex } = useUI();

  const loadMoreImage = () => {
    callActionImagesIndex.value = callActionImagesIndex.value + 1;
  };

  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10 items-center">
      <div class="div-container flex flex-col gap-5 max-w-[800px]">
        {images?.slice(0, callActionImagesIndex.value).map((image, index) => (
          <Picture preload={true} key={index}>
            <Source
              media="(max-width: 767px)"
              fetchPriority={"high"}
              src={image.srcMobile}
              width={430}
              height={590}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={"high"}
              src={image.srcDesktop}
              width={1440}
              height={600}
            />
            <img
              class="object-cover w-full h-full hover:scale-150 transition"
              loading={"lazy"}
              src={image.srcDesktop}
              alt={image.textSeo}
            />
          </Picture>
        ))}
      </div>
      {images?.length != callActionImagesIndex.value && (
        <button
          class="btn btn-outline"
          onClick={() => {
            loadMoreImage();
          }}
        >
          Ver mais imagens +
        </button>
      )}
    </div>
  );
}

export default ExpandImageGallery;
